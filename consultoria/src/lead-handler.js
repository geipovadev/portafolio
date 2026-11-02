/**
 * POST /api/interes
 *
 * Anti-spam básico, sin servicios externos:
 *   - honeypot `fax_number` (tiene que llegar vacío)
 *   - marca de tiempo `form_started` (rechazo amable si el envío es inmediato)
 *   - tope de tamaño del cuerpo
 *   - mismo origen cuando el navegador manda Origin o Sec-Fetch-Site
 *   - límite en memoria por IP: 5 envíos / 10 min dentro de un isolate.
 *     No es global. El README lo dice.
 */

import { validateLead } from "./validate.js";
import { deliverLead, StorageError } from "./lead-store.js";

const MAX_BODY = 20_000;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 8;

const COPY = {
  es: {
    title: "No se pudo enviar",
    tooFast: "Esperá un segundo y volvé a enviar el formulario.",
    invalid: "Revisá los campos marcados e intentá de nuevo.",
    rate: "Llegaron demasiados envíos desde esta red. Probá de nuevo en unos minutos o escribinos por WhatsApp.",
    storage: "No pudimos guardar la solicitud. Probá de nuevo o escribinos por WhatsApp.",
    back: "Volver al formulario",
  },
  en: {
    title: "Could not send",
    tooFast: "Wait a second and submit the form again.",
    invalid: "Check the fields and try again.",
    rate: "Too many submissions from this network. Try again in a few minutes or write on WhatsApp.",
    storage: "We could not store the request. Try again or write on WhatsApp.",
    back: "Back to the form",
  },
};

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) => (
    { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
  ));
}

function clientIp(request) {
  return request.headers.get("cf-connecting-ip")
    || request.headers.get("x-forwarded-for")?.split(",")[0].trim()
    || "local";
}

function sameOrigin(request) {
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).host !== new URL(request.url).host) return false;
    } catch {
      return false;
    }
  }
  const site = request.headers.get("sec-fetch-site");
  if (site && site !== "same-origin" && site !== "none") return false;
  return true;
}

function wantsJson(request) {
  const type = (request.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  if (type === "application/json") return true;
  const accept = request.headers.get("accept") || "";
  return accept.includes("application/json") && !accept.includes("text/html");
}

async function readBody(request) {
  const claimed = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(claimed) && claimed > MAX_BODY) return { error: "too_large" };
  const text = await request.text();
  if (text.length > MAX_BODY) return { error: "too_large" };
  const type = (request.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
  try {
    if (type === "application/json") {
      const data = JSON.parse(text);
      if (!data || typeof data !== "object" || Array.isArray(data)) return { error: "parse" };
      return { data };
    }
    if (type === "application/x-www-form-urlencoded" || type === "text/plain" || type === "") {
      const data = {};
      for (const [key, value] of new URLSearchParams(text)) data[key] = value;
      return { data };
    }
  } catch {
    return { error: "parse" };
  }
  return { error: "type" };
}

function json(body, status, storage) {
  const headers = {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
  };
  if (storage) headers["x-lead-storage"] = storage;
  return new Response(JSON.stringify(body), { status, headers });
}

function htmlError(lang, message, status) {
  const t = COPY[lang] || COPY.es;
  const safe = escapeHtml(message);
  const body = `<!DOCTYPE html>
<html lang="${lang === "en" ? "en" : "es"}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${escapeHtml(t.title)}</title>
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<main class="wrap mini">
  <p class="eyebrow"><span class="pulse" aria-hidden="true"></span> Consultoría</p>
  <h1 class="mini-title">${escapeHtml(t.title)}</h1>
  <p class="mini-lead">${safe}</p>
  <p class="mini-actions"><a class="btn-lime mono" href="/#registro">${escapeHtml(t.back)}</a></p>
</main>
</body>
</html>`;
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
    },
  });
}

function fail(request, lang, message, status, errors) {
  if (wantsJson(request)) {
    return json({ ok: false, error: message, errors: errors || undefined }, status);
  }
  return htmlError(lang, message, status);
}

/**
 * Un handler por isolate, con su propio contador.
 * @param {{ now?: () => number, deliver?: typeof deliverLead }} [deps]
 */
export function createLeadHandler(deps = {}) {
  const hits = new Map();
  const now = deps.now || (() => Date.now());
  const deliver = deps.deliver || deliverLead;

  function limited(ip, at) {
    const recent = (hits.get(ip) || []).filter((t) => at - t < RATE_WINDOW_MS);
    if (recent.length >= RATE_MAX) {
      hits.set(ip, recent);
      return true;
    }
    recent.push(at);
    hits.set(ip, recent);
    if (hits.size > 5000) hits.delete(hits.keys().next().value);
    return false;
  }

  return async function handleLead(request, env) {
    if (request.method !== "POST") {
      return new Response(null, {
        status: 405,
        headers: { allow: "POST", "cache-control": "no-store" },
      });
    }
    if (!sameOrigin(request)) {
      return json({ ok: false, error: "origin" }, 403);
    }

    const parsed = await readBody(request);
    const langHint = parsed.data && parsed.data.lang === "en" ? "en" : "es";
    if (parsed.error) {
      const status = parsed.error === "too_large" ? 413 : 400;
      return fail(request, langHint, COPY[langHint].invalid, status);
    }

    const at = now();
    if (limited(clientIp(request), at)) {
      return fail(request, langHint, COPY[langHint].rate, 429);
    }

    const result = validateLead(parsed.data, at);
    if (!result.ok && result.spam === "honeypot") {
      // Respuesta idéntica a un envío aceptado en el stub, sin guardar nada.
      if (wantsJson(request)) return json({ ok: true }, 200, "dropped");
      return Response.redirect(new URL("/gracias", request.url), 303);
    }
    if (!result.ok && result.spam === "too_fast") {
      return fail(request, langHint, COPY[langHint].tooFast, 400, { form: "too_fast" });
    }
    if (!result.ok) {
      return fail(request, result.lead?.lang || langHint, COPY[langHint].invalid, 400, result.errors);
    }

    let stored;
    try {
      stored = await deliver(env, result.lead);
    } catch (err) {
      const storage = err instanceof StorageError ? err.storage : "store";
      console.error(JSON.stringify({
        event: "consultoria.lead.error",
        storage,
        message: err instanceof Error ? err.message : "error",
      }));
      return fail(request, result.lead.lang, COPY[result.lead.lang].storage, 503);
    }

    if (wantsJson(request)) return json({ ok: true }, 200, stored.storage);
    return Response.redirect(new URL("/gracias", request.url), 303);
  };
}

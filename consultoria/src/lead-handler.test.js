import assert from "node:assert/strict";
import { test } from "node:test";
import { createLeadHandler } from "./lead-handler.js";
import { deliverLead, resetSchemaCache, StorageError } from "./lead-store.js";

const NOW = 1_700_000_000_000;

function lead(overrides = {}) {
  return {
    name: "Ana Solís",
    company: "Clínica Sol",
    role: "Dueña",
    email: "ana@clinica.example",
    whatsapp: "+506 8888-7777",
    industry: "clinica",
    message: "Quiero automatizar los recordatorios de citas por WhatsApp.",
    lang: "es",
    form_started: String(NOW - 10_000),
    fax_number: "",
    ...overrides,
  };
}

function post(body, { json = true, origin = "http://127.0.0.1:8788" } = {}) {
  const headers = { origin };
  let payload;
  if (json) {
    headers["content-type"] = "application/json";
    headers.accept = "application/json";
    payload = JSON.stringify(body);
  } else {
    headers["content-type"] = "application/x-www-form-urlencoded";
    headers.accept = "text/html";
    payload = new URLSearchParams(body).toString();
  }
  return new Request("http://127.0.0.1:8788/api/interes", {
    method: "POST",
    headers,
    body: payload,
  });
}

function handler(deliver) {
  const seen = [];
  const handle = createLeadHandler({
    now: () => NOW,
    deliver: deliver || (async (_env, item) => { seen.push(item); return { storage: "log" }; }),
  });
  return { handle, seen };
}

test("POST válido responde 200 y entrega el lead normalizado", async () => {
  const { handle, seen } = handler();
  const res = await handle(post(lead()), {});
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-lead-storage"), "log");
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(seen.length, 1);
  assert.equal(seen[0].whatsapp, "50688887777");
  assert.equal(seen[0].email, "ana@clinica.example");
});

test("el formulario sin JS redirige a /gracias", async () => {
  const { handle, seen } = handler();
  const res = await handle(post(lead(), { json: false }), {});
  assert.equal(res.status, 303);
  assert.equal(new URL(res.headers.get("location")).pathname, "/gracias");
  assert.equal(seen.length, 1);
});

test("honeypot responde como éxito y no entrega", async () => {
  const { handle, seen } = handler();
  const res = await handle(post(lead({ fax_number: "llena" })), {});
  assert.equal(res.status, 200);
  assert.equal(res.headers.get("x-lead-storage"), "dropped");
  assert.equal(seen.length, 0);
});

test("envío inmediato avisa y no entrega", async () => {
  const { handle, seen } = handler();
  const res = await handle(post(lead({ form_started: String(NOW - 100) })), {});
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(body.errors.form, "too_fast");
  assert.equal(seen.length, 0);
});

test("correo inválido devuelve el campo", async () => {
  const { handle, seen } = handler();
  const res = await handle(post(lead({ email: "nope" })), {});
  assert.equal(res.status, 400);
  const body = await res.json();
  assert.equal(body.errors.email, "email");
  assert.equal(seen.length, 0);
});

test("otro origen se rechaza", async () => {
  const { handle, seen } = handler();
  const res = await handle(post(lead(), { origin: "https://evil.example" }), {});
  assert.equal(res.status, 403);
  assert.equal(seen.length, 0);
});

test("GET no está permitido", async () => {
  const { handle } = handler();
  const res = await handle(new Request("http://127.0.0.1:8788/api/interes"), {});
  assert.equal(res.status, 405);
});

test("cuerpo enorme se rechaza", async () => {
  const { handle, seen } = handler();
  const res = await handle(post(lead({ message: "a".repeat(20_001) })), {});
  assert.equal(res.status, 413);
  assert.equal(seen.length, 0);
});

test("el límite por IP corta el noveno envío", async () => {
  const { handle } = handler();
  for (let i = 0; i < 8; i += 1) {
    const res = await handle(post(lead({ email: `ana${i}@clinica.example` })), {});
    assert.equal(res.status, 200);
  }
  const blocked = await handle(post(lead()), {});
  assert.equal(blocked.status, 429);
});

test("un fallo del destino responde 503 y no dice que se guardó", async () => {
  const handle = createLeadHandler({
    now: () => NOW,
    deliver: async () => { throw new StorageError("abdi status 500", "abdi"); },
  });
  const res = await handle(post(lead()), {});
  assert.equal(res.status, 503);
  const body = await res.json();
  assert.equal(body.ok, false);
});

function fakeDb() {
  const runs = [];
  return {
    runs,
    prepare(sql) {
      return {
        bind(...args) {
          return { async run() { runs.push({ sql, args }); return { success: true }; } };
        },
        async run() { runs.push({ sql, args: [] }); return { success: true }; },
      };
    },
  };
}

test("D1 tiene prioridad e inserta con parámetros", async () => {
  resetSchemaCache();
  const db = fakeDb();
  const stored = await deliverLead({ DB: db, ABDI_CRM_URL: "https://crm.example", ABDI_CRM_TOKEN: "secret" }, {
    name: "Ana", company: "Sol", role: "Dueña", email: "ana@clinica.example",
    whatsapp: "50688887777", industry: "clinica", message: "Recordatorios de citas.", lang: "es",
  });
  assert.equal(stored.storage, "d1");
  const insert = db.runs.find((r) => r.sql.startsWith("INSERT"));
  assert.ok(insert);
  assert.equal(insert.args[1] !== undefined, true);
  assert.equal(insert.args.includes("Ana"), true);
  assert.equal(JSON.stringify(insert).includes("secret"), false);
});

test("sin D1, Abdi recibe el lead y el token va en el header", async () => {
  const calls = [];
  const previous = globalThis.fetch;
  globalThis.fetch = async (url, init) => {
    calls.push({ url, init });
    return new Response(null, { status: 204 });
  };
  try {
    const stored = await deliverLead({
      ABDI_CRM_URL: "https://crm.example/leads",
      ABDI_CRM_TOKEN: "token-no-loguear",
    }, {
      name: "Ana", company: "Sol", role: "Dueña", email: "ana@clinica.example",
      whatsapp: "50688887777", industry: "clinica", message: "Recordatorios.", lang: "es",
    });
    assert.equal(stored.storage, "abdi");
    assert.equal(calls[0].url, "https://crm.example/leads");
    assert.equal(calls[0].init.headers.authorization, "Bearer token-no-loguear");
    const payload = JSON.parse(calls[0].init.body);
    assert.equal(payload.phone, "50688887777");
    assert.equal(payload.source, "consultoria.geinerporras.com");
  } finally {
    globalThis.fetch = previous;
  }
});

test("el webhook de correo se usa si no hay D1 ni CRM", async () => {
  const previous = globalThis.fetch;
  let seen;
  globalThis.fetch = async (url, init) => { seen = { url, init }; return new Response("ok", { status: 200 }); };
  try {
    const stored = await deliverLead({
      LEAD_EMAIL_WEBHOOK: "https://mail.example/hook",
      LEAD_EMAIL_TO: "hporras199511@gmail.com",
    }, {
      name: "Ana", company: "Sol", role: "Dueña", email: "ana@clinica.example",
      whatsapp: "50688887777", industry: "clinica", message: "Recordatorios.", lang: "es",
    });
    assert.equal(stored.storage, "email");
    assert.equal(seen.url, "https://mail.example/hook");
    assert.equal(JSON.parse(seen.init.body).to, "hporras199511@gmail.com");
  } finally {
    globalThis.fetch = previous;
  }
});

test("sin destino configurado el stub responde log y no llama a la red", async () => {
  const previous = globalThis.fetch;
  let called = false;
  globalThis.fetch = async () => { called = true; return new Response("no"); };
  const lines = [];
  const previousLog = console.log;
  console.log = (line) => lines.push(line);
  try {
    const stored = await deliverLead({}, {
      name: "Ana", company: "Sol", role: "Dueña", email: "ana@clinica.example",
      whatsapp: "50688887777", industry: "clinica", message: "Recordatorios.", lang: "es",
    });
    assert.equal(stored.storage, "log");
    assert.equal(called, false);
    assert.match(lines[0], /"storage":"log"/);
  } finally {
    globalThis.fetch = previous;
    console.log = previousLog;
  }
});

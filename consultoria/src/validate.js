/**
 * Validación del formulario de interés. Sin I/O: el handler decide qué hacer
 * con el resultado. Los textos de error viven en el cliente; acá solo salen
 * códigos estables.
 */

export const INDUSTRIES = [
  "clinica",
  "odontologia",
  "laboratorio",
  "comercio",
  "servicios",
  "educacion",
  "hospitalidad",
  "otro",
];

const INDUSTRY_SET = new Set(INDUSTRIES);

const LIMITS = {
  name: [2, 80],
  company: [2, 120],
  role: [2, 80],
  email: [6, 160],
  message: [20, 800],
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/u;

/** Mínimo entre que se pintó el formulario y el envío, cuando viene la marca. */
export const MIN_FILL_MS = 1500;

function clean(value, max, newlines) {
  let s = String(value ?? "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "");
  if (newlines) {
    s = s.replace(/\r\n?/g, "\n").replace(/[^\S\n]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  } else {
    s = s.replace(/\s+/g, " ").trim();
  }
  return s.slice(0, max);
}

/**
 * @param {Record<string, unknown>} raw
 * @param {number} [now]
 * @returns {{ ok: true, lead: object } | { ok: false, spam?: "honeypot" | "too_fast", errors?: Record<string, string> }}
 */
export function validateLead(raw, now = Date.now()) {
  const source = raw && typeof raw === "object" ? raw : {};

  if (clean(source.fax_number, 200, false)) {
    return { ok: false, spam: "honeypot" };
  }

  const started = Number(source.form_started);
  if (Number.isFinite(started) && started > 0) {
    const elapsed = now - started;
    if (elapsed >= 0 && elapsed < MIN_FILL_MS) {
      return { ok: false, spam: "too_fast" };
    }
  }

  const lead = {
    name: clean(source.name, LIMITS.name[1], false),
    company: clean(source.company, LIMITS.company[1], false),
    role: clean(source.role, LIMITS.role[1], false),
    email: clean(source.email, LIMITS.email[1], false).toLowerCase(),
    whatsapp: clean(source.whatsapp, 24, false),
    industry: clean(source.industry, 40, false),
    message: clean(source.message, LIMITS.message[1], true),
    lang: clean(source.lang, 8, false) === "en" ? "en" : "es",
  };

  /** @type {Record<string, string>} */
  const errors = {};
  if (lead.name.length < LIMITS.name[0]) errors.name = "name";
  if (lead.company.length < LIMITS.company[0]) errors.company = "company";
  if (lead.role.length < LIMITS.role[0]) errors.role = "role";
  if (!EMAIL_RE.test(lead.email)) errors.email = "email";

  const digits = lead.whatsapp.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) errors.whatsapp = "whatsapp";
  else lead.whatsapp = digits;

  if (!INDUSTRY_SET.has(lead.industry)) errors.industry = "industry";
  if (lead.message.length < LIMITS.message[0]) errors.message = "message";

  if (Object.keys(errors).length) return { ok: false, errors };
  return { ok: true, lead };
}

/**
 * Adaptador de destino del lead. El primero que esté configurado gana.
 * Ningún secreto vive en el repo: las credenciales, si se usan, entran por
 * `wrangler secret` o por vars en el momento del deploy.
 *
 * Orden:
 *   1. D1            env.DB
 *   2. Abdi IA CRM   env.ABDI_CRM_URL + env.ABDI_CRM_TOKEN
 *   3. Email webhook env.LEAD_EMAIL_WEBHOOK (+ env.LEAD_EMAIL_TOKEN opcional)
 *   4. Log           stub sin persistencia. Es el default, sin secretos.
 *
 * El DDL de abajo tiene que coincidir con ../schema.sql.
 */

export const LEADS_DDL = `CREATE TABLE IF NOT EXISTS leads (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  industry TEXT NOT NULL,
  message TEXT NOT NULL,
  lang TEXT NOT NULL,
  source TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS leads_created_at ON leads (created_at);`;

const SOURCE = "consultoria.geinerporras.com";

export class StorageError extends Error {
  /**
   * @param {string} message
   * @param {"d1" | "abdi" | "email"} storage
   */
  constructor(message, storage) {
    super(message);
    this.name = "StorageError";
    this.storage = storage;
  }
}

let schemaReady = false;

async function ensureSchema(db) {
  if (schemaReady) return;
  const statements = LEADS_DDL.split(";")
    .map((s) => s.trim())
    .filter(Boolean);
  for (const sql of statements) {
    await db.prepare(sql).run();
  }
  schemaReady = true;
}

/** Visible para tests que reutilizan el módulo entre casos. */
export function resetSchemaCache() {
  schemaReady = false;
}

/**
 * @param {D1Database} db
 * @param {object} lead
 */
async function storeD1(db, lead) {
  await ensureSchema(db);
  const id = crypto.randomUUID();
  try {
    await db
      .prepare(
        `INSERT INTO leads
          (id, created_at, name, company, role, email, whatsapp, industry, message, lang, source)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      )
      .bind(
        id,
        new Date().toISOString(),
        lead.name,
        lead.company,
        lead.role,
        lead.email,
        lead.whatsapp,
        lead.industry,
        lead.message,
        lead.lang,
        SOURCE,
      )
      .run();
  } catch (err) {
    schemaReady = false;
    throw new StorageError(err instanceof Error ? err.message : "d1 insert failed", "d1");
  }
  return { storage: "d1", id };
}

/**
 * POST genérico al CRM. El cuerpo es el contrato de este sitio, no una
 * suposición de la API interna de Abdi: si el endpoint espera otro formato,
 * se adapta esta función. El token no se loguea.
 *
 * @param {{ ABDI_CRM_URL: string, ABDI_CRM_TOKEN: string }} env
 */
async function storeAbdi(env, lead) {
  let res;
  try {
    res = await fetch(env.ABDI_CRM_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${env.ABDI_CRM_TOKEN}`,
      },
      body: JSON.stringify({
        source: SOURCE,
        name: lead.name,
        company: lead.company,
        role: lead.role,
        email: lead.email,
        phone: lead.whatsapp,
        industry: lead.industry,
        notes: lead.message,
        lang: lead.lang,
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    throw new StorageError(err instanceof Error ? err.message : "abdi request failed", "abdi");
  }
  if (!res.ok) {
    throw new StorageError(`abdi status ${res.status}`, "abdi");
  }
  return { storage: "abdi" };
}

/**
 * Webhook de correo (Resend, Mailchannels, un Worker propio, etc.).
 * Se manda el lead en JSON. `LEAD_EMAIL_TO` es opcional y lo interpreta
 * el webhook, no este Worker.
 *
 * @param {{ LEAD_EMAIL_WEBHOOK: string, LEAD_EMAIL_TOKEN?: string, LEAD_EMAIL_TO?: string }} env
 */
async function storeEmail(env, lead) {
  const headers = { "content-type": "application/json" };
  if (env.LEAD_EMAIL_TOKEN) headers.authorization = `Bearer ${env.LEAD_EMAIL_TOKEN}`;
  let res;
  try {
    res = await fetch(env.LEAD_EMAIL_WEBHOOK, {
      method: "POST",
      headers,
      body: JSON.stringify({
        to: env.LEAD_EMAIL_TO || undefined,
        subject: `Consultoría — ${lead.company}`,
        lead: { ...lead, source: SOURCE },
      }),
      signal: AbortSignal.timeout(8000),
    });
  } catch (err) {
    throw new StorageError(err instanceof Error ? err.message : "email request failed", "email");
  }
  if (!res.ok) {
    throw new StorageError(`email status ${res.status}`, "email");
  }
  return { storage: "email" };
}

/**
 * @param {object} env
 * @param {object} lead
 * @returns {Promise<{ storage: "d1" | "abdi" | "email" | "log", id?: string }>}
 */
export async function deliverLead(env, lead) {
  if (env && env.DB) return storeD1(env.DB, lead);
  if (env && env.ABDI_CRM_URL && env.ABDI_CRM_TOKEN) return storeAbdi(env, lead);
  if (env && env.LEAD_EMAIL_WEBHOOK) return storeEmail(env, lead);

  // Stub: no persiste. El lead queda en los logs del Worker (`wrangler tail`
  // o el log de `wrangler dev`). No usar esto como destino real.
  console.log(JSON.stringify({ event: "consultoria.lead", storage: "log", lead: { ...lead, source: SOURCE } }));
  return { storage: "log" };
}

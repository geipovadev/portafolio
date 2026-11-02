-- Leads del formulario de consultoria.geinerporras.com.
--
-- Aplicar una vez, después de crear la base (ver README):
--   npx wrangler d1 execute consultoria-leads --remote --file=schema.sql
--
-- El Worker también ejecuta este DDL en el primer envío si el binding DB
-- existe (CREATE TABLE IF NOT EXISTS). Mantené este archivo igual a
-- LEADS_DDL en src/lead-store.js.

CREATE TABLE IF NOT EXISTS leads (
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

CREATE INDEX IF NOT EXISTS leads_created_at ON leads (created_at);

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { MIN_FILL_MS, validateLead } from "./validate.js";
import { LEADS_DDL } from "./lead-store.js";

const NOW = 1_700_000_000_000;

function raw(overrides = {}) {
  return {
    name: "Ana Solís",
    company: "Clínica Sol",
    role: "Dueña",
    email: "Ana@Clinica.example",
    whatsapp: "+506 8888-7777",
    industry: "clinica",
    message: "Quiero automatizar los recordatorios de citas por WhatsApp.",
    lang: "es",
    form_started: String(NOW - MIN_FILL_MS - 10),
    fax_number: "",
    ...overrides,
  };
}

test("acepta un lead válido y normaliza correo y teléfono", () => {
  const result = validateLead(raw(), NOW);
  assert.equal(result.ok, true);
  assert.equal(result.lead.email, "ana@clinica.example");
  assert.equal(result.lead.whatsapp, "50688887777");
  assert.equal(result.lead.lang, "es");
});

test("rechaza campos vacíos con códigos por campo", () => {
  const result = validateLead(raw({
    name: " ",
    company: "A",
    role: "",
    email: "no-es-correo",
    whatsapp: "123",
    industry: "banca",
    message: "corto",
  }), NOW);
  assert.equal(result.ok, false);
  assert.deepEqual(Object.keys(result.errors).sort(), [
    "company", "email", "industry", "message", "name", "role", "whatsapp",
  ]);
});

test("el honeypot no se guarda", () => {
  const result = validateLead(raw({ fax_number: "http://spam.example" }), NOW);
  assert.equal(result.ok, false);
  assert.equal(result.spam, "honeypot");
});

test("un envío inmediato se marca como demasiado rápido", () => {
  const result = validateLead(raw({ form_started: String(NOW - 200) }), NOW);
  assert.equal(result.spam, "too_fast");
});

test("sin marca de tiempo no aplica el filtro de velocidad", () => {
  const result = validateLead(raw({ form_started: "" }), NOW);
  assert.equal(result.ok, true);
});

test("idioma desconocido cae en español", () => {
  const result = validateLead(raw({ lang: "fr" }), NOW);
  assert.equal(result.lead.lang, "es");
});

test("schema.sql coincide con el DDL del adaptador", () => {
  const file = readFileSync(new URL("../schema.sql", import.meta.url), "utf8");
  const normalized = file
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n")
    .trim();
  assert.equal(normalized, LEADS_DDL);
});

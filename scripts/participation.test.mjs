import test from "node:test";
import assert from "node:assert/strict";
import { validateParticipation } from "../src/lib/participation.ts";
import { submitParticipation } from "../src/app/participe/actions.ts";

const base = {
  tipo: "negocio",
  responsavel: " Maria ",
  contato: " maria@example.com ",
  nome: "Meu negócio",
  categoria: "Serviços",
  mensagem: "Uma contribuição.",
  consentimento: "on",
};
const event = {
  ...base,
  tipo: "evento",
  data: "2028-02-29",
  horario: "10:30",
  local: "Praça",
};
for (const input of [base, event, { ...base, tipo: "lugar" }]) {
  test(`envio válido: ${input.tipo}, espaços e campos ignorados`, () => {
    const result = validateParticipation({
      ...input,
      unknown: "ignore",
      ...(input.tipo !== "evento"
        ? { data: "invalid", horario: "invalid", local: "ignored" }
        : {}),
    });
    assert.equal(result.valid, true);
    assert.equal(result.values.responsavel, "Maria");
    assert.equal(result.values.contato, "maria@example.com");
    assert.equal(
      result.values.categoria,
      input.tipo === "negocio" ? "Serviços" : "",
    );
    assert.equal(
      result.values.data,
      input.tipo === "evento" ? "2028-02-29" : "",
    );
    assert.ok(!("unknown" in result.values));
  });
}
test("campos obrigatórios e tipos inválidos", () => {
  for (const field of [
    "tipo",
    "responsavel",
    "contato",
    "nome",
    "mensagem",
    "consentimento",
    "categoria",
  ])
    assert.ok(
      validateParticipation({ ...base, [field]: " " }).errors[field],
      field,
    );
  for (const field of ["data", "local"])
    assert.ok(
      validateParticipation({ ...event, [field]: "" }).errors[field],
      field,
    );
  for (const tipo of ["outro", null, 1, {}, "__proto__"])
    assert.ok(validateParticipation({ ...base, tipo }).errors.tipo);
});
test("limites aceitos e excedidos", () => {
  for (const [field, limit] of [
    ["responsavel", 120],
    ["contato", 150],
    ["nome", 180],
    ["mensagem", 3000],
    ["local", 180],
  ]) {
    assert.equal(
      validateParticipation({ ...event, [field]: "a".repeat(limit) }).valid,
      true,
      field,
    );
    assert.ok(
      validateParticipation({ ...event, [field]: "a".repeat(limit + 1) })
        .errors[field],
      field,
    );
  }
});
test("categoria, data, horário e consentimento", () => {
  assert.ok(
    validateParticipation({ ...base, categoria: "Inexistente" }).errors
      .categoria,
  );
  for (const data of [
    "2026-02-29",
    "2026-02-30",
    "2026-04-31",
    "2026-13-01",
    "01/02/2026",
    "2026-2-01",
    "0000-01-01",
    "invalid",
  ])
    assert.ok(validateParticipation({ ...event, data }).errors.data, data);
  for (const horario of ["24:00", "12:60", "1:30", "12:30:00", "abc"])
    assert.ok(
      validateParticipation({ ...event, horario }).errors.horario,
      horario,
    );
  assert.equal(validateParticipation({ ...event, horario: "" }).valid, true);
  for (const consentimento of [undefined, false, "false", "off", ""])
    assert.ok(
      validateParticipation({ ...base, consentimento }).errors.consentimento,
    );
});

test("Server Action: validação, indisponibilidade, armadilha, sucesso e falhas", async (t) => {
  const originalFetch = globalThis.fetch;
  const originalError = console.error;
  const originalUrl = process.env.PARTICIPATION_WEBHOOK_URL;
  const originalSecret = process.env.PARTICIPATION_WEBHOOK_SECRET;
  const logs = [];
  t.after(() => {
    globalThis.fetch = originalFetch;
    console.error = originalError;
    for (const [key, value] of [
      ["PARTICIPATION_WEBHOOK_URL", originalUrl],
      ["PARTICIPATION_WEBHOOK_SECRET", originalSecret],
    ]) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  });
  console.error = (...args) => logs.push(args.join(" "));
  const form = (values) => {
    const data = new FormData();
    for (const [key, value] of Object.entries(values)) data.set(key, value);
    return data;
  };
  let calls = 0;
  globalThis.fetch = async () => {
    calls++;
    throw new Error("Unexpected call");
  };
  delete process.env.PARTICIPATION_WEBHOOK_URL;
  delete process.env.PARTICIPATION_WEBHOOK_SECRET;
  assert.equal(
    (await submitParticipation(null, form(base))).status,
    "indisponivel",
  );
  assert.equal(
    (await submitParticipation(null, form({ website: "spam" }))).status,
    "sucesso",
  );
  assert.equal((await submitParticipation(null, form({}))).status, "invalido");
  assert.equal(calls, 0);
  process.env.PARTICIPATION_WEBHOOK_URL = "https://example.com/exec";
  process.env.PARTICIPATION_WEBHOOK_SECRET = "test-only-secret";
  globalThis.fetch = async (url, options) => {
    assert.equal(url, "https://example.com/exec");
    assert.equal(options.method, "POST");
    assert.equal(options.redirect, "follow");
    assert.equal(options.headers["Content-Type"], "application/json");
    assert.ok(options.signal instanceof AbortSignal);
    assert.deepEqual(JSON.parse(options.body), {
      secret: "test-only-secret",
      tipo: "negocio",
      responsavel: "Maria",
      contato: "maria@example.com",
      nome: "Meu negócio",
      categoria: "Serviços",
      data: "",
      horario: "",
      local: "",
      mensagem: "Uma contribuição.",
    });
    return Response.json({ ok: true });
  };
  const success = await submitParticipation(null, form(base));
  assert.equal(success.status, "sucesso");
  assert.equal(success.values, undefined);
  for (const response of [
    Response.json({ ok: false }),
    Response.json({ ok: "true" }),
    Response.json(null),
    new Response("not json"),
    Response.json({ ok: true }, { status: 500 }),
  ]) {
    globalThis.fetch = async () => response;
    const result = await submitParticipation(null, form(base));
    assert.equal(result.status, "erro");
    assert.equal(result.values.nome, base.nome);
  }
  for (const cause of [
    new Error("maria@example.com test-only-secret"),
    new DOMException("timeout", "TimeoutError"),
  ]) {
    globalThis.fetch = async () => {
      throw cause;
    };
    assert.equal((await submitParticipation(null, form(base))).status, "erro");
  }
  assert.ok(logs.length);
  assert.doesNotMatch(
    logs.join(" "),
    /maria@example|test-only-secret|Meu negócio/,
  );
});

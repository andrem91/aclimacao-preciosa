import { establishmentCategories } from "../types/content.ts";

export type ParticipationType = "negocio" | "evento" | "lugar";
export type ParticipationValues = {
  tipo: string;
  responsavel: string;
  contato: string;
  nome: string;
  categoria: string;
  data: string;
  horario: string;
  local: string;
  mensagem: string;
  consentimento: boolean;
};
export type ParticipationErrors = Partial<
  Record<keyof ParticipationValues, string>
>;
export type ParticipationState = {
  status: "sucesso" | "invalido" | "indisponivel" | "erro";
  errors?: ParticipationErrors;
  values?: ParticipationValues;
  revision: string;
} | null;

/** Pure validation shared by the action and domain tests. Only relevant fields survive. */
export function validateParticipation(input: Record<string, unknown>) {
  const text = (field: string) =>
    typeof input[field] === "string" ? input[field].trim() : "";
  const tipo = text("tipo");
  const values: ParticipationValues = {
    tipo,
    responsavel: text("responsavel"),
    contato: text("contato"),
    nome: text("nome"),
    mensagem: text("mensagem"),
    categoria: tipo === "negocio" ? text("categoria") : "",
    data: tipo === "evento" ? text("data") : "",
    horario: tipo === "evento" ? text("horario") : "",
    local: tipo === "evento" ? text("local") : "",
    consentimento: input.consentimento === "on" || input.consentimento === true,
  };
  const errors: ParticipationErrors = {};
  if (!["negocio", "evento", "lugar"].includes(tipo))
    errors.tipo = "Escolha o tipo de contribuição.";
  for (const [field, limit, message] of [
    ["responsavel", 120, "Informe seu nome."],
    ["contato", 150, "Informe seu e-mail ou WhatsApp."],
    ["nome", 180, "Informe o nome da contribuição."],
    ["mensagem", 3000, "Escreva uma descrição."],
    ...(tipo === "evento" ? [["local", 180, "Informe o local."]] : []),
  ] as [
    "responsavel" | "contato" | "nome" | "mensagem" | "local",
    number,
    string,
  ][]) {
    if (!values[field]) errors[field] = message;
    else if (values[field].length > limit)
      errors[field] = `Use até ${limit} caracteres.`;
  }
  if (
    tipo === "negocio" &&
    !establishmentCategories.some((category) => category === values.categoria)
  )
    errors.categoria = "Selecione uma categoria válida.";
  if (tipo === "evento") {
    const parsed = new Date(values.data + "T00:00:00Z");
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(values.data) ||
      values.data.startsWith("0000") ||
      !Number.isFinite(parsed.getTime()) ||
      parsed.toISOString().slice(0, 10) !== values.data
    )
      errors.data = "Informe uma data válida.";
    if (values.horario && !/^([01]\d|2[0-3]):[0-5]\d$/.test(values.horario))
      errors.horario = "Informe um horário válido.";
  }
  if (!values.consentimento)
    errors.consentimento = "Autorize o uso dos dados para enviar.";
  return { valid: Object.keys(errors).length === 0, values, errors };
}

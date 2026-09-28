"use server";

import {
  validateParticipation,
  type ParticipationState,
} from "../../lib/participation.ts";

export async function submitParticipation(
  _previous: ParticipationState,
  formData: FormData,
): Promise<ParticipationState> {
  const revision = crypto.randomUUID();
  if (formData.get("website")) return { status: "sucesso", revision };
  const { valid, values, errors } = validateParticipation(
    Object.fromEntries(formData),
  );
  if (!valid) return { status: "invalido", errors, values, revision };
  const url = process.env.PARTICIPATION_WEBHOOK_URL;
  const secret = process.env.PARTICIPATION_WEBHOOK_SECRET;
  if (!url || !secret) return { status: "indisponivel", values, revision };
  try {
    const {
      tipo,
      responsavel,
      contato,
      nome,
      categoria,
      data,
      horario,
      local,
      mensagem,
    } = values;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        secret,
        tipo,
        responsavel,
        contato,
        nome,
        categoria,
        data,
        horario,
        local,
        mensagem,
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) {
      console.error("Participation webhook: HTTP failure", response.status);
      return { status: "erro", values, revision };
    }
    const result: unknown = await response.json();
    if (
      !result ||
      typeof result !== "object" ||
      !("ok" in result) ||
      result.ok !== true
    ) {
      console.error("Participation webhook: unsuccessful response");
      return { status: "erro", values, revision };
    }
    return { status: "sucesso", revision };
  } catch (error) {
    // Never log the URL, secret, request payload or upstream response body.
    const reason =
      error instanceof Error &&
      ["TimeoutError", "AbortError", "SyntaxError"].includes(error.name)
        ? error.name
        : "network_error";
    console.error("Participation webhook failed:", reason);
    return { status: "erro", values, revision };
  }
}

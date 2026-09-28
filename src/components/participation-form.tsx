"use client";

import { useActionState, useEffect, useRef } from "react";
import Link from "next/link";
import { Store, CalendarDays, TreePine, ArrowRight } from "lucide-react";
import {
  buttonStyles,
  formControl,
  formLabel,
  formTextarea,
} from "@/components/styles";
import { establishmentCategories } from "@/types/content";
import { submitParticipation } from "@/app/participe/actions";
import type {
  ParticipationType,
  ParticipationValues,
} from "@/lib/participation";
import { ProjectContacts } from "./project-contacts";

const choices = [
  {
    id: "negocio",
    label: "Cadastre seu negócio",
    text: "Comércios e serviços que fazem o bairro acontecer.",
    icon: Store,
  },
  {
    id: "evento",
    label: "Divulgue um evento",
    text: "Encontros, oficinas e novas formas de viver o bairro.",
    icon: CalendarDays,
  },
  {
    id: "lugar",
    label: "Sugira um lugar ou história",
    text: "Um espaço especial ou uma memória para compartilhar.",
    icon: TreePine,
  },
] as const;
const messages = {
  sucesso:
    "Recebemos sua contribuição! A equipe do projeto vai conferir as informações e pode falar com você pelo contato informado.",
  invalido: "Confira os campos indicados antes de enviar.",
  indisponivel:
    "O envio está temporariamente indisponível. Tente de novo mais tarde.",
  erro: "Não foi possível enviar agora. Tente de novo em alguns minutos.",
};

export function ParticipationForm({
  initial = "negocio",
}: {
  initial?: ParticipationType;
}) {
  const [state, action, pending] = useActionState(
    submitParticipation,
    null,
    `/participe?tipo=${initial}`,
  );
  const result = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (state) result.current?.focus();
  }, [state]);
  const values = state?.values;
  const fieldProps = (name: keyof ParticipationValues) => ({
    id: name,
    name,
    defaultValue:
      typeof values?.[name] === "string" ? (values[name] as string) : "",
    "aria-invalid": state?.errors?.[name] ? (true as const) : undefined,
    "aria-describedby": state?.errors?.[name] ? `${name}-error` : undefined,
  });
  const error = (name: keyof ParticipationValues) =>
    state?.errors?.[name] ? (
      <span id={`${name}-error`} className="text-sm font-normal text-danger">
        {state.errors[name]}
      </span>
    ) : null;
  return (
    <>
      <nav
        className="mt-1 mb-7 grid grid-cols-1 gap-3 md:mb-10 md:grid-cols-3 md:gap-5"
        aria-label="Tipo de contribuição"
      >
        {choices.map((choice) => (
          <Link
            key={choice.id}
            href={`/participe?tipo=${choice.id}#contato`}
            aria-current={initial === choice.id ? "page" : undefined}
            className="grid min-w-0 grid-cols-[28px_1fr] gap-x-4 gap-y-1 rounded border border-line p-5 text-emerald aria-[current=page]:border-emerald aria-[current=page]:bg-emerald-soft md:flex md:flex-col md:items-start md:p-6"
          >
            <choice.icon size={25} aria-hidden="true" />
            <h2 className="text-xl md:mt-4 md:mb-2 md:text-2xl">
              {choice.label}
            </h2>
            <p className="col-start-2 flex-1 text-sm text-muted md:text-base">
              {choice.text}
            </p>
            <span className="col-start-2 mt-3 flex items-center gap-3 text-xs font-semibold md:mt-5">
              {initial === choice.id ? "Selecionado" : "Selecionar"}
              <ArrowRight size={16} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </nav>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-14">
        <section
          className="min-w-0 scroll-mt-28 rounded border border-line bg-surface p-5 md:p-9"
          id="contato"
        >
          <h2 className="mb-7 text-3xl">
            {choices.find((choice) => choice.id === initial)?.label}
          </h2>
          <form
            action={action}
            key={state?.revision ?? initial}
            className="flex flex-col gap-5"
            aria-busy={pending}
          >
            <input type="hidden" name="tipo" value={initial} />
            {error("tipo")}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <label className={formLabel}>
                Seu nome
                <input
                  {...fieldProps("responsavel")}
                  className={formControl}
                  autoComplete="name"
                  required
                  maxLength={120}
                />
                {error("responsavel")}
              </label>
              <label className={formLabel}>
                E-mail ou WhatsApp
                <input
                  {...fieldProps("contato")}
                  className={formControl}
                  required
                  maxLength={150}
                  placeholder="Como podemos falar com você?"
                />
                {error("contato")}
              </label>
            </div>
            <label className={formLabel}>
              {initial === "negocio"
                ? "Nome do negócio"
                : initial === "evento"
                  ? "Nome do evento"
                  : "Nome do lugar ou título da história"}
              <input
                {...fieldProps("nome")}
                className={formControl}
                required
                maxLength={180}
              />
              {error("nome")}
            </label>
            {initial === "negocio" && (
              <label className={formLabel}>
                Categoria
                <select
                  {...fieldProps("categoria")}
                  className={formControl}
                  required
                >
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>
                  {establishmentCategories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
                {error("categoria")}
              </label>
            )}
            {initial === "evento" && (
              <>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <label className={formLabel}>
                    Data do evento
                    <input
                      {...fieldProps("data")}
                      className={formControl}
                      type="date"
                      required
                    />
                    {error("data")}
                  </label>
                  <label className={formLabel}>
                    Horário de início
                    <input
                      {...fieldProps("horario")}
                      className={formControl}
                      type="time"
                    />
                    {error("horario")}
                  </label>
                </div>
                <label className={formLabel}>
                  Local
                  <input
                    {...fieldProps("local")}
                    className={formControl}
                    required
                    maxLength={180}
                  />
                  {error("local")}
                </label>
              </>
            )}
            <label className={formLabel}>
              {initial === "negocio"
                ? "Conte um pouco sobre o negócio"
                : "Descrição"}
              <textarea
                {...fieldProps("mensagem")}
                className={formTextarea}
                rows={5}
                required
                maxLength={3000}
                placeholder="O que faz essa descoberta ser especial?"
              />
              {error("mensagem")}
            </label>
            <div>
              <label
                className="flex items-start gap-3 text-sm"
                htmlFor="consentimento"
              >
                <input
                  id="consentimento"
                  name="consentimento"
                  type="checkbox"
                  required
                  defaultChecked={values?.consentimento ?? false}
                  className="mt-1 size-5 shrink-0 accent-emerald"
                  aria-invalid={state?.errors?.consentimento ? true : undefined}
                  aria-describedby={`consentimento-help${state?.errors?.consentimento ? " consentimento-error" : ""}`}
                />
                Autorizo o uso destes dados para que a equipe do Aclimação
                Preciosa analise minha contribuição e entre em contato sobre
                ela.
              </label>
              <p id="consentimento-help" className="mt-2 text-xs text-muted">
                Seus dados ficam acessíveis apenas à equipe do projeto e não são
                publicados sem sua autorização.
              </p>
              {error("consentimento")}
            </div>
            <button
              className={`${buttonStyles()} w-full self-start disabled:opacity-60 md:w-auto`}
              type="submit"
              disabled={pending}
            >
              {pending ? "Enviando…" : "Enviar contribuição"}
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          </form>
          <div
            ref={result}
            tabIndex={-1}
            role="status"
            className={
              state
                ? "mt-5 rounded bg-emerald-soft p-5 text-emerald-deep"
                : "sr-only"
            }
          >
            {state && <p>{messages[state.status]}</p>}
            {(state?.status === "indisponivel" || state?.status === "erro") && (
              <ProjectContacts />
            )}
          </div>
        </section>
        <aside className="py-3 lg:pt-6">
          <h2 className="mb-6 text-3xl">Como funciona</h2>
          <ol className="list-decimal space-y-4 pl-5 text-muted">
            <li>Você envia sua contribuição.</li>
            <li>A equipe do projeto confere as informações.</li>
            <li>O conteúdo é publicado no guia.</li>
          </ol>
          <ProjectContacts />
        </aside>
      </div>
    </>
  );
}

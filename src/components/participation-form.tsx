"use client";
import {
  eyebrow,
  buttonStyles,
  formControl,
  formLabel,
  formTextarea,
} from "@/components/styles";

import { useRef, useState } from "react";
import {
  Store,
  CalendarDays,
  TreePine,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { establishmentCategories } from "@/types/content";
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
export function ParticipationForm({
  initial = "negocio",
}: {
  initial?: "negocio" | "evento" | "lugar";
}) {
  const [type, setType] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const result = useRef<HTMLDivElement>(null);
  return (
    <>
      <div
        className="mt-[5px] mb-[27px] grid grid-cols-1 gap-3 sm:mb-10 sm:grid-cols-3 sm:gap-5"
        role="group"
        aria-label="Tipo de contribuição"
      >
        {choices.map((c) => (
          <button
            className="grid grid-cols-[28px_1fr] gap-x-[17px] gap-y-1 rounded border border-line bg-transparent p-[18px] text-left text-emerald aria-pressed:border-emerald aria-pressed:bg-[#e7ecdf] sm:flex sm:flex-col sm:items-start sm:gap-0 sm:p-[25px]"
            type="button"
            key={c.id}
            aria-pressed={type === c.id}
            onClick={() => {
              setType(c.id);
              setSubmitted(false);
            }}
          >
            <c.icon size={25} />
            <h2 className="text-[21px] sm:mt-[17px] sm:mb-2.5 sm:text-[23px]">
              {c.label}
            </h2>
            <p className="col-start-2 flex-1 text-sm text-muted sm:text-base">
              {c.text}
            </p>
            <span className="col-start-2 mt-2.5 flex items-center gap-[13px] text-xs font-[650] sm:mt-[19px]">
              {type === c.id ? "Selecionado" : "Selecionar"}{" "}
              <ArrowRight size={16} />
            </span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-[minmax(0,1fr)_250px] lg:grid-cols-[minmax(0,1fr)_300px] lg:gap-[55px]">
        <section
          className="scroll-mt-[115px] rounded border border-line bg-[#fffdf8] px-[18px] py-[23px] sm:p-[35px]"
          id="contato"
        >
          <p className={`${eyebrow} text-emerald text-xs tracking-[0.16em]`}>
            Sua contribuição
          </p>
          <h2 className="mt-[9px] text-[26px] sm:text-[29px]">
            {choices.find((c) => c.id === type)?.label}
          </h2>
          <p className="mt-[23px] mb-7 border-l-2 border-[#849877] bg-[#f0f1e8] px-[17px] py-3.5 text-base text-[#54634f]">
            O envio ainda não está disponível. Os dados preenchidos não serão
            enviados nem armazenados.
          </p>
          <form
            className="flex flex-col gap-[21px]"
            key={type}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              requestAnimationFrame(() => result.current?.focus());
            }}
          >
            <div className="grid grid-cols-1 gap-[21px] sm:grid-cols-2 sm:gap-[18px]">
              <label className={formLabel}>
                Seu nome
                <input
                  className={formControl}
                  name="responsavel"
                  autoComplete="name"
                  required
                  maxLength={120}
                />
              </label>
              <label className={formLabel}>
                E-mail ou WhatsApp
                <input
                  className={formControl}
                  name="contato"
                  required
                  maxLength={150}
                  placeholder="Como podemos falar com você?"
                />
              </label>
            </div>
            <label className={formLabel}>
              {type === "negocio"
                ? "Nome do negócio"
                : type === "evento"
                  ? "Nome do evento"
                  : "Nome do lugar ou título da história"}
              <input
                className={formControl}
                name="nome"
                required
                maxLength={180}
              />
            </label>
            {type === "negocio" && (
              <label className={formLabel}>
                Categoria
                <select
                  className={formControl}
                  name="categoria"
                  required
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>
                  {establishmentCategories.map((x) => (
                    <option key={x}>{x}</option>
                  ))}
                </select>
              </label>
            )}
            {type === "evento" && (
              <>
                <div className="grid grid-cols-1 gap-[21px] sm:grid-cols-2 sm:gap-[18px]">
                  <label className="flex min-w-0 flex-col gap-2 text-sm font-semibold">
                    Data do evento
                    <input
                      className={formControl}
                      name="data"
                      type="date"
                      required
                    />
                  </label>
                  <label className="flex min-w-0 flex-col gap-2 text-sm font-semibold">
                    Horário de início
                    <input
                      className="min-h-[45px] w-full rounded-[3px] border border-[#d9dfd2] bg-[#faf9f4] p-3 text-base font-normal text-ink placeholder:text-sm placeholder:text-[#7a8078]"
                      name="horario"
                      type="time"
                    />
                  </label>
                </div>
                <label className={formLabel}>
                  Local
                  <input
                    className={formControl}
                    name="local"
                    required
                    maxLength={180}
                  />
                </label>
              </>
            )}
            <label className={formLabel}>
              {type === "negocio"
                ? "Conte um pouco sobre o negócio"
                : "Descrição"}
              <textarea
                className={formTextarea}
                name="mensagem"
                rows={5}
                required
                maxLength={3000}
                placeholder="O que faz essa descoberta ser especial?"
              />
            </label>
            <button
              className={`${buttonStyles()} w-full self-start sm:w-auto`}
              type="submit"
            >
              Testar formulário <ArrowRight size={17} />
            </button>
            <div
              ref={result}
              tabIndex={-1}
              role="status"
              className={
                submitted
                  ? "flex items-start gap-3 rounded bg-[#e7ecdf] p-[18px] text-emerald"
                  : "sr-only"
              }
            >
              {submitted && (
                <>
                  <CheckCircle2 size={21} />
                  <span>
                    Preenchimento validado! Esta é uma simulação: nenhum dado
                    foi enviado. Suas informações continuam nos campos para
                    revisão.
                  </span>
                </>
              )}
            </div>
          </form>
        </section>
        <aside
          className="scroll-mt-[115px] py-2.5 sm:pt-[25px] sm:pb-0"
          id="sobre"
        >
          <p className={`${eyebrow} text-emerald text-xs tracking-[0.16em]`}>
            Sobre o projeto
          </p>
          <h2 className="mt-[15px] mb-[23px] text-[33px]">
            Um bairro.
            <br />
            Muitas descobertas.
          </h2>
          <p className="mb-[18px] text-base text-muted">
            O Aclimação Preciosa nasce para aproximar moradores, visitantes e
            negócios locais.
          </p>
          <p className="mb-[18px] text-base text-muted">
            Queremos reunir lugares para conhecer, atividades para experimentar
            e histórias que ajudam a olhar para o bairro com mais atenção.
          </p>
          <div className="my-8 rounded-[3px] bg-[#1f3a93] px-5 py-[15px] text-[27px] tracking-[0.07em] text-white outline outline-[#ffffff9c] -outline-offset-[6px]">
            <span className="block text-[11px] tracking-[0.16em]">
              SÃO PAULO
            </span>
            ACLIMAÇÃO
            <small className="block text-xs tracking-normal">
              Lugares, pessoas e encontros.
            </small>
          </div>
          <p className="mb-[18px] text-sm text-muted">
            Estamos preparando a primeira versão. O canal oficial para receber
            contribuições será informado aqui quando estiver disponível.
          </p>
        </aside>
      </div>
    </>
  );
}

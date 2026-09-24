"use client";
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
        className="participation-options"
        role="group"
        aria-label="Tipo de contribuição"
      >
        {choices.map((c) => (
          <button
            type="button"
            key={c.id}
            aria-pressed={type === c.id}
            onClick={() => {
              setType(c.id);
              setSubmitted(false);
            }}
          >
            <c.icon size={25} />
            <h2>{c.label}</h2>
            <p>{c.text}</p>
            <span>
              {type === c.id ? "Selecionado" : "Selecionar"}{" "}
              <ArrowRight size={16} />
            </span>
          </button>
        ))}
      </div>
      <div className="participation-layout">
        <section className="form-panel" id="contato">
          <p className="eyebrow">Sua contribuição</p>
          <h2>{choices.find((c) => c.id === type)?.label}</h2>
          <p className="form-notice">
            O envio ainda não está disponível. Os dados preenchidos não serão
            enviados nem armazenados.
          </p>
          <form
            key={type}
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
              requestAnimationFrame(() => result.current?.focus());
            }}
          >
            <div className="form-two">
              <label>
                Seu nome
                <input
                  name="responsavel"
                  autoComplete="name"
                  required
                  maxLength={120}
                />
              </label>
              <label>
                E-mail ou WhatsApp
                <input
                  name="contato"
                  required
                  maxLength={150}
                  placeholder="Como podemos falar com você?"
                />
              </label>
            </div>
            <label>
              {type === "negocio"
                ? "Nome do negócio"
                : type === "evento"
                  ? "Nome do evento"
                  : "Nome do lugar ou título da história"}
              <input name="nome" required maxLength={180} />
            </label>
            {type === "negocio" && (
              <label>
                Categoria
                <select name="categoria" required defaultValue="">
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
                <div className="form-two">
                  <label>
                    Data do evento
                    <input name="data" type="date" required />
                  </label>
                  <label>
                    Horário de início
                    <input name="horario" type="time" />
                  </label>
                </div>
                <label>
                  Local
                  <input name="local" required maxLength={180} />
                </label>
              </>
            )}
            <label>
              {type === "negocio"
                ? "Conte um pouco sobre o negócio"
                : "Descrição"}
              <textarea
                name="mensagem"
                rows={5}
                required
                maxLength={3000}
                placeholder="O que faz essa descoberta ser especial?"
              />
            </label>
            <button className="button" type="submit">
              Testar formulário <ArrowRight size={17} />
            </button>
            <div
              ref={result}
              tabIndex={-1}
              role="status"
              className={submitted ? "form-success" : "sr-only"}
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
        <aside className="participation-aside" id="sobre">
          <p className="eyebrow">Sobre o projeto</p>
          <h2>
            Um bairro.
            <br />
            Muitas descobertas.
          </h2>
          <p>
            O Aclimação Preciosa nasce para aproximar moradores, visitantes e
            negócios locais.
          </p>
          <p>
            Queremos reunir lugares para conhecer, atividades para experimentar
            e histórias que ajudam a olhar para o bairro com mais atenção.
          </p>
          <div className="street-sign">
            <span>SÃO PAULO</span>ACLIMAÇÃO
            <small>Lugares, pessoas e encontros.</small>
          </div>
          <p className="small-note">
            Estamos preparando a primeira versão. O canal oficial para receber
            contribuições será informado aqui quando estiver disponível.
          </p>
        </aside>
      </div>
    </>
  );
}

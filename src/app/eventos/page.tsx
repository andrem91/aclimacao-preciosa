import Link from "next/link";
import { connection } from "next/server";
import { getEvents } from "@/lib/content";
import { filterEvents } from "@/lib/events";
import { PageIntro, EventCard } from "@/components/ui";
import { EventRefresh } from "@/components/event-refresh";
export const metadata = {
  title: "Eventos",
  description:
    "Encontre os próximos encontros, oficinas e eventos da Aclimação.",
};
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await connection();
  const params = await searchParams;
  const value = (key: string) =>
    typeof params[key] === "string" ? (params[key] as string) : "";
  const periods = [
    { value: "ativos", label: "Próximos e em andamento" },
    { value: "proximos", label: "Próximos" },
    { value: "em-andamento", label: "Em andamento" },
    { value: "encerrados", label: "Encerrados" },
    { value: "todos", label: "Todos os eventos" },
  ];
  const filters = {
    q: value("q"),
    category: value("categoria"),
    period: periods.some((p) => p.value === value("periodo"))
      ? value("periodo")
      : "ativos",
  };
  const now = new Date();
  const events = getEvents();
  const results = filterEvents(events, filters, now);
  const returnTo =
    "/eventos?" +
    new URLSearchParams({
      q: filters.q,
      categoria: filters.category,
      periodo: filters.period,
    }).toString();
  return (
    <div className="container listing-page">
      <EventRefresh />
      <PageIntro
        eyebrow="Encontre seu próximo programa"
        title="Eventos na Aclimação"
        description="Música, cultura, oficinas e encontros para viver o bairro. Escolha seu próximo programa."
      />
      <form
        action="/eventos"
        method="get"
        className="event-filters"
        key={returnTo}
      >
        <label>
          Buscar evento
          <input
            name="q"
            type="search"
            defaultValue={filters.q}
            placeholder="Nome, assunto ou local"
            maxLength={150}
          />
        </label>
        <label>
          Categoria
          <select name="categoria" defaultValue={filters.category}>
            <option value="">Todas as categorias</option>
            {[...new Set(events.map((x) => x.category))].sort().map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Período
          <select name="periodo" defaultValue={filters.period}>
            {periods.map((p) => (
              <option key={p.value} value={p.value}>
                {p.label}
              </option>
            ))}
          </select>
        </label>
        <button className="button" type="submit">
          Filtrar eventos
        </button>
      </form>
      <div className="event-results">
        <h2>{periods.find((p) => p.value === filters.period)?.label}</h2>
        <span role="status">
          {results.length}{" "}
          {results.length === 1 ? "evento encontrado" : "eventos encontrados"}
        </span>
        <Link href="/eventos">Limpar filtros</Link>
      </div>
      {results.length ? (
        <div className="card-grid">
          {results.map((item, i) => (
            <EventCard
              item={item}
              key={item.id}
              now={now.toISOString()}
              eager={i < 3}
              returnTo={returnTo}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nenhum evento por aqui ainda</h2>
          <p>
            Experimente outra categoria, outro período ou uma busca diferente.
          </p>
          <Link href="/eventos" className="text-link">
            Ver próximos eventos
          </Link>
        </div>
      )}
      <div className="event-submit">
        <p>Vai organizar um encontro no bairro?</p>
        <Link href="/participe?tipo=evento" className="text-link">
          Divulgue seu evento
        </Link>
      </div>
    </div>
  );
}

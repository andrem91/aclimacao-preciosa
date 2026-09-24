import Link from "next/link";
import { getPlaces } from "@/lib/content";
import { PageIntro, PlaceCard } from "@/components/ui";
export const metadata = {
  title: "Lugares para conhecer",
  description: "Descubra espaços interessantes da Aclimação.",
};
const normalize = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const q = typeof params.q === "string" ? params.q.slice(0, 150) : "";
  const places = getPlaces();
  const categories = [...new Set(places.map((x) => x.category))].sort();
  const category =
    typeof params.categoria === "string" &&
    categories.some((x) => x === params.categoria)
      ? params.categoria
      : "";
  const results = places.filter(
    (x) =>
      (!category || x.category === category) &&
      normalize(`${x.name} ${x.shortDescription} ${x.description}`).includes(
        normalize(q.trim()),
      ),
  );
  const returnTo =
    "/lugares?" + new URLSearchParams({ q, categoria: category });
  return (
    <div className="container listing-page">
      <PageIntro
        eyebrow="Pelo caminho"
        title="Lugares para conhecer"
        description="Entre árvores, livros e arquitetura, encontre seu próximo passeio pelo bairro."
      />
      <form
        action="/lugares"
        method="get"
        className="event-filters place-filters"
        key={returnTo}
      >
        <label>
          Buscar lugar
          <input
            name="q"
            type="search"
            placeholder="Nome ou assunto"
            defaultValue={q}
            maxLength={150}
          />
        </label>
        <label>
          Categoria
          <select name="categoria" defaultValue={category}>
            <option value="">Todas as categorias</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <button className="button" type="submit">
          Filtrar lugares
        </button>
      </form>
      <div className="event-results">
        <h2>{category || "Explore os lugares"}</h2>
        <span role="status">
          {results.length}{" "}
          {results.length === 1 ? "lugar encontrado" : "lugares encontrados"}
        </span>
        {(q || category) && <Link href="/lugares">Limpar filtros</Link>}
      </div>
      {results.length ? (
        <div className="card-grid">
          {results.map((item, index) => (
            <PlaceCard
              key={item.id}
              item={item}
              eager={index < 3}
              returnTo={returnTo}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>Nenhum lugar encontrado</h2>
          <p>Experimente outro nome, assunto ou categoria.</p>
          <Link href="/lugares" className="text-link">
            Ver todos os lugares
          </Link>
        </div>
      )}
    </div>
  );
}

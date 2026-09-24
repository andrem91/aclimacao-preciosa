"use client";
import { useState } from "react";
import { establishmentCategories, type Establishment } from "@/types/content";
import { EstablishmentCard } from "./ui";
function Filters({
  values,
  selected,
  onChange,
}: {
  values: readonly string[];
  selected: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="filters" role="group" aria-label="Filtrar conteúdos">
      {values.map((x) => (
        <button
          type="button"
          key={x}
          aria-pressed={selected === x}
          onClick={() => onChange(x)}
        >
          {x}
        </button>
      ))}
    </div>
  );
}
export function EstablishmentGrid({ items }: { items: Establishment[] }) {
  const [category, setCategory] = useState("Todos");
  const filtered = items.filter(
    (x) => category === "Todos" || x.category === category,
  );
  return (
    <>
      <Filters
        values={["Todos", ...establishmentCategories]}
        selected={category}
        onChange={setCategory}
      />
      <div aria-live="polite">
        <h2 className="sr-only">Negócios nesta categoria</h2>
        <div className="card-grid">
          {filtered.map((item, index) => (
            <EstablishmentCard key={item.id} item={item} eager={index < 3} />
          ))}
        </div>
        {!filtered.length && (
          <div className="empty-state">
            <h2>Novas descobertas a caminho</h2>
            <p>Ainda não há negócios nesta categoria.</p>
            <button className="text-link" onClick={() => setCategory("Todos")}>
              Ver todos os negócios
            </button>
          </div>
        )}
      </div>
    </>
  );
}

"use client";
import { cardGrid, emptyState, textLink } from "@/components/styles";

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
    <div
      className="-mx-[5px] mb-[9px] flex max-w-full gap-[9px] overflow-auto px-[5px] pt-2 pb-[23px] max-sm:-mr-5 max-sm:pr-5"
      role="group"
      aria-label="Filtrar conteúdos"
    >
      {values.map((x) => (
        <button
          className="min-h-11 shrink-0 rounded-[3px] border border-line bg-transparent px-[18px] py-2 text-sm hover:border-emerald aria-pressed:border-emerald aria-pressed:bg-emerald aria-pressed:text-white"
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
        <div
          className={`${cardGrid} gap-y-[42px] sm:gap-y-[42px] lg:gap-y-[42px]`}
        >
          {filtered.map((item, index) => (
            <EstablishmentCard key={item.id} item={item} eager={index < 3} />
          ))}
        </div>
        {!filtered.length && (
          <div className={emptyState}>
            <h2>Novas descobertas a caminho</h2>
            <p>Ainda não há negócios nesta categoria.</p>
            <button className={textLink} onClick={() => setCategory("Todos")}>
              Ver todos os negócios
            </button>
          </div>
        )}
      </div>
    </>
  );
}

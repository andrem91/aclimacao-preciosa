import {
  pageContainer,
  buttonStyles,
  cardGrid,
  categoryTag,
  facetedLarge,
  facetedSmall,
  textLink,
} from "@/components/styles";
import { connection } from "next/server";
import { eventState } from "@/lib/events";
import { EventRefresh } from "@/components/event-refresh";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import {
  getFeaturedEstablishments,
  getFeaturedPlaces,
  getEvents,
} from "@/lib/content";
import {
  SectionHeader,
  EstablishmentCard,
  EventCard,
  JoinSection,
} from "@/components/ui";
import { Placa } from "@/components/placa";

export default async function Home() {
  await connection();
  const now = new Date();
  const places = getFeaturedPlaces();
  const businesses = getFeaturedEstablishments();
  const events = getEvents()
    .filter((item) => ["upcoming", "ongoing"].includes(eventState(item, now)))
    .sort(
      (a, b) =>
        Number(b.featured) - Number(a.featured) ||
        // Current editorial campaign takes priority among featured events on the Home only.
        Number(b.slug === "natal-aclimacao-preciosa") -
          Number(a.slug === "natal-aclimacao-preciosa"),
    )
    .slice(0, 3);
  return (
    <>
      <EventRefresh />
      <section
        className={`${pageContainer} grid items-center gap-10 py-10 lg:grid-cols-2 lg:gap-12 lg:py-16`}
      >
        <div className="min-w-0">
          <h1 className="max-w-[15ch] text-4xl leading-tight md:text-5xl xl:text-6xl">
            O guia do bairro da Aclimação
          </h1>
          <p className="mt-6 max-w-[46ch] text-lg text-muted">
            Descubra negócios, eventos e lugares da Aclimação, reunidos por quem
            vive e trabalha aqui.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className={buttonStyles()} href="/negocios">
              Explorar os negócios
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Link className={buttonStyles("outline")} href="/eventos">
              Ver a agenda
            </Link>
          </div>
        </div>
        <figure className="min-w-0">
          <div className={`${facetedLarge} relative aspect-[4/3] bg-wash`}>
            <Image
              src={places[0].coverImage.src}
              alt="Imagem ilustrativa de um lago cercado por árvores, referência para o Parque da Aclimação"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 50vw, 92vw"
            />
            <div className="absolute inset-x-5 bottom-5">
              <Placa size="large">Bairro da Aclimação</Placa>
            </div>
          </div>
          <figcaption className="mt-2 text-right text-xs text-muted">
            Imagem ilustrativa
          </figcaption>
        </figure>
      </section>
      <section
        id="sobre"
        className={`${pageContainer} grid scroll-mt-28 gap-6 border-y border-line py-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16 lg:py-14`}
      >
        <h2 className="max-w-[19ch]">Por que o Aclimação Preciosa existe</h2>
        <div className="space-y-4 text-muted">
          <p>
            Muita gente atravessa a Aclimação sem parar. O Aclimação Preciosa
            nasceu de moradores e comerciantes que querem mudar isso: fazer do
            bairro um lugar de encontro, e não só de passagem.
          </p>
          <p>
            Aqui você encontra os negócios locais, a agenda de eventos e os
            lugares que contam a história do bairro. O nome vem das ruas
            batizadas com pedras preciosas, como Topázio, Safira, Rubi e
            Esmeralda.
          </p>
          <Link className={textLink} href="/participe">
            Quero participar
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <section
        className={`py-12 md:py-20 ${pageContainer}`}
        id="estabelecimentos"
      >
        <SectionHeader
          title="Conheça negócios da Aclimação"
          href="/negocios"
          link="Ver todos os negócios"
        />
        <div className={cardGrid}>
          {businesses.map((item) => (
            <EstablishmentCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      <section className="border-y border-line bg-wash py-12 md:py-20">
        <div className={pageContainer}>
          <SectionHeader
            title="O que está acontecendo"
            href="/eventos"
            link="Ver todos os eventos"
          />
          <div className={cardGrid}>
            {events.map((item, index) => (
              <EventCard
                key={item.id}
                item={item}
                now={now.toISOString()}
                featured={index === 0 && item.featured}
              />
            ))}
            {!events.length && (
              <p>Novos encontros a caminho. Confira a agenda de eventos.</p>
            )}
          </div>
        </div>
      </section>
      <section className={`py-12 md:py-20 ${pageContainer}`}>
        <SectionHeader
          title="Lugares para conhecer"
          href="/lugares"
          link="Explorar lugares"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {places.map((place, index) => (
            <Link
              key={place.id}
              href={"/lugares/" + place.slug}
              className={`group relative min-w-0 ${facetedSmall} overflow-hidden bg-emerald-ink text-white ${index === 0 ? "min-h-96 md:row-span-2" : "min-h-80"}`}
            >
              <Image
                src={place.coverImage.src}
                alt={place.coverImage.alt}
                fill
                sizes="(min-width: 768px) 50vw, 92vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-ink via-emerald-ink/60 to-transparent" />
              <div className="absolute right-12 bottom-6 left-6">
                <p className={categoryTag}>{place.category}</p>
                <h3 className="text-3xl">{place.name}</h3>
                <p className="mt-3 max-w-[38ch] text-sm text-paper">
                  {place.shortDescription}
                </p>
              </div>
              <ArrowUpRight
                className="absolute right-5 bottom-7"
                size={25}
                aria-hidden="true"
              />
            </Link>
          ))}
        </div>
      </section>
      <JoinSection />
    </>
  );
}

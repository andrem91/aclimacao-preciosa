import { connection } from "next/server";
import { eventState } from "@/lib/events";
import { EventRefresh } from "@/components/event-refresh";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
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
export default async function Home() {
  await connection();
  const now = new Date();
  const places = getFeaturedPlaces();
  const businesses = getFeaturedEstablishments();
  const events = getEvents()
    .filter((x) => ["upcoming", "ongoing"].includes(eventState(x, now)))
    .slice(0, 3);
  return (
    <>
      <EventRefresh />
      <section className="hero">
        <Image
          src={places[0].coverImage.src}
          alt="Imagem ilustrativa de um lago cercado por árvores, referência para o Parque da Aclimação"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="hero-shade" />
        <div className="container hero-content">
          <p className="eyebrow">
            <span className="tiny-diamond" /> UM GUIA PARA VIVER O BAIRRO
          </p>
          <h1>
            Descubra a Aclimação <br />
            de um <em>novo jeito.</em>
          </h1>
          <p>
            Lugares, eventos e negócios
            <br className="desktop-break" /> que fazem o bairro ser especial.
          </p>
          <Link className="button button-cream" href="#estabelecimentos">
            Explorar a Aclimação <ArrowDown size={17} />
          </Link>
        </div>
        <div className="container hero-caption">
          <span>ACLIMAÇÃO, SÃO PAULO</span>
          <span>Um olhar de perto. Uma nova descoberta.</span>
          <span>Imagem ilustrativa</span>
        </div>
      </section>
      <section className="section container" id="estabelecimentos">
        <SectionHeader
          eyebrow="Da porta ao lado"
          title="Conheça negócios da Aclimação"
          href="/negocios"
          link="Ver todos os negócios"
        />
        <div className="card-grid">
          {businesses.map((item) => (
            <EstablishmentCard key={item.id} item={item} />
          ))}
        </div>
      </section>
      <section className="section agenda-section">
        <div className="container">
          <SectionHeader
            eyebrow="Encontros & descobertas"
            title="O que está acontecendo"
            href="/eventos"
            link="Ver todos os eventos"
          />
          <div className="card-grid">
            {events.map((item) => (
              <EventCard key={item.id} item={item} now={now.toISOString()} />
            ))}
            {!events.length && (
              <p>Novos encontros a caminho. Confira a agenda de eventos.</p>
            )}
          </div>
        </div>
      </section>
      <section className="section container">
        <SectionHeader
          eyebrow="Um convite para sair"
          title="Lugares para conhecer"
          href="/lugares"
          link="Explorar lugares"
        />
        <div className="places-editorial">
          {places.map((p, i) => (
            <Link
              key={p.id}
              href={"/lugares/" + p.slug}
              className={"place-feature place-feature-" + i}
            >
              <Image
                src={p.coverImage.src}
                alt={p.coverImage.alt}
                fill
                sizes="(max-width: 700px) 92vw, 55vw"
              />
              <div className="place-shade" />
              <div className="place-feature-copy">
                <p className="eyebrow">{p.category}</p>
                <h3>{p.name}</h3>
                <p>{p.shortDescription}</p>
              </div>
              <ArrowUpRight className="place-feature-arrow" size={25} />
            </Link>
          ))}
        </div>
      </section>
      <JoinSection />
    </>
  );
}

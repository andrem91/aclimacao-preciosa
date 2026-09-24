import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin, CalendarDays } from "lucide-react";
import type { BaseContent, Establishment, Event, Place } from "@/types/content";

import {
  eventDateLabel,
  sessionHighlight,
  eventState,
  eventStateLabels,
} from "@/lib/events";
import { BusinessMedia } from "./business-media";
export function SectionHeader({
  eyebrow,
  title,
  href,
  link,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {href && (
        <Link href={href} className="text-link">
          {link}
          <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="intro-copy">{description}</p>
    </div>
  );
}
function Card({
  item,
  title,
  href,
  category,
  meta,
  location,
  eager = false,
  practical,
}: {
  item: BaseContent;
  title: string;
  href: string;
  category: string;
  meta?: string;
  location?: string;
  eager?: boolean;
  practical?: string;
}) {
  return (
    <Link href={href} className="content-card group">
      <div className="card-image">
        <Image
          src={item.coverImage.src}
          alt={item.coverImage.alt}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 700px) 92vw, (max-width: 1000px) 45vw, 30vw"
        />
        <span className="card-arrow">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="card-body">
        <p className="eyebrow card-category">{category}</p>
        <h3>{title}</h3>
        <p className="card-description">{item.shortDescription}</p>
        {practical && <p className="place-card-practical">{practical}</p>}
        {meta && (
          <p className="card-meta">
            <CalendarDays size={14} />
            {meta}
          </p>
        )}
        {location && (
          <p className="card-meta">
            <MapPin size={14} />
            {location}
          </p>
        )}
      </div>
    </Link>
  );
}
export function EstablishmentCard({
  item,
  eager,
}: {
  item: Establishment;
  eager?: boolean;
}) {
  return (
    <Link
      href={"/negocios/" + item.slug}
      className="content-card business-card"
    >
      <div className="business-card-top">
        <BusinessMedia item={item} eager={eager} />
      </div>
      <div className="card-body">
        <p className="eyebrow card-category">{item.category}</p>
        <h3>{item.name}</h3>
        <p className="card-description">{item.shortDescription}</p>
      </div>
    </Link>
  );
}
export function EventCard({
  item,
  eager,
  now,
  returnTo,
}: {
  item: Event;
  eager?: boolean;
  now: string;
  returnTo?: string;
}) {
  const state = eventState(item, new Date(now));
  const href = `/eventos/${item.slug}${returnTo ? `?voltar=${encodeURIComponent(returnTo)}` : ""}`;
  return (
    <Link href={href} className="content-card event-card">
      <div
        className={`card-image event-image ${item.imageFit === "contain" ? "event-poster" : ""}`}
      >
        {item.coverImage ? (
          <Image
            src={item.coverImage.src}
            alt={item.coverImage.alt}
            fill
            sizes="(max-width: 700px) 92vw, (max-width: 1000px) 45vw, 30vw"
            loading={eager ? "eager" : "lazy"}
          />
        ) : (
          <CalendarDays size={48} aria-hidden="true" />
        )}
      </div>
      <div className="card-body">
        <p className="eyebrow card-category">{item.category}</p>
        {state !== "upcoming" && (
          <span className={`event-state state-${state}`}>
            {eventStateLabels[state]}
          </span>
        )}
        <h3>{item.title}</h3>
        <p className="card-description">{item.subtitle}</p>
        <div className="event-card-facts">
          <p className="event-date-summary">
            <CalendarDays size={16} aria-hidden="true" />
            <span>{eventDateLabel(item)}</span>
          </p>
          {sessionHighlight(item, new Date(now)) && (
            <p>{sessionHighlight(item, new Date(now))}</p>
          )}
          {item.locationName && (
            <p>
              <MapPin size={16} aria-hidden="true" />
              {item.locationName}
            </p>
          )}
          {item.admission && (
            <p className="event-price">
              {item.admission === "free" ? "Entrada gratuita" : "Entrada paga"}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
export function PlaceCard({
  item,
  eager,
  returnTo,
}: {
  item: Place;
  eager?: boolean;
  returnTo?: string;
}) {
  return (
    <Card
      item={item}
      title={item.name}
      href={
        "/lugares/" +
        item.slug +
        (returnTo ? `?voltar=${encodeURIComponent(returnTo)}` : "")
      }
      category={item.category}
      eager={eager}
      practical={item.admission}
    />
  );
}
export function JoinSection() {
  return (
    <section className="join-section">
      <div className="container join-inner">
        <div>
          <p className="eyebrow">O bairro é feito por você</p>
          <h2>
            Faça parte do
            <br />
            <em>Aclimação Preciosa.</em>
          </h2>
          <p>
            Tem um negócio, evento ou conhece um lugar especial no bairro? Conte
            para nós.
          </p>
        </div>
        <Link href="/participe" className="button button-cream">
          Quero participar <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
export function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split("\n\n").map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </>
  );
}

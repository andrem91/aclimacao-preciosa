import { FormattedText } from "@/components/formatted-text";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { connection } from "next/server";
import { notFound } from "next/navigation";
import { getEvents, getEventBySlug, formatAddress } from "@/lib/content";
import {
  eventState,
  eventStateLabels,
  sortedSessions,
  sessionDate,
  sessionTime,
} from "@/lib/events";
import { Info, Gallery } from "@/components/detail";
import { SectionHeader, EventCard } from "@/components/ui";
import { BusinessContacts } from "@/components/business-contacts";
import { EventRefresh } from "@/components/event-refresh";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ voltar?: string }>;
};
export async function generateMetadata({ params }: Props) {
  const item = getEventBySlug((await params).slug);
  return {
    title: item?.title ?? "Evento não encontrado",
    description: item?.subtitle,
  };
}
export default async function Page({ params, searchParams }: Props) {
  await connection();
  const item = getEventBySlug((await params).slug);
  if (!item) notFound();
  const requestedBack = (await searchParams).voltar;
  const back = requestedBack?.startsWith("/eventos?")
    ? requestedBack
    : "/eventos";
  const now = new Date();
  const state = eventState(item, now);
  const active = ["upcoming", "ongoing"].includes(state);
  const related = getEvents()
    .filter(
      (x) =>
        x.id !== item.id &&
        ["upcoming", "ongoing"].includes(eventState(x, now)),
    )
    .sort(
      (a, b) =>
        Number(b.category === item.category) -
        Number(a.category === item.category),
    )
    .slice(0, 3);
  return (
    <div className="container detail-page">
      <EventRefresh />
      <Link href={back} className="back-link">
        <ArrowLeft size={16} />
        Voltar aos eventos
      </Link>
      <header className="detail-heading event-heading">
        <p className="eyebrow">Evento · {item.category}</p>
        <h1>{item.title}</h1>
        <p className="intro-copy">{item.subtitle}</p>
      </header>
      <div className="event-detail-layout">
        <aside
          className="event-info-panel"
          aria-label="Informações e participação"
        >
          <h2>{active ? "Programe sua visita" : "Informações do evento"}</h2>
          {state !== "upcoming" && (
            <div className={`event-status-notice state-${state}`}>
              <strong>{eventStateLabels[state]}</strong>
              <p>
                {state === "ended"
                  ? "Este evento já terminou."
                  : state === "cancelled"
                    ? "Este evento foi cancelado."
                    : state === "postponed"
                      ? "Aguarde a confirmação de uma nova data."
                      : "O evento já começou."}
              </p>
            </div>
          )}
          <dl>
            <div className="info-row event-schedule">
              <dt>
                {state === "postponed"
                  ? "Programação anterior"
                  : "Dias e horários"}
              </dt>
              <dd>
                <ul>
                  {sortedSessions(item).map((session) => (
                    <li key={session.date + (session.startTime || "")}>
                      <time dateTime={session.date}>
                        {sessionDate(session.date, true)}
                      </time>
                      <span>{sessionTime(session)}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
            <Info label="Local" value={item.locationName} />
            <Info
              label="Endereço"
              value={item.address ? formatAddress(item.address) : undefined}
            />
            <Info
              label="Entrada"
              value={
                item.admission
                  ? item.admission === "free"
                    ? "Entrada gratuita"
                    : "Entrada paga"
                  : undefined
              }
            />
          </dl>
          <BusinessContacts item={item} label="Contato da organização" />
        </aside>
        <div className="event-story">
          <div
            className={`event-detail-image ${item.imageFit === "contain" ? "event-poster" : ""}`}
          >
            {item.coverImage ? (
              <Image
                src={item.coverImage.src}
                alt={item.coverImage.alt}
                fill
                loading="eager"
                sizes="(max-width: 900px) 92vw, 720px"
              />
            ) : (
              <CalendarDays size={70} aria-hidden="true" />
            )}
          </div>
          <article className="prose event-about">
            <h2>Sobre o evento</h2>
            <FormattedText text={item.body} />
          </article>
          {item.organizer && (
            <p className="event-organizer">Realização: {item.organizer}</p>
          )}
          <Gallery item={item} />
        </div>
      </div>
      {!!related.length && (
        <section className="related-section">
          <SectionHeader
            eyebrow="Continue a descoberta"
            title="Outros eventos no bairro"
          />
          <div className="card-grid">
            {related.map((x) => (
              <EventCard key={x.id} item={x} now={now.toISOString()} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

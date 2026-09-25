import {
  eventStateColor,
  pageContainer,
  backLink,
  detailHeading,
  eyebrow,
  introCopy,
  prose,
  relatedSection,
  cardGrid,
} from "@/components/styles";
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
    <div className={`${pageContainer} pb-[78px]`}>
      <EventRefresh />
      <Link href={back} className={backLink}>
        <ArrowLeft size={16} />
        Voltar aos eventos
      </Link>
      <header className={detailHeading}>
        <p className={`${eyebrow} text-emerald text-xs tracking-[0.16em]`}>
          Evento · {item.category}
        </p>
        <h1>{item.title}</h1>
        <p className={introCopy}>{item.subtitle}</p>
      </header>
      <div className="flex flex-col gap-7 md:grid md:grid-cols-[minmax(0,1fr)_350px] md:items-start md:gap-9">
        <aside
          className="w-full min-w-0 rounded-lg border border-line bg-surface p-[22px] md:col-start-2 md:row-start-1 md:p-[26px] [&_h2]:mb-[18px] [&_h2]:text-[27px]"
          aria-label="Informações e participação"
        >
          <h2>{active ? "Programe sua visita" : "Informações do evento"}</h2>
          {state !== "upcoming" && (
            <div
              className={`mb-5 rounded bg-[#f3eee5] p-4 leading-[1.6] [&_p]:mt-1.5 [&_p]:text-sm ${eventStateColor[state]}`}
            >
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
          <dl className="grid grid-cols-2 gap-x-5 md:block">
            <div className="col-span-full min-w-0 [&+div]:mt-5">
              <dt className="text-xs font-semibold tracking-[0.08em] text-[#687660] uppercase">
                {state === "postponed"
                  ? "Programação anterior"
                  : "Dias e horários"}
              </dt>
              <dd className="mt-1.5 text-base leading-[1.8]">
                <ul>
                  {sortedSessions(item).map((session) => (
                    <li
                      className="grid gap-1 border-b border-line py-2.5 last:border-0"
                      key={session.date + (session.startTime || "")}
                    >
                      <time className="capitalize" dateTime={session.date}>
                        {sessionDate(session.date, true)}
                      </time>
                      <span className="text-sm text-muted">
                        {sessionTime(session)}
                      </span>
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
          <BusinessContacts
            layout="panel"
            item={item}
            label="Contato da organização"
          />
        </aside>
        <div className="w-full min-w-0 md:col-start-1 md:row-start-1">
          <div
            className={`relative grid place-items-center overflow-hidden rounded-lg bg-[#e5ebe0] text-emerald ${item.imageFit === "contain" ? "aspect-[0.85] max-h-[650px] [&_img]:object-contain [&_img]:p-3" : "aspect-[1.7] max-h-[400px]"}`}
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
          <article className={`${prose} mt-[30px]`}>
            <h2>Sobre o evento</h2>
            <FormattedText text={item.body} />
          </article>
          {item.organizer && (
            <p className="mt-8 border-t border-line pt-6">
              Realização: {item.organizer}
            </p>
          )}
          <Gallery item={item} />
        </div>
      </div>
      {!!related.length && (
        <section className={relatedSection}>
          <SectionHeader
            eyebrow="Continue a descoberta"
            title="Outros eventos no bairro"
          />
          <div className={cardGrid}>
            {related.map((x) => (
              <EventCard key={x.id} item={x} now={now.toISOString()} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

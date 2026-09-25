import {
  eyebrow as eyebrowStyles,
  eventStateColor,
  textLink,
  introCopy,
  pageContainer,
  buttonStyles,
} from "@/components/styles";
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
    <div className="mb-[26px] block sm:mb-8 sm:flex sm:flex-wrap sm:items-start sm:justify-between sm:gap-6 lg:items-end">
      <div>
        <p
          className={`${eyebrowStyles} mb-[9px] text-emerald text-xs tracking-[0.16em]`}
        >
          {eyebrow}
        </p>
        <h2 className="max-w-[18ch] text-[29px] sm:max-w-none lg:text-[32px]">
          {title}
        </h2>
      </div>
      {href && (
        <Link href={href} className={`${textLink} mt-2.5 -mb-[7px] sm:mt-0`}>
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
    <div className="max-w-[810px] pt-[38px] pb-[25px] sm:pt-[60px] sm:pb-[35px]">
      <p
        className={`${eyebrowStyles} mb-[17px] text-emerald text-xs tracking-[0.16em]`}
      >
        {eyebrow}
      </p>
      <h1 className="text-[clamp(38px,4vw,54px)]">{title}</h1>
      <p className={introCopy}>{description}</p>
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
    <Link href={href} className="group block min-w-0">
      <div className="relative aspect-[1.45] overflow-hidden rounded bg-[#e4e6dc] sm:aspect-[1.43]">
        <Image
          className="transition-transform duration-500 group-hover:scale-[1.035]"
          src={item.coverImage.src}
          alt={item.coverImage.alt}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 700px) 92vw, (max-width: 1000px) 45vw, 30vw"
        />
        <span className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-paper text-emerald opacity-100 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 sm:opacity-0">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="px-px pt-[17px] sm:pt-[19px]">
        <p className="mb-2 font-sans text-xs font-bold leading-[1.6] tracking-[0.1em] text-[#6b7250] uppercase">
          {category}
        </p>
        <h3 className="text-[27px] leading-[1.25] group-hover:text-emerald sm:text-[22px] lg:text-2xl">
          {title}
        </h3>
        <p className="mt-2.5 max-w-none text-base leading-[1.8] text-muted sm:max-w-[36ch]">
          {item.shortDescription}
        </p>
        {practical && (
          <p className="mt-[18px] border-t border-line pt-3.5 text-sm font-semibold text-emerald">
            {practical}
          </p>
        )}
        {meta && (
          <p className="mt-3 flex items-center gap-2 text-sm leading-[1.5] text-[#59665b] sm:text-xs [&+p]:mt-[7px]">
            <CalendarDays size={14} />
            {meta}
          </p>
        )}
        {location && (
          <p className="mt-3 flex items-center gap-2 text-sm leading-[1.5] text-[#59665b] sm:text-xs [&+p]:mt-[7px]">
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
      className="group flex min-w-0 flex-col rounded-lg border border-line bg-surface p-5 sm:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <BusinessMedia item={item} eager={eager} />
      </div>
      <div className="flex flex-1 flex-col px-px pt-[17px] sm:pt-[19px]">
        <p className="mb-2 font-sans text-xs font-bold leading-[1.6] tracking-[0.1em] text-[#6b7250] uppercase">
          {item.category}
        </p>
        <h3 className="text-[27px] leading-[1.25] group-hover:text-emerald">
          {item.name}
        </h3>
        <p className="mt-2.5 flex-1 text-base leading-[1.8] text-muted sm:max-w-[36ch]">
          {item.shortDescription}
        </p>
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
    <Link
      href={href}
      className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-surface"
    >
      <div
        className={`relative grid place-items-center overflow-hidden bg-[#e5ebe0] text-emerald ${item.imageFit === "contain" ? "aspect-square [&_img]:object-contain [&_img]:p-3" : "aspect-[1.45] sm:aspect-[1.43]"}`}
      >
        {item.coverImage ? (
          <Image
            className="transition-transform duration-500 group-hover:scale-[1.035]"
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
      <div className="flex flex-1 flex-col p-[22px]">
        <p className="mb-2 font-sans text-xs font-bold leading-[1.6] tracking-[0.1em] text-[#6b7250] uppercase">
          {item.category}
        </p>
        {state !== "upcoming" && (
          <span
            className={`mb-3 w-fit rounded-[3px] bg-[#ede9e0] px-2 py-1 text-sm ${eventStateColor[state]}`}
          >
            {eventStateLabels[state]}
          </span>
        )}
        <h3 className="text-[27px] leading-[1.25] group-hover:text-emerald">
          {item.title}
        </h3>
        <p className="mt-2.5 flex-1 text-base leading-[1.8] text-muted sm:max-w-[36ch]">
          {item.subtitle}
        </p>
        <div className="mt-5 grid gap-[9px] border-t border-line pt-3.5 text-sm [&_p]:flex [&_p]:items-baseline [&_p]:gap-2">
          <p className="font-semibold text-emerald">
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
            <p className="font-semibold text-emerald">
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
    <section className="bg-[#0d4b39] py-[46px] text-paper sm:py-[66px]">
      <div
        className={`${pageContainer} block sm:flex sm:items-center sm:justify-between sm:gap-8`}
      >
        <div>
          <p
            className={`${eyebrowStyles} mb-3.5 text-[#bdd4b6] text-xs tracking-[0.16em]`}
          >
            O bairro é feito por você
          </p>
          <h2 className="text-[35px] leading-[1.22] sm:text-[39px]">
            Faça parte do
            <br />
            <em>Aclimação Preciosa.</em>
          </h2>
          <p className="mt-[19px] max-w-[47ch] text-base text-[#d1ded0]">
            Tem um negócio, evento ou conhece um lugar especial no bairro? Conte
            para nós.
          </p>
        </div>
        <Link
          href="/participe"
          className={`${buttonStyles("cream")} mt-[27px] sm:mt-0 lg:mr-[60px]`}
        >
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

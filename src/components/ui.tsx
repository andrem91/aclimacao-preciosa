import {
  categoryTag,
  eventStateColor,
  textLink,
  introCopy,
  pageContainer,
  buttonStyles,
} from "@/components/styles";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, MapPin, CalendarDays } from "lucide-react";
import type { Establishment, Event, Place } from "@/types/content";

import {
  eventDateLabel,
  sessionHighlight,
  eventState,
  eventStateLabels,
} from "@/lib/events";
import { Placa } from "./placa";
import { BusinessMedia } from "./business-media";
export function SectionHeader({
  title,
  href,
  link,
}: {
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="mb-[26px] block md:mb-8 md:flex md:flex-wrap md:items-start md:justify-between md:gap-6 xl:items-end">
      <div>
        <h2 className="max-w-[18ch] text-[29px] md:max-w-none xl:text-[32px]">
          {title}
        </h2>
      </div>
      {href && (
        <Link href={href} className={`${textLink} mt-2.5 -mb-[7px] md:mt-0`}>
          {link}
          <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
}
export function PageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-[810px] pt-[38px] pb-[25px] md:pt-[60px] md:pb-[35px]">
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
  eager = false,
  practical,
}: {
  item: Place;
  title: string;
  href: string;
  category: string;
  eager?: boolean;
  practical?: string;
}) {
  return (
    <Link href={href} className="group block min-w-0">
      <div className="relative aspect-[1.45] overflow-hidden rounded bg-wash md:aspect-[1.43]">
        <Image
          className="transition-transform duration-500 group-hover:scale-[1.035]"
          src={item.coverImage.src}
          alt={item.coverImage.alt}
          fill
          loading={eager ? "eager" : "lazy"}
          sizes="(max-width: 700px) 92vw, (max-width: 1000px) 45vw, 30vw"
        />
        <span className="absolute right-3 bottom-3 flex size-8 items-center justify-center rounded-full bg-paper text-emerald opacity-100 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 md:opacity-0">
          <ArrowUpRight size={20} />
        </span>
      </div>
      <div className="px-px pt-[17px] md:pt-[19px]">
        <p className={categoryTag}>{category}</p>
        <h3 className="text-[27px] leading-[1.25] group-hover:text-emerald md:text-[22px] xl:text-2xl">
          {title}
        </h3>
        <p className="mt-2.5 max-w-none text-base leading-[1.8] text-muted md:max-w-[36ch]">
          {item.shortDescription}
        </p>
        {item.address && (
          <div className="mt-4">
            <Placa size="small">{item.address.street}</Placa>
          </div>
        )}
        {practical && (
          <p className="mt-[18px] border-t border-line pt-3.5 text-sm font-semibold text-emerald">
            {practical}
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
      className="group flex min-w-0 flex-col rounded-lg border border-line bg-surface p-5 md:p-6"
    >
      <div className="flex items-start justify-between gap-3">
        <BusinessMedia item={item} eager={eager} />
      </div>
      <div className="flex flex-1 flex-col px-px pt-[17px] md:pt-[19px]">
        <p className={categoryTag}>{item.category}</p>
        <h3 className="text-[27px] leading-[1.25] group-hover:text-emerald">
          {item.name}
        </h3>
        <p className="mt-2.5 flex-1 text-base leading-[1.8] text-muted md:max-w-[36ch]">
          {item.shortDescription}
        </p>
        {item.address && (
          <div className="mt-4">
            <Placa size="small">
              {[item.address.street, item.address.number]
                .filter(Boolean)
                .join(", ")}
            </Placa>
          </div>
        )}
      </div>
    </Link>
  );
}
export function EventCard({
  item,
  eager,
  now,
  returnTo,
  featured = false,
}: {
  item: Event;
  featured?: boolean;
  eager?: boolean;
  now: string;
  returnTo?: string;
}) {
  const state = eventState(item, new Date(now));
  const href = `/eventos/${item.slug}${returnTo ? `?voltar=${encodeURIComponent(returnTo)}` : ""}`;
  return (
    <Link
      href={href}
      className={`group flex min-w-0 flex-col overflow-hidden rounded-lg border border-line bg-surface ${featured ? "md:col-span-full md:grid md:grid-cols-2" : ""}`}
    >
      <div
        className={`relative grid place-items-center overflow-hidden bg-wash text-emerald ${item.imageFit === "contain" ? "aspect-square" : "aspect-[1.45] md:aspect-[1.43]"} ${featured ? "md:aspect-auto md:min-h-80" : ""}`}
      >
        {item.coverImage ? (
          <Image
            className={`transition-transform duration-500 group-hover:scale-[1.035] ${item.imageFit === "contain" ? "object-contain p-3" : ""}`}
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
        <p className={categoryTag}>{item.category}</p>
        {state !== "upcoming" && (
          <span
            className={`mb-3 w-fit rounded-[3px] bg-paper px-2 py-1 text-sm ${eventStateColor[state]}`}
          >
            {eventStateLabels[state]}
          </span>
        )}
        <h3 className="text-[27px] leading-[1.25] group-hover:text-emerald">
          {item.title}
        </h3>
        <p className="mt-2.5 flex-1 text-base leading-[1.8] text-muted md:max-w-[36ch]">
          {item.subtitle}
        </p>
        <div className="mt-5 grid gap-[9px] border-t border-line pt-3.5 text-sm">
          <p className="flex items-baseline gap-2 font-semibold text-emerald">
            <CalendarDays size={16} aria-hidden="true" />
            <span>{eventDateLabel(item)}</span>
          </p>
          {sessionHighlight(item, new Date(now)) && (
            <p className="flex items-baseline gap-2">
              {sessionHighlight(item, new Date(now))}
            </p>
          )}
          {item.locationName && (
            <p className="flex items-baseline gap-2">
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
    <section className="bg-emerald-dark py-[46px] text-paper md:py-[66px]">
      <div
        className={`${pageContainer} block md:flex md:items-center md:justify-between md:gap-8`}
      >
        <div>
          <h2 className="max-w-[22ch] text-4xl leading-tight">
            Faça parte do Aclimação Preciosa
          </h2>
          <p className="mt-[19px] max-w-[47ch] text-base text-wash">
            Tem um negócio, evento ou conhece um lugar especial no bairro? Conte
            para nós.
          </p>
        </div>
        <Link
          href="/participe"
          className={`${buttonStyles("cream")} mt-[27px] md:mt-0 xl:mr-[60px]`}
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
        <p className="mt-4 text-muted" key={i}>
          {p}
        </p>
      ))}
    </>
  );
}

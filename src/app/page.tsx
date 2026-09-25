import {
  pageContainer,
  eyebrow,
  buttonStyles,
  cardGrid,
} from "@/components/styles";
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
      <section className="relative isolate h-[590px] bg-[#264c3c] text-white 2xl:h-[640px]">
        <Image
          className="object-[61%_center] sm:object-[center_52%]"
          src={places[0].coverImage.src}
          alt="Imagem ilustrativa de um lago cercado por árvores, referência para o Parque da Aclimação"
          fill
          loading="eager"
          fetchPriority="high"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#082319bf,#08231940),linear-gradient(0deg,#0823199c,transparent_45%)] sm:bg-[linear-gradient(90deg,rgba(8,34,25,0.76),rgba(8,34,25,0.25)_75%),linear-gradient(0deg,rgba(8,34,25,0.55),transparent_28%)]" />
        <div
          className={`${pageContainer} relative pt-[92px] sm:pt-[94px] 2xl:pt-28`}
        >
          <p
            className={`${eyebrow} mb-[21px] flex items-center gap-2.5 tracking-[0.13em] text-[#e5e9cd] sm:tracking-[0.16em] text-xs`}
          >
            <span className="size-1.5 rotate-45 bg-[#bed5ac]" /> UM GUIA PARA
            VIVER O BAIRRO
          </p>
          <h1 className="max-w-[800px] text-[46px] leading-[1.18] font-[450] tracking-[-0.03em] sm:text-[clamp(44px,5vw,65px)] sm:leading-[1.16] [&_br]:hidden sm:[&_br]:block [&_em]:text-[#dce7c5]">
            Descubra a Aclimação <br />
            de um <em>novo jeito.</em>
          </h1>
          <p className="mt-6 mb-[30px] text-base leading-[1.9] text-[#f1f1e5] sm:mt-[23px] sm:text-lg">
            Lugares, eventos e negócios
            <br className="hidden sm:block" /> que fazem o bairro ser especial.
          </p>
          <Link className={buttonStyles("cream")} href="#estabelecimentos">
            Explorar a Aclimação <ArrowDown size={17} />
          </Link>
        </div>
        <div
          className={`${pageContainer} absolute inset-x-0 bottom-[21px] flex flex-wrap items-center justify-between gap-2 text-xs tracking-[0.06em] text-[#e0e4d9] sm:bottom-6 sm:flex-nowrap sm:gap-2.5`}
        >
          <span className="text-[11px] tracking-[0.2em]">
            ACLIMAÇÃO, SÃO PAULO
          </span>
          <span className="hidden sm:block">
            Um olhar de perto. Uma nova descoberta.
          </span>
          <span className="text-[11px]">Imagem ilustrativa</span>
        </div>
      </section>
      <section
        className={`py-[49px] sm:py-[78px] ${pageContainer}`}
        id="estabelecimentos"
      >
        <SectionHeader
          eyebrow="Da porta ao lado"
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
      <section className="py-[49px] sm:py-[78px] border-y border-[#e2e4d9] bg-[#eaece3]">
        <div className={pageContainer}>
          <SectionHeader
            eyebrow="Encontros & descobertas"
            title="O que está acontecendo"
            href="/eventos"
            link="Ver todos os eventos"
          />
          <div className={cardGrid}>
            {events.map((item) => (
              <EventCard key={item.id} item={item} now={now.toISOString()} />
            ))}
            {!events.length && (
              <p>Novos encontros a caminho. Confira a agenda de eventos.</p>
            )}
          </div>
        </div>
      </section>
      <section className={`py-[49px] sm:py-[78px] ${pageContainer}`}>
        <SectionHeader
          eyebrow="Um convite para sair"
          title="Lugares para conhecer"
          href="/lugares"
          link="Explorar lugares"
        />
        <div className="grid grid-cols-1 grid-rows-[350px_260px_260px] gap-[18px] sm:grid-cols-[1.16fr_1fr] sm:grid-rows-[230px_230px] sm:gap-5">
          {places.map((p, i) => (
            <Link
              key={p.id}
              href={"/lugares/" + p.slug}
              className={`group relative overflow-hidden rounded bg-[#244635] text-white ${i === 0 ? "sm:row-span-2" : ""}`}
            >
              <Image
                src={p.coverImage.src}
                alt={p.coverImage.alt}
                fill
                sizes="(max-width: 700px) 92vw, 55vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(4,27,19,0.88),transparent_85%)]" />
              <div className="absolute right-[55px] bottom-6 left-[23px] sm:left-[26px]">
                <p
                  className={`${eyebrow} mb-[9px] text-[11px] text-[#e3e7d3] tracking-[0.16em]`}
                >
                  {p.category}
                </p>
                <h3
                  className={`text-[29px] ${i === 0 ? "sm:text-[35px]" : ""}`}
                >
                  {p.name}
                </h3>
                <p className="mt-2.5 max-w-[38ch] text-sm leading-[1.8] text-[#e3e7db]">
                  {p.shortDescription}
                </p>
              </div>
              <ArrowUpRight
                className="absolute right-[23px] bottom-7"
                size={25}
              />
            </Link>
          ))}
        </div>
      </section>
      <JoinSection />
    </>
  );
}

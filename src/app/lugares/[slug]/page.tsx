import {
  pageContainer,
  backLink,
  detailHeading,
  eyebrow,
  introCopy,
  buttonStyles,
  prose,
  relatedSection,
  cardGrid,
} from "@/components/styles";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import { getPlaces, getPlaceBySlug, formatAddress } from "@/lib/content";
import { Info, Gallery } from "@/components/detail";
import { FormattedText } from "@/components/formatted-text";
import { BusinessContacts } from "@/components/business-contacts";
import { PlaceCard, SectionHeader } from "@/components/ui";
import { safeWebUrl } from "@/lib/events";
type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ voltar?: string | string[] }>;
};
export async function generateMetadata({ params }: Props) {
  const x = getPlaceBySlug((await params).slug);
  return {
    title: x?.name ?? "Lugar não encontrado",
    description: x?.shortDescription,
  };
}
export default async function Page({ params, searchParams }: Props) {
  const x = getPlaceBySlug((await params).slug);
  if (!x) notFound();
  const requestedBack = (await searchParams).voltar;
  const back =
    typeof requestedBack === "string" && requestedBack.startsWith("/lugares?")
      ? requestedBack
      : "/lugares";
  const address = x.address ? formatAddress(x.address) : undefined;
  const hasInfo = !!(
    address ||
    x.openingHours ||
    x.admission ||
    x.phone ||
    x.whatsapp ||
    x.email ||
    x.website ||
    x.socialLinks?.length
  );
  const gallery = x.gallery?.filter(
    (image, index, all) =>
      image.src !== x.coverImage.src &&
      all.findIndex((other) => other.src === image.src) === index,
  );
  const related = getPlaces()
    .filter((other) => other.id !== x.id)
    .sort(
      (a, b) =>
        Number(b.category === x.category) - Number(a.category === x.category),
    )
    .slice(0, 3);
  const moreInformation = x.moreInformation?.filter((link) =>
    safeWebUrl(link.url),
  );
  return (
    <div className={`${pageContainer} pb-[78px]`}>
      <Link href={back} className={backLink}>
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar aos lugares
      </Link>
      <header className={detailHeading}>
        <p className={`${eyebrow} text-emerald text-xs tracking-[0.16em]`}>
          {x.category}
        </p>
        <h1>{x.name}</h1>
        <p className={introCopy}>{x.shortDescription}</p>
      </header>
      <div
        className={`flex flex-col gap-7 md:grid md:items-start md:gap-9 ${hasInfo ? "md:grid-cols-[minmax(0,1fr)_350px]" : "mx-auto max-w-[800px] md:grid-cols-1"}`}
      >
        {hasInfo && (
          <aside
            className="w-full min-w-0 rounded-lg border border-line bg-surface p-[22px] wrap-anywhere md:col-start-2 md:row-start-1 md:p-[26px] [&_h2]:mb-[18px] [&_h2]:text-[27px]"
            aria-label="Informações de visitação"
          >
            <h2>Planeje sua visita</h2>
            <dl>
              <Info label="Localização" value={address} />
              <Info label="Horário" value={x.openingHours} />
              <Info label="Visitação" value={x.admission} />
            </dl>
            {address && (
              <a
                className={`${buttonStyles()} mt-5 w-full`}
                href={
                  "https://www.google.com/maps/search/?api=1&query=" +
                  encodeURIComponent(address)
                }
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin size={18} aria-hidden="true" />
                Como chegar
              </a>
            )}
            <BusinessContacts
              item={x}
              label="Contatos do lugar"
              appearance="links"
              layout="panel"
            />
          </aside>
        )}
        <div className="w-full min-w-0 md:col-start-1 md:row-start-1">
          <div className="relative aspect-[1.6] overflow-hidden rounded-lg">
            <Image
              src={x.coverImage.src}
              alt={x.coverImage.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 900px) 92vw, 720px"
            />
          </div>
          <article className={`${prose} mt-[30px]`}>
            <h2>Sobre o lugar</h2>
            <FormattedText text={x.description} />
          </article>
          <Gallery item={{ gallery }} />
          {!!moreInformation?.length && (
            <section
              className="mt-8 border-t border-line pt-5 text-sm [&_h2]:mb-3 [&_h2]:text-base [&_h2]:font-semibold [&_li]:mt-3 [&_li]:grid [&_li]:gap-[5px] [&_a]:text-emerald [&_a]:underline [&_a]:wrap-anywhere"
              aria-label="Mais informações"
            >
              <h2>Mais informações</h2>
              <ul>
                {moreInformation.map((link) => (
                  <li key={link.url}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.title}
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
      {!!related.length && (
        <section className={relatedSection}>
          <SectionHeader
            eyebrow="Continue a descoberta"
            title="Outros lugares para conhecer"
          />
          <div className={cardGrid}>
            {related.map((item) => (
              <PlaceCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

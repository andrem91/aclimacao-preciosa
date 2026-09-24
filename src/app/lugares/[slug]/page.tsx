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
    <div className="container detail-page">
      <Link href={back} className="back-link">
        <ArrowLeft size={16} aria-hidden="true" />
        Voltar aos lugares
      </Link>
      <header className="detail-heading">
        <p className="eyebrow">{x.category}</p>
        <h1>{x.name}</h1>
        <p className="intro-copy">{x.shortDescription}</p>
      </header>
      <div
        className={`place-detail-layout ${hasInfo ? "" : "place-detail-single"}`}
      >
        {hasInfo && (
          <aside
            className="place-info-panel"
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
                className="button place-map"
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
            />
          </aside>
        )}
        <div className="place-story">
          <div className="place-detail-image">
            <Image
              src={x.coverImage.src}
              alt={x.coverImage.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 900px) 92vw, 720px"
            />
          </div>
          <article className="prose place-about">
            <h2>Sobre o lugar</h2>
            <FormattedText text={x.description} />
          </article>
          <Gallery item={{ gallery }} />
          {!!moreInformation?.length && (
            <section
              className="place-more-information"
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
        <section className="related-section">
          <SectionHeader
            eyebrow="Continue a descoberta"
            title="Outros lugares para conhecer"
          />
          <div className="card-grid">
            {related.map((item) => (
              <PlaceCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

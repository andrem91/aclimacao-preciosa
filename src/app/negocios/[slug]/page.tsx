import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { BusinessContacts } from "@/components/business-contacts";
import { notFound } from "next/navigation";
import {
  getEstablishments,
  getEstablishmentBySlug,
  formatAddress,
} from "@/lib/content";
import { Info, Gallery } from "@/components/detail";
import { Paragraphs, SectionHeader, EstablishmentCard } from "@/components/ui";
import { BusinessMedia } from "@/components/business-media";
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return getEstablishments().map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: Props) {
  const item = getEstablishmentBySlug((await params).slug);
  return {
    title: item?.name ?? "Negócio não encontrado",
    description: item?.shortDescription,
  };
}
export default async function Page({ params }: Props) {
  const item = getEstablishmentBySlug((await params).slug);
  if (!item) notFound();
  const hasInfo = Boolean(
    item.address ||
    item.openingHours ||
    item.serviceModes?.length ||
    item.serviceArea,
  );
  const related = getEstablishments()
    .filter((x) => x.id !== item.id)
    .sort(
      (a, b) =>
        Number(b.category === item.category) -
        Number(a.category === item.category),
    )
    .slice(0, 3);
  return (
    <div className="container detail-page">
      <Link href="/negocios" className="back-link">
        <ArrowLeft size={15} />
        Todos os negócios
      </Link>
      <header className="business-heading">
        <BusinessMedia item={item} eager detail />
        <div className="detail-heading">
          <div className="flex flex-wrap items-center gap-3">
            <p className="eyebrow">{item.category}</p>
          </div>
          <h1>{item.name}</h1>
          <p className="intro-copy">{item.shortDescription}</p>
        </div>
      </header>
      <div className="business-profile-layout">
        <aside className="business-sidebar" aria-label="Contato e atendimento">
          <BusinessContacts item={item} />
          {hasInfo && (
            <section
              className="business-practical"
              aria-labelledby="business-info-title"
            >
              <h2 id="business-info-title">Atendimento</h2>
              <dl>
                <Info
                  label="Forma de atendimento"
                  value={item.serviceModes?.join(" · ")}
                />
                <Info label="Região atendida" value={item.serviceArea} />
                <Info
                  label="Endereço"
                  value={item.address ? formatAddress(item.address) : undefined}
                />
                <Info label="Horário" value={item.openingHours} />
              </dl>
            </section>
          )}
        </aside>
        <div className="business-story">
          {item.coverImage && (
            <div className="detail-cover business-cover">
              <Image
                src={item.coverImage.src}
                alt={item.coverImage.alt}
                fill
                loading="eager"
                sizes="(max-width: 900px) 92vw, 720px"
              />
            </div>
          )}
          <article className="prose business-about">
            <h2>Sobre o negócio</h2>
            <Paragraphs text={item.description} />
          </article>
          <Gallery item={item} />
        </div>
      </div>
      <section className="related-section">
        <SectionHeader eyebrow="Continue a descoberta" title="Veja também" />
        <div className="card-grid">
          {related.map((x) => (
            <EstablishmentCard key={x.id} item={x} />
          ))}
        </div>
      </section>
    </div>
  );
}

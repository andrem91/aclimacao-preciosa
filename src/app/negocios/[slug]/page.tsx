import {
  pageContainer,
  backLink,
  eyebrow,
  introCopy,
  prose,
  relatedSection,
  cardGrid,
} from "@/components/styles";
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
    <div className={`${pageContainer} pb-[78px]`}>
      <Link href="/negocios" className={backLink}>
        <ArrowLeft size={15} />
        Todos os negócios
      </Link>
      <header className="mb-7 flex flex-col items-start gap-5 md:flex-row md:items-center md:gap-7">
        <BusinessMedia item={item} eager detail />
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <p className={`${eyebrow} text-emerald text-xs tracking-[0.16em]`}>
              {item.category}
            </p>
          </div>
          <h1 className="mt-3 text-4xl leading-[1.2] md:text-[clamp(34px,4.2vw,55px)]">
            {item.name}
          </h1>
          <p className={introCopy}>{item.shortDescription}</p>
        </div>
      </header>
      <div className="flex flex-col gap-7 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start lg:gap-10 lg:[&:not(:has(aside_section))]:grid-cols-1">
        <aside
          className="contents min-w-0 lg:col-start-2 lg:row-start-1 lg:block lg:rounded-lg lg:border lg:border-line lg:bg-surface lg:p-[26px] [&:not(:has(section))]:hidden"
          aria-label="Contato e atendimento"
        >
          <BusinessContacts item={item} />
          {hasInfo && (
            <section
              className="order-2 w-full rounded-lg border border-line bg-surface p-5 lg:border-0 lg:bg-transparent lg:p-0"
              aria-labelledby="business-info-title"
            >
              <h2 className="mb-3.5 text-[26px]" id="business-info-title">
                Atendimento
              </h2>
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
        <div className="order-1 min-w-0 w-full lg:col-start-1 lg:row-start-1">
          {item.coverImage && (
            <div
              data-business-photo
              className="relative aspect-[1.5] max-h-[380px] overflow-hidden rounded-lg bg-[#e2e7db] lg:aspect-[1.8]"
            >
              <Image
                src={item.coverImage.src}
                alt={item.coverImage.alt}
                fill
                loading="eager"
                sizes="(max-width: 900px) 92vw, 720px"
              />
            </div>
          )}
          <article className={`${prose} mt-7 first:mt-0`}>
            <h2>Sobre o negócio</h2>
            <Paragraphs text={item.description} />
          </article>
          <Gallery item={item} />
        </div>
      </div>
      <section className={relatedSection}>
        <SectionHeader eyebrow="Continue a descoberta" title="Veja também" />
        <div className={cardGrid}>
          {related.map((x) => (
            <EstablishmentCard key={x.id} item={x} />
          ))}
        </div>
      </section>
    </div>
  );
}

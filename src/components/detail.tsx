import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowUpRight, MapPin } from "lucide-react";
import type { BaseContent } from "@/types/content";
import { Paragraphs } from "./ui";
export function DetailHeader({
  item,
  title,
  category,
  back,
  backLabel,
  media,
}: {
  item: Omit<BaseContent, "coverImage"> & {
    coverImage?: BaseContent["coverImage"];
  };
  media?: React.ReactNode;
  title: string;
  category: string;
  back: string;
  backLabel: string;
}) {
  return (
    <>
      <Link href={back} className="back-link">
        <ArrowLeft size={15} />
        {backLabel}
      </Link>
      <div className="detail-heading">
        <div className="flex items-center gap-3">
          <p className="eyebrow">{category}</p>
        </div>
        <h1>{title}</h1>
        <p className="intro-copy">{item.shortDescription}</p>
      </div>
      {media ??
        (item.coverImage && (
          <div className="detail-cover">
            <Image
              src={item.coverImage.src}
              alt={item.coverImage.alt}
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 1200px) 92vw, 1120px"
            />
          </div>
        ))}
    </>
  );
}
export function DetailBody({
  description,
  heading = "Sobre",
  children,
}: {
  description: string;
  heading?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`detail-body ${children ? "" : "detail-body-single"}`}>
      <article className="prose">
        <p className="eyebrow">Um olhar mais de perto</p>
        <h2>{heading}</h2>
        <Paragraphs text={description} />
      </article>
      {children}
    </div>
  );
}
export function InfoPanel({ children }: { children: React.ReactNode }) {
  return (
    <aside className="info-panel">
      <h2>Informações</h2>
      <dl>{children}</dl>
    </aside>
  );
}
export function Info({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="info-row">
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
export function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="button external-link"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <ArrowUpRight size={16} />
    </a>
  );
}
export function MapLink({ address }: { address: string }) {
  return (
    <ExternalLink
      href={
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(address)
      }
    >
      <MapPin size={16} />
      Abrir no Google Maps
    </ExternalLink>
  );
}
export function Gallery({ item }: { item: Pick<BaseContent, "gallery"> }) {
  if (!item.gallery?.length) return null;
  return (
    <section className="gallery-section">
      <h2>Outros olhares</h2>
      <div className="gallery-grid">
        {item.gallery.map((im, i) => (
          <div key={i} className="gallery-image">
            <Image
              src={im.src}
              alt={im.alt}
              fill
              sizes="(max-width: 700px) 90vw, 33vw"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

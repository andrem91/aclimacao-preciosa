import Image from "next/image";
import type { BaseContent } from "@/types/content";
export function Info({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div className="min-w-0 [&+div]:mt-5">
      <dt className="text-xs font-semibold tracking-[0.08em] text-[#687660] uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 text-base leading-[1.8] wrap-anywhere">{value}</dd>
    </div>
  );
}
export function Gallery({ item }: { item: Pick<BaseContent, "gallery"> }) {
  if (!item.gallery?.length) return null;
  return (
    <section className="mt-[45px]">
      <h2 className="mb-[22px] text-[30px]">Outros olhares</h2>
      <div className="grid grid-cols-1 gap-5 xs:grid-cols-2">
        {item.gallery.map((im, i) => (
          <div
            key={i}
            className="relative aspect-[1.4] overflow-hidden rounded-[3px]"
          >
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

import Image from "next/image";
import type { Establishment } from "@/types/content";

export function BusinessMedia({
  item,
  eager = false,
  detail = false,
}: {
  item: Establishment;
  eager?: boolean;
  detail?: boolean;
}) {
  const initials = item.name
    .split(/\s+/)
    .filter((word) => !["de", "da", "do", "&"].includes(word.toLowerCase()))
    .slice(0, 2)
    .map((word) => word[0])
    .join("");
  return (
    <div
      className={`business-media ${item.logo ? "business-logo" : "business-initials"} ${detail ? "business-media-detail" : ""}`}
    >
      {item.logo ? (
        <Image
          src={item.logo.src}
          alt={item.logo.alt}
          fill
          sizes={detail ? "320px" : "240px"}
          loading={eager ? "eager" : "lazy"}
        />
      ) : (
        <span
          className="business-monogram"
          aria-label={`Iniciais de ${item.name}`}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

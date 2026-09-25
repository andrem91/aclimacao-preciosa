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
      className={`relative shrink-0 overflow-hidden ${detail ? "size-28 rounded-[10px] sm:size-36" : "size-24 rounded-lg"} ${item.logo ? "border border-line bg-white" : "grid place-items-center bg-[#e5ebe0]"}`}
    >
      {item.logo ? (
        <Image
          className="object-contain p-2"
          src={item.logo.src}
          alt={item.logo.alt}
          fill
          sizes={detail ? "320px" : "240px"}
          loading={eager ? "eager" : "lazy"}
        />
      ) : (
        <span
          className={`grid place-items-center rounded-full border border-[#a9bca4] font-serif text-[#345741] ${detail ? "size-20 text-[34px] sm:size-[104px] sm:text-[42px]" : "size-[68px] text-[29px]"}`}
          aria-label={`Iniciais de ${item.name}`}
        >
          {initials}
        </span>
      )}
    </div>
  );
}

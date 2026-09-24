import type { Address } from "@/types/content";
export const formatDate = (date: string) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(date + "T12:00:00Z"));
export const formatPrice = (price?: number, text?: string) =>
  text ??
  (price === undefined
    ? undefined
    : price === 0
      ? "Gratuito"
      : new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(price));
export const formatAddress = (a: Address) =>
  [a.street, a.number, a.complement, a.neighborhood, `${a.city} — ${a.state}`]
    .filter(Boolean)
    .join(", ");

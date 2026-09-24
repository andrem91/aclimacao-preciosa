export type ImageAsset = { src: string; alt: string };
export type Address = {
  street: string;
  number?: string;
  complement?: string;
  neighborhood: string;
  city: string;
  state: string;
  postalCode?: string;
};
export type BaseContent = {
  id: string;
  slug: string;
  status: "draft" | "published";
  featured: boolean;
  shortDescription: string;
  description: string;
  coverImage: ImageAsset;
  gallery?: ImageAsset[];
};
export const establishmentCategories = [
  "Comer & Beber",
  "Saúde & Bem-estar",
  "Compras",
  "Arte & Cultura",
  "Educação",
  "Serviços",
] as const;
export type Establishment = Omit<BaseContent, "coverImage"> & {
  coverImage?: ImageAsset;
  logo?: ImageAsset;
  serviceModes?: ("Em espaço próprio" | "No local do cliente" | "Online")[];
  serviceArea?: string;
  name: string;
  category: (typeof establishmentCategories)[number];
  address?: Address;
  openingHours?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  socialLinks?: {
    platform: "instagram" | "youtube" | "linkedin" | "facebook" | "tiktok";
    url: string;
  }[];
  website?: string;
};
export type Place = BaseContent & {
  name: string;
  category: "Natureza" | "História" | "Arte & Cultura" | "Arquitetura";
  address?: Address;
  openingHours?: string;
  admission?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  socialLinks?: Establishment["socialLinks"];
  moreInformation?: { title: string; url: string }[];
};
export type EventSession = {
  date: string;
  startTime?: string;
  endTime?: string;
};
export type Event = Omit<
  BaseContent,
  "coverImage" | "shortDescription" | "description"
> & {
  title: string;
  subtitle: string;
  body: string;
  category: string;
  sessions: EventSession[];
  coverImage?: ImageAsset;
  imageFit?: "cover" | "contain";
  eventStatus?: "scheduled" | "cancelled" | "postponed";
  locationName?: string;
  address?: Address;
  organizer?: string;
  admission?: "free" | "paid";
  phone?: string;
  whatsapp?: string;
  email?: string;
  website?: string;
  socialLinks?: Establishment["socialLinks"];
};

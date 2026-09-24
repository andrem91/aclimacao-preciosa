import { validateEvent, sortedSessions } from "./events";
import establishments from "@/data/establishments.json";
import events from "@/data/events.json";
import places from "@/data/places.json";
import type { Establishment, Event, Place } from "@/types/content";
export { formatDate, formatPrice, formatAddress } from "./format";
export const getEstablishments = () =>
  (establishments as Establishment[]).filter((x) => x.status === "published");
export const getEstablishmentBySlug = (slug: string) =>
  getEstablishments().find((x) => x.slug === slug);
export const getFeaturedEstablishments = () =>
  getEstablishments().filter((x) => x.featured);
export const getEvents = () =>
  (events as Event[])
    .map((event) => {
      const errors = validateEvent(event);
      if (errors.length)
        throw new Error(`Evento ${event.slug}: ${errors.join("; ")}`);
      return event;
    })
    .filter((x) => x.status === "published")
    .sort((a, b) =>
      sortedSessions(a)[0].date.localeCompare(sortedSessions(b)[0].date),
    );
export const getEventBySlug = (slug: string) =>
  getEvents().find((x) => x.slug === slug);
export const getPlaces = () =>
  (places as Place[]).filter((x) => x.status === "published");
export const getPlaceBySlug = (slug: string) =>
  getPlaces().find((x) => x.slug === slug);
export const getFeaturedPlaces = () => getPlaces().filter((x) => x.featured);

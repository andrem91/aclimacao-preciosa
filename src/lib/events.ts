import type { Event } from "@/types/content";

export const eventStateLabels = {
  upcoming: "Em breve",
  ongoing: "Em andamento",
  ended: "Encerrado",
  cancelled: "Cancelado",
  postponed: "Adiado",
};
export function localClock(now: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const part = (name: string) => parts.find((p) => p.type === name)!.value;
  return {
    date: `${part("year")}-${part("month")}-${part("day")}`,
    time: `${part("hour")}:${part("minute")}`,
  };
}
export function sortedSessions(event: Event) {
  return [...event.sessions].sort(
    (a, b) =>
      a.date.localeCompare(b.date) ||
      (a.startTime || "00:00").localeCompare(b.startTime || "00:00"),
  );
}
function sessionEnd(session: Event["sessions"][number]) {
  return `${session.date}T${session.endTime || "24:00"}`;
}
function clockKey(now: Date) {
  const clock = localClock(now);
  return `${clock.date}T${clock.time}`;
}
export function nextSession(event: Event, now: Date) {
  return sortedSessions(event).find((s) => sessionEnd(s) > clockKey(now));
}
export function eventState(
  event: Event,
  now: Date,
): keyof typeof eventStateLabels {
  if (event.eventStatus === "cancelled" || event.eventStatus === "postponed")
    return event.eventStatus;
  const sessions = sortedSessions(event);
  if (!sessions.length) return "upcoming";
  const key = clockKey(now);
  if (key >= sessions.map(sessionEnd).sort().at(-1)!) return "ended";
  if (key >= `${sessions[0].date}T${sessions[0].startTime || "00:00"}`)
    return "ongoing";
  return "upcoming";
}
export function sessionTime(session: Event["sessions"][number]) {
  return session.startTime
    ? session.startTime + (session.endTime ? ` às ${session.endTime}` : "")
    : "Horário a confirmar";
}
export function sessionDate(date: string, full = false) {
  return new Intl.DateTimeFormat(
    "pt-BR",
    full
      ? {
          weekday: "long",
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: "UTC",
        }
      : { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" },
  )
    .format(new Date(date + "T12:00:00Z"))
    .replaceAll(" de ", " ");
}
export function eventDateLabel(event: Event) {
  const sessions = sortedSessions(event);
  const dates = [...new Set(sessions.map((s) => s.date))];
  if (!dates.length) return "Data a confirmar";
  if (dates.length === 1)
    return (
      sessionDate(dates[0]) +
      (sessions.length === 1
        ? ` · ${sessionTime(sessions[0])}`
        : ` · ${sessions.length} horários`)
    );
  const continuous = dates.every(
    (d, i) => i === 0 || Date.parse(d) - Date.parse(dates[i - 1]) === 86400000,
  );
  return continuous
    ? `${sessionDate(dates[0])} a ${sessionDate(dates[dates.length - 1])}`
    : `${dates.length} datas`;
}
export function sessionHighlight(event: Event, now: Date) {
  if (
    !["upcoming", "ongoing"].includes(eventState(event, now)) ||
    event.sessions.length < 2
  )
    return undefined;
  const session = nextSession(event, now);
  if (!session) return undefined;
  const current =
    clockKey(now) >= `${session.date}T${session.startTime || "00:00"}`;
  return `${current ? "Agora" : "Próxima sessão"}: ${sessionDate(session.date)} · ${sessionTime(session)}`;
}
export type EventFilters = { q: string; category: string; period: string };
const normalized = (value: string) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
export function filterEvents(
  events: Event[],
  filters: EventFilters,
  now: Date,
) {
  return events
    .filter((e) => {
      const state = eventState(e, now);
      if (filters.category && e.category !== filters.category) return false;
      if (
        filters.q &&
        !normalized(
          `${e.title} ${e.subtitle} ${e.locationName || ""}`,
        ).includes(normalized(filters.q.trim()))
      )
        return false;
      if (filters.period === "todos") return true;
      if (filters.period === "encerrados") return state === "ended";
      if (filters.period === "proximos") return state === "upcoming";
      if (filters.period === "em-andamento") return state === "ongoing";
      return state === "upcoming" || state === "ongoing";
    })
    .sort((a, b) => {
      if (filters.period === "encerrados")
        return sessionEnd(sortedSessions(b).at(-1)!).localeCompare(
          sessionEnd(sortedSessions(a).at(-1)!),
        );
      const first = (e: Event) => nextSession(e, now) || sortedSessions(e)[0];
      return `${first(a).date}T${first(a).startTime || "00:00"}`.localeCompare(
        `${first(b).date}T${first(b).startTime || "00:00"}`,
      );
    });
}
export function safeWebUrl(value?: string) {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return ["https:", "http:"].includes(url.protocol) ? url.href : undefined;
  } catch {
    return undefined;
  }
}
export function validateEvent(event: Event) {
  const errors: string[] = [];
  const validDate = (value: string) =>
    /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(Date.parse(value)) &&
    new Date(value).toISOString().slice(0, 10) === value;
  if (!event.sessions?.length) errors.push("Adicione pelo menos um dia");
  const seen = new Set<string>();
  for (const session of event.sessions || []) {
    if (!validDate(session.date)) errors.push("Data inválida");
    for (const t of [session.startTime, session.endTime])
      if (t && !/^([01]\d|2[0-3]):[0-5]\d$/.test(t))
        errors.push("Horário inválido");
    if (
      session.endTime &&
      (!session.startTime || session.endTime <= session.startTime)
    )
      errors.push("O término deve ser posterior ao início no mesmo dia");
    const key = session.date + "T" + (session.startTime || "");
    if (seen.has(key)) errors.push("Horário duplicado");
    seen.add(key);
  }
  if (event.admission && !["free", "paid"].includes(event.admission))
    errors.push("Entrada inválida");
  for (const url of [
    event.website,
    ...(event.socialLinks?.map((x) => x.url) || []),
  ])
    if (url && !safeWebUrl(url)) errors.push("Link inválido");
  if (
    event.eventStatus &&
    !["scheduled", "cancelled", "postponed"].includes(event.eventStatus)
  )
    errors.push("Situação inválida");
  if (event.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.email))
    errors.push("E-mail inválido");
  return errors;
}

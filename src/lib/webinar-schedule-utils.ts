import {
  upcomingWebinars,
  type WebinarSession,
} from "@/data/webinar-schedule";

const IST_TIMEZONE = "Asia/Kolkata";

export function formatWebinarDate(scheduledAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: IST_TIMEZONE,
  }).format(new Date(scheduledAt));
}

export function formatWebinarTime(scheduledAt: string): string {
  const time = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: IST_TIMEZONE,
  }).format(new Date(scheduledAt));

  return `${time} IST`;
}

export function formatWebinarShortDate(scheduledAt: string): {
  month: string;
  day: string;
  weekday: string;
} {
  const date = new Date(scheduledAt);

  return {
    month: new Intl.DateTimeFormat("en-US", {
      month: "short",
      timeZone: IST_TIMEZONE,
    }).format(date),
    day: new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      timeZone: IST_TIMEZONE,
    }).format(date),
    weekday: new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      timeZone: IST_TIMEZONE,
    }).format(date),
  };
}

export function isWebinarPast(webinar: WebinarSession): boolean {
  return new Date(webinar.scheduledAt).getTime() < Date.now();
}

export function isWebinarRegistrationAvailable(webinar: WebinarSession): boolean {
  if (webinar.registrationOpen === false) return false;
  return !isWebinarPast(webinar);
}

export function getUpcomingWebinars(
  sessions: WebinarSession[] = upcomingWebinars,
): WebinarSession[] {
  return sessions
    .filter(isWebinarRegistrationAvailable)
    .sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime(),
    );
}

export function formatWebinarOptionLabel(webinar: WebinarSession): string {
  return `${formatWebinarDate(webinar.scheduledAt)} · ${formatWebinarTime(webinar.scheduledAt)} · ${webinar.topic}`;
}

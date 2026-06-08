/**
 * Webinar schedule configuration — edit this file to update sessions anytime.
 * Each session needs a unique `id` and an ISO `scheduledAt` datetime (IST).
 * Registration auto-closes once `scheduledAt` has passed.
 */

export type WebinarSession = {
  id: string;
  /** ISO 8601 datetime, e.g. "2026-06-10T19:00:00+05:30" for 7:00 PM IST */
  scheduledAt: string;
  topic: string;
  /** Set to false to manually close registration before the session date */
  registrationOpen?: boolean;
};

export const webinarScheduleContent = {
  eyebrow: "Upcoming Webinar Schedule",
  title: "Join Our Live Webinars",
  description:
    "CYBERLABS conducts two live webinars every week, providing ongoing industry insight, career guidance, and cybersecurity awareness.",
  tableHeading: "Upcoming Sessions",
  tableColumns: {
    date: "Date",
    time: "Time",
    topic: "Webinar Topic",
    action: "Registration",
  },
  registerLabel: "Register Now",
  sessionEndedLabel: "Session Ended",
  upcomingLabel: "Upcoming",
  completedLabel: "Completed",
} as const;

export const backgroundOptions = [
  "Student",
  "IT Professional",
  "Security Professional",
  "Other",
] as const;

export type BackgroundOption = (typeof backgroundOptions)[number];

export const upcomingWebinars: WebinarSession[] = [
  {
    id: "future-careers",
    scheduledAt: "2026-05-28T19:00:00+05:30",
    topic: "The Future of Cybersecurity Careers",
  },
  {
    id: "ai-security",
    scheduledAt: "2026-06-01T19:00:00+05:30",
    topic: "AI Security & The Future of Cyber Defense",
  },
  {
    id: "dark-web",
    scheduledAt: "2026-06-04T19:00:00+05:30",
    topic: "Dark Web Intelligence & Cybercrime Trends",
  },
  {
    id: "detection-engineering",
    scheduledAt: "2026-06-10T19:00:00+05:30",
    topic: "Detection Engineering & Threat Hunting",
  },
  {
    id: "platform-security",
    scheduledAt: "2026-06-12T19:00:00+05:30",
    topic: "Platform Security & Trust & Safety",
  },
  {
    id: "identity-zero-trust",
    scheduledAt: "2026-06-17T19:00:00+05:30",
    topic: "Identity Security & Zero Trust",
  },
  {
    id: "future-skills",
    scheduledAt: "2026-06-19T19:00:00+05:30",
    topic: "Future Skills Cybersecurity Professionals Need",
  },
  {
    id: "ask-professionals",
    scheduledAt: "2026-06-24T19:00:00+05:30",
    topic: "Ask the Cyber Professionals",
  },
];

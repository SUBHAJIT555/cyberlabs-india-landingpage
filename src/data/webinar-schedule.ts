/**
 * Webinar schedule synced from the main CYBERLABS website.
 * Run `yarn sync:main-site` to refresh from ../cyberlabs-india-mainwebsite-latest
 */
export type {
  WebinarSpeaker,
  WebinarSession,
  BackgroundOption,
} from "@/data/generated/webinar-schedule";

export {
  defaultWebinarSpeakers,
  webinarScheduleContent,
  backgroundOptions,
  upcomingWebinars,
  webinarWhatsappNumber,
} from "@/data/generated/webinar-schedule";

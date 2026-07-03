import { MAIN_SITE_URL } from "@/data/main-site";
import type { MainSiteCatalog } from "@/types/main-site-catalog";
import type { MainSiteWebinarSchedule } from "@/types/webinar-schedule";

export type MainSiteLandingData = {
  catalog: MainSiteCatalog;
  webinar: MainSiteWebinarSchedule;
  source: "live" | "fallback";
};

const catalogBaseUrl =
  process.env.MAIN_SITE_CATALOG_URL?.replace(/\/$/, "") ??
  `${MAIN_SITE_URL}/landing-catalog`;

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.warn(`[main-site-data] ${response.status} for ${url}`);
      return null;
    }

    return (await response.json()) as T;
  } catch (error) {
    console.warn(`[main-site-data] Failed to fetch ${url}`, error);
    return null;
  }
}

async function fetchFallbackData(): Promise<MainSiteLandingData> {
  const [{ bootcamps, flagshipProgramCards, flagshipProgramImages, eliteBootcampIllustration, flagshipProgramIllustration }, webinarModule] =
    await Promise.all([
      import("@/data/generated/main-website-catalog"),
      import("@/data/generated/webinar-schedule"),
    ]);

  return {
    catalog: {
      bootcamps: [...bootcamps],
      flagshipProgramCards: [...flagshipProgramCards],
      flagshipProgramImages: [...flagshipProgramImages],
      eliteBootcampIllustration,
      flagshipProgramIllustration,
    },
    webinar: {
      upcomingWebinars: [...webinarModule.upcomingWebinars],
      webinarScheduleContent: webinarModule.webinarScheduleContent,
      defaultWebinarSpeakers: [...webinarModule.defaultWebinarSpeakers],
      backgroundOptions: [...webinarModule.backgroundOptions],
      webinarWhatsappNumber: webinarModule.webinarWhatsappNumber,
    },
    source: "fallback",
  };
}

export async function fetchMainSiteLandingData(): Promise<MainSiteLandingData> {
  const [catalog, webinar] = await Promise.all([
    fetchJson<MainSiteCatalog>(`${catalogBaseUrl}/catalog.json`),
    fetchJson<MainSiteWebinarSchedule>(`${catalogBaseUrl}/webinar-schedule.json`),
  ]);

  if (catalog && webinar) {
    return {
      catalog,
      webinar,
      source: "live",
    };
  }

  return fetchFallbackData();
}

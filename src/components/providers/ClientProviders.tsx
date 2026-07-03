"use client";

import type { ReactNode } from "react";
import { WebinarRegistrationProvider } from "@/context/webinar-registration";
import { MainSiteDataProvider } from "@/context/main-site-data";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import type { MainSiteLandingData } from "@/lib/fetch-main-site-data";

export function ClientProviders({
  children,
  landingData,
}: {
  children: ReactNode;
  landingData: MainSiteLandingData;
}) {
  return (
    <MainSiteDataProvider value={landingData}>
      <LenisProvider>
        <WebinarRegistrationProvider>
          {children}
          <ScrollToTop />
        </WebinarRegistrationProvider>
      </LenisProvider>
    </MainSiteDataProvider>
  );
}

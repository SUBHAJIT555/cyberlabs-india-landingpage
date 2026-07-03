"use client";

import type { ReactNode } from "react";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import type { MainSiteLandingData } from "@/lib/fetch-main-site-data";
import { LenisProvider } from "@/app/providers/LenisProvider";
import {
  MainSiteDataProvider,
  WebinarRegistrationProvider,
} from "@/features/landing/state";

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

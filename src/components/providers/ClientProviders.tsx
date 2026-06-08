"use client";

import type { ReactNode } from "react";
import { WebinarRegistrationProvider } from "@/context/webinar-registration";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <LenisProvider>
      <WebinarRegistrationProvider>
        {children}
        <ScrollToTop />
      </WebinarRegistrationProvider>
    </LenisProvider>
  );
}

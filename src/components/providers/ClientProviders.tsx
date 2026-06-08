"use client";

import type { ReactNode } from "react";
import { WebinarRegistrationProvider } from "@/context/webinar-registration";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <WebinarRegistrationProvider>
      {children}
      <ScrollToTop />
    </WebinarRegistrationProvider>
  );
}

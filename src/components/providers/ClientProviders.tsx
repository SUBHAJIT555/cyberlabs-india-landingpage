"use client";

import type { ReactNode } from "react";
import { WebinarRegistrationProvider } from "@/context/webinar-registration";

export function ClientProviders({ children }: { children: ReactNode }) {
  return <WebinarRegistrationProvider>{children}</WebinarRegistrationProvider>;
}

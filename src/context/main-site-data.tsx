"use client";

import {
  createContext,
  useContext,
  type ReactNode,
} from "react";
import type { MainSiteLandingData } from "@/lib/fetch-main-site-data";

const MainSiteDataContext = createContext<MainSiteLandingData | null>(null);

export function MainSiteDataProvider({
  value,
  children,
}: {
  value: MainSiteLandingData;
  children: ReactNode;
}) {
  return (
    <MainSiteDataContext.Provider value={value}>
      {children}
    </MainSiteDataContext.Provider>
  );
}

export function useMainSiteData(): MainSiteLandingData {
  const value = useContext(MainSiteDataContext);

  if (!value) {
    throw new Error("useMainSiteData must be used within MainSiteDataProvider");
  }

  return value;
}

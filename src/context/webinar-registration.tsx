"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { WebinarSession } from "@/types/webinar-schedule";
import { WebinarRegistrationModal } from "@/components/landing/WebinarRegistrationModal";

type WebinarRegistrationContextValue = {
  openRegistration: (webinar?: WebinarSession) => void;
  closeRegistration: () => void;
  selectedWebinar: WebinarSession | null;
  isOpen: boolean;
};

const WebinarRegistrationContext =
  createContext<WebinarRegistrationContextValue | null>(null);

export function WebinarRegistrationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [selectedWebinar, setSelectedWebinar] = useState<WebinarSession | null>(
    null,
  );
  const [isOpen, setIsOpen] = useState(false);

  const openRegistration = useCallback((webinar?: WebinarSession) => {
    setSelectedWebinar(webinar ?? null);
    setIsOpen(true);
  }, []);

  const closeRegistration = useCallback(() => {
    setIsOpen(false);
    setSelectedWebinar(null);
  }, []);

  const value = useMemo(
    () => ({
      openRegistration,
      closeRegistration,
      selectedWebinar,
      isOpen,
    }),
    [openRegistration, closeRegistration, selectedWebinar, isOpen],
  );

  return (
    <WebinarRegistrationContext.Provider value={value}>
      {children}
      <WebinarRegistrationModal
        isOpen={isOpen}
        webinar={selectedWebinar}
        onClose={closeRegistration}
      />
    </WebinarRegistrationContext.Provider>
  );
}

export function useWebinarRegistration() {
  const context = useContext(WebinarRegistrationContext);
  if (!context) {
    throw new Error(
      "useWebinarRegistration must be used within WebinarRegistrationProvider",
    );
  }
  return context;
}

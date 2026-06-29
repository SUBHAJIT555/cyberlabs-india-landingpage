"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import GradientText from "@/components/ui/GradientText";
import {
  webinarScheduleContent,
  type WebinarSession,
} from "@/data/webinar-schedule";
import {
  buildWebinarWhatsappUrl,
  extractFocusText,
  formatWebinarDateWithWeekday,
  formatWebinarShortDate,
  formatWebinarTime,
  isWebinarPast,
  isWebinarRegistrationAvailable,
  splitWebinarTopic,
} from "@/lib/webinar-schedule-utils";
import { useWebinarRegistration } from "@/context/webinar-registration";

type WebinarDetailsModalProps = {
  isOpen: boolean;
  webinar: WebinarSession | null;
  onClose: () => void;
};

const backdropTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

const panelSpring = {
  type: "spring" as const,
  damping: 34,
  stiffness: 280,
  mass: 0.9,
};

function useIsMobile(breakpoint = 640) {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(`(max-width: ${breakpoint - 1}px)`).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const update = () => setIsMobile(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, [breakpoint]);

  return isMobile;
}

function ModalPatternBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #e5e5e5 0, #e5e5e5 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #e5e5e5 0, #e5e5e5 1px, transparent 0, transparent 50%)",
        backgroundSize: "5px 5px",
        opacity: 0.55,
      }}
    />
  );
}

function RegisterIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
      <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </svg>
  );
}

export function WebinarDetailsModal({
  isOpen,
  webinar,
  onClose,
}: WebinarDetailsModalProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen ? (
        webinar ? (
          <WebinarDetailsModalPanel
            webinar={webinar}
            onClose={onClose}
            isMobile={isMobile}
          />
        ) : null
      ) : null}
    </AnimatePresence>
  );
}

function WebinarDetailsModalPanel({
  webinar,
  onClose,
  isMobile,
}: {
  webinar: WebinarSession;
  onClose: () => void;
  isMobile: boolean;
}) {
  const { openRegistration } = useWebinarRegistration();
  const isPast = isWebinarPast(webinar);
  const canRegister = isWebinarRegistrationAvailable(webinar);
  const shortDate = formatWebinarShortDate(webinar.scheduledAt);
  const whatsappUrl = buildWebinarWhatsappUrl(webinar);
  const { topicsLabel, speakersLabel } = webinarScheduleContent;
  const { main, focus } = splitWebinarTopic(webinar.topic);
  const focusText = extractFocusText(focus);

  const handleRegister = () => {
    onClose();
    openRegistration(webinar);
  };

  return (
        <motion.div
          className="fixed inset-0 z-100 flex items-stretch justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={backdropTransition}
          role="dialog"
          aria-modal="true"
          aria-labelledby="webinar-details-title"
        >
          <motion.button
            type="button"
            aria-label="Close webinar details"
            className="absolute inset-0 bg-zinc-900/55 backdrop-blur-[3px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={backdropTransition}
            onClick={onClose}
          />

          <motion.div
            initial={
              isMobile
                ? { y: "100%" }
                : { opacity: 0, y: 28, scale: 0.96 }
            }
            animate={isMobile ? { y: 0 } : { opacity: 1, y: 0, scale: 1 }}
            exit={
              isMobile
                ? { y: "100%" }
                : { opacity: 0, y: 20, scale: 0.98 }
            }
            transition={panelSpring}
            className="relative z-10 flex h-dvh w-full max-w-none flex-col overflow-hidden rounded-none border-0 bg-neutral-50 sm:h-auto sm:max-h-[min(88dvh,720px)] sm:max-w-xl sm:rounded-3xl sm:border sm:border-dashed sm:border-neutral-200 sm:shadow-2xl sm:shadow-zinc-900/10"
          >
            <ModalPatternBackground />

            <div className="relative z-10 shrink-0 border-b border-dashed border-zinc-200 px-5 pb-5 pt-[max(1.25rem,env(safe-area-inset-top))] sm:px-6 sm:pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <span className="inline-flex items-center gap-2 rounded-lg border border-dotted border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                    <GradientText
                      className="text-xs font-semibold uppercase tracking-[0.14em]"
                      colors={[
                        "#52525b",
                        "#2563eb",
                        "#3f3f46",
                        "#1d4ed8",
                        "#52525b",
                      ]}
                      animationSpeed={4}
                      direction="horizontal"
                      showBorder={false}
                      pauseOnHover={false}
                    >
                      {webinarScheduleContent.detailsModalEyebrow}
                    </GradientText>
                  </span>

                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <div
                      className={cn(
                        "flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl border border-dotted border-zinc-200 text-center shadow-sm",
                        isPast
                          ? "bg-zinc-100 text-zinc-400"
                          : "bg-white text-zinc-900",
                      )}
                    >
                      <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
                        {shortDate.month}
                      </span>
                      <span className="text-2xl font-semibold leading-none">
                        {shortDate.day}
                      </span>
                      <span className="mt-0.5 text-[10px] font-medium text-zinc-500">
                        {shortDate.weekday}
                      </span>
                    </div>

                    <div className="min-w-0">
                      <span
                        className={cn(
                          "inline-flex rounded-md border border-dotted border-zinc-200 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]",
                          isPast
                            ? "bg-zinc-200 text-zinc-500"
                            : "bg-emerald-50 text-emerald-700",
                        )}
                      >
                        {isPast
                          ? webinarScheduleContent.completedLabel
                          : webinarScheduleContent.upcomingLabel}
                      </span>
                      <p className="mt-2 text-sm font-medium text-zinc-700">
                        {formatWebinarTime(webinar.scheduledAt)}
                      </p>
                      <p className="mt-0.5 text-sm text-zinc-500">
                        {formatWebinarDateWithWeekday(webinar.scheduledAt)}
                      </p>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close"
                  className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-white text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
                >
                  <CloseIcon />
                </button>
              </div>
            </div>

            <div
              className="relative z-10 min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6"
              data-lenis-prevent
            >
              <h2
                id="webinar-details-title"
                className="sr-only"
              >
                {webinar.topic}
              </h2>

              <section className="rounded-2xl border border-dashed border-zinc-200 bg-white/80 p-4 sm:p-5">
                <p className="text-xs font-semibold tracking-[0.08em] text-zinc-500">
                  {topicsLabel}
                </p>
                <p
                  className={cn(
                    "mt-2 text-lg font-semibold leading-snug sm:text-xl",
                    isPast ? "text-zinc-500" : "text-zinc-900",
                  )}
                >
                  {main}
                  {focusText ? (
                    <span className="mt-2 block text-base font-normal text-zinc-600 sm:text-lg">
                      <span className="font-semibold text-zinc-700">Focus:</span>{" "}
                      {focusText}
                    </span>
                  ) : null}
                </p>
              </section>

              <section className="mt-4 rounded-2xl border border-dashed border-zinc-200 bg-white/80 p-4 sm:p-5">
                <p className="text-xs font-semibold tracking-[0.08em] text-zinc-500">
                  {speakersLabel}
                </p>
                <ul className="mt-3 space-y-3">
                  {webinar.speakers.map((speaker) => (
                    <li
                      key={speaker.name}
                      className="rounded-xl border border-dashed border-zinc-200 bg-zinc-50/60 px-4 py-3"
                    >
                      <p
                        className={cn(
                          "text-base font-semibold",
                          isPast ? "text-zinc-500" : "text-zinc-900",
                        )}
                      >
                        {speaker.name}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-zinc-600">
                        {speaker.title}
                      </p>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="relative z-10 shrink-0 border-t border-dashed border-zinc-200 px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
              {isPast || !canRegister ? (
                <button
                  type="button"
                  disabled
                  className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-400"
                >
                  {webinarScheduleContent.sessionEndedLabel}
                </button>
              ) : (
                <div className="flex flex-col gap-2.5 sm:flex-row">
                  <button
                    type="button"
                    onClick={handleRegister}
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
                  >
                    <RegisterIcon />
                    {webinarScheduleContent.registerLabel}
                  </button>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
                  >
                    <WhatsAppIcon />
                    {webinarScheduleContent.whatsappLabel}
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
  );
}

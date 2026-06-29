"use client";

import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";
import { WebinarDetailsModal } from "@/components/landing/WebinarDetailsModal";
import { useWebinarRegistration } from "@/context/webinar-registration";
import {
  upcomingWebinars,
  webinarScheduleContent,
  type WebinarSession,
} from "@/data/webinar-schedule";
import {
  buildWebinarWhatsappUrl,
  formatWebinarDate,
  formatWebinarShortDate,
  formatWebinarTime,
  isWebinarPast,
  isWebinarRegistrationAvailable,
} from "@/lib/webinar-schedule-utils";

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

const desktopGridClassName =
  "md:grid md:grid-cols-[7rem_6rem_minmax(0,1fr)_11rem] md:items-start md:gap-5 md:px-6";

function WebinarDetailsBlock({
  webinar,
  isPast,
}: {
  webinar: WebinarSession;
  isPast: boolean;
}) {
  const { topicsLabel, speakersLabel } = webinarScheduleContent;

  return (
    <div className="space-y-3">
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

      <div>
        <p className="text-xs font-semibold tracking-[0.08em] text-zinc-500">
          {topicsLabel}
        </p>
        <p
          className={cn(
            "mt-1 text-base font-semibold leading-snug",
            isPast ? "text-zinc-500" : "text-zinc-900",
          )}
        >
          {webinar.topic}
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold tracking-[0.08em] text-zinc-500">
          {speakersLabel}
        </p>
        <p
          className={cn(
            "mt-1 text-sm leading-relaxed text-zinc-600",
            isPast && "text-zinc-500",
          )}
        >
          {webinar.speakers.map((speaker, index) => (
            <span key={speaker.name}>
              {index > 0 ? ", " : null}
              <span
                className={cn(
                  "text-[15px] font-semibold",
                  isPast ? "text-zinc-500" : "text-zinc-900",
                )}
              >
                {speaker.name}
              </span>{" "}
              ({speaker.title})
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}

function SessionActions({
  webinar,
  onActionClick,
}: {
  webinar: WebinarSession;
  onActionClick: (event: React.MouseEvent) => void;
}) {
  const { openRegistration } = useWebinarRegistration();
  const isPast = isWebinarPast(webinar);
  const canRegister = isWebinarRegistrationAvailable(webinar);
  const whatsappUrl = buildWebinarWhatsappUrl(webinar);

  if (isPast || !canRegister) {
    return (
      <div onClick={onActionClick}>
        <button
          type="button"
          disabled
          className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-400"
        >
          {webinarScheduleContent.sessionEndedLabel}
        </button>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-2" onClick={onActionClick}>
      <button
        type="button"
        onClick={() => openRegistration(webinar)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-900 bg-zinc-900 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 cursor-pointer"
      >
        <RegisterIcon />
        {webinarScheduleContent.registerLabel}
      </button>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-600 bg-emerald-600 px-3 py-2.5 text-sm font-medium text-white transition hover:bg-emerald-700"
      >
        <WhatsAppIcon />
        {webinarScheduleContent.whatsappLabel}
      </a>
    </div>
  );
}

function SessionRow({
  webinar,
  onSelect,
}: {
  webinar: WebinarSession;
  onSelect: (webinar: WebinarSession) => void;
}) {
  const isPast = isWebinarPast(webinar);
  const shortDate = formatWebinarShortDate(webinar.scheduledAt);
  const columns = webinarScheduleContent.tableColumns;

  return (
    <li
      className={cn(
        "group border-b border-zinc-200 transition last:border-b-0",
        isPast ? "bg-zinc-50/80" : "bg-white hover:bg-zinc-50/40",
      )}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onSelect(webinar)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onSelect(webinar);
          }
        }}
        aria-label={`View details for ${webinar.topic}`}
        className={cn(
          "flex w-full cursor-pointer flex-col gap-4 px-4 py-4 text-left outline-none transition sm:px-5 md:py-0",
          "focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-300",
          desktopGridClassName,
        )}
      >
        <div className="flex items-center gap-3 md:self-center md:py-5">
          <div
            className={cn(
              "flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-dotted border-zinc-200 text-center",
              isPast
                ? "bg-zinc-100 text-zinc-400"
                : "bg-white text-zinc-900 shadow-sm",
            )}
          >
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em]">
              {shortDate.month}
            </span>
            <span className="text-xl font-semibold leading-none">
              {shortDate.day}
            </span>
            <span className="mt-0.5 text-[10px] font-medium text-zinc-500">
              {shortDate.weekday}
            </span>
          </div>

          <div className="min-w-0 flex-1 md:hidden">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">
              {columns.date}
            </p>
            <p className="mt-0.5 text-sm font-medium text-zinc-800">
              {formatWebinarDate(webinar.scheduledAt)}
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400">
              {columns.time}
            </p>
            <p
              className={cn(
                "mt-0.5 text-sm font-medium",
                isPast ? "text-zinc-400" : "text-zinc-700",
              )}
            >
              {formatWebinarTime(webinar.scheduledAt)}
            </p>
          </div>
        </div>

        <div className="hidden md:block md:self-center md:py-5">
          <p
            className={cn(
              "text-sm font-medium",
              isPast ? "text-zinc-400" : "text-zinc-700",
            )}
          >
            {formatWebinarTime(webinar.scheduledAt)}
          </p>
        </div>

        <div className="md:border-x md:border-zinc-200 md:px-5 md:py-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400 md:hidden">
            {columns.details}
          </p>
          <WebinarDetailsBlock webinar={webinar} isPast={isPast} />
        </div>

        <div
          className="md:self-center md:py-5"
          onClick={(event) => event.stopPropagation()}
          onKeyDown={(event) => event.stopPropagation()}
        >
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400 md:hidden">
            {columns.action}
          </p>
          <SessionActions
            webinar={webinar}
            onActionClick={(event) => event.stopPropagation()}
          />
        </div>
      </div>
    </li>
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

export function WebinarScheduleSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [detailsWebinar, setDetailsWebinar] = useState<WebinarSession | null>(
    null,
  );
  const columns = webinarScheduleContent.tableColumns;
  const sortedWebinars = [...upcomingWebinars].sort((a, b) => {
    const aPast = isWebinarPast(a);
    const bPast = isWebinarPast(b);
    if (aPast !== bPast) return aPast ? 1 : -1;
    return (
      new Date(a.scheduledAt).getTime() - new Date(b.scheduledAt).getTime()
    );
  });

  const upcomingCount = sortedWebinars.filter(
    (webinar) => !isWebinarPast(webinar),
  ).length;

  return (
    <section
      id="webinars"
      ref={timelineRef}
      className=" px-4 py-16 md:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="inline-flex items-center gap-2 rounded-lg border border-dotted border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] shadow-sm"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          <GradientText
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            colors={["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"]}
            animationSpeed={4}
            direction="horizontal"
            showBorder={false}
            pauseOnHover={false}
          >
            {webinarScheduleContent.eyebrow}
          </GradientText>
        </TimelineContent>

        <TimelineContent
          as="h2"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-4 text-pretty"
        >
          <ShinyText
            text={webinarScheduleContent.title}
            className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl"
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={3}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-4 max-w-3xl text-sm leading-relaxed text-zinc-600 md:text-base"
        >
          {webinarScheduleContent.description}
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={4}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        >
          <h3 className="text-lg font-semibold text-zinc-900 md:text-xl">
            {webinarScheduleContent.tableHeading}
          </h3>
          <p className="text-sm">
            <GradientText
              className="m-0! text-sm font-medium!"
              colors={["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"]}
              animationSpeed={4}
              direction="horizontal"
              showBorder={false}
              pauseOnHover={false}
            >
              {upcomingCount} upcoming session{upcomingCount === 1 ? "" : "s"}
            </GradientText>
          </p>
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={5}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-5 overflow-hidden border border-zinc-300 bg-white border-dotted"
        >
          <div
            className={cn(
              "hidden border-b border-zinc-200 bg-zinc-50/80",
              desktopGridClassName,
            )}
          >
            <div className="py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {columns.date}
            </div>
            <div className="py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {columns.time}
            </div>
            <div className="border-x border-zinc-200 px-5 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {columns.details}
            </div>
            <div className="py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {columns.action}
            </div>
          </div>

          <ul>
            {sortedWebinars.map((webinar) => (
              <SessionRow
                key={webinar.id}
                webinar={webinar}
                onSelect={setDetailsWebinar}
              />
            ))}
          </ul>
        </TimelineContent>
      </div>

      <WebinarDetailsModal
        isOpen={detailsWebinar !== null}
        webinar={detailsWebinar}
        onClose={() => setDetailsWebinar(null)}
      />
    </section>
  );
}

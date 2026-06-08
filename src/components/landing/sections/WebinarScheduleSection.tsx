"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";
import { useWebinarRegistration } from "@/context/webinar-registration";
import {
  upcomingWebinars,
  webinarScheduleContent,
  type WebinarSession,
} from "@/data/webinar-schedule";
import {
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

function RegisterButton({ webinar }: { webinar: WebinarSession }) {
  const { openRegistration } = useWebinarRegistration();
  const isPast = isWebinarPast(webinar);
  const canRegister = isWebinarRegistrationAvailable(webinar);

  if (isPast || !canRegister) {
    return (
      <button
        type="button"
        disabled
        className="inline-flex w-full cursor-not-allowed items-center justify-center rounded-xl border border-zinc-200 bg-zinc-100 px-4 py-2.5 text-sm font-medium text-zinc-400 md:w-auto"
      >
        {webinarScheduleContent.sessionEndedLabel}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => openRegistration(webinar)}
      className="inline-flex w-full items-center justify-center rounded-xl border border-zinc-900 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 md:w-auto"
    >
      {webinarScheduleContent.registerLabel}
    </button>
  );
}

function SessionRow({ webinar }: { webinar: WebinarSession }) {
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
      <div className="flex flex-col gap-3 px-4 py-4 sm:px-5 md:grid md:grid-cols-[7.5rem_6.5rem_minmax(0,1fr)_8.5rem] md:items-center md:gap-6 md:px-6 md:py-0">
        <div className="flex items-center gap-3 md:py-5">
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

        <div className="hidden md:block md:py-5">
          <p
            className={cn(
              "text-sm font-medium",
              isPast ? "text-zinc-400" : "text-zinc-700",
            )}
          >
            {formatWebinarTime(webinar.scheduledAt)}
          </p>
        </div>

        <div className="md:border-x md:border-zinc-200 md:px-6 md:py-5">
          <div className="flex flex-wrap items-center gap-2">
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
          </div>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-400 md:mt-1.5 md:hidden">
            {columns.topic}
          </p>
          <p
            className={cn(
              "mt-1 text-base font-semibold leading-snug md:mt-1.5",
              isPast ? "text-zinc-500" : "text-zinc-900",
            )}
          >
            {webinar.topic}
          </p>
          <p className="mt-1 hidden text-sm text-zinc-500 md:block">
            {formatWebinarDate(webinar.scheduledAt)}
          </p>
        </div>

        <div className="md:py-5 md:flex md:justify-end">
          <RegisterButton webinar={webinar} />
        </div>
      </div>
    </li>
  );
}

export function WebinarScheduleSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
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
          <p className="text-sm text-zinc-500">
            {upcomingCount} upcoming session{upcomingCount === 1 ? "" : "s"}
          </p>
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={5}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-5 overflow-hidden border border-zinc-500 bg-white border-dotted"
        >
          <div className="hidden border-b border-zinc-200 bg-zinc-50/80 md:grid md:grid-cols-[7.5rem_6.5rem_minmax(0,1fr)_8.5rem] md:gap-6 md:px-6">
            <div className="py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {columns.date}
            </div>
            <div className="py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {columns.time}
            </div>
            <div className="border-x border-zinc-200 px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {columns.topic}
            </div>
            <div className="py-3.5 text-right text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
              {columns.action}
            </div>
          </div>

          <ul>
            {sortedWebinars.map((webinar) => (
              <SessionRow key={webinar.id} webinar={webinar} />
            ))}
          </ul>
        </TimelineContent>
      </div>
    </section>
  );
}

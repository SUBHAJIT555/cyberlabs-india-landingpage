"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { CandyButton } from "@/components/ui/candy-button";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";
import { mainSiteUrl } from "@/data/main-site";

const careerBenefits = [
  "Position yourself for promotions and leadership opportunities",
  "Increase your professional value within your organization",
  "Improve your earning potential",
  "Access international career opportunities",
  "Transition into higher-demand cybersecurity roles",
  "Develop specialist expertise that differentiates you from other candidates",
];

const bootCampAreas = [
  { label: "AI Security", icon: <CodeAiIcon /> },
  { label: "Threat Hunting", icon: <Radar2Icon /> },
  { label: "Detection Engineering", icon: <SettingsBoltIcon /> },
  { label: "Cyber Intelligence", icon: <Cube3dSphereIcon /> },
  { label: "Digital Investigations", icon: <FingerprintIcon /> },
  { label: "Platform Security", icon: <ShieldCodeIcon /> },
  { label: "Security Operations", icon: <ActivityHeartbeatIcon /> },
];

const bootCampGoals = [
  "Develop specialized expertise",
  "Increase their market value",
  "Improve promotion prospects",
  "Support salary growth",
  "Transition into emerging cybersecurity domains",
  "Stay ahead of evolving industry requirements",
];

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.1,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-dotted border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      <GradientText
        className="text-xs font-semibold uppercase tracking-[0.14em]"
        colors={["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"]}
        animationSpeed={4}
        direction="horizontal"
        showBorder={false}
        pauseOnHover={false}
      >
        {children}
      </GradientText>
    </span>
  );
}

const bootCampIconClass = "h-4 w-4 sm:h-[18px] sm:w-[18px]";

function CodeAiIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={bootCampIconClass}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l3.111 3.111" />
      <path d="M14 4l-2.175 8.7" />
      <path d="M14 21v-4a2 2 0 1 1 4 0v4" />
      <path d="M14 19h4" />
      <path d="M21 15v6" />
    </svg>
  );
}

function Radar2Icon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={bootCampIconClass}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M15.51 15.56a5 5 0 1 0 -3.51 1.44" />
      <path d="M18.832 17.86a9 9 0 1 0 -6.832 3.14" />
      <path d="M12 12v9" />
    </svg>
  );
}

function SettingsBoltIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={bootCampIconClass}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M13.256 20.473c-.855 .907 -2.583 .643 -2.931 -.79a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.07 .26 1.488 1.29 1.254 2.15" />
      <path d="M19 16l-2 3h4l-2 3" />
      <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
    </svg>
  );
}

function Cube3dSphereIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={bootCampIconClass}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 17.6l-2 -1.1v-2.5" />
      <path d="M4 10v-2.5l2 -1.1" />
      <path d="M10 4.1l2 -1.1l2 1.1" />
      <path d="M18 6.4l2 1.1v2.5" />
      <path d="M20 14v2.5l-2 1.12" />
      <path d="M14 19.9l-2 1.1l-2 -1.1" />
      <path d="M12 12l2 -1.1" />
      <path d="M18 8.6l2 -1.1" />
      <path d="M12 12l0 2.5" />
      <path d="M12 18.5l0 2.5" />
      <path d="M12 12l-2 -1.12" />
      <path d="M6 8.6l-2 -1.1" />
    </svg>
  );
}

function FingerprintIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={bootCampIconClass}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18.9 7a8 8 0 0 1 1.1 5v1a6 6 0 0 0 .8 3" />
      <path d="M8 11a4 4 0 0 1 8 0v1a10 10 0 0 0 2 6" />
      <path d="M12 11v2a14 14 0 0 0 2.5 8" />
      <path d="M8 15a18 18 0 0 0 1.8 6" />
      <path d="M4.9 19a22 22 0 0 1 -.9 -7v-1a8 8 0 0 1 12 -6.95" />
    </svg>
  );
}

function ShieldCodeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={bootCampIconClass}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 21a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.078 7.024" />
      <path d="M20 21l2 -2l-2 -2" />
      <path d="M17 17l-2 2l2 2" />
    </svg>
  );
}

function ActivityHeartbeatIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={bootCampIconClass}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 12h4.5l1.5 -6l4 12l2 -9l1.5 3h4.5" />
    </svg>
  );
}

function ArrowNarrowRightDashedIcon() {
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
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12h.5m3 0h1.5m3 0h6" />
      <path d="M15 16l4 -4" />
      <path d="M15 8l4 4" />
    </svg>
  );
}

function SplitChecklist({
  items,
  timelineRef,
}: {
  items: string[];
  timelineRef: React.RefObject<HTMLDivElement | null>;
}) {
  const half = Math.ceil(items.length / 2);
  const columns = [items.slice(0, half), items.slice(half)];

  return (
    <div className="mt-8 border-y border-zinc-200">
      <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200">
        {columns.map((column, colIndex) => (
          <ul
            key={colIndex}
            className={cn(colIndex === 0 ? "md:pr-10" : "md:pl-10")}
          >
            {column.map((item, rowIndex) => (
              <TimelineContent
                key={item}
                as="li"
                animationNum={colIndex * half + rowIndex + 1}
                timelineRef={timelineRef}
                customVariants={revealVariants}
                className={cn(
                  "group flex items-start gap-3 py-4",
                  rowIndex !== column.length - 1 && "border-b border-zinc-200",
                )}
              >
                <span
                  aria-hidden
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center text-emerald-600 transition-transform group-hover:translate-x-0.5 group-hover:scale-110"
                >
                  <ArrowNarrowRightDashedIcon />
                </span>
                <span className="text-sm leading-relaxed text-zinc-700 transition-colors group-hover:text-zinc-900 md:text-base">
                  {item}
                </span>
              </TimelineContent>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function CareerBenefitsSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section id="career" ref={timelineRef} className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Block 1 — Career benefits */}
        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
        >
          <Eyebrow>Career Growth</Eyebrow>
        </TimelineContent>

        <TimelineContent
          as="h2"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-4 text-pretty"
        >
          <ShinyText
            text="How CYBERLABS Programs Can Advance Your Career"
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
          CYBERLABS brings together free webinars, elite bootcamps, and
          flagship cyber defense programs — so you can start with career
          clarity, build specialized skills, and grow into advanced roles at
          your own pace.
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={4}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 md:text-base"
        >
          Guided by active practitioners and leadership with real operational
          experience, our pathway focuses on practical capability — not generic
          advice or certifications alone.
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={5}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-6 text-base font-semibold text-zinc-900 md:text-lg"
        >
          Whether you attend a webinar, join an elite bootcamp, or enroll in a
          flagship program, CYBERLABS helps you:
        </TimelineContent>

        <SplitChecklist items={careerBenefits} timelineRef={timelineRef} />

        {/* Divider */}
        <div className="my-14 flex items-center gap-4 md:my-16">
          
        </div>

        {/* Block 2 — Bootcamps & flagship cyber defense programs */}
        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
        >
          <Eyebrow>Cyber Defense Programs</Eyebrow>
        </TimelineContent>

        <TimelineContent
          as="h3"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-4 text-pretty"
        >
          <ShinyText
            text="From Elite Bootcamps to Flagship Cyber Defense Programs"
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
          CYBERLABS offers two pathways for professionals ready to move beyond
          awareness into real capability:{" "}
          <span className="font-medium text-zinc-800">
            30–50 hour Elite Bootcamps
          </span>{" "}
          for focused specialization, and{" "}
          <span className="font-medium text-zinc-800">
            145–450 hour Flagship Cyber Defense Programs
          </span>{" "}
          for deep, career-defining expertise.
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={4}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 md:text-base"
        >
          Together, they help you build specialized skills across domains such
          as:
        </TimelineContent>

        {/* Program specialization areas */}
        <TimelineContent
          as="div"
          animationNum={5}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-6 flex flex-wrap gap-2 sm:gap-2.5"
        >
          {bootCampAreas.map((area) => (
            <motion.span
              key={area.label}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-dotted border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-colors hover:border-zinc-300 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
            >
              <span
                aria-hidden
                className="flex shrink-0 items-center justify-center text-blue-600"
              >
                {area.icon}
              </span>
              {area.label}
            </motion.span>
          ))}
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={6}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-10 max-w-3xl text-base font-semibold text-zinc-900 md:text-lg"
        >
          Whether you choose a focused elite bootcamp or a comprehensive
          flagship cyber defense program, CYBERLABS is designed for working
          professionals seeking to:
        </TimelineContent>

        <SplitChecklist items={bootCampGoals} timelineRef={timelineRef} />

        <TimelineContent
          as="div"
          animationNum={12}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="relative mt-14 overflow-hidden border border-zinc-200 border-dashed bg-white px-6 py-12 text-center md:mt-16 md:py-16"
        >
          <div
            aria-hidden
            className="absolute inset-0 z-0"
            style={{
              background:
                "linear-gradient(to bottom, var(--background) 0%, var(--background) 50%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at 50% 120%, #a1a1aa 0%, var(--background) 80%)",
              opacity: 0.75,
            }}
          >
            <div
              style={{
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 70%)",
                backgroundImage:
                  "repeating-conic-gradient(from 0deg at 50% 100%, #71717a 0deg, #71717a 2deg, transparent 2deg, transparent 10deg)",
                bottom: "-20%",
                height: "100%",
                left: "50%",
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
                opacity: 0.2,
                pointerEvents: "none",
                position: "absolute",
                transform: "translateX(-50%)",
                width: "200%",
              }}
            />
          </div>
          <p className="relative z-10 mx-auto mb-6 max-w-3xl text-xl font-semibold leading-relaxed text-blue-600 md:text-3xl">
            Organizations are increasingly looking for professionals with
            practical skills and operational capability-not simply
            certifications.
          </p>
          <CandyButton
            href={mainSiteUrl("/certification-and-evaluation-framework/")}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 w-full rounded-lg! border-zinc-800! bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)]! px-6! py-3! text-sm! text-white shadow-none! active:rotate-0 sm:w-auto"
          >
            Certification & Evaluation Framework
          </CandyButton>
        </TimelineContent>
      </div>
    </section>
  );
}

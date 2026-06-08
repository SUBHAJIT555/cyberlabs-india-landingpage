"use client";

import Image from "next/image";
import { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { FeatureCard } from "@/components/ui/feature-card";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";

const WHY_IMAGE =
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1400&auto=format&fit=crop";

const differentiators = [
  "Most cybersecurity webinars focus on tools.",
  "Some focus on certifications.",
  "Others focus on teaching a few technical concepts.",
];

const benefits = [
  { icon: <CompassIcon />, text: "Where the cybersecurity industry is heading" },
  {
    icon: <BuildingSkyscraperIcon />,
    text: "What multinational organizations are actually looking for",
  },
  {
    icon: <GitBranchIcon />,
    text: "Which cybersecurity specializations are growing fastest",
  },
  {
    icon: <TimelineEventPlusIcon />,
    text: "What skills will matter over the next 5–10 years",
  },
  {
    icon: <RobotFaceIcon />,
    text: "How AI is transforming cybersecurity careers",
  },
  {
    icon: <RocketIcon />,
    text: "How to position yourself for future opportunities",
  },
];

function CompassIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M8 16l2 -6l6 -2l-2 6l-6 2" />
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
      <path d="M12 3l0 2" />
      <path d="M12 19l0 2" />
      <path d="M3 12l2 0" />
      <path d="M19 12l2 0" />
    </svg>
  );
}

function BuildingSkyscraperIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 21l18 0" />
      <path d="M5 21v-14l8 -4v18" />
      <path d="M19 21v-10l-6 -4" />
      <path d="M9 9l0 .01" />
      <path d="M9 12l0 .01" />
      <path d="M9 15l0 .01" />
      <path d="M9 18l0 .01" />
    </svg>
  );
}

function GitBranchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 18a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M5 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M15 6a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M7 8l0 8" />
      <path d="M9 18h6a2 2 0 0 0 2 -2v-5" />
      <path d="M14 14l3 -3l3 3" />
    </svg>
  );
}

function TimelineEventPlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M10 20a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
      <path d="M10 20h-6" />
      <path d="M14 20h6" />
      <path d="M12 15l-2 -2h-3a1 1 0 0 1 -1 -1v-8a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v8a1 1 0 0 1 -1 1h-3l-2 2" />
      <path d="M10 8h4" />
      <path d="M12 6v4" />
    </svg>
  );
}

function RobotFaceIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M6 5h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2" />
      <path d="M9 16c1 .667 2 1 3 1s2 -.333 3 -1" />
      <path d="M9 7l-1 -4" />
      <path d="M15 7l1 -4" />
      <path d="M9 12v-1" />
      <path d="M15 12v-1" />
    </svg>
  );
}

function RocketIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 13a8 8 0 0 1 7 7a6 6 0 0 0 3 -5a9 9 0 0 0 6 -8a3 3 0 0 0 -3 -3a9 9 0 0 0 -8 6a6 6 0 0 0 -5 3" />
      <path d="M7 14a6 6 0 0 0 -3 6a6 6 0 0 0 6 -3" />
      <path d="M15 9m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
    </svg>
  );
}

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.15,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

export function WhyAttendSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section id="why" ref={timelineRef} className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        {/* Intro: narrative + image */}
        <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-14">
          <div>
            <TimelineContent
              as="div"
              animationNum={1}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 border-dotted  px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] shadow-sm"
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
                Why CYBERLABS INDIA
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
                text="Why Attend a CYBERLABS Webinar?"
                className="text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl"
                color="#3f3f46"
                shineColor="#18181b"
                speed={3}
                spread={120}
              />
            </TimelineContent>

            <TimelineContent
              as="ul"
              animationNum={3}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="mt-6 space-y-2 border-l-2 border-zinc-200 pl-4"
            >
              {differentiators.map((line) => (
                <li
                  key={line}
                  className="text-sm leading-relaxed text-zinc-500 md:text-base"
                >
                  {line}
                </li>
              ))}
            </TimelineContent>

            <TimelineContent
              as="p"
              animationNum={4}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="mt-5 text-lg font-semibold text-zinc-900 md:text-xl"
            >
              CYBERLABS webinars are different.
            </TimelineContent>

            <TimelineContent
              as="p"
              animationNum={5}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="mt-2 text-sm text-zinc-600 md:text-base"
            >
              Our webinars are designed to help you understand:
            </TimelineContent>
          </div>

          <TimelineContent
            as="div"
            animationNum={3}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="group relative aspect-4/3 w-full overflow-hidden  border border-zinc-200 bg-zinc-100 shadow-sm"
          >
            <Image
              src={WHY_IMAGE}
              alt="Cybersecurity professionals collaborating in a webinar session"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-900/30 via-transparent to-transparent" />
          </TimelineContent>
        </div>

        {/* Benefits grid */}
        <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden  sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <TimelineContent
              key={benefit.text}
              as="div"
              animationNum={6 + index}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="bg-white"
            >
              <FeatureCard
                feature={{ icon: benefit.icon, title: benefit.text }}
                className="h-full border transition-colors hover:bg-zinc-50/70"
              />
            </TimelineContent>
          ))}
        </div>

        {/* Goal banner */}
        <TimelineContent
          as="div"
          animationNum={12}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="relative mt-12 overflow-hidden border border-zinc-200 border-dashed bg-white px-6 py-16 text-center md:py-24"
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
          <p className="relative z-10">
            <GradientText
              className="text-xs font-bold! uppercase tracking-[0.18em]"
              colors={["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"]}
              animationSpeed={4}
              direction="horizontal"
              showBorder={false}
              pauseOnHover={false}
            >
              Our goal is simple:
            </GradientText>
          </p>
          <p className="relative z-10 mt-3 text-2xl font-semibold text-zinc-900 md:text-4xl">
            Help You Make Better Career Decisions.
          </p>
        </TimelineContent>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";

const PROS_IMAGE ="/images/Img-04.webp";

const expertiseAreas = [
  { label: "Cyber Defense", icon: <ShieldLockIcon /> },
  { label: "Cyber Intelligence", icon: <RadarIcon /> },
  { label: "Digital Investigations", icon: <VirusSearchIcon /> },
  { label: "Security Operations", icon: <DeviceImacCodeIcon /> },
  { label: "Cybercrime Analysis", icon: <SpyIcon /> },
  { label: "Platform Security", icon: <LockSearchIcon /> },
  { label: "Threat Intelligence", icon: <SatelliteIcon /> },
  { label: "Risk & Security Leadership", icon: <CurrencyIcon /> },
];

const understandings = [
  "What employers are hiring for",
  "Which skills are increasing in demand",
  "Which specializations offer the strongest growth potential",
  "How cybersecurity is changing globally",
  "What professionals need to remain relevant in the years ahead",
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

function ShieldLockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
      <path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 12l0 2.5" />
    </svg>
  );
}

function RadarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M21 12h-8a1 1 0 1 0 -1 1v8a9 9 0 0 0 9 -9" />
      <path d="M16 9a5 5 0 1 0 -7 7" />
      <path d="M20.486 9a9 9 0 1 0 -11.482 11.495" />
    </svg>
  );
}

function VirusSearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M17 12a5 5 0 1 0 -5 5" />
      <path d="M12 7v-4" />
      <path d="M11 3h2" />
      <path d="M15.536 8.464l2.828 -2.828" />
      <path d="M17.657 4.929l1.414 1.414" />
      <path d="M17 12h4" />
      <path d="M21 11v2" />
      <path d="M12 17v4" />
      <path d="M13 21h-2" />
      <path d="M8.465 15.536l-2.829 2.828" />
      <path d="M6.343 19.071l-1.413 -1.414" />
      <path d="M7 12h-4" />
      <path d="M3 13v-2" />
      <path d="M8.464 8.464l-2.828 -2.828" />
      <path d="M4.929 6.343l1.414 -1.413" />
      <path d="M15 17.5a2.5 2.5 0 1 0 5 0a2.5 2.5 0 1 0 -5 0" />
      <path d="M19.5 19.5l2.5 2.5" />
    </svg>
  );
}

function DeviceImacCodeIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11.5 17h-7.5a1 1 0 0 1 -1 -1v-12a1 1 0 0 1 1 -1h16a1 1 0 0 1 1 1v9" />
      <path d="M3 13h18" />
      <path d="M8 21h3.5" />
      <path d="M10 17l-.5 4" />
      <path d="M20 21l2 -2l-2 -2" />
      <path d="M17 17l-2 2l2 2" />
    </svg>
  );
}

function SpyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 11h18" />
      <path d="M5 11v-4a3 3 0 0 1 3 -3h8a3 3 0 0 1 3 3v4" />
      <path d="M4 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M14 17a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M10 17h4" />
    </svg>
  );
}

function LockSearchIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11.5 21h-4.5a2 2 0 0 1 -2 -2v-6a2 2 0 0 1 2 -2h10" />
      <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
      <path d="M15 18a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
      <path d="M20.2 20.2l1.8 1.8" />
    </svg>
  );
}

function SatelliteIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3.707 6.293l2.586 -2.586a1 1 0 0 1 1.414 0l5.586 5.586a1 1 0 0 1 0 1.414l-2.586 2.586a1 1 0 0 1 -1.414 0l-5.586 -5.586a1 1 0 0 1 0 -1.414" />
      <path d="M6 10l-3 3l3 3l3 -3" />
      <path d="M10 6l3 -3l3 3l-3 3" />
      <path d="M12 12l1.5 1.5" />
      <path d="M14.5 17a2.5 2.5 0 0 0 2.5 -2.5" />
      <path d="M15 21a6 6 0 0 0 6 -6" />
    </svg>
  );
}

function CurrencyIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 sm:h-[18px] sm:w-[18px]"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
      <path d="M4 4l3 3" />
      <path d="M20 4l-3 3" />
      <path d="M4 20l3 -3" />
      <path d="M20 20l-3 -3" />
    </svg>
  );
}

function PointerCollaborationIcon() {
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
      <path d="M10.987 13.943l1.957 5.016c.563 1.445 2.633 1.367 3.087 -.116l3.895 -12.727c.384 -1.253 -.79 -2.426 -2.042 -2.042l-12.727 3.895c-1.483 .454 -1.56 2.524 -.116 3.087l5.017 1.957c.426 .166 .763 .503 .929 .93" />
      <path d="M9 20l-1.064 -3.151a1.25 1.25 0 0 0 -.785 -.785l-3.151 -1.064" />
    </svg>
  );
}

export function LearnFromProsSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section id="expertise" ref={timelineRef} className=" px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
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
            Meet the Experts
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
            text="Learn From Cyber Professionals. Not Career Trainers."
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
          At CYBERLABS, our founders, instructors, and subject matter experts
          are active cybersecurity professionals with real-world experience
          across:
        </TimelineContent>

        {/* Expertise bricks */}
        <TimelineContent
          as="div"
          animationNum={4}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-6 flex flex-wrap gap-2 sm:gap-2.5"
        >
          {expertiseAreas.map((area) => (
            <motion.span
              key={area.label}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-dotted border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition-colors hover:border-zinc-300 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm"
            >
              <span
                aria-hidden
                className="flex shrink-0 items-center justify-center text-zinc-600"
              >
                {area.icon}
              </span>
              {area.label}
            </motion.span>
          ))}
        </TimelineContent>

        {/* Framed two-column region */}
        <div className="mt-10 border-y border-zinc-200 md:mt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200">
            {/* Left — understandings */}
            <TimelineContent
              as="div"
              animationNum={5}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="py-7 md:py-9 md:pr-10"
            >
              <p className="text-base font-semibold text-zinc-900 md:text-lg">
                Because they work within the industry, they understand:
              </p>
              <ul className="mt-5 space-y-3">
                {understandings.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      aria-hidden
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center text-emerald-600"
                    >
                      <PointerCollaborationIcon />
                    </span>
                    <span className="text-sm leading-relaxed text-zinc-700 md:text-base">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </TimelineContent>

            {/* Right — image */}
            <TimelineContent
              as="div"
              animationNum={6}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="py-7 md:py-9 md:pl-10"
            >
              <div className="group relative h-full min-h-[260px] w-full overflow-hidden">
                <Image
                  src={PROS_IMAGE}
                  alt="Active cybersecurity professionals collaborating"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                {/* <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-900/30 via-transparent to-transparent" /> */}
              </div>
            </TimelineContent>
          </div>
        </div>

        {/* Closing statement */}
        <TimelineContent
          as="p"
          animationNum={7}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mx-auto mt-8 max-w-3xl text-center text-lg font-medium leading-relaxed text-zinc-800 md:mt-10 md:text-2xl"
        >
          This allows us to provide practical industry insight rather than
          generic career advice.
        </TimelineContent>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";

const PROS_IMAGE =
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1400&auto=format&fit=crop";

const expertiseAreas = [
  { label: "Cyber Defense", icon: "🛡️" },
  { label: "Cyber Intelligence", icon: "🛰️" },
  { label: "Digital Investigations", icon: "🔎" },
  { label: "Security Operations", icon: "🖥️" },
  { label: "Cybercrime Analysis", icon: "🕵️" },
  { label: "Platform Security", icon: "🔐" },
  { label: "Threat Intelligence", icon: "📡" },
  { label: "Risk & Security Leadership", icon: "🎯" },
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
              <span className="text-sm leading-none sm:text-base">{area.icon}</span>
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
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-sm text-emerald-600">
                      ✔
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
              <div className="group relative h-full min-h-[260px] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100">
                <Image
                  src={PROS_IMAGE}
                  alt="Active cybersecurity professionals collaborating"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.04]"
                />
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-900/30 via-transparent to-transparent" />
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

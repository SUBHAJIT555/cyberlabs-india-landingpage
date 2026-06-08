"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";

const careerBenefits = [
  "Position yourself for promotions and leadership opportunities",
  "Increase your professional value within your organization",
  "Improve your earning potential",
  "Access international career opportunities",
  "Transition into higher-demand cybersecurity roles",
  "Develop specialist expertise that differentiates you from other candidates",
];

const bootCampAreas = [
  { label: "AI Security", icon: "🤖" },
  { label: "Threat Hunting", icon: "🎯" },
  { label: "Detection Engineering", icon: "🛠️" },
  { label: "Cyber Intelligence", icon: "🛰️" },
  { label: "Digital Investigations", icon: "🔎" },
  { label: "Platform Security", icon: "🔐" },
  { label: "Security Operations", icon: "🖥️" },
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
                <span className="mt-0.5 text-emerald-600 transition-transform group-hover:scale-110">
                  ✔
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
      <div className="mx-auto max-w-6xl">
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
            text="How These Webinars Can Benefit Your Career"
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
          The most successful cybersecurity professionals continuously develop
          new skills and adapt to emerging technologies, threats, and industry
          requirements.
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={4}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-600 md:text-base"
        >
          Much like doctors, engineers, and other highly specialized
          professionals, cybersecurity practitioners must constantly update
          their knowledge to remain relevant.
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={5}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-6 text-base font-semibold text-zinc-900 md:text-lg"
        >
          Understanding industry trends and emerging specializations can help
          you:
        </TimelineContent>

        <SplitChecklist items={careerBenefits} timelineRef={timelineRef} />

        {/* Divider */}
        <div className="my-14 flex items-center gap-4 md:my-16">
          
        </div>

        {/* Block 2 — From Industry Insight to Professional Growth */}
        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
        >
          <Eyebrow>Elite Boot Camps</Eyebrow>
        </TimelineContent>

        <TimelineContent
          as="h3"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-4 text-pretty"
        >
          <ShinyText
            text="From Industry Insight to Professional Growth"
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
          During these webinars, you will also discover how CYBERLABS Elite Boot
          Camps help professionals build specialized expertise in areas such as:
        </TimelineContent>

        {/* Boot camp areas as bricks */}
        <TimelineContent
          as="div"
          animationNum={4}
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
              <span className="text-sm leading-none sm:text-base">{area.icon}</span>
              {area.label}
            </motion.span>
          ))}
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={5}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-10 max-w-3xl text-base font-semibold text-zinc-900 md:text-lg"
        >
          Our 30–50 Hour Elite Boot Camps are designed specifically for working
          professionals seeking to:
        </TimelineContent>

        <SplitChecklist items={bootCampGoals} timelineRef={timelineRef} />

        {/* Closing statement */}
        <TimelineContent
          as="p"
          animationNum={12}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mx-auto mt-14 max-w-3xl text-center text-lg font-medium leading-relaxed text-zinc-800 md:mt-16 md:text-2xl"
        >
          Organizations are increasingly looking for professionals with
          practical skills and operational capability—not simply certifications.
        </TimelineContent>
      </div>
    </section>
  );
}

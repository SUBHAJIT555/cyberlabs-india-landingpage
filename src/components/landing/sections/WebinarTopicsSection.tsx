"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";

const webinarTopics = [
  " AI Security & AI Red Teaming",
  " Agentic AI Security & Autonomous Systems",
  " Deepfake Detection & Synthetic Media Threats",
  " Platform Security & Trust & Safety",
  " Social Media Threat Intelligence",
  " Cyber Intelligence & Digital Investigations",
  " Dark Web Intelligence & Cybercrime Ecosystems",
  " Detection Engineering & Threat Hunting",
  " Cloud & Identity Security",
  " Zero Trust Architecture",
  " Security Operations & Modern Defense",
  " Online Fraud, Scam Operations & Digital Risk",
  "Global Cybersecurity Career Opportunities",
  " Future Cybersecurity Skills & Hiring Trends",
];

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.06,
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

export function WebinarTopicsSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const half = Math.ceil(webinarTopics.length / 2);
  const columns = [webinarTopics.slice(0, half), webinarTopics.slice(half)];

  return (
    <section id="topics" ref={timelineRef} className="px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
        >
          <Eyebrow>Webinar Topics</Eyebrow>
        </TimelineContent>

        <TimelineContent
          as="h2"
          animationNum={2}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-4 text-pretty"
        >
          <ShinyText
            text="What Topics Do We Cover?"
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
          Every webinar focuses on real-world industry developments, modern
          threats, emerging technologies, and future career opportunities.
        </TimelineContent>

        <TimelineContent
          as="p"
          animationNum={4}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mt-10 text-base font-semibold text-zinc-900 md:text-lg"
        >
          <GradientText
            className="text-base font-semibold md:text-lg"
            colors={["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"]}
            animationSpeed={4}
            direction="horizontal"
            showBorder={false}
            pauseOnHover={false}
          >
            Popular Webinar Topics
          </GradientText>
        </TimelineContent>

        <div className="mt-6 border-y border-zinc-200">
          <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200">
            {columns.map((column, colIndex) => (
              <ul
                key={colIndex}
                className={cn(colIndex === 0 ? "md:pr-10" : "md:pl-10")}
              >
                {column.map((topic, rowIndex) => {
                  const globalIndex = colIndex * half + rowIndex;

                  return (
                    <TimelineContent
                      key={topic}
                      as="li"
                      animationNum={5 + globalIndex}
                      timelineRef={timelineRef}
                      customVariants={revealVariants}
                      className={cn(
                        "group flex items-start gap-4 py-4 transition-colors hover:bg-white/60",
                        globalIndex !== webinarTopics.length - 1 &&
                          "border-b border-zinc-200",
                      )}
                    >
                      <span className="mt-0.5 w-8 shrink-0 text-sm font-semibold tabular-nums text-zinc-400 transition-colors group-hover:text-zinc-600">
                        {String(globalIndex + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm leading-relaxed text-zinc-700 transition-colors group-hover:text-zinc-900 md:text-base font-medium">
                        {topic}
                      </span>
                    </TimelineContent>
                  );
                })}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

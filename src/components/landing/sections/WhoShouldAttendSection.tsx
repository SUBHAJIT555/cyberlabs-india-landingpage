"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";

const audienceItems = [
  "Students exploring cybersecurity careers",
  "IT Professionals seeking career growth",
  "Security Analysts and SOC Professionals",
  "System & Network Administrators",
  "Software Developers",
  "Technology Professionals considering a transition into cybersecurity",
  "Existing Cybersecurity Professionals seeking specialization",
  "Anyone looking to understand the future of cybersecurity",
];

const gainItems = [
  "The modern cybersecurity landscape",
  "Global industry demand and hiring trends",
  "Emerging cybersecurity specializations",
  "Skills organizations value most",
  "Future career opportunities",
  "How to choose the right learning pathway",
  "How AI is reshaping the industry",
  "How to position yourself for long-term career success",
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

function CardGridBackground({ variant = "light" }: { variant?: "light" | "dark" }) {
  const lineColor = variant === "dark" ? "#52525b" : "#e5e5e5";

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, ${lineColor} 0, ${lineColor} 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, ${lineColor} 0, ${lineColor} 1px, transparent 0, transparent 50%)`,
        backgroundSize: "6px 6px",
        opacity: variant === "dark" ? 0.35 : 0.4,
      }}
    />
  );
}

type TopicCardProps = {
  eyebrow: string;
  title: string;
  intro: string;
  items: string[];
  footer?: string;
  featured?: boolean;
  animationNum: number;
  timelineRef: React.RefObject<HTMLDivElement | null>;
};

function TopicCard({
  eyebrow,
  title,
  intro,
  items,
  footer,
  featured = false,
  animationNum,
  timelineRef,
}: TopicCardProps) {
  return (
    <TimelineContent
      as="article"
      animationNum={animationNum}
      timelineRef={timelineRef}
      customVariants={revealVariants}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden border border-dashed p-7 transition-shadow duration-300 md:p-8",
        featured
          ? "border-zinc-700 bg-zinc-900 text-white shadow-xl shadow-zinc-900/15"
          : "border-neutral-200 bg-neutral-50 shadow-sm hover:shadow-md",
      )}
    >
      <CardGridBackground variant={featured ? "dark" : "light"} />

      <div className="relative z-10">
        <span
          className={cn(
            "inline-flex items-center gap-2 rounded-lg border px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em]",
            featured
              ? "border-zinc-700 bg-zinc-800/80"
              : "border-dotted border-zinc-200 bg-zinc-50",
          )}
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              featured ? "bg-blue-400" : "bg-blue-500",
            )}
          />
          <GradientText
            className="text-xs font-semibold uppercase tracking-[0.14em]"
            colors={
              featured
                ? ["#a1a1aa", "#60a5fa", "#d4d4d8", "#3b82f6", "#a1a1aa"]
                : ["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"]
            }
            animationSpeed={4}
            direction="horizontal"
            showBorder={false}
            pauseOnHover={false}
          >
            {eyebrow}
          </GradientText>
        </span>

        <h2 className="mt-5 text-pretty">
          <ShinyText
            text={title}
            className="text-xl font-semibold leading-tight tracking-tight sm:text-2xl md:text-3xl"
            color={featured ? "#e4e4e7" : "#3f3f46"}
            shineColor={featured ? "#ffffff" : "#18181b"}
            speed={3}
            spread={120}
          />
        </h2>

        <p
          className={cn(
            "mt-4 text-sm leading-relaxed md:text-base",
            featured ? "text-zinc-400" : "text-zinc-600",
          )}
        >
          {intro}
        </p>
      </div>

      <div
        className={cn(
          "relative z-10 my-6 h-px w-full",
          featured ? "bg-zinc-800" : "bg-zinc-200",
        )}
      />

      <ul className="relative z-10 flex-1 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span
              className={cn(
                "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs",
                featured
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-emerald-50 text-emerald-600",
              )}
            >
              ✔
            </span>
            <span
              className={cn(
                "text-sm leading-relaxed md:text-base",
                featured ? "text-zinc-300" : "text-zinc-700",
              )}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>

      {footer ? (
        <div
          className={cn(
            "relative z-10 mt-8 rounded-2xl border px-4 py-3.5 text-center text-sm font-medium leading-relaxed md:text-base",
            featured
              ? "border-zinc-700 bg-zinc-800/80 text-zinc-200"
              : "border-dashed border-zinc-200 bg-zinc-50 text-zinc-800",
          )}
        >
          {footer}
        </div>
      ) : null}
    </TimelineContent>
  );
}

export function WhoShouldAttendSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section id="audience" ref={timelineRef} className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
          <TopicCard
            eyebrow="Audience"
            title="Who Should Attend?"
            intro="These webinars are ideal for:"
            items={audienceItems}
            footer="No prior cybersecurity experience is required."
            animationNum={1}
            timelineRef={timelineRef}
          />

          <TopicCard
            eyebrow="Outcomes"
            title="What You Will Gain"
            intro="After attending a CYBERLABS webinar, you will have a clearer understanding of:"
            items={gainItems}
            featured
            animationNum={2}
            timelineRef={timelineRef}
          />
        </div>
      </div>
    </section>
  );
}

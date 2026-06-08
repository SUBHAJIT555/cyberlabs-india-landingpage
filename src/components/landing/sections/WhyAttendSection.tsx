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
  { icon: "🧭", text: "Where the cybersecurity industry is heading" },
  { icon: "🏢", text: "What multinational organizations are actually looking for" },
  { icon: "📈", text: "Which cybersecurity specializations are growing fastest" },
  { icon: "🗓️", text: "What skills will matter over the next 5–10 years" },
  { icon: "🤖", text: "How AI is transforming cybersecurity careers" },
  { icon: "🚀", text: "How to position yourself for future opportunities" },
];

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
            className="group relative aspect-4/3 w-full overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-100 shadow-sm"
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
              className="text-xs font-semibold! uppercase tracking-[0.18em]"
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

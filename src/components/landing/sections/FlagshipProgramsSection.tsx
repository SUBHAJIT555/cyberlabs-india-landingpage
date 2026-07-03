"use client";

import { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import {
  LandingSectionShell,
  LandingBento,
  LandingFramedTwoCol,
  LandingBentoCell,
  LandingTagPill,
  LandingGoalBanner,
  landingRevealVariants,
  landingSectionHeadingClass,
} from "@/components/ui/landing-section";
import { FlagshipProgramCard } from "@/components/landing/cards/FlagshipProgramCard";
import { useMainSiteData } from "@/context/main-site-data";
import { getFlagshipProgramImage } from "@/types/main-site-catalog";

const HIGHLIGHTS = [
  "145–450 Hour Programs",
  "Advanced Expertise",
  "Career Progression Focus",
] as const;

export function FlagshipProgramsSection() {
  const { catalog } = useMainSiteData();
  const { flagshipProgramCards, flagshipProgramIllustration } = catalog;
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="flagship-programs" className="overflow-visible">
      <div ref={timelineRef}>
        <TimelineContent
          as="div"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
        >
          <ShinyText
            text="CYBERLABS Flagship Programs"
            className={landingSectionHeadingClass}
            color="#3f3f46"
            shineColor="#18181b"
            speed={3}
            spread={120}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {HIGHLIGHTS.map((label) => (
              <LandingTagPill key={label}>{label}</LandingTagPill>
            ))}
          </div>
        </TimelineContent>

        <LandingBento className="mt-8">
          <LandingFramedTwoCol>
            <LandingBentoCell className="md:px-0 md:pr-8">
              <TimelineContent
                as="p"
                animationNum={1}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                The cybersecurity industry rewards professionals who possess{" "}
                <span className="font-semibold text-zinc-900">
                  specialized expertise, operational capability, and real-world
                  problem-solving skills.
                </span>{" "}
                As organizations face increasingly sophisticated threats, demand
                continues to grow for professionals who can move beyond foundational
                knowledge and{" "}
                <span className="font-semibold text-blue-600">
                  contribute at a higher level.
                </span>
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={2}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                <span className="font-semibold text-blue-600">
                  CYBERLABS Flagship Programs
                </span>{" "}
                are immersive{" "}
                <span className="font-semibold text-zinc-900">
                  145–450 hour professional development pathways
                </span>{" "}
                designed to help learners develop advanced cybersecurity expertise,
                prepare for specialized and leadership-oriented roles, and position
                themselves for{" "}
                <span className="font-semibold text-zinc-900">
                  career progression, salary growth, and global opportunities.
                </span>
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={3}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                Focused on{" "}
                <span className="font-semibold text-blue-600">
                  practical capability rather than certifications alone,
                </span>{" "}
                these programs help professionals build the skills, experience, and
                confidence required to succeed in today&apos;s{" "}
                <span className="font-semibold text-zinc-900">
                  rapidly evolving cybersecurity industry.
                </span>
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="flex items-center justify-center md:px-0 md:pl-8">
              <TimelineContent
                as="div"
                animationNum={4}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={flagshipProgramIllustration}
                  alt="CYBERLABS Flagship Programs"
                  className="mx-auto h-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]"
                />
              </TimelineContent>
            </LandingBentoCell>
          </LandingFramedTwoCol>
        </LandingBento>

        <TimelineContent
          as="div"
          animationNum={5}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-8"
        >
          <LandingGoalBanner
            title={
              <>
                <span className="text-blue-600">Build Expertise.</span>{" "}
                <span className="text-blue-600">Increase Your Value.</span>{" "}
                <span className="text-blue-600">Accelerate Your Career.</span>
              </>
            }
          />
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={6}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-8 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {flagshipProgramCards.map((program, index) => (
            <FlagshipProgramCard
              key={program.id}
              program={program}
              image={getFlagshipProgramImage(catalog, program.slug)}
              index={index}
            />
          ))}
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
}

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
import { EliteBootcampCard } from "@/components/landing/cards/EliteBootcampCard";
import { useMainSiteData } from "@/context/main-site-data";

const HIGHLIGHTS = [
  "30–50 Hour Programs",
  "Skills Over Certificates",
  "Future-Ready Curriculum",
] as const;

export function EliteBootcampsSection() {
  const { catalog } = useMainSiteData();
  const { bootcamps, eliteBootcampIllustration } = catalog;
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <LandingSectionShell id="elite-bootcamps">
      <div ref={timelineRef}>
        <TimelineContent
          as="div"
          animationNum={0}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
        >
          <ShinyText
            text="CYBERLABS Elite Boot Camps"
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
                In today&apos;s cybersecurity industry,{" "}
                <span className="font-semibold text-zinc-900">
                  standing still means falling behind.
                </span>{" "}
                Just as doctors continuously update their knowledge, cybersecurity
                professionals must develop new skills to address{" "}
                <span className="font-semibold text-blue-600">
                  evolving technologies, emerging threats, and changing attack
                  methodologies.
                </span>
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={2}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                <span className="font-semibold text-blue-600">CYBERLABS</span> Elite
                Boot Camps are intensive{" "}
                <span className="font-semibold text-zinc-900">
                  30–50 hour specialized programs
                </span>{" "}
                designed to build expertise in high-demand domains and position
                professionals for{" "}
                <span className="font-semibold text-zinc-900">
                  career advancement, promotions, salary growth, and global
                  opportunities.
                </span>
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={3}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                Today&apos;s employers want{" "}
                <span className="font-semibold text-blue-600">
                  skills and operational capability—not just certificates.
                </span>{" "}
                Our boot camps deliver practical, industry-relevant expertise so
                professionals remain{" "}
                <span className="font-semibold text-zinc-900">
                  valuable, relevant, and ready for future growth.
                </span>
              </TimelineContent>

              <TimelineContent
                as="p"
                animationNum={4}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
                className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base lg:text-lg"
              >
                As threats evolve,{" "}
                <span className="font-semibold text-blue-600">CYBERLABS</span> will
                regularly launch new boot camps across{" "}
                <span className="font-semibold text-zinc-900">
                  emerging technologies, specialized disciplines, and evolving threat
                  domains
                </span>
                —keeping learners current and future-ready.
              </TimelineContent>
            </LandingBentoCell>

            <LandingBentoCell className="flex items-center justify-center md:px-0 md:pl-8">
              <TimelineContent
                as="div"
                animationNum={5}
                timelineRef={timelineRef}
                customVariants={landingRevealVariants}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={eliteBootcampIllustration}
                  alt="CYBERLABS Elite Boot Camps"
                  className="mx-auto h-auto w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[340px]"
                />
              </TimelineContent>
            </LandingBentoCell>
          </LandingFramedTwoCol>
        </LandingBento>

        <TimelineContent
          as="div"
          animationNum={6}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-8"
        >
          <LandingGoalBanner
            title={
              <>
                <span className="text-blue-600">Stay Relevant.</span>{" "}
                <span className="text-blue-600">Increase Your Value.</span>{" "}
                <span className="text-blue-600">Advance Your Career.</span>
              </>
            }
          />
        </TimelineContent>

        <TimelineContent
          as="div"
          animationNum={7}
          timelineRef={timelineRef}
          customVariants={landingRevealVariants}
          className="mt-8 grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3"
        >
          {bootcamps.map((bootcamp, index) => (
            <EliteBootcampCard key={bootcamp.id} bootcamp={bootcamp} index={index} />
          ))}
        </TimelineContent>
      </div>
    </LandingSectionShell>
  );
}

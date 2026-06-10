"use client";

import { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { ShinyButton } from "@/components/ui/shiny-button";
import GradientText from "@/components/ui/GradientText";
import ShinyText from "@/components/ui/ShinyText";
import { useWebinarRegistration } from "@/context/webinar-registration";

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.08,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

function BannerBackground() {
  return (
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
  );
}

export function WhyChooseCTASection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { openRegistration } = useWebinarRegistration();

  return (
    <section id="contact" ref={timelineRef} className=" px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl">
        <TimelineContent
          as="div"
          animationNum={1}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="relative overflow-hidden border border-zinc-200 border-dashed bg-white px-6 py-14 text-center md:px-10 md:py-20"
        >
          <BannerBackground />

          <div className="relative z-10 mx-auto max-w-3xl">
            <h3 className="text-2xl font-bold text-zinc-900 md:text-4xl">
              Stop Guessing. Start Building.
            </h3>

            <p className="mt-5 text-sm leading-relaxed text-zinc-600 md:text-base font-medium">
              The future belongs to professionals who understand where
              technology, security, and digital risk are heading.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 md:text-base">
              Join a FREE CYBERLABS Career Guidance &amp; Industry Insight
              Webinar and gain the clarity, confidence, and industry
              understanding needed to make informed career decisions.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <ShinyButton
                onClick={() => openRegistration()}
                className="shiny-cta w-full rounded-2xl! text-sm! shadow-lg! shadow-zinc-800/20! sm:w-auto"
              >
                REGISTER FOR THE NEXT WEBINAR
              </ShinyButton>
              <ShinyButton
                onClick={() =>
                  window.open(
                    "https://cyberlabs-india.com/",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="shiny-cta--light w-full rounded-2xl! text-sm! shadow-lg! shadow-zinc-800/20! sm:w-auto"
              >
                VISIT OUR MAIN WEBSITE
              </ShinyButton>
            </div>

            <div className="mt-5 flex justify-center">
              <ShinyText
                text="FREE REGISTRATION • LIMITED SEATS • LIVE ONLINE"
                className="text-xs font-semibold uppercase tracking-[0.16em]"
                speed={3}
                color="#71717a"
                shineColor="#2563eb"
              />
            </div>

            <div className="mt-10 border-t border-dashed border-zinc-200 pt-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-800">
                CYBERLABS INDIA
              </p>
              <GradientText
                className="mt-2 text-sm leading-relaxed md:text-base font-bold!"
                colors={["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"]}
                animationSpeed={4}
                direction="horizontal"
                showBorder={false}
                pauseOnHover={false}
              >
                Learn Cybersecurity From Those Who Defend the Digital World.
              </GradientText>
            </div>
          </div>
        </TimelineContent>
      </div>
    </section>
  );
}

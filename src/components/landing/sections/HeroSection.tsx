"use client";

import { useRef } from "react";
import { useWebinarRegistration } from "@/context/webinar-registration";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { ShinyButton } from "@/components/ui/shiny-button";
import { FeatureCard } from "@/components/ui/feature-card";
import GradientText from "@/components/ui/GradientText";
import ShinyText from "@/components/ui/ShinyText";

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.35,
      duration: 0.55,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: -20,
    opacity: 0,
  },
};

const skills = [
  {
    icon: "🛡️",
    title: "Network Security",
    description:
      "Understanding firewalls, VPNs, IDS/IPS, and network monitoring.",
  },
  {
    icon: "🧪",
    title: "Penetration Testing",
    description:
      "Using tools like Nmap, Metasploit, and Burp Suite to identify vulnerabilities.",
  },
  {
    icon: "📊",
    title: "SIEM Tools",
    description:
      "Experience with security monitoring platforms such as Splunk, IBM QRadar, or Microsoft Sentinel.",
  },
  {
    icon: "🔍",
    title: "Vulnerability Assessment",
    description:
      "Using tools like Nessus or OpenVAS to detect security weaknesses.",
  },
  {
    icon: "🚨",
    title: "Digital Forensics & Incident Response",
    description:
      "Investigating security breaches and analyzing logs and evidence.",
  },
  {
    icon: "🐍",
    title: "Programming & Scripting",
    description:
      "Knowledge of Python, Bash, or PowerShell for automation and security testing.",
  },
  {
    icon: "💻",
    title: "Operating Systems Security",
    description:
      "Securing and managing Linux, Windows, and server environments.",
  },
  {
    icon: "☁️",
    title: "Cloud Security",
    description:
      "Understanding security practices for platforms like AWS, Microsoft Azure, or Google Cloud Platform (GCP).",
  },
];

export function HeroSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { openRegistration } = useWebinarRegistration();

  return (
    <section
      id="home"
      ref={timelineRef}
      className="relative overflow-hidden bg-white px-4 pb-12 pt-24 sm:px-5 sm:pb-16 sm:pt-28 md:pb-24 md:pt-48"
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <div
          className="absolute inset-0 pointer-events-none opacity-35"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, #000 0%, transparent 80%)",
            maskImage: "linear-gradient(to bottom, #000 0%, transparent 80%)",
            backgroundImage:
              "linear-gradient(90deg, var(--hero-scale-line) 1px, transparent 1px)",
            backgroundSize: "8px 100%",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-screen-2xl items-center justify-center">
        <article className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-5 text-center sm:space-y-6 xl:max-w-5xl">
          <TimelineContent
            as="h1"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="max-w-[20rem] sm:max-w-none"
          >
            <ShinyText
              text="Free Cybersecurity Career Guidance & Industry Insight Webinars."
              className="text-balance text-[1.7rem] font-semibold leading-[1.12] tracking-tight sm:text-4xl sm:leading-[1.08] md:text-5xl xl:text-6xl"
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
            className="mx-auto max-w-72 px-1 font-medium sm:max-w-2xl sm:px-0"
          >
            <GradientText
              className="text-[0.9rem] font-medium leading-relaxed sm:text-base md:text-lg"
              colors={["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"]}
              animationSpeed={4}
              direction="horizontal"
              showBorder={false}
              pauseOnHover={false}
            >
              Understand Where Cybersecurity Is Going. Discover Where You Fit.
            </GradientText>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={4}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="flex w-full max-w-xs flex-col gap-2.5 pt-1 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-3 sm:pt-2"
          >
            <ShinyButton
              onClick={() => openRegistration()}
              className="shiny-cta--compact w-full rounded-xl! px-6! py-3.5! text-sm! shadow-lg! shadow-zinc-800/20! sm:w-auto sm:rounded-lg! sm:px-4! sm:py-2.5!"
            >
              Register Now
            </ShinyButton>
            <ShinyButton
              onClick={() =>
                document
                  .querySelector("#webinars")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="shiny-cta--compact shiny-cta--light w-full rounded-xl! px-6! py-3.5! text-sm! shadow-lg! shadow-zinc-800/20! sm:w-auto sm:rounded-lg! sm:px-4! sm:py-2.5!"
            >
              View Webinars
            </ShinyButton>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={5}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="-mx-4 mt-2 w-[calc(100%+2rem)] max-w-none border-t border-dashed border-zinc-200 pt-8 sm:mx-0 sm:mt-0 sm:w-7xl sm:max-w-[calc(100vw-2rem)] sm:border-t-0 sm:pt-8 md:pt-10"
          >
            <div
              className="overflow-x-clip py-4 sm:py-6"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)",
              }}
            >
              <div className="group/track flex w-max gap-3 animate-marquee hover:[animation-play-state:paused] sm:gap-5">
                {[...skills, ...skills].map((skill, index) => (
                  <FeatureCard
                    key={`${skill.title}-${index}`}
                    feature={skill}
                    className="h-40 w-64 shrink-0 p-4 text-left shadow-sm transition-all duration-300 ease-out [&_h3]:mt-4 [&_h3]:text-[0.8rem] [&_h3]:leading-snug group-hover/track:scale-[0.93] group-hover/track:opacity-40 group-hover/track:blur-[2px] hover:scale-[1.05]! hover:opacity-100! hover:blur-none! hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-800/20 sm:h-50 sm:w-80 sm:p-6 sm:[&_h3]:mt-8 sm:[&_h3]:text-sm"
                  />
                ))}
              </div>
            </div>
          </TimelineContent>
        </article>

      </div>
    </section>
  );
}

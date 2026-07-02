"use client";

import { useRef } from "react";
import { useWebinarRegistration } from "@/context/webinar-registration";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { ShinyButton } from "@/components/ui/shiny-button";
import { FeatureCard } from "@/components/ui/feature-card";
import GradientText from "@/components/ui/GradientText";
import ShinyText from "@/components/ui/ShinyText";
import { mainSiteUrl } from "@/data/main-site";

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
    icon: <NetworkSecurityIcon />,
    title: "Network Security",
    description:
      "Understanding firewalls, VPNs, IDS/IPS, and network monitoring.",
  },
  {
    icon: <PenetrationTestingIcon />,
    title: "Penetration Testing",
    description:
      "Using tools like Nmap, Metasploit, and Burp Suite to identify vulnerabilities.",
  },
  {
    icon: <SiemToolsIcon />,
    title: "SIEM Tools",
    description:
      "Experience with security monitoring platforms such as Splunk, IBM QRadar, or Microsoft Sentinel.",
  },
  {
    icon: <VulnerabilityAssessmentIcon />,
    title: "Vulnerability Assessment",
    description:
      "Using tools like Nessus or OpenVAS to detect security weaknesses.",
  },
  {
    icon: <DigitalForensicsIcon />,
    title: "Digital Forensics & Incident Response",
    description:
      "Investigating security breaches and analyzing logs and evidence.",
  },
  {
    icon: <ProgrammingScriptingIcon />,
    title: "Programming & Scripting",
    description:
      "Knowledge of Python, Bash, or PowerShell for automation and security testing.",
  },
  {
    icon: <OperatingSystemsSecurityIcon />,
    title: "Operating Systems Security",
    description:
      "Securing and managing Linux, Windows, and server environments.",
  },
  {
    icon: <CloudSecurityIcon />,
    title: "Cloud Security",
    description:
      "Understanding security practices for platforms like AWS, Microsoft Azure, or Google Cloud Platform (GCP).",
  },
];

function NetworkSecurityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 3a12 12 0 0 0 8.5 3a12 12 0 0 1 -8.5 15a12 12 0 0 1 -8.5 -15a12 12 0 0 0 8.5 -3" />
      <path d="M11 11a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 12l0 2.5" />
    </svg>
  );
}

function PenetrationTestingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 12a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
      <path d="M12 7a5 5 0 1 0 5 5" />
      <path d="M13 3.055a9 9 0 1 0 7.941 7.945" />
      <path d="M15 6v3h3l3 -3h-3v-3l-3 3" />
      <path d="M15 9l-3 3" />
    </svg>
  );
}

function SiemToolsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 7a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M7 3v4h4" />
      <path d="M9 17l0 4" />
      <path d="M17 14l0 7" />
      <path d="M13 13l0 8" />
      <path d="M21 12l0 9" />
    </svg>
  );
}

function VulnerabilityAssessmentIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M11 15a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
      <path d="M18.5 18.5l2.5 2.5" />
      <path d="M4 6h16" />
      <path d="M4 12h4" />
      <path d="M4 18h4" />
    </svg>
  );
}

function DigitalForensicsIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M9 11a3 3 0 0 1 6 0c0 1.657 .612 3.082 1 4" />
      <path d="M12 11v1.75c-.001 1.11 .661 2.206 1 3.25" />
      <path d="M9 14.25c.068 .58 .358 1.186 .5 1.75" />
      <path d="M4 8v-2a2 2 0 0 1 2 -2h2" />
      <path d="M4 16v2a2 2 0 0 0 2 2h2" />
      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
      <path d="M16 20h2a2 2 0 0 0 2 -2v-2" />
    </svg>
  );
}

function ProgrammingScriptingIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M7 8l-4 4l4 4" />
      <path d="M17 8l4 4l-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  );
}

function OperatingSystemsSecurityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M3 7a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-2" />
      <path d="M3 15a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3l0 -2" />
      <path d="M7 8l0 .01" />
      <path d="M7 16l0 .01" />
      <path d="M11 8h6" />
      <path d="M11 16h6" />
    </svg>
  );
}

function CloudSecurityIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M19 18a3.5 3.5 0 0 0 0 -7h-1c.397 -1.768 -.285 -3.593 -1.788 -4.787c-1.503 -1.193 -3.6 -1.575 -5.5 -1s-3.315 2.019 -3.712 3.787c-2.199 -.088 -4.155 1.326 -4.666 3.373c-.512 2.047 .564 4.154 2.566 5.027" />
      <path d="M8 16a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1v3a1 1 0 0 1 -1 1h-6a1 1 0 0 1 -1 -1l0 -3" />
      <path d="M10 15v-2a2 2 0 1 1 4 0v2" />
    </svg>
  );
}

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
              text="Free Career Guidance Webinars, Elite Bootcamps & Flagship Programs."
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
            className="mx-auto max-w-72 px-1 font-medium sm:max-w-3xl sm:px-0"
          >
            <GradientText
              className="text-[0.9rem] font-medium leading-relaxed sm:text-base md:text-lg"
              colors={["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"]}
              animationSpeed={4}
              direction="horizontal"
              showBorder={false}
              pauseOnHover={false}
            >
              Join free cybersecurity career guidance webinars, train through elite
              bootcamps, and build deep capability with flagship cyber defense
              programs — all from CYBERLABS INDIA.
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
              Register for Webinars
            </ShinyButton>
            <ShinyButton
              onClick={() =>
                window.open(
                  mainSiteUrl("/cyber-defense-programs"),
                  "_blank",
                  "noopener,noreferrer",
                )
              }
              className="shiny-cta--compact shiny-cta--light w-full rounded-xl! px-6! py-3.5! text-sm! shadow-lg! shadow-zinc-800/20! sm:w-auto sm:rounded-lg! sm:px-4! sm:py-2.5!"
            >
              Explore Programs & Bootcamps
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

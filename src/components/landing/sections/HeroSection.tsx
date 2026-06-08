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
      className="relative overflow-hidden bg-white px-4 pb-16 pt-28 md:pb-24 md:pt-32"
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
        <article className="mx-auto flex w-full max-w-4xl flex-col items-center space-y-6 text-center xl:max-w-5xl">
        

          <TimelineContent
            as="h1"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={revealVariants}
          >
            <ShinyText
              text="Free Cybersecurity Career Guidance & Industry Insight Webinars."
              className="text-3xl font-semibold leading-[1.08] tracking-tight sm:text-4xl md:text-5xl xl:text-6xl"
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
            className="mx-auto max-w-2xl font-medium"
          >
            <GradientText
              className="text-sm font-medium leading-relaxed sm:text-base md:text-lg"
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
            className="flex flex-col items-center justify-center gap-3 pt-2 sm:flex-row"
          >
            <ShinyButton
              onClick={() => openRegistration()}
              className="shiny-cta--compact rounded-lg! shadow-lg! shadow-zinc-800/20!"
            >
              Register Now
            </ShinyButton>
            <ShinyButton
              onClick={() =>
                document
                  .querySelector("#webinars")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="shiny-cta--compact shiny-cta--light rounded-lg! shadow-lg! shadow-zinc-800/20!"
            >
              View Webinars
            </ShinyButton>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={5}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="w-7xl max-w-[calc(100vw-2rem)] pt-8 md:pt-10"
          >
            <div
              className="overflow-x-clip py-6"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, #000 7%, #000 93%, transparent 100%)",
              }}
            >
              <div className="group/track flex w-max gap-5 animate-marquee hover:[animation-play-state:paused]">
                {[...skills, ...skills].map((skill, index) => (
                  <FeatureCard
                    key={`${skill.title}-${index}`}
                    feature={skill}
                    className="h-50 w-80 shrink-0 text-left shadow-sm  transition-all duration-300 ease-out group-hover/track:scale-[0.93] group-hover/track:opacity-40 group-hover/track:blur-[2px] hover:scale-[1.05]! hover:opacity-100! hover:blur-none! hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-800/20"
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

"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useWebinarRegistration } from "@/context/webinar-registration";
import ReactCountryFlag from "react-country-flag";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { ShinyButton } from "@/components/ui/shiny-button";
import ShinyText from "@/components/ui/ShinyText";

const markets = [
  { code: "IN", label: "India" },
  { code: "AE", label: "UAE" },
  { code: "US", label: "USA" },
  { code: "EU", label: "Europe" },
  { code: "AU", label: "Australia" },
];

const INSIGHT_IMAGES = {
  industry:
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop",
  questions:
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1400&auto=format&fit=crop",
} as const;

const specializations = [
  "AI Security",
  "Agentic AI Security",
  "AI Red Teaming",
  "Deepfake Detection",
  "Social Media Threat Intelligence",
  "Platform Security & Trust & Safety",
  "Digital Identity Protection",
  "Online Fraud Investigations",
  "Threat Hunting",
  "Detection Engineering",
  "Cyber Intelligence",
  "Dark Web Intelligence",
  "Cloud & Identity Security",
  "Zero Trust Architecture",
  "Security Operations (SOC)",
  "Digital Risk Protection",
  "Adversary Analytics",
  "Cybercrime Investigations",
  "AI-Powered Security Operations",
  "Future Cyber Defense",
];

const careerQuestions = [
  "Which cybersecurity specialization is right for me?",
  "Which skills are organizations actively hiring for?",
  "Which career paths offer the strongest future?",
  "How do I transition into cybersecurity successfully?",
  "What skills will remain relevant in the age of AI?",
  "How do I build a long-term cybersecurity career?",
];

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.18,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

function InsightImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`group relative overflow-hidden bg-zinc-100 ${className || ""}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="object-cover transition duration-500 group-hover:scale-[1.015]"
      />
    </div>
  );
}

export function WebinarInsightsSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { openRegistration } = useWebinarRegistration();

  return (
    <section id="services" ref={timelineRef} className="bg-white px-4 py-14 md:py-20">
      <div className="mx-auto max-w-7xl divide-y divide-zinc-200">
        {/* Row 1 — text | image */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200">
          <TimelineContent
            as="article"
            animationNum={1}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="px-0 py-6 md:px-8 md:py-8"
          >
            <h2 className="text-pretty">
              <ShinyText
                text="The cybersecurity industry is evolving faster than ever before."
                className="text-xl font-semibold leading-snug sm:text-2xl md:text-4xl"
                color="#3f3f46"
                shineColor="#18181b"
                speed={3}
                spread={120}
              />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
              Artificial Intelligence, Deepfakes, Digital Identity Fraud, Social
              Media Manipulation, Platform Abuse, Online Scams, Cybercrime, and
              emerging digital threats are transforming how organizations
              operate, protect users, and defend critical infrastructure.
            </p>
          </TimelineContent>

          <TimelineContent
            as="article"
            animationNum={2}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="px-0 py-6 md:px-8 md:py-8"
          >
            <InsightImage
              src={INSIGHT_IMAGES.industry}
              alt="Cybersecurity industry illustration"
              className="h-[200px] w-full md:h-full md:min-h-[240px]"
            />
          </TimelineContent>
        </div>

        {/* Row 2 — full width expertise */}
        <TimelineContent
          as="article"
          animationNum={3}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="px-0 py-6 md:px-8 md:py-8"
        >
          <p className="text-base font-medium leading-relaxed text-zinc-800 md:text-lg">
            Today&apos;s organizations are actively seeking professionals with
            expertise in:
          </p>
     
          <div className="mt-4 flex flex-wrap gap-2">
            {specializations.map((item) => (
              <motion.span
                key={item}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.15 }}
                className="rounded-lg border border-zinc-200 border-dotted bg-zinc-50 px-3 py-1.5 text-xs text-zinc-700 md:text-sm shadow-sm"
              >
                {item}
              </motion.span>
            ))}
          </div>
        </TimelineContent>

        {/* Row 3 — questions | image */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200">
          <TimelineContent
            as="article"
            animationNum={4}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="px-0 py-6 md:px-8 md:py-8"
          >
            <p className="text-sm leading-relaxed text-zinc-800 md:text-base">
              As demand continues to grow across{" "}
              {markets.map((market, index) => (
                <span key={market.code}>
                  <ReactCountryFlag
                    countryCode={market.code}
                    svg
                    className="inline-block"
                    style={{
                      width: "1.1em",
                      height: "1.1em",
                      borderRadius: "2px",
                      verticalAlign: "-0.15em",
                    }}
                    title={market.label}
                  />{" "}
                  {market.label}
                  {index < markets.length - 1 ? ", " : " "}
                </span>
              ))}
              and other global markets, many professionals are still asking:
            </p>
            <ul className="mt-4">
              {careerQuestions.map((question, index) => (
                <li
                  key={question}
                  className="flex gap-3 border-b border-zinc-200 py-3 text-sm text-zinc-700 last:border-b-0 md:text-base"
                >
                  <span className="font-semibold text-zinc-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{question}</span>
                </li>
              ))}
            </ul>
          </TimelineContent>

          <TimelineContent
            as="article"
            animationNum={5}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="px-0 py-6 md:px-8 md:py-8"
          >
            <InsightImage
              src={INSIGHT_IMAGES.questions}
              alt="Career questions illustration"
              className="h-[200px] w-full md:h-full md:min-h-[240px]"
            />
          </TimelineContent>
        </div>

        {/* Row 4 — full width webinar */}
        <TimelineContent
          as="article"
          animationNum={6}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="px-0 py-6 md:px-8 md:py-8 text-center items-center justify-center max-w-6xl mx-auto"
        >
          <p className="text-base leading-relaxed text-zinc-700 md:text-lg font-medium">
            To help answer these questions, CYBERLABS INDIA conducts regular FREE
            Cybersecurity Career Guidance & Industry Insight Webinars, led by
            cybersecurity professionals actively working within the industry.
          </p>
     
          <p className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base max-w-2xl mx-auto">
            These sessions are designed to help you understand the realities of
            modern cybersecurity, emerging career opportunities, industry trends,
            and the skills that organizations actually value.
          </p>
          <div className="mt-6">
            <ShinyButton
              onClick={() => openRegistration()}
              className="shiny-cta rounded-2xl! shadow-lg! shadow-zinc-800/20!"
            >
              REGISTER FOR THE NEXT WEBINAR
            </ShinyButton>
          </div>
        </TimelineContent>
      </div>
    </section>
  );
}

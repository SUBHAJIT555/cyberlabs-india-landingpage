"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion } from "framer-motion";
import { useWebinarRegistration } from "@/context/webinar-registration";
import ReactCountryFlag from "react-country-flag";
import { TimelineContent } from "@/components/ui/timeline-animation";
import { CandyButton } from "@/components/ui/candy-button";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";
import { mainSiteUrl } from "@/data/main-site";
import { crosshatchBgStyle } from "@/lib/crosshatch-bg";

const pathwayTitleGradientProps = {
  className: "text-base font-semibold md:text-lg",
  colors: ["#52525b", "#2563eb", "#3f3f46", "#1d4ed8", "#52525b"],
  animationSpeed: 4,
  direction: "horizontal" as const,
  showBorder: false,
  pauseOnHover: false,
};

const markets = [
  { code: "IN", label: "India" },
  { code: "AE", label: "UAE" },
  { code: "US", label: "USA" },
  { code: "EU", label: "Europe" },
  { code: "AU", label: "Australia" },
];

const INSIGHT_IMAGES = {
  industry: "/images/Img-01.webp",
  questions: "/images/Img-02.webp",
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
  "Should I start with an elite bootcamp or a flagship program?",
  "Which skills are organizations actively hiring for?",
  "How do free career guidance webinars help me choose a path?",
  "What skills will remain relevant in the age of AI?",
  "How do I build a long-term cyber defense career?",
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

function PathwayCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="relative overflow-hidden border border-dashed border-zinc-200 bg-white">
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={crosshatchBgStyle}
        aria-hidden
      />
      <div className="relative z-10 p-5 md:p-6">
        <GradientText {...pathwayTitleGradientProps} className="font-bold!">
          {title}
        </GradientText>
        <p className="mt-3 text-base leading-relaxed text-zinc-600 font-medium md:text-[17px]">
          {description}
        </p>
      </div>
    </div>
  );
}

export function WebinarInsightsSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const { openRegistration } = useWebinarRegistration();

  return (
    <section id="services" ref={timelineRef} className="bg-white px-4 py-14 md:py-20">
      <div className="mx-auto max-w-7xl divide-y divide-zinc-200">
        {/* Row 1  -  text | image */}
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
                text="Israeli-Led Cyber Defense Training for India's Professionals."
                className="text-xl font-semibold leading-snug sm:text-2xl md:text-4xl"
                color="#3f3f46"
                shineColor="#18181b"
                speed={3}
                spread={120}
              />
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-700 md:text-base">
              <span className="font-semibold">CYBERLABS INDIA</span> brings <span className="underline decoration-dotted underline-offset-4 decoration-blue-600">Israeli-led, simulation-driven cyber defense
              training</span> to India - launched by <span className="font-semibold">Cyveritas Technologies</span>, in collaboration
              with <span className="font-semibold">CYBERLABS USA</span>. We prepare professionals for the same threats
              faced by global enterprises, institutions, and governments through
              practical, operator-led learning - <span className="text-blue-600 font-medium">not theory alone</span>.
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
              alt="CYBERLABS cyber defense training"
              className="h-[200px] w-full md:h-full md:min-h-[240px]"
            />
          </TimelineContent>
        </div>

        {/* Row 2  -  full width expertise */}
        <TimelineContent
          as="article"
          animationNum={3}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="px-0 py-6 md:px-8 md:py-8"
        >
          <p className="text-base font-medium leading-relaxed text-zinc-800 md:text-lg">
            Through free Career Guidance Webinars, Elite Bootcamps, and Flagship
            programs, CYBERLABS develops practical capability across:
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

        {/* Row 3  -  questions | image */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200">
          <TimelineContent
            as="article"
            animationNum={4}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="px-0 py-6 md:px-8 md:py-8"
          >


            
            <p className="text-sm leading-relaxed text-zinc-800 md:text-base">
              As demand grows across{" "}
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
              and other global markets, professionals are asking how to choose
              the right path into cyber defense:
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
              alt="Cyber defense career pathways"
              className="h-[200px] w-full md:h-full md:min-h-[240px]"
            />
          </TimelineContent>
        </div>

        {/* Row 4  -  learning pathways */}
        <TimelineContent
          as="article"
          animationNum={6}
          timelineRef={timelineRef}
          customVariants={revealVariants}
          className="mx-auto max-w-6xl items-center justify-center px-0 py-6 text-center md:px-8 md:py-8"
        >
          <p className="text-base font-semibold leading-relaxed text-blue-600 md:text-lg">
            CYBERLABS INDIA offers a complete pathway - from free guidance to
            advanced training:
          </p>

          <div className="mx-auto mt-6 grid max-w-5xl gap-5 text-left sm:grid-cols-3">
            <PathwayCard
              title="Free Career Guidance Webinars"
              description="Live sessions led by working cyber professionals to help you understand the industry, emerging roles, and where you fit."
            />
            <PathwayCard
              title="Elite Boot Camps"
              description="Intensive 30–50 hour programs focused on high-demand specializations - built for working professionals who need focused, practical expertise fast."
            />
            <PathwayCard
              title="Flagship Programs"
              description="Immersive 145–450 hour pathways that build deep operational capability for specialized and leadership-oriented cyber defense roles."
            />
          </div>

          <p className="mx-auto mt-6 max-w-3xl text-sm leading-relaxed text-zinc-700 md:text-base">
            Focused on skills over certifications alone, CYBERLABS helps you
            understand the industry, build relevant capability, and develop a
            successful long-term career in cyber defense.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CandyButton
              type="button"
              onClick={() => openRegistration()}
              className="w-full rounded-lg! border-zinc-800! bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)]! px-6! py-3! text-sm! text-white shadow-none! active:rotate-0 sm:w-auto"
            >
              Register for Webinars
            </CandyButton>
            <CandyButton
              href={mainSiteUrl("/cyber-defense-programs")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-lg! border-zinc-400! bg-[radial-gradient(95%_60%_at_50%_75%,#52525b_0%,#71717a_100%)]! px-6! py-3! text-sm! text-white shadow-none! active:rotate-0 sm:w-auto"
            >
              Explore Programs & Bootcamps
            </CandyButton>
          </div>
        </TimelineContent>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";

const WHY_CYBERLABS_IMAGE ="/images/Img-05.webp";

const whyChooseItems = [
  "Learn From Real Cyber Professionals",
  "Industry-Driven Learning",
  "Skills Over Certifications",
  "Practical & Operational Focus",
  "Modern Cybersecurity Specializations",
  "Global Career Perspective",
  "Continuous Learning Pathways",
  "Professional Development Focus",
];

const revealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.06,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

function PanelBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, var(--background) 0%, var(--background) 50%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at 50% 150%, #a1a1aa 0%, var(--background) 75%)",
          opacity: 0.7,
        }}
      >
        <div
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 15%, rgba(0,0,0,0.35) 100%)",
            backgroundImage:
              "repeating-conic-gradient(from 0deg at 50% 100%, #71717a 0deg, #71717a 1deg, transparent 1deg, transparent 4deg)",
            bottom: "-5%",
            height: "100%",
            left: "50%",
            maskImage:
              "linear-gradient(to bottom, rgba(0,0,0,0) 15%, rgba(0,0,0,0.35) 100%)",
            opacity: 0.2,
            pointerEvents: "none",
            position: "absolute",
            transform: "translateX(-50%)",
            width: "300%",
          }}
        />
      </div>
    </div>
  );
}

export function WhyCyberlabsSection() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const half = Math.ceil(whyChooseItems.length / 2);
  const columns = [
    whyChooseItems.slice(0, half),
    whyChooseItems.slice(half),
  ];

  return (
    <section id="solutions" ref={timelineRef} className=" px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-12 lg:items-stretch">
          {/* Content */}
          <div className="flex flex-col">
            <TimelineContent
              as="h2"
              animationNum={1}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="text-pretty"
            >
              <ShinyText
                text="Why CYBERLABS?"
                className="text-2xl font-semibold leading-tight tracking-tight sm:text-3xl md:text-4xl"
                color="#3f3f46"
                shineColor="#18181b"
                speed={3}
                spread={120}
              />
            </TimelineContent>

            <TimelineContent
              as="p"
              animationNum={2}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="mt-4 max-w-xl text-base font-medium leading-relaxed md:text-lg"
            >
             
                Real-World Cybersecurity. Digital Intelligence. Future-Focused
                Career Guidance.
              
            </TimelineContent>

            <TimelineContent
              as="div"
              animationNum={3}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="relative mt-8 flex-1 overflow-hidden border border-dashed border-zinc-200 bg-white p-5 md:p-6"
            >
              <PanelBackground />

              <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
                {columns.map((column, colIndex) => (
                  <ul key={colIndex} className="space-y-3">
                    {column.map((item, rowIndex) => (
                      <li
                        key={item}
                        className="flex items-start gap-2.5 rounded-lg border border-transparent px-1 py-1 transition-colors hover:border-zinc-100 hover:bg-zinc-50/80"
                      >
                        <span className="mt-0.5 flex h-3 w-3 shrink-0 items-center justify-center bg-emerald-500 rounded text-xs text-emerald-600">
                          
                        </span>
                        <span className="text-sm lg:text-base leading-snug text-zinc-700">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </TimelineContent>

            <TimelineContent
              as="div"
              animationNum={11}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="relative mt-6 overflow-hidden border border-dashed border-neutral-200 bg-neutral-50 px-5 py-4"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(45deg, #e5e5e5 0, #e5e5e5 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #e5e5e5 0, #e5e5e5 1px, transparent 0, transparent 50%)",
                  backgroundSize: "6px 6px",
                  opacity: 0.4,
                }}
              />
              <p className="relative z-10 text-sm leading-relaxed text-zinc-600 md:text-base">
                At CYBERLABS, we don&apos;t simply teach cybersecurity. We help
                professionals understand the industry, identify opportunities,
                build relevant skills, and develop successful long-term careers.
              </p>
            </TimelineContent>
          </div>

          {/* Image */}
          <TimelineContent
            as="div"
            animationNum={4}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="group relative min-h-[280px] overflow-hidden lg:min-h-full"
          >
            <Image
              src={WHY_CYBERLABS_IMAGE}
              alt="Cybersecurity professionals working in a modern security operations environment"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            {/* <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-900/40 via-zinc-900/5 to-transparent" /> */}
            <div className="pointer-events-none absolute inset-0 border border-white/10" />
          </TimelineContent>
        </div>
      </div>
    </section>
  );
}

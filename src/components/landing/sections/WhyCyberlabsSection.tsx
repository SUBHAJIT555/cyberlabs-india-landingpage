"use client";

import Image from "next/image";
import { useRef } from "react";
import { TimelineContent } from "@/components/ui/timeline-animation";
import ShinyText from "@/components/ui/ShinyText";
import GradientText from "@/components/ui/GradientText";

const WHY_CYBERLABS_IMAGE =
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1400&auto=format&fit=crop";

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
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        style={{
          WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 70%)",
          backgroundImage:
            "linear-gradient(90deg, #d4d4d8 1px, transparent 1px)",
          backgroundSize: "8px 100%",
          height: "100%",
          left: "0",
          maskImage: "linear-gradient(to top, #000 0%, transparent 70%)",
          opacity: 0.4,
          position: "absolute",
          top: "0",
          width: "100%",
        }}
      />
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
      <div className="mx-auto max-w-6xl">
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
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-xs text-emerald-600">
                          ✔
                        </span>
                        <span className="text-sm leading-snug text-zinc-700">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            </TimelineContent>

            <TimelineContent
              as="p"
              animationNum={11}
              timelineRef={timelineRef}
              customVariants={revealVariants}
              className="mt-6 border border-dashed border-zinc-200 bg-white px-5 py-4 text-sm leading-relaxed text-zinc-600 md:text-base"
            >
              At CYBERLABS, we don&apos;t simply teach cybersecurity. We help
              professionals understand the industry, identify opportunities,
              build relevant skills, and develop successful long-term careers.
            </TimelineContent>
          </div>

          {/* Image */}
          <TimelineContent
            as="div"
            animationNum={4}
            timelineRef={timelineRef}
            customVariants={revealVariants}
            className="group relative min-h-[280px] overflow-hidden border border-zinc-200 bg-zinc-100 lg:min-h-full"
          >
            <Image
              src={WHY_CYBERLABS_IMAGE}
              alt="Cybersecurity professionals working in a modern security operations environment"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-zinc-900/40 via-zinc-900/5 to-transparent" />
            <div className="pointer-events-none absolute inset-0 border border-white/10" />
          </TimelineContent>
        </div>
      </div>
    </section>
  );
}

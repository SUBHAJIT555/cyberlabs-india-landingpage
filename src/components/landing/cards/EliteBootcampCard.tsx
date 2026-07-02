"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, type KeyboardEvent, type MouseEvent } from "react";
import type { Bootcamp } from "@/types/bootcamp";
import { crosshatchBgStyle } from "@/lib/crosshatch-bg";
import { resolveCatalogAsset } from "@/lib/main-site-assets";
import { mainSiteUrl } from "@/data/main-site";
import { CandyButton } from "@/components/ui/candy-button";
import GradientText from "@/components/ui/GradientText";
import BootcampPriceBlock from "@/components/ui/BootcampPriceBlock";
import BootcampDiscountRibbon from "@/components/ui/BootcampDiscountRibbon";

type EliteBootcampCardProps = {
  bootcamp: Bootcamp;
  index: number;
};

function AnimatedClockIcon({ isInView }: { isInView: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0 text-blue-600"
      aria-hidden
    >
      <motion.path
        stroke="none"
        d="M0 0h24v24H0z"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.3, delay: 0, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1 -10 10 10 10 0 0 1 -10 -10 10 10 0 0 1 10 -10z"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, repeatDelay: 3 }}
      />
      <motion.path
        d="M12 6v6l4 2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 0.25, delay: 0.6, repeat: Infinity, repeatDelay: 3 }}
      />
    </svg>
  );
}

function ArrowUpRightIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover/details:rotate-45"
      aria-hidden
    >
      <path d="M7 17L17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

export function EliteBootcampCard({ bootcamp, index }: EliteBootcampCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { once: false, margin: "-50px" });
  const detailsUrl = mainSiteUrl(`/cyber-defense-programs/bootcamp/${bootcamp.slug}`);
  const imageSrc = resolveCatalogAsset(bootcamp.image);

  const openDetails = () => {
    window.open(detailsUrl, "_blank", "noopener,noreferrer");
  };

  const stopPropagation = (event: MouseEvent | KeyboardEvent) => {
    event.stopPropagation();
  };

  return (
    <motion.article
      ref={cardRef}
      id={`bootcamp-${bootcamp.slug}`}
      role="link"
      tabIndex={0}
      onClick={openDetails}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openDetails();
        }
      }}
      aria-label={`View details for ${bootcamp.title}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.06,
      }}
      className="group relative flex h-full cursor-pointer flex-col overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:border-blue-600/25 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/40"
    >
      <div className="relative h-46 w-full shrink-0 overflow-hidden bg-neutral-100 sm:h-50">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={bootcamp.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : null}
        <BootcampDiscountRibbon
          originalPrice={bootcamp.originalPrice}
          launchPrice={bootcamp.launchPrice}
        />
        <div className="pointer-events-none absolute top-3 left-3 z-10">
          <GradientText
            showBorder
            colors={["#0a0a0f", "#0f172a", "#1e3a8a", "#2563eb", "#0ea5e9"]}
            animationSpeed={8}
            className="rounded-md! text-[10px] font-semibold! uppercase tracking-[0.12em] sm:text-[11px]"
          >
            Elite Boot Camp
          </GradientText>
        </div>
      </div>

      <div className="relative flex flex-1 flex-col">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={crosshatchBgStyle}
          aria-hidden
        />

        <div className="relative z-10 flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="mb-3 line-clamp-2 min-h-11 text-lg leading-snug font-semibold text-zinc-900 transition group-hover:text-blue-600 sm:text-xl md:text-2xl">
            {bootcamp.title}
          </h3>

          <div className="mb-2 flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-200 bg-white/90 px-2.5 py-1 shadow-sm ring ring-neutral-200 ring-offset-1">
              <AnimatedClockIcon isInView={isInView} />
              <span className="text-[11px] font-medium text-zinc-900 sm:text-xs">
                Duration:{" "}
                <span className="font-semibold text-blue-600">{bootcamp.duration}</span>
              </span>
            </div>

            <span className="inline-flex items-center rounded-lg border border-neutral-200 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-zinc-700 shadow-sm ring ring-neutral-200 ring-offset-1 sm:text-xs">
              Language:{" "}
              <span className="font-semibold text-zinc-900">{bootcamp.language}</span>
            </span>
            <span className="inline-flex items-center rounded-lg border border-neutral-200 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-zinc-700 shadow-sm ring ring-neutral-200 ring-offset-1 sm:text-xs">
              <span className="font-semibold text-zinc-900">{bootcamp.date}</span>
            </span>
          </div>

          <BootcampPriceBlock
            originalPrice={bootcamp.originalPrice}
            launchPrice={bootcamp.launchPrice}
            currency={bootcamp.currency}
            className="mb-3"
          />

          {bootcamp.launchNote ? (
            <p className="mb-2 text-[11px] font-medium text-blue-600 underline decoration-1 underline-offset-2 sm:text-xs">
              {bootcamp.launchNote}
            </p>
          ) : null}

          <p className="flex-1 text-xs leading-relaxed font-medium text-zinc-800 sm:text-sm">
            {bootcamp.description}
          </p>

          <div
            className="mt-auto flex flex-row gap-2 border-t border-neutral-200/80 pt-4"
            onClick={stopPropagation}
            onKeyDown={stopPropagation}
          >
            <CandyButton
              href={detailsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stopPropagation}
              className="min-w-0 flex-1 rounded-lg! border-zinc-800! bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)]! px-4! py-2.5! text-xs! font-semibold shadow-none! active:rotate-0 sm:text-sm"
            >
              Enroll Now
            </CandyButton>

            <CandyButton
              href={detailsUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={stopPropagation}
              className="group/details flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-lg! border-zinc-400! bg-[radial-gradient(95%_60%_at_50%_75%,#52525b_0%,#71717a_100%)]! px-4! py-2.5! text-xs! font-medium shadow-none! active:rotate-0 sm:text-sm"
            >
              <span className="truncate">View Details</span>
              <ArrowUpRightIcon />
            </CandyButton>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const PROGRESS_RADIUS = 46;
const PROGRESS_CIRCUMFERENCE = 2 * Math.PI * PROGRESS_RADIUS;

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      setIsVisible(scrollY > 0);
      setProgress(maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const strokeDashoffset =
    PROGRESS_CIRCUMFERENCE - (progress / 100) * PROGRESS_CIRCUMFERENCE;

  return (
    <div
      className={cn(
        "fixed bottom-4 right-4 z-50 transition-opacity duration-300 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8",
        isVisible
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0",
      )}
    >
      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
        className="group relative flex h-11 w-11 items-center justify-center rounded-full md:h-14 md:w-14"
      >
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <circle
            cx="50"
            cy="50"
            r={PROGRESS_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-zinc-200"
          />
          <circle
            cx="50"
            cy="50"
            r={PROGRESS_RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={PROGRESS_CIRCUMFERENCE}
            strokeDashoffset={strokeDashoffset}
            className="text-[#C072E0] transition-[stroke-dashoffset] duration-150 md:stroke-7"
          />
        </svg>

        <span className="relative flex h-8 w-8 items-center justify-center rounded-full border border-dashed border-zinc-200 bg-white text-zinc-700 shadow-sm transition-colors group-hover:border-zinc-300 group-hover:text-zinc-900 md:h-10 md:w-10">
          <ArrowUpIcon className="h-4 w-4 md:h-5 md:w-5" />
        </span>
      </button>
    </div>
  );
}

function ArrowUpIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M12 5v6m0 3v1.5m0 3v.5" />
      <path d="M16 9l-4 -4" />
      <path d="M8 9l4 -4" />
    </svg>
  );
}

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import GradientText from "@/components/ui/GradientText";

export const landingSectionHeadingClass =
  "text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl";

export const landingRevealVariants = {
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      delay: i * 0.12,
      duration: 0.45,
    },
  }),
  hidden: {
    filter: "blur(10px)",
    y: 16,
    opacity: 0,
  },
};

const LANDING_GRADIENT_COLORS = [
  "#52525b",
  "#2563eb",
  "#3f3f46",
  "#1d4ed8",
  "#52525b",
] as const;

export const landingSectionClass = "relative overflow-hidden bg-white px-4 py-10 md:py-14";
export const landingInnerClass = "relative z-10 mx-auto w-full max-w-7xl";

export function LandingSectionShell({
  className,
  children,
  id,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className={cn(landingSectionClass, className)}>
      <div className={landingInnerClass}>{children}</div>
    </section>
  );
}

export function LandingBento({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("divide-y divide-zinc-200", className)}>{children}</div>;
}

export function LandingBentoRow({
  className,
  children,
  columns = 2,
}: {
  className?: string;
  children: ReactNode;
  columns?: 1 | 2;
}) {
  return (
    <div
      className={cn(
        columns === 2 &&
          "grid grid-cols-1 md:grid-cols-2 md:divide-x md:divide-zinc-200",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function LandingBentoCell({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return <div className={cn("px-0 py-6 md:px-8 md:py-8", className)}>{children}</div>;
}

export function LandingFramedTwoCol({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("border-y border-zinc-200", className)}>
      <LandingBentoRow>{children}</LandingBentoRow>
    </div>
  );
}

export function LandingTagPill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border border-dotted border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-medium text-zinc-700 shadow-sm transition hover:border-zinc-300 hover:font-semibold hover:text-zinc-900 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function LandingGoalBanner({
  title,
  className,
}: {
  title: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mt-4 overflow-hidden border border-dashed border-zinc-200 bg-white px-6 py-10 text-center md:py-14",
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, white 0%, white 50%, rgba(255,255,255,0) 100%), radial-gradient(ellipse at 50% 120%, #a1a1aa 0%, white 80%)",
          opacity: 0.75,
        }}
      />
      <div className="relative z-10 text-lg font-semibold sm:text-xl md:text-2xl">
        {title}
      </div>
    </div>
  );
}

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-lg border border-dotted border-zinc-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] shadow-sm">
      <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
      <GradientText
        className="text-xs font-semibold uppercase tracking-[0.14em]"
        colors={[...LANDING_GRADIENT_COLORS]}
        animationSpeed={4}
        direction="horizontal"
        showBorder={false}
        pauseOnHover={false}
      >
        {children}
      </GradientText>
    </span>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/utils";

type FeatureType = {
  title: string;
  icon: React.ReactNode;
};

type FeatureCardProps = React.ComponentProps<"div"> & {
  feature: FeatureType;
};

export function FeatureCard({ feature, className, ...props }: FeatureCardProps) {
  const [squares, setSquares] = React.useState<number[][] | null>(null);

  React.useEffect(() => {
    setSquares(genRandomPattern());
  }, []);

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden border border-zinc-200 border-dashed bg-white p-6",
        className,
      )}
      {...props}
    >
      <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full mask-[linear-gradient(white,transparent)]">
        <div className="absolute inset-0 bg-linear-to-r from-zinc-900/5 to-zinc-900/1 opacity-100 mask-[radial-gradient(farthest-side_at_top,white,transparent)]">
          <GridPattern
            width={20}
            height={20}
            x="-12"
            y="4"
            squares={squares ?? undefined}
            className="absolute inset-0 h-full w-full fill-zinc-900/4 stroke-zinc-900/15 mix-blend-overlay"
          />
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-zinc-700 transition duration-300 group-hover:border-zinc-300 group-hover:bg-white">
          <span aria-hidden className="flex h-8 w-8 items-center justify-center [&_svg]:h-8 [&_svg]:w-8">
            {feature.icon}
          </span>
        </div>

        <h3 className="relative z-20 mt-8 text-sm font-semibold text-zinc-900 md:text-base lg:text-xl!">
          {feature.title}
        </h3>
      </div>
    </div>
  );
}

function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: React.ComponentProps<"svg"> & {
  width: number;
  height: number;
  x: string;
  y: string;
  squares?: number[][];
}) {
  const patternId = React.useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" strokeWidth={0} fill={`url(#${patternId})`} />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([sx, sy], index) => (
            <rect
              strokeWidth="0"
              key={index}
              width={width + 1}
              height={height + 1}
              x={sx * width}
              y={sy * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}

function genRandomPattern(length?: number): number[][] {
  length = length ?? 5;
  return Array.from({ length }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);
}

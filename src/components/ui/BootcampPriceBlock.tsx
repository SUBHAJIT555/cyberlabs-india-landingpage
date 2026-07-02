import { cn } from "@/lib/utils";

type BootcampPriceBlockProps = {
  originalPrice: number;
  launchPrice: number;
  currency?: string;
  className?: string;
  variant?: "card" | "strip";
};

export default function BootcampPriceBlock({
  originalPrice,
  launchPrice,
  currency = "INR",
  className,
  variant = "card",
}: BootcampPriceBlockProps) {
  const formattedOriginal = originalPrice.toLocaleString("en-IN");
  const formattedLaunch = launchPrice.toLocaleString("en-IN");
  const showOriginal = originalPrice > launchPrice;

  if (variant === "strip") {
    return (
      <div className={cn("flex flex-col gap-2 text-sm", className)}>
        {showOriginal && (
          <div className="flex items-center justify-between gap-3">
            <span className="font-medium text-neutral-600">Original Price</span>
            <span className="text-sm font-medium text-neutral-600 tabular-nums">
              <span className="line-through decoration-2 decoration-red-500/45">
                ₹{formattedOriginal}
              </span>{" "}
              <span className="text-xs font-medium">{currency}</span>
            </span>
          </div>
        )}
        <div className="flex items-center justify-between gap-3">
          <span className="font-medium text-zinc-700/70">Launch Price</span>
          <span className="text-base font-bold text-zinc-900 tabular-nums">
            ₹{formattedLaunch}{" "}
            <span className="font-medium text-zinc-500">{currency}</span>
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full overflow-hidden border border-neutral-200 bg-white shadow-sm",
        className,
      )}
    >
      {showOriginal && (
        <div className="flex items-center justify-between gap-3 border-b border-dashed border-neutral-200 bg-neutral-50/80 px-3 py-2 sm:px-3.5">
          <span className="text-[11px] font-medium text-neutral-600 sm:text-xs">
            Original Price
          </span>
          <span className="text-sm font-medium text-neutral-600 tabular-nums">
            <span className="line-through decoration-2 decoration-red-500/60">
              ₹{formattedOriginal}
            </span>{" "}
            <span className="text-[11px] font-semibold">{currency}</span>
          </span>
        </div>
      )}
      <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-3.5 sm:py-3">
        <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          Launch Price
        </span>
        <span className="text-lg font-bold leading-none text-zinc-900 tabular-nums sm:text-xl">
          ₹{formattedLaunch}{" "}
          <span className="text-xs font-semibold text-neutral-500">{currency}</span>
        </span>
      </div>
    </div>
  );
}

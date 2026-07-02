export function getBootcampDiscountPercent(
  originalPrice: number,
  launchPrice: number,
): number {
  if (originalPrice <= launchPrice || originalPrice <= 0) return 0;
  return Math.round(((originalPrice - launchPrice) / originalPrice) * 100);
}

type BootcampDiscountRibbonProps = {
  originalPrice: number;
  launchPrice: number;
  className?: string;
};

export default function BootcampDiscountRibbon({
  originalPrice,
  launchPrice,
  className = "",
}: BootcampDiscountRibbonProps) {
  const discountPercent = getBootcampDiscountPercent(originalPrice, launchPrice);
  if (discountPercent <= 0) return null;

  return (
    <div
      className={`pointer-events-none absolute top-0 right-0 z-20 h-[88px] w-[88px] overflow-hidden ${className}`}
      aria-hidden
    >
      <div className="absolute top-[14px] right-[-30px] w-[126px] rotate-45 border border-t border-b border-neutral-200 bg-blue-600 py-1.5 text-center">
        <span className="block text-[11px] font-medium tracking-wider whitespace-nowrap text-white uppercase">
          {discountPercent}% Off
        </span>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { cn } from "@/lib/cn";

export type CandyButtonVariant = "default" | "white";

type CandyButtonSharedProps = {
  className?: string;
  children?: React.ReactNode;
  variant?: CandyButtonVariant;
};

type CandyButtonAsButton = CandyButtonSharedProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type CandyButtonAsLink = CandyButtonSharedProps & {
  href: string;
  target?: string;
  rel?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "href" | "type">;

export type CandyButtonProps = CandyButtonAsButton | CandyButtonAsLink;

const candyBaseClass =
  "relative overflow-hidden font-semibold text-base leading-[22px] tracking-[0.02em] " +
  "rounded-xl cursor-pointer transition-all duration-200 ease-out " +
  "active:scale-95 inline-flex items-center justify-center";

export const candyWhiteSurfaceClass =
  "border border-zinc-200 bg-[radial-gradient(95%_60%_at_50%_75%,#d4d4d8_0%,#f4f4f5_48%,#ffffff_100%)] shadow-sm";

const candyVariantClass: Record<CandyButtonVariant, string> = {
  default:
    "border border-[#54A1FD] bg-[radial-gradient(95%_60%_at_50%_75%,#005FD6_0%,#209BFF_100%)] " +
    "px-9 py-3 text-white shadow-sm active:rotate-1 hover:brightness-110 " +
    "after:pointer-events-none after:absolute after:top-px after:right-[10%] after:h-px after:w-[60%] " +
    "after:bg-linear-to-r after:from-transparent after:via-white/50 after:to-transparent",
  white:
    `${candyWhiteSurfaceClass} text-zinc-600 active:rotate-0 hover:brightness-[1.03]`,
};

export const CandyButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CandyButtonProps
>(function CandyButton(props, ref) {
  if ("href" in props && props.href) {
    const {
      className,
      children = "Candy Button",
      variant = "default",
      href,
      target,
      rel,
      ...anchorProps
    } = props;

    return (
      <a
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        className={cn(candyBaseClass, candyVariantClass[variant], className)}
        {...anchorProps}
      >
        {children}
      </a>
    );
  }

  const {
    className,
    children = "Candy Button",
    variant = "default",
    ...buttonProps
  } = props as CandyButtonAsButton;

  return (
    <button
      ref={ref as React.ForwardedRef<HTMLButtonElement>}
      className={cn(candyBaseClass, candyVariantClass[variant], className)}
      {...buttonProps}
    >
      {children}
    </button>
  );
});

CandyButton.displayName = "CandyButton";

export default CandyButton;

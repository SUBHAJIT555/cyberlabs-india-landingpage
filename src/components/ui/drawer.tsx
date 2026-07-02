"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { crosshatchBgStyle } from "@/lib/crosshatch-bg";
import { CandyButton } from "@/components/ui/candy-button";

type DrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
};

export function Drawer({ open, onOpenChange, children }: DrawerProps) {
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className="fixed inset-0 z-50 bg-white/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => onOpenChange(false)}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col border-l border-dashed border-zinc-200 bg-white shadow-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative flex min-h-0 flex-1 flex-col bg-white">
              <div
                className="pointer-events-none absolute inset-0 z-0"
                style={crosshatchBgStyle}
                aria-hidden
              />
              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                {children}
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

export function DrawerHeader({
  className,
  children,
  onClose,
}: {
  className?: string;
  children: ReactNode;
  onClose?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-between border-b border-dashed border-zinc-200 px-4 py-3",
        className,
      )}
    >
      {children}
      {onClose ? (
        <CandyButton
          type="button"
          variant="white"
          aria-label="Close menu"
          onClick={onClose}
          className="h-9 w-9 shrink-0 rounded-lg! px-0! py-0! shadow-none!"
        >
          <CloseIcon />
        </CandyButton>
      ) : null}
    </div>
  );
}

export function DrawerBody({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      data-lenis-prevent
      className={cn("min-h-0 flex-1 overflow-y-auto", className)}
    >
      {children}
    </div>
  );
}

export function DrawerFooter({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col gap-4 border-t border-dashed border-zinc-200 p-4 sm:p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

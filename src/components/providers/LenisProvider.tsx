"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, type ReactNode } from "react";
import "lenis/dist/lenis.css";

const NAVBAR_OFFSET = 64;

const lenisOptions = {
  lerp: 0.08,
  duration: 1.35,
  smoothWheel: true,
  wheelMultiplier: 0.9,
  touchMultiplier: 1.15,
  autoRaf: true,
};

function LenisAnchorHandler() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;

    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest(
        'a[href^="#"]',
      );

      if (!(target instanceof HTMLAnchorElement)) return;

      const href = target.getAttribute("href");
      if (!href || href === "#") return;

      if (!document.querySelector(href)) return;

      event.preventDefault();
      lenis.scrollTo(href, { offset: -NAVBAR_OFFSET });
      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [lenis]);

  return null;
}

export function LenisProvider({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={lenisOptions}>
      <LenisAnchorHandler />
      {children}
    </ReactLenis>
  );
}

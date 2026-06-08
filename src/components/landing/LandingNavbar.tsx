"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ShinyButton } from "@/components/ui/shiny-button";
import Shuffle from "@/components/ui/Shuffle";
import { useWebinarRegistration } from "@/context/webinar-registration";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "Why", href: "#why" },
  { label: "Expertise", href: "#expertise" },
  { label: "Career", href: "#career" },
  { label: "Topics", href: "#topics" },
  { label: "Audience", href: "#audience" },
  { label: "Webinars", href: "#webinars" },
];

const mobilePanelVariants = {
  closed: {
    opacity: 0,
    y: -18,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 0.2, 1] as const,
      when: "afterChildren" as const,
      staggerChildren: 0.025,
      staggerDirection: -1 as const,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.24,
      ease: [0.16, 1, 0.3, 1] as const,
      when: "beforeChildren" as const,
      staggerChildren: 0.035,
      delayChildren: 0.01,
    },
  },
};

const mobileItemVariants = {
  closed: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.14, ease: [0.4, 0, 0.2, 1] as const },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.18, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function LandingNavbar() {
  const { openRegistration } = useWebinarRegistration();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const handleRegister = () => {
    openRegistration();
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition",
        scrolled ? "border-zinc-200 bg-white/50" : "border-transparent bg-white/45",
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 lg:px-8">
        <Link
          href="#home"
          className="inline-flex items-center"
          aria-label="Cyberlabs India home"
        >
          <Image
            src="/logo/cyberlabs-logo.svg"
            alt="Cyberlabs India"
            width={180}
            height={40}
            priority
            className="h-8 w-auto md:h-10"
            style={{ width: "auto" }}
          />
        </Link>

        <div className="hidden items-center gap-5 lg:gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group inline-flex text-sm md:text-base text-zinc-700 transition hover:text-zinc-950"
            >
              <Shuffle
                text={item.label}
                tag="span"
                className="text-sm md:text-base font-medium leading-none"
                textAlign="left"
                shuffleDirection="right"
                duration={0.3}
                animationMode="evenodd"
                shuffleTimes={1}
                ease="power3.out"
                stagger={0.03}
                threshold={0.1}
                triggerOnce
                triggerOnHover
                hoverTarget="parent-group"
                respectReducedMotion
              />
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <ShinyButton onClick={handleRegister} className="shiny-cta--compact rounded-lg! shadow-lg! shadow-zinc-800/20!">
            Register Now
          </ShinyButton>
        </div>

        <button
          type="button"
          className={cn(
            "inline-flex h-9 w-9 items-center justify-center border transition md:hidden",
            open
              ? " text-zinc-900 border-none!"
              : " text-zinc-800 border-none!",
          )}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="relative block h-4 w-4">
            <span
              className={cn(
                "absolute left-0 top-0 h-0.5 w-4 rounded-full bg-current transition",
                open ? "translate-y-[7px] rotate-45" : "translate-y-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[7px] h-0.5 w-4 rounded-full bg-current transition",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-[14px] h-0.5 w-4 rounded-full bg-current transition",
                open ? "translate-y-[-7px] -rotate-45" : "translate-y-0",
              )}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="mobile-menu"
            className="relative overflow-hidden border-t border-b shadow-lg border-zinc-200 bg-white md:hidden"
            variants={mobilePanelVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="absolute inset-0 z-0">
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to top, #000 0%, transparent 80%)",
                  backgroundImage:
                    "linear-gradient(90deg, #d4d4d8 1px, transparent 1px)",
                  backgroundSize: "8px 100%",
                  height: "100%",
                  left: "0",
                  maskImage:
                    "linear-gradient(to top, #000 0%, transparent 80%)",
                  opacity: 0.5,
                  pointerEvents: "none",
                  position: "absolute",
                  top: "0",
                  width: "100%",
                }}
              />
            </div>
            <motion.div
              className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-1 px-3 py-3"
              variants={mobilePanelVariants}
            >
              {navItems.map((item) => (
                <motion.div key={item.href} variants={mobileItemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-2 py-1.5 text-sm font-medium text-zinc-800 hover:bg-zinc-100"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div variants={mobileItemVariants}>
                <ShinyButton
                  onClick={handleRegister}
                  className="mt-1 w-full justify-center px-6! py-4! text-sm! rounded-2xl!"
                >
                  Register Now
                </ShinyButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

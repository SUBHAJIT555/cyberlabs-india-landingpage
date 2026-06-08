"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { ShinyButton } from "@/components/ui/shiny-button";
import Shuffle from "@/components/ui/Shuffle";
import { useWebinarRegistration } from "@/context/webinar-registration";
import { AnimatePresence, motion } from "framer-motion";

const exploreLinks = [
  { label: "Why", href: "#why" },
  { label: "Expertise", href: "#expertise" },
  { label: "Career", href: "#career" },
  { label: "Topics", href: "#topics" },
  { label: "Audience", href: "#audience" },
  { label: "Webinars", href: "#webinars" },
];

const followLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cyberlabs-india/",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cyberlabsindia",
    external: true,
  },
];

const contactLinks = [
  {
    label: "education@cyberlabs-india.com",
    href: "mailto:education@cyberlabs-india.com",
    external: true,
  },
  {
    label: "cyberlabs-india.com",
    href: "https://cyberlabs-india.com",
    external: true,
  },
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

function MobileMenuPatternBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0"
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, #e5e5e5 0, #e5e5e5 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, #e5e5e5 0, #e5e5e5 1px, transparent 0, transparent 50%)",
        backgroundSize: "5px 5px",
        opacity: 0.4,
      }}
    />
  );
}

function MobileNavSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-800">
        {title}
      </p>
      <div className="mt-2 border-t border-dashed border-zinc-200 pt-3">
        {children}
      </div>
    </div>
  );
}

function MobileNavLink({
  href,
  children,
  external,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  onClick?: () => void;
}) {
  const className =
    "group inline-flex w-full items-center gap-1 rounded-md px-2 py-2 text-sm font-medium text-zinc-700 transition hover:bg-white/70 hover:text-zinc-900";

  const content = (
    <>
      <span>{children}</span>
      <MobileNavArrowIcon />
    </>
  );

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={external || href.startsWith("http") ? "_blank" : undefined}
        rel={
          external || href.startsWith("http") ? "noreferrer" : undefined
        }
        onClick={onClick}
        className={className}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} className={className}>
      {content}
    </Link>
  );
}

function MobileNavArrowIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="translate-x-[-3px] opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12h.5m3 0h1.5m3 0h6" />
      <path d="M13 18l6 -6" />
      <path d="M13 6l6 6" />
    </svg>
  );
}

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
          {exploreLinks.map((item) => (
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
            className="relative max-h-[calc(100dvh-4rem)] overflow-hidden border-b border-t border-neutral-200 bg-neutral-50 shadow-lg md:hidden"
            variants={mobilePanelVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <MobileMenuPatternBackground />
            <motion.div
              className="webinar-modal-scroll relative z-10 mx-auto flex max-h-[calc(100dvh-4rem)] w-full max-w-6xl flex-col gap-5 overflow-y-auto overscroll-contain px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]"
              variants={mobilePanelVariants}
            >
              <motion.div variants={mobileItemVariants}>
                <MobileNavSection title="Explore">
                  <ul className="space-y-1">
                    {exploreLinks.map((item) => (
                      <li key={item.href}>
                        <MobileNavLink
                          href={item.href}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </MobileNavLink>
                      </li>
                    ))}
                  </ul>
                </MobileNavSection>
              </motion.div>

              <motion.div variants={mobileItemVariants}>
                <MobileNavSection title="Follow us on">
                  <ul className="space-y-1">
                    {followLinks.map((item) => (
                      <li key={item.href}>
                        <MobileNavLink
                          href={item.href}
                          external={item.external}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </MobileNavLink>
                      </li>
                    ))}
                  </ul>
                </MobileNavSection>
              </motion.div>

              <motion.div variants={mobileItemVariants}>
                <MobileNavSection title="Get in touch">
                  <ul className="space-y-1">
                    {contactLinks.map((item) => (
                      <li key={item.href}>
                        <MobileNavLink
                          href={item.href}
                          external={item.external}
                          onClick={() => setOpen(false)}
                        >
                          {item.label}
                        </MobileNavLink>
                      </li>
                    ))}
                  </ul>
                </MobileNavSection>
              </motion.div>

              <motion.div variants={mobileItemVariants}>
                <ShinyButton
                  onClick={handleRegister}
                  className="w-full justify-center rounded-2xl! px-6! py-4! text-sm!"
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

"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CandyButton } from "@/components/ui/candy-button";
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { Kbd } from "@/components/ui/kbd";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/ui/social-icons";
import { ShinyButton } from "@/components/ui/shiny-button";
import { YouTubeIcon } from "@/components/ui/YouTubeIcon";
import { CONTACT } from "@/data/contact-info";
import {
  mainSiteLegalLinks,
  mainSiteNavigation,
  mainSiteSocialLinks,
  mainSiteUrl,
} from "@/data/main-site";
import { useMainSiteData } from "@/context/main-site-data";
import { cn } from "@/lib/cn";
import { crosshatchBgStyle } from "@/lib/crosshatch-bg";
import { useLenis } from "lenis/react";

const socialCandyClass = "h-10 w-10 px-0! py-0!";

const drawerSocialIcons = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
  LinkedIn: LinkedInIcon,
  WhatsApp: WhatsAppIcon,
} as const;

export function LandingNavbar() {
  const { catalog } = useMainSiteData();
  const mainSiteFlagshipPrograms = catalog.flagshipProgramCards.map((program) => ({
    slug: program.slug,
    title: program.title,
    category: program.category,
    duration: program.duration,
  }));
  const mainSiteBootcamps = catalog.bootcamps.map((bootcamp) => ({
    slug: bootcamp.slug,
    title: bootcamp.title,
    duration: bootcamp.duration,
  }));

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const commandScrollRef = useRef<HTMLDivElement | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) {
      const onScroll = () => setIsScrolled(window.scrollY > 10);
      onScroll();
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }

    let ticking = false;
    const handleScroll = ({ scroll }: { scroll: number }) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(scroll > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    lenis.on("scroll", handleScroll);
    if (lenis.scroll !== undefined) setIsScrolled(lenis.scroll > 10);

    return () => {
      lenis.off("scroll", handleScroll);
    };
  }, [lenis]);

  useEffect(() => {
    if (isCommandOpen || isDrawerOpen) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [isCommandOpen, isDrawerOpen, lenis]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isMetaK =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (isMetaK) {
        event.preventDefault();
        setIsCommandOpen(true);
      }
      if (event.key === "Escape") {
        setIsCommandOpen(false);
        setSearchQuery("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const normalizedQuery = searchQuery.toLowerCase().trim();
  const filterByQuery = (text: string) =>
    !normalizedQuery || text.toLowerCase().includes(normalizedQuery);

  const filteredNavigation = mainSiteNavigation.filter(
    (item) => filterByQuery(item.label) || filterByQuery(item.path),
  );
  const filteredPrograms = mainSiteFlagshipPrograms.filter(
    (item) =>
      filterByQuery(item.title) ||
      filterByQuery(item.category) ||
      filterByQuery(item.slug),
  );
  const filteredBootcamps = mainSiteBootcamps.filter(
    (item) => filterByQuery(item.title) || filterByQuery(item.slug),
  );
  const filteredLegal = mainSiteLegalLinks.filter(
    (item) => filterByQuery(item.label) || filterByQuery(item.path),
  );

  const closeCommand = () => {
    setIsCommandOpen(false);
    setSearchQuery("");
  };

  const handleCommandWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (!commandScrollRef.current) return;
    commandScrollRef.current.scrollTop += event.deltaY;
  };

  return (
    <>
      <motion.header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-all duration-300",
          isScrolled
            ? "border-zinc-200 bg-white/50"
            : "border-transparent bg-white/45",
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 lg:px-8">
          <a
            href={mainSiteUrl("/")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center"
            aria-label="CYBERLABS INDIA home"
          >
            <Image
              src="/logo/cyberlabs-logo.svg"
              alt="CYBERLABS INDIA"
              width={180}
              height={40}
              priority
              className="h-8 w-auto md:h-10"
              style={{ width: "auto" }}
            />
          </a>

          <div className="flex shrink-0 items-center gap-2.5 sm:gap-3">
            <div className="hidden lg:block">
              <motion.button
                type="button"
                className="inline-flex w-full max-w-sm cursor-pointer items-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 py-[0.58rem] text-[0.84rem] leading-none shadow-sm transition hover:border-zinc-400 hover:shadow-md focus-visible:border-blue-600/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600/15"
                whileTap={{ scale: 0.98 }}
                aria-label="Quick Access"
                onClick={() => setIsCommandOpen(true)}
              >
                <BoltIcon className="h-3.5 w-3.5 shrink-0 text-zinc-600" />
                <span className="flex-1 text-left text-zinc-500">
                  Quick Access
                </span>
                <span className="inline-flex items-center gap-0.5">
                  <Kbd className="h-[18px] border-zinc-300 bg-zinc-50 px-1 text-[9px] text-zinc-600">
                    ⌘
                  </Kbd>
                  <Kbd className="h-[18px] border-zinc-300 bg-zinc-50 px-1 text-[9px] text-zinc-600">
                    K
                  </Kbd>
                </span>
              </motion.button>
            </div>

            <motion.button
              type="button"
              className="hidden h-9 w-9 max-lg:inline-flex items-center justify-center rounded-lg text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
              whileTap={{ scale: 0.95 }}
              aria-label="Search"
              onClick={() => setIsCommandOpen(true)}
            >
              <BoltIcon className="h-5 w-5" />
            </motion.button>

            <motion.button
              type="button"
              className="hidden h-9 w-9 max-lg:inline-flex items-center justify-center rounded-lg text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-900"
              whileTap={{ scale: 0.95 }}
              aria-label="Cyber Defense Programs"
              onClick={() =>
                window.open(
                  mainSiteUrl("/cyber-defense-programs"),
                  "_blank",
                  "noopener,noreferrer",
                )
              }
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-prompt"
                aria-hidden
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 7l5 5l-5 5" />
                <path d="M13 17l6 0" />
              </svg>
            </motion.button>

            <div className="hidden lg:block">
              <ShinyButton
                onClick={() =>
                  window.open(
                    mainSiteUrl("/cyber-defense-programs"),
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
                className="shiny-cta--compact shiny-cta--light rounded-lg! shadow-lg! shadow-zinc-800/20!"
              >
                Cyber Defense Programs
              </ShinyButton>
            </div>

            <motion.button
              className="inline-flex h-9 w-9 items-center justify-center text-zinc-800 transition hover:text-zinc-900"
              whileTap={{ scale: 0.95 }}
              aria-label="Open Menu"
              aria-expanded={isDrawerOpen}
              onClick={() => setIsDrawerOpen(true)}
            >
              <HamburgerIcon open={isDrawerOpen} />
            </motion.button>
          </div>
        </div>
      </motion.header>

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerHeader onClose={() => setIsDrawerOpen(false)}>
          <a
            href={mainSiteUrl("/")}
            target="_blank"
            rel="noreferrer"
            onClick={() => setIsDrawerOpen(false)}
          >
            <Image
              src="/logo/cyberlabs-logo.svg"
              alt="CYBERLABS INDIA"
              width={160}
              height={36}
              className="h-8 w-auto"
              style={{ width: "auto" }}
            />
          </a>
        </DrawerHeader>

        <DrawerBody className="px-4 py-6">
          <nav className="w-full space-y-6">
            <NavSection title="Menu">
              {mainSiteNavigation.map((item) => (
                <DrawerNavLink
                  key={item.path}
                  href={mainSiteUrl(item.path)}
                  onNavigate={() => setIsDrawerOpen(false)}
                >
                  {item.label}
                </DrawerNavLink>
              ))}
            </NavSection>

            <NavSection title="Legal">
              {mainSiteLegalLinks.map((item) => (
                <DrawerNavLink
                  key={item.label}
                  href={item.external ? item.path : mainSiteUrl(item.path)}
                  onNavigate={() => setIsDrawerOpen(false)}
                >
                  {item.label}
                </DrawerNavLink>
              ))}
            </NavSection>
          </nav>
        </DrawerBody>

        <DrawerFooter>
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {mainSiteSocialLinks.map(({ href, label }) => {
              const Icon =
                drawerSocialIcons[label as keyof typeof drawerSocialIcons];
              return (
                <motion.div
                  key={label}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  <CandyButton
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    variant="white"
                    className={socialCandyClass}
                  >
                    <Icon className="h-5 w-5" />
                  </CandyButton>
                </motion.div>
              );
            })}
          </div>
          <p className="text-center text-xs text-zinc-500 md:text-sm">
            © {new Date().getFullYear()} CYBERLABS INDIA. All rights reserved.
          </p>
        </DrawerFooter>
      </Drawer>

      {isCommandOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-white/70 backdrop-blur-sm"
          onClick={closeCommand}
        >
          <div
            className="mt-20 w-full max-w-3xl px-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div
              className="relative flex max-h-[calc(100vh-160px)] flex-col overflow-hidden rounded-xl border border-dashed border-zinc-200 bg-white shadow-xl shadow-zinc-900/10 ring-1 ring-zinc-200/80"
              onKeyDown={(event) => {
                if (event.key === "Escape") closeCommand();
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 z-0"
                style={crosshatchBgStyle}
                aria-hidden
              />
              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                <div className="shrink-0 border-b border-dashed border-zinc-200 px-3 pb-2 pt-3 sm:px-4">
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <span className="text-base font-semibold text-zinc-900">
                      CYBERLABS INDIA
                    </span>
                    <CandyButton
                      type="button"
                      variant="white"
                      onClick={closeCommand}
                      aria-label="Close menu"
                      className="h-9 w-9 shrink-0 rounded-lg! px-0! py-0! shadow-none!"
                    >
                      <CloseIcon />
                    </CandyButton>
                  </div>
                  <div className="px-2 pb-2">
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(event) => setSearchQuery(event.target.value)}
                      placeholder="Search pages, programs, bootcamps..."
                      className="w-full rounded-lg border border-zinc-200 px-3 py-2 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:ring-2 focus:ring-zinc-200/80"
                      autoFocus
                    />
                  </div>
                </div>

                <div
                  ref={commandScrollRef}
                  data-lenis-prevent
                  className="min-h-0 flex-1 overflow-y-auto bg-transparent px-3 py-2 sm:px-4"
                  onWheel={handleCommandWheel}
                  style={{ WebkitOverflowScrolling: "touch" }}
                >
                  <CommandSection title="Menu">
                    {filteredNavigation.map((item) => (
                      <CommandLink
                        key={item.path}
                        href={mainSiteUrl(item.path)}
                        onClick={closeCommand}
                      >
                        {item.label}
                      </CommandLink>
                    ))}
                  </CommandSection>

                  <CommandSection title="Flagship Programs">
                    {filteredPrograms.map((program) => (
                      <CommandLink
                        key={program.slug}
                        href={mainSiteUrl(
                          `/cyber-defense-programs/${program.slug}`,
                        )}
                        onClick={closeCommand}
                        subtitle={`${program.category} • ${program.duration}`}
                      >
                        {program.title}
                      </CommandLink>
                    ))}
                  </CommandSection>

                  <CommandSection title="Elite Bootcamps">
                    {filteredBootcamps.map((bootcamp) => (
                      <CommandLink
                        key={bootcamp.slug}
                        href={mainSiteUrl(
                          `/cyber-defense-programs/bootcamp/${bootcamp.slug}`,
                        )}
                        onClick={closeCommand}
                        subtitle={`Elite Boot Camp • ${bootcamp.duration}`}
                      >
                        {bootcamp.title}
                      </CommandLink>
                    ))}
                  </CommandSection>

                  <CommandSection title="Actions">
                    <CommandLink
                      href={mainSiteUrl("/request-callback")}
                      onClick={closeCommand}
                    >
                      Request Callback
                    </CommandLink>
                    <CommandLink
                      href={`mailto:${CONTACT.supportEmail}`}
                      onClick={closeCommand}
                    >
                      Support
                    </CommandLink>
                  </CommandSection>

                  <CommandSection title="Legals">
                    {filteredLegal.map((item) => (
                      <CommandLink
                        key={item.label}
                        href={
                          item.external ? item.path : mainSiteUrl(item.path)
                        }
                        onClick={closeCommand}
                      >
                        {item.label}
                      </CommandLink>
                    ))}
                  </CommandSection>
                </div>

                <div className="flex shrink-0 flex-col gap-1.5 border-t border-dashed border-zinc-200 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:px-4">
                  <p className="text-center text-[10px] text-zinc-500 sm:text-left sm:text-xs">
                    Links open the main website at cyberlabs-india.com
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-500 sm:justify-end sm:text-xs">
                    <span className="flex items-center gap-1">
                      <Kbd>Esc</Kbd>
                      <span>Close</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavSection({
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
        <div className="flex flex-col gap-1">{children}</div>
      </div>
    </div>
  );
}

function DrawerNavLink({
  href,
  children,
  onNavigate,
}: {
  href: string;
  children: React.ReactNode;
  onNavigate: () => void;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      onClick={onNavigate}
      className="group flex w-full items-center gap-2.5 rounded-md px-2 py-2 text-sm font-medium text-zinc-700 transition hover:text-zinc-900 md:text-base"
    >
      <span className="inline-flex min-w-0 items-center gap-1">
        <span className="truncate">{children}</span>
        <NavArrowIcon />
      </span>
    </a>
  );
}

function CommandSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4">
      <p className="mb-1 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
        {title}
      </p>
      <ul className="space-y-0.5">{children}</ul>
    </div>
  );
}

function CommandLink({
  href,
  children,
  subtitle,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  subtitle?: string;
  onClick: () => void;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={onClick}
        className="flex items-start gap-2 rounded-md px-2.5 py-1.5 text-sm text-zinc-900 hover:bg-zinc-50 sm:text-base"
      >
        <div className="flex flex-col">
          <span className="font-medium">{children}</span>
          {subtitle ? (
            <span className="text-[12px] font-medium text-zinc-500 sm:text-xs">
              {subtitle}
            </span>
          ) : null}
        </div>
      </a>
    </li>
  );
}

function BoltIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11" />
    </svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
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
  );
}

function NavArrowIcon() {
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
      className="h-4 w-4 shrink-0 -translate-x-1 text-blue-600 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0 group-hover:opacity-100"
      aria-hidden
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12h.5m3 0h1.5m3 0h6" />
      <path d="M13 18l6 -6" />
      <path d="M13 6l6 6" />
    </svg>
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

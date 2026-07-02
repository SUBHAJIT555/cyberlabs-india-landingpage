"use client";

import Image from "next/image";
import { useState, type BaseSyntheticEvent, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Container } from "@/components/shared/Container";
import { CandyButton } from "@/components/ui/candy-button";
import ShinyText from "@/components/ui/ShinyText";
import {
  FacebookIcon,
  HeartIcon,
  InstagramIcon,
  LinkedInIcon,
  WhatsAppIcon,
} from "@/components/ui/social-icons";
import { YouTubeIcon } from "@/components/ui/YouTubeIcon";
import { CONTACT } from "@/data/contact-info";
import {
  MAIN_SITE_URL,
  mainSiteLegalLinks,
  mainSiteSocialLinks,
  mainSiteUrl,
  mainSiteUsefulLinks,
} from "@/data/main-site";
import { cn } from "@/lib/cn";
import { submitForm } from "@/lib/submit-form";

const socialCandyClass = "h-10 w-10 rounded-lg! px-0! py-0! shadow-none!";

const socialIconMap = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YouTubeIcon,
  LinkedIn: LinkedInIcon,
  WhatsApp: WhatsAppIcon,
} as const;

export function FooterSection() {
  return (
    <footer className="relative z-0 overflow-hidden border-t border-zinc-200 bg-zinc-50/80">
      <FooterBackground />

      <Container className="relative z-10 max-w-7xl py-12 md:py-16">
        <NewsletterSignup />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-8 lg:gap-10">
          <div className="md:col-span-5 lg:col-span-4">
            <a href={MAIN_SITE_URL} target="_blank" rel="noreferrer">
              <Image
                src="/logo/cyberlabs-logo.svg"
                alt="CYBERLABS INDIA Logo"
                width={180}
                height={40}
                className="h-10 w-auto"
                style={{ width: "auto" }}
              />
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-600 md:text-base">
              An Israeli Cyber Defense Training Ecosystem, Launched by{" "}
              <span className="font-semibold text-zinc-800">
                {CONTACT.registeredEntity.replace(" LLP", "")}.
              </span>{" "}
              Training Real Cyber Defenders for a Real World.
            </p>

            <FooterColumn title="Socials" className="mt-10 md:mt-12">
              <div className="flex flex-wrap gap-2.5">
                {mainSiteSocialLinks.map((item) => {
                  const Icon =
                    socialIconMap[item.label as keyof typeof socialIconMap];
                  return (
                    <CandyButton
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.label}
                      variant="white"
                      className={socialCandyClass}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                    </CandyButton>
                  );
                })}
              </div>
            </FooterColumn>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 md:col-span-7 md:grid-cols-3 lg:col-span-8">
            <FooterColumn title="Useful Links">
              <ul className="space-y-2.5">
                {mainSiteUsefulLinks.map((item) => (
                  <li key={item.path}>
                    <FooterLink href={mainSiteUrl(item.path)}>
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Legals & Policies">
              <ul className="space-y-2.5">
                {mainSiteLegalLinks.map((item) => (
                  <li key={item.label}>
                    <FooterLink
                      href={item.external ? item.path : mainSiteUrl(item.path)}
                      external={item.external}
                    >
                      {item.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Get in Touch">
              <ul className="space-y-2.5">
                <li>
                  <FooterLink href={`mailto:${CONTACT.educationEmail}`}>
                    {CONTACT.educationEmail}
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href={mainSiteUrl("/request-callback")}>
                    Request Call Back
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href={mainSiteUrl("/contact-cyberlabs")}>
                    Contact CYBERLABS
                  </FooterLink>
                </li>
              </ul>
            </FooterColumn>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-dashed border-zinc-200 pt-6 text-center text-xs text-zinc-500 md:flex-row md:text-left md:text-sm">
          <p>
            © {new Date().getFullYear()}{" "}
            <a
              href={MAIN_SITE_URL}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-700 transition hover:text-zinc-900"
            >
              CYBERLABS INDIA
            </a>{" "}
            | All rights reserved. |{" "}
            <a
              href={mainSiteUrl("/sitemap")}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-700 underline underline-offset-2 transition hover:text-zinc-900"
            >
              Sitemap
            </a>
          </p>
          <p className="inline-flex items-center justify-center gap-1 md:justify-end">
            <span>Made with</span>
            <HeartIcon className="h-3.5 w-3.5 shrink-0 text-zinc-500" />
            <span>
              by{" "}
              <a
                href="https://subhajit-dhali.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-zinc-700 underline underline-offset-2 transition hover:text-zinc-900"
              >
                Subhajit
              </a>
            </span>
          </p>
        </div>
      </Container>
    </footer>
  );
}

function NewsletterSignup() {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ email: string }>({
    defaultValues: { email: "" },
  });

  const onSubmit = async (
    data: { email: string },
    event?: BaseSyntheticEvent,
  ) => {
    event?.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    const result = await submitForm({
      formType: "newsletter",
      email: data.email,
    });

    if (!result.success) {
      setStatus("error");
      setErrorMessage(result.error);
      return;
    }

    setStatus("success");
    reset();
  };

  return (
    <div className="relative overflow-hidden border border-dashed border-zinc-300 bg-white px-6 py-8 md:px-10 md:py-10">
      <NewsletterBackground />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
        <div className="max-w-lg">
          <ShinyText
            text="Newsletter"
            className="text-xs font-semibold uppercase tracking-[0.14em] md:text-sm"
            speed={3}
            color="#52525b"
            shineColor="#2563eb"
          />
          <h3 className="mt-2 text-xl font-semibold text-zinc-900 md:text-2xl">
            Stay ahead in cybersecurity
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 md:text-base">
            Stay updated with our latest news, industry insights, and exclusive
            offers.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md shrink-0 space-y-2"
          noValidate
        >
          <input type="hidden" name="formType" value="newsletter" />
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email address"
              className={cn(
                "rounded-xl border border-zinc-200 px-4 py-2.5 text-sm text-zinc-900 shadow-2xl outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200/80 sm:flex-1",
                errors.email && "border-red-300 bg-red-50/40",
              )}
              {...register("email", {
                required: "Please enter a valid email address.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Please enter a valid email address.",
                },
                onChange: () => {
                  if (status !== "idle") setStatus("idle");
                },
              })}
            />
            <CandyButton
              type="submit"
              disabled={status === "submitting"}
              className="shrink-0 rounded-lg! border-zinc-800! bg-[radial-gradient(95%_60%_at_50%_75%,#18181b_0%,#27272a_100%)]! px-5! py-2.5! text-sm! text-white shadow-none! active:rotate-0 disabled:cursor-not-allowed disabled:border-zinc-300! disabled:bg-zinc-300! disabled:opacity-100"
            >
              {status === "submitting" ? "Submitting..." : "Subscribe"}
            </CandyButton>
          </div>
          {status === "success" && (
            <p className="text-xs text-emerald-600 md:text-sm">
              You&apos;re subscribed. Watch your inbox for updates.
            </p>
          )}
          {status === "error" && errorMessage ? (
            <p className="text-xs text-red-600 md:text-sm">{errorMessage}</p>
          ) : null}
          {errors.email ? (
            <p className="text-xs text-red-600 md:text-sm">
              {errors.email.message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-800 md:text-sm">
        {title}
      </p>
      <div className="mt-3 border-t border-dashed border-zinc-200 pt-4">
        {children}
      </div>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
}) {
  const className =
    "group inline-flex w-fit items-center gap-1 text-sm text-zinc-600 transition hover:text-zinc-900 md:text-base";
  const isExternal =
    external || href.startsWith("http") || href.startsWith("mailto:");

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer" : undefined}
      className={className}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}

function FooterBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #e4e4e7 1px, transparent 1px)",
          backgroundSize: "10px 100%",
          WebkitMaskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 65%)",
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 65%)",
        }}
      />
    </div>
  );
}

function NewsletterBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      <div
        style={{
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, #000 30%, #000 100%)",
          backgroundImage:
            "linear-gradient(#e4e4e7 1px, transparent 1px), linear-gradient(90deg, #e4e4e7 1px, transparent 1px)",
          backgroundSize: "40px 25px",
          bottom: "0",
          height: "60%",
          left: "50%",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, #000 30%, #000 100%)",
          opacity: 0.35,
          pointerEvents: "none",
          position: "absolute",
          transform: "translateX(-50%) perspective(300px) rotateX(45deg)",
          width: "150%",
        }}
      />
    </div>
  );
}

function ArrowIcon() {
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

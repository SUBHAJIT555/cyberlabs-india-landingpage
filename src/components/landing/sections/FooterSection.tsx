"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Container } from "@/components/shared/Container";
import GradientText from "@/components/ui/GradientText";
import ShinyText from "@/components/ui/ShinyText";
import { cn } from "@/lib/cn";

const exploreLinks = [
  { label: "Why", href: "#why" },
  { label: "Expertise", href: "#expertise" },
  { label: "Career", href: "#career" },
  { label: "Topics", href: "#topics" },
  { label: "Audience", href: "#audience" },
  { label: "Webinars", href: "#webinars" },
];

const inputClassName =
  "w-full rounded-xl border border-dashed border-zinc-200 bg-zinc-50/60 px-3.5 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-400 focus:bg-white focus:ring-2 focus:ring-zinc-200/80";

export function FooterSection() {
  return (
    <footer className="relative overflow-hidden border-t border-zinc-200 bg-zinc-50/80">
      <FooterBackground />

      <Container className="relative z-10 max-w-7xl py-12 md:py-16">
        <NewsletterSignup />

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-8 lg:gap-10">
          <div className="md:col-span-5 lg:col-span-4">
            <Image
              src="/logo/cyberlabs-logo.svg"
              alt="Cyberlabs India"
              width={180}
              height={40}
              className="h-10 w-auto"
              style={{ width: "auto" }}
            />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-600 md:text-base">
              An Israeli Cyber Defense Training Ecosystem, Launched by Cyveritas
              Technologies. Training Real Cyber Defenders for a Real World.
            </p>
           
          </div>

          <div className="grid gap-8 sm:grid-cols-3 md:col-span-7 lg:col-span-8">
            <FooterColumn title="Explore">
              <ul className="space-y-2.5">
                {exploreLinks.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </FooterColumn>

            <FooterColumn title="Follow us on">
              <ul className="space-y-2.5">
                <li>
                  <FooterLink
                    href="https://www.linkedin.com/company/cyberlabs-india/"
                    external
                  >
                    LinkedIn
                  </FooterLink>
                </li>
                <li>
                  <FooterLink
                    href="https://www.instagram.com/cyberlabsindia"
                    external
                  >
                    Instagram
                  </FooterLink>
                </li>
              </ul>
            </FooterColumn>

            <FooterColumn title="Get in touch">
              <ul className="space-y-2.5">
                <li>
                  <FooterLink href="mailto:education@cyberlabs-india.com">
                    education@cyberlabs-india.com
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href="https://cyberlabs-india.com" external>
                    cyberlabs-india.com
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
              href="https://cyberlabs-india.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium text-zinc-700 transition hover:text-zinc-900"
            >
              Cyberlabs India
            </a>{" "}
            | All rights reserved.
          </p>
          <p className="inline-flex items-center justify-center gap-1 md:justify-end">
            <span>Developed with</span>
            <HeartIcon />
            <span>
              by{" "}
              <a
                href="https://subhajit-dhali.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="font-medium text-zinc-700 transition hover:text-zinc-900"
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
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }

    console.log("Newsletter signup:", email);
    setStatus("success");
    setEmail("");
  }

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
            Get webinar schedules, career insights, and training updates delivered
            to your inbox.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md shrink-0 space-y-2"
          noValidate
        >
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                if (status !== "idle") setStatus("idle");
              }}
              placeholder="you@company.com"
              aria-label="Email address"
              className={cn(inputClassName, "sm:flex-1")}
            />
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center rounded-xl border border-zinc-900 bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800"
            >
              Subscribe
            </button>
          </div>
          {status === "success" && (
            <p className="text-xs text-emerald-600 md:text-sm">
              You&apos;re subscribed. Watch your inbox for updates.
            </p>
          )}
          {status === "error" && (
            <p className="text-xs text-red-600 md:text-sm">
              Please enter a valid email address.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
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
  children: React.ReactNode;
  external?: boolean;
}) {
  const className =
    "group inline-flex w-fit items-center gap-1 text-sm text-zinc-600 transition hover:text-zinc-900 md:text-base";

  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        href={href}
        target={external || href.startsWith("http") ? "_blank" : undefined}
        rel={
          external || href.startsWith("http") ? "noreferrer" : undefined
        }
        className={className}
      >
        <span>{children}</span>
        <ArrowIcon />
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      <span>{children}</span>
      <ArrowIcon />
    </Link>
  );
}

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-dashed border-zinc-200 bg-white text-zinc-600 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900"
    >
      {children}
    </a>
  );
}

function FooterBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: "linear-gradient(90deg, #e4e4e7 1px, transparent 1px)",
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
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "repeating-conic-gradient(from 0deg at 100% 0%, #d4d4d8 0deg, #d4d4d8 1deg, transparent 1deg, transparent 12deg)",
          WebkitMaskImage:
            "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 55%)",
          maskImage:
            "linear-gradient(to left, rgba(0,0,0,0.5) 0%, transparent 55%)",
        }}
      />
    </div>
  );
}



function HeartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3.5 w-3.5 shrink-0 text-zinc-500"
      aria-hidden="true"
    >
      <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
    </svg>
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

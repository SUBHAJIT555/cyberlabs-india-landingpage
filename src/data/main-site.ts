import { CONTACT } from "@/data/contact-info";
import { WHATSAPP_URL } from "@/data/site-contact";

export const MAIN_SITE_URL = "https://cyberlabs-india.com";

export function mainSiteUrl(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${MAIN_SITE_URL}${normalized}`;
}

export type MainSiteLink = {
  label: string;
  path: string;
  external?: boolean;
};

export const mainSiteNavigation: MainSiteLink[] = [
  { label: "CYBERLABS Home", path: "/" },
  { label: "About CYBERLABS", path: "/about-cyberlabs" },
  { label: "Leadership and Faculty", path: "/leadership-and-faculty" },
  { label: "Cyber Defense Programs", path: "/cyber-defense-programs" },
  { label: "CYBERLABS Free Webinars", path: "/cyberlabs-webinars" },
  { label: "Learning Environment", path: "/learning-environment" },
  { label: "Who Should Apply", path: "/who-should-apply" },
  {
    label: "Certification and Evaluation Framework",
    path: "/certification-and-evaluation-framework",
  },
  { label: "Request Call Back", path: "/request-callback" },
  { label: "Contact with CYBERLABS", path: "/contact-cyberlabs" },
  { label: "Frequently Asked Questions", path: "/frequently-asked-questions" },
];

export const mainSiteUsefulLinks: MainSiteLink[] = [
  { label: "CYBERLABS Home", path: "/" },
  { label: "About CYBERLABS", path: "/about-cyberlabs" },
  { label: "Leadership and Faculty", path: "/leadership-and-faculty" },
  { label: "Cyber Defense Programs", path: "/cyber-defense-programs" },
  { label: "CYBERLABS Free Webinars", path: "/cyberlabs-webinars" },
  { label: "Learning Environment", path: "/learning-environment" },
  {
    label: "Certification & Evaluation Framework",
    path: "/certification-and-evaluation-framework",
  },
  { label: "Who Should Apply", path: "/who-should-apply" },
  { label: "FAQs", path: "/frequently-asked-questions" },
];

export const mainSiteLegalLinks: MainSiteLink[] = [
  { label: "Terms & Condition", path: "/terms-and-conditions" },
  { label: "Privacy Policy", path: "/privacy-policy" },
  { label: "Cookie Policy", path: "/cookie-policy" },
  { label: "Refund & Cancellation Policy", path: "/refund-and-cancellation" },
  {
    label: "Support",
    path: `mailto:${CONTACT.educationEmail}`,
    external: true,
  },
];

export const mainSiteSocialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/cyberlabsindia",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/profile.php?id=61587196465882",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@cyberlabsindiabycyveritas-y7h",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cyberlabs-india/",
  },
  { label: "WhatsApp", href: WHATSAPP_URL },
] as const;

export const mainSiteFlagshipPrograms = [
  {
    slug: "master-the-modern-underworld-cybercrime-dark-web-and-crypto-investigations",
    title:
      "Master the Modern Underworld: Cybercrime, Dark Web & Crypto Investigations",
    category: "Cybercrime Investigation",
    duration: "145 Hours",
  },
  {
    slug: "defend-digital-platforms-at-scale-platform-identity-and-abuse-defense-engineering",
    title:
      "Defend Digital Platforms at Scale: Platform, Identity & Abuse Defense Engineering",
    category: "Platform Security & Trust & Safety",
    duration: "145 Hours",
  },
  {
    slug: "build-complete-cyber-capability-full-stack-cyber-defense-and-offensive-security",
    title: "From Foundations to Operations: Cybersecurity Practitioner Program",
    category: "Full-Stack Cybersecurity",
    duration: "450 Hours",
  },
] as const;

export const mainSiteBootcamps = [
  {
    slug: "dark-web-intelligence-covert-cyber-investigations",
    title: "Dark Web Intelligence & Covert Cyber Investigations",
    duration: "30 Hours",
  },
  {
    slug: "advanced-threat-hunting-adversary-detection",
    title: "Advanced Threat Hunting & Adversary Detection",
    duration: "28 Hours",
  },
  {
    slug: "detection-engineering-adversary-analytics",
    title: "Detection Engineering & Adversary Analytics",
    duration: "28 Hours",
  },
  {
    slug: "ai-security-adversarial-ai-operations",
    title: "AI Security & Adversarial AI Operations",
    duration: "30 Hours",
  },
  {
    slug: "ai-powered-security-operations-center",
    title: "AI-Powered Security Operations Center (SOC)",
    duration: "30 Hours",
  },
  {
    slug: "digital-intelligence-collection-analysis-osint-webint",
    title: "Digital Intelligence Collection & Analysis (OSINT/WEBINT)",
    duration: "30 Hours",
  },
] as const;

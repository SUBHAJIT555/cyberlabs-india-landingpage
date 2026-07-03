import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientProviders } from "@/app/providers/ClientProviders";
import { fetchMainSiteLandingData } from "@/lib/fetch-main-site-data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CYBERLABS INDIA | Webinars, Bootcamps & Flagship Programs",
  description:
    "Explore free cybersecurity career guidance webinars, elite bootcamps, and flagship cyber defense programs from CYBERLABS INDIA. Learn from real operators and build a career in cyber defense.",
  icons: {
    icon: "/logo/cyberlabs-icon.svg",
    shortcut: "/logo/cyberlabs-icon.svg",
    apple: "/logo/cyberlabs-icon.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const landingData = await fetchMainSiteLandingData();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white font-sans text-zinc-900"
      >
        <ClientProviders landingData={landingData}>{children}</ClientProviders>
      </body>
    </html>
  );
}

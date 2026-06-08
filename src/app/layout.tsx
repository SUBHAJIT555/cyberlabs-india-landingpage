import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClientProviders } from "@/components/providers/ClientProviders";
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
  title: "Cyberlabs India | Free Cybersecurity Career Guidance Webinars",
  description:
    "Join free live online career guidance and industry insight webinars from CYBERLABS INDIA. Understand where cybersecurity is going, discover where you fit, and learn from professionals who defend the digital world.",
  icons: {
    icon: "/logo/cyberlabs-icon.svg",
    shortcut: "/logo/cyberlabs-icon.svg",
    apple: "/logo/cyberlabs-icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-white font-sans text-zinc-900"
      >
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

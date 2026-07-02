import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { HeroSection } from "@/components/landing/sections/HeroSection";
import { WebinarInsightsSection } from "@/components/landing/sections/WebinarInsightsSection";
import { WhyAttendSection } from "@/components/landing/sections/WhyAttendSection";
import { LearnFromProsSection } from "@/components/landing/sections/LearnFromProsSection";
import { CareerBenefitsSection } from "@/components/landing/sections/CareerBenefitsSection";
import { WebinarTopicsSection } from "@/components/landing/sections/WebinarTopicsSection";
import { WhoShouldAttendSection } from "@/components/landing/sections/WhoShouldAttendSection";
import { WebinarScheduleSection } from "@/components/landing/sections/WebinarScheduleSection";
import { EliteBootcampsSection } from "@/components/landing/sections/EliteBootcampsSection";
import { FlagshipProgramsSection } from "@/components/landing/sections/FlagshipProgramsSection";
import { WhyCyberlabsSection } from "@/components/landing/sections/WhyCyberlabsSection";
import { WhyChooseCTASection } from "@/components/landing/sections/CTASection";
import { FooterSection } from "@/components/landing/sections/FooterSection";

export default function Home() {
  return (
    <>
      <LandingNavbar />
      <main className="flex-1">
        <HeroSection />
        <WebinarInsightsSection />
        <WebinarScheduleSection />
        <EliteBootcampsSection />
        <FlagshipProgramsSection />
        <WhyAttendSection />
        <LearnFromProsSection />
        <CareerBenefitsSection />
        <WebinarTopicsSection />
        <WhoShouldAttendSection />
        <WhyCyberlabsSection />
        <WhyChooseCTASection />
      </main>
      <FooterSection />
    </>
  );
}

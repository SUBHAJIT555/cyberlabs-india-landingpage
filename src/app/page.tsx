import { LandingNavbar } from "@/features/landing/components";
import {
  CareerBenefitsSection,
  EliteBootcampsSection,
  FlagshipProgramsSection,
  FooterSection,
  HeroSection,
  LearnFromProsSection,
  WebinarInsightsSection,
  WebinarScheduleSection,
  WhoShouldAttendSection,
  WhyAttendSection,
  WhyChooseCTASection,
  WhyCyberlabsSection,
} from "@/features/landing/sections";

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
        <WhoShouldAttendSection />
        <WhyCyberlabsSection />
        <WhyChooseCTASection />
      </main>
      <FooterSection />
    </>
  );
}

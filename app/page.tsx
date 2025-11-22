import { Header } from "@/components/header";
import { HeroSection } from "@/components/hero-section";
import { HowItWorksSection } from "@/components/how-it-works-section";
import { FeaturesSection } from "@/components/features-section";
import { TestimonialSection } from "@/components/testimonial-section";
import { WhyChooseSection } from "@/components/why-choose-section";
import { PricingSection } from "@/components/pricing-section";
import { CtaSection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialSection />
      <WhyChooseSection />
      <PricingSection />
      <CtaSection />

      <Footer />
    </div>
  );
}

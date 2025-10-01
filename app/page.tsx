import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { ToolsSection } from "@/components/tools-section"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialSection } from "@/components/testimonial-section"
import { WhyChooseSection } from "@/components/why-choose-section"
import { PricingSection } from "@/components/pricing-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ToolsSection />
        <FeaturesSection />
        <TestimonialSection />
        <WhyChooseSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

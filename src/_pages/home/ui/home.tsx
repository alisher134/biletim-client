import { Container } from "@/shared/ui/container";

import { CtaSection } from "./cta-section";
import { FaqSection } from "./faq-section";
import { HowItWorksSection } from "./how-it-works-section";
import { PricingSection } from "./pricing-section";

export function Home() {
  return (
    <Container className="py-12 md:py-16">
      <div className="space-y-24 md:space-y-32">
        <PricingSection />
        <HowItWorksSection />
        <CtaSection />
        <FaqSection />
      </div>
    </Container>
  );
}

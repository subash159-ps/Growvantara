import { prisma } from "@/lib/db";
import { Hero } from "@/components/hero/hero";
import { ServicesSection } from "@/components/sections/services-section";
import { WhySection } from "@/components/sections/why-section";
import { ProcessSection } from "@/components/sections/process-section";
import { PortfolioSection } from "@/components/sections/portfolio-section";
import { CampaignsSection } from "@/components/sections/campaigns-section";
import { CaseStudiesSection } from "@/components/sections/case-studies-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { FaqSection } from "@/components/sections/faq-section";
import { ContactCta } from "@/components/sections/contact-cta";
import { brand } from "@/lib/brand";
import { jsonLdScript } from "@/lib/seo/json-ld";

// Reads live, admin-editable content — render per-request rather than at
// build time, so the build never depends on database reachability.
export const dynamic = "force-dynamic";

export default async function Home() {
  const [services, portfolioItems, campaigns, testimonials] = await Promise.all([
    prisma.service.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      take: 6,
    }),
    prisma.portfolio.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
    prisma.campaign.findMany({
      where: { published: true },
      select: { id: true, name: true, channel: true, publicSummary: true },
      orderBy: { startDate: "desc" },
      take: 6,
    }),
    prisma.testimonial.findMany({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      take: 6,
    }),
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MarketingAgency",
    name: brand.name,
    description: brand.description,
    email: brand.email,
    telephone: brand.phone,
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <Hero />
      <ServicesSection services={services} />
      <WhySection />
      <ProcessSection />
      <PortfolioSection items={portfolioItems} />
      <CampaignsSection campaigns={campaigns} />
      <CaseStudiesSection />
      <TestimonialsSection testimonials={testimonials} />
      <FaqSection />
      <ContactCta />
    </>
  );
}

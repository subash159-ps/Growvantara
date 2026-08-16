import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { WhySection } from "@/components/sections/why-section";
import { ContactCta } from "@/components/sections/contact-cta";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "About",
  description: `Learn about ${brand.name}, a digital marketing agency focused on helping businesses grow online.`,
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <SectionHeading
          eyebrow="About us"
          title={`We're ${brand.name}`}
          description="A digital marketing agency built to help ambitious businesses build their online presence, attract the right customers, and grow with a clear, measurable strategy."
        />
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <div className="space-y-6 text-muted-foreground">
          <p>
            {brand.name} was founded on a simple idea: small and mid-sized
            businesses deserve marketing that actually moves the needle, not
            recycled templates and vanity metrics. We work as an extension of
            your team — combining strategy, design, and hands-on execution
            across web, SEO, ads, and content.
          </p>
          <p>
            As a growing agency, we're upfront about where we are: we're
            building our client portfolio, and every project on our site is
            clearly labeled as a demo, concept, or real client result. What
            you see is what you get.
          </p>
          <p>
            Our focus stays narrow on purpose. Rather than offering dozens of
            services at a shallow level, we start with a core set we do
            exceptionally well, and grow from there alongside our clients.
          </p>
        </div>
      </section>

      <WhySection />
      <ContactCta />
    </>
  );
}

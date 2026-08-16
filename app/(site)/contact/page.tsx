import type { Metadata } from "next";
import { Suspense } from "react";
import { prisma } from "@/lib/db";
import { SectionHeading } from "@/components/sections/section-heading";
import { ContactForm } from "@/components/sections/contact-form";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get a free consultation from ${brand.name} and find out how we can help grow your business.`,
};

export default async function ContactPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <section className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Contact"
        title="Get a Free Consultation"
        description="Tell us about your business and what you're looking to achieve — we'll follow up with next steps."
      />

      <div className="mt-12">
        <Suspense>
          <ContactForm services={services} />
        </Suspense>
      </div>

      <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
        <p>
          Prefer email? Reach us at{" "}
          <a href={`mailto:${brand.email}`} className="font-medium text-foreground hover:underline">
            {brand.email}
          </a>
        </p>
      </div>
    </section>
  );
}

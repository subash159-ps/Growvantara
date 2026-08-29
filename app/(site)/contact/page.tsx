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

// Reads live, admin-editable content — render per-request rather than at
// build time, so the build never depends on database reachability.
export const dynamic = "force-dynamic";

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
        <p className="mt-2">
          Prefer to call? Reach us at{" "}
          <a
            href={`tel:${brand.phone.replace(/\s/g, "")}`}
            className="font-medium text-foreground hover:underline"
          >
            {brand.phone}
          </a>
        </p>

        <div className="mt-6">
          <p>
            {brand.address.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <a
            href={brand.address.mapsUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mt-2 inline-block font-medium text-foreground hover:underline"
          >
            Get Directions
          </a>
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-border">
          <iframe
            src={brand.address.mapsEmbedUrl}
            title="Growvantara location"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-72 w-full"
          />
        </div>
      </div>
    </section>
  );
}

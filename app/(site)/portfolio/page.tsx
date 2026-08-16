import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { SectionHeading } from "@/components/sections/section-heading";
import { PortfolioCard } from "@/components/sections/portfolio-card";
import { ContactCta } from "@/components/sections/contact-cta";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Portfolio",
  description: `${brand.name}'s work — demo and concept projects showcasing our web design, SEO, branding, and marketing capabilities.`,
};

export default async function PortfolioPage() {
  const items = await prisma.portfolio.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <SectionHeading
          eyebrow="Our work"
          title="Portfolio"
          description="Global Hood is a growing agency. Every item below is a demo website, sample campaign, or concept project — clearly labeled — that shows the kind of work we do. Real client case studies will join this page as engagements complete."
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        {items.length === 0 ? (
          <p className="text-center text-muted-foreground">
            New work is on the way — check back soon.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </section>

      <ContactCta />
    </>
  );
}

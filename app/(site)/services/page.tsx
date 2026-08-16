import type { Metadata } from "next";
import { prisma } from "@/lib/db";
import { SectionHeading } from "@/components/sections/section-heading";
import { ContactCta } from "@/components/sections/contact-cta";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { brand } from "@/lib/brand";
import { getServiceIcon } from "@/lib/service-icons";

export const metadata: Metadata = {
  title: "Services",
  description: `Explore ${brand.name}'s digital marketing services — web design, SEO, social media, Google Ads, Meta Ads, content marketing, and branding.`,
};

// Reads live, admin-editable content — render per-request rather than at
// build time, so the build never depends on database reachability.
export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <SectionHeading
          eyebrow="Services"
          title="What we do"
          description="A focused set of services, done well — with room to add more as your needs grow."
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const Icon = getServiceIcon(service.slug);
            return (
              <Card
                key={service.id}
                className="group h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="mt-3">{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex h-full flex-col">
                  <p className="flex-1 text-sm text-muted-foreground">
                    {service.description}
                  </p>
                  <Button
                    variant="link"
                    className="mt-4 w-fit px-0"
                    nativeButton={false}
                    render={<Link href={`/contact?service=${service.slug}`} />}
                  >
                    Ask about this service
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <ContactCta />
    </>
  );
}

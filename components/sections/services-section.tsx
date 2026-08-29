import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "./section-heading";
import { getServiceIcon } from "@/lib/service-icons";
import { getServiceImage } from "@/lib/service-images";
import { cn } from "@/lib/utils";
import type { Service } from "@/app/generated/prisma/client";

export function ServicesSection({ services }: { services: Service[] }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="What we do"
        title="Services built to grow your business"
        description="A focused set of services we do well — not a scattered list of everything under the sun."
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const Icon = getServiceIcon(service.slug);
          const image = getServiceImage(service.slug);
          return (
            <Reveal key={service.id} delay={index * 80} className="h-full">
              <Card
                className={cn(
                  "group h-full transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
                  image && "pt-0",
                )}
              >
                {image ? (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                  </div>
                ) : null}
                <CardHeader>
                  <div className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle className="mt-3">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          View all services <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

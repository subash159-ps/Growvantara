import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const stats = [
  { value: "7", label: "Core services offered" },
  { value: "Free", label: "Initial consultation" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      <div
        className="pointer-events-none absolute -top-32 left-1/3 -z-10 size-[32rem] rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 size-[26rem] rounded-full bg-brand-accent/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(color-mix(in_oklch,var(--foreground),transparent_94%)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-8">
        <div className="motion-safe:[&>*]:animate-in motion-safe:[&>*]:fade-in motion-safe:[&>*]:slide-in-from-bottom-4 motion-safe:[&>*]:fill-mode-both motion-safe:[&>*]:duration-700">
          <p className="text-sm font-medium text-muted-foreground">
            Built for visibility.{" "}
            <span className="text-primary">Designed for conversion.</span>
          </p>

          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight motion-safe:delay-100 sm:text-5xl">
            Grow Your Business With Smarter Digital{" "}
            <span className="bg-[linear-gradient(in_oklch_to_right,var(--primary),var(--brand-accent))] bg-clip-text text-transparent">
              Marketing
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-muted-foreground motion-safe:delay-200">
            Growvantara helps businesses build their online presence, attract
            customers, and grow through digital marketing strategies.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3 motion-safe:delay-300">
            <Button size="lg" nativeButton={false} render={<Link href="/contact" />}>
              Get Free Consultation
              <ArrowUpRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              render={<Link href="/services" />}
            >
              Explore Services
            </Button>
          </div>

          <div className="mt-12 flex gap-10 motion-safe:delay-500">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:slide-in-from-right-6 motion-safe:fill-mode-both motion-safe:duration-1000 motion-safe:delay-200">
          <Image
            src="/hero-banner-v2.png"
            alt="Growvantara Digital Technology agency for all business"
            width={1024}
            height={665}
            priority
            className="h-auto w-full motion-safe:animate-float"
          />
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowUpRight, Briefcase, MessageCircleHeart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnalyticsDashboardIllustration } from "@/components/illustrations/marketing-illustrations";

const stats = [
  { value: "7", label: "Core services offered" },
  { value: "Free", label: "Initial consultation" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy text-navy-foreground">
      <div
        className="pointer-events-none absolute -top-32 left-1/3 -z-10 size-[32rem] rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -right-24 -z-10 size-[26rem] rounded-full bg-brand-accent/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(color-mix(in_oklch,var(--navy-foreground),transparent_90%)_1px,transparent_1px)] [background-size:24px_24px]"
        aria-hidden
      />

      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-8">
        <div>
          <p className="text-sm font-medium text-navy-muted">
            Built for visibility.{" "}
            <span className="text-primary">Designed for conversion.</span>
          </p>

          <h1 className="mt-4 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
            Grow Your Business With Smarter Digital{" "}
            <span className="bg-[linear-gradient(in_oklch_to_right,var(--primary),var(--brand-accent))] bg-clip-text text-transparent">
              Marketing
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-pretty text-navy-muted">
            Global Hood helps businesses build their online presence, attract
            customers, and grow through digital marketing strategies.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" nativeButton={false} render={<Link href="/contact" />}>
              Get Free Consultation
              <ArrowUpRight />
            </Button>
            <Button
              size="lg"
              variant="outline"
              nativeButton={false}
              className="border-white/20 bg-transparent text-navy-foreground hover:bg-white/10 hover:text-navy-foreground"
              render={<Link href="/services" />}
            >
              Explore Services
            </Button>
          </div>

          <div className="mt-12 flex gap-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold">{stat.value}</p>
                <p className="mt-1 text-sm text-navy-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
            <AnalyticsDashboardIllustration className="h-auto w-full" />
            <p className="mt-4 font-semibold">Strategy-led growth</p>
            <p className="mt-1 text-sm text-navy-muted">
              Every campaign starts with your business goals.
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-primary p-5 text-primary-foreground">
            <Briefcase className="size-6" />
            <div className="mt-4">
              <p className="text-2xl font-bold">7+</p>
              <p className="text-sm font-medium">Services covered</p>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl bg-brand-accent p-5 text-brand-accent-foreground">
            <MessageCircleHeart className="size-6" />
            <div className="mt-4">
              <p className="text-lg font-bold">Free</p>
              <p className="text-sm font-medium">Consultation call</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,_var(--tw-gradient-stops))] from-primary/12 via-transparent to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-24 right-0 -z-10 size-[28rem] rounded-full bg-brand-accent/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_40%,transparent_100%)]"
        aria-hidden
      />

      <div className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur">
          <Sparkles className="size-3.5 text-brand-accent" />
          Digital Marketing Agency
        </div>

        <h1 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-6xl">
          Grow Your Business With Smarter Digital{" "}
          <span className="bg-[linear-gradient(in_oklch_to_right,var(--primary),var(--brand-accent))] bg-clip-text text-transparent">
            Marketing
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
          Global Hood helps businesses build their online presence, attract
          customers, and grow through digital marketing strategies.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button size="lg" nativeButton={false} render={<Link href="/contact" />}>
            Get Free Consultation
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
      </div>
    </section>
  );
}

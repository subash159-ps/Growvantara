import Link from "next/link";
import { Button } from "@/components/ui/button";

export function ContactCta() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-brand-accent px-8 py-16 text-center text-primary-foreground">
        <div
          className="pointer-events-none absolute inset-0 [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:22px_22px] opacity-10"
          aria-hidden
        />
        <div className="relative">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to grow your business?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-primary-foreground/80">
            Get a free, no-obligation consultation and find out how Growvantara
            can help you attract more customers.
          </p>
          <div className="mt-8">
            <Button
              size="lg"
              variant="secondary"
              nativeButton={false}
              render={<Link href="/contact" />}
            >
              Get Free Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

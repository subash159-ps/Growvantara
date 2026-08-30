import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { PortfolioCard } from "./portfolio-card";
import type { Portfolio } from "@/app/generated/prisma/client";

export function PortfolioSection({ items }: { items: Portfolio[] }) {
  if (items.length === 0) return null;

  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading
          eyebrow="Our work"
          title="A look at what we build"
          description="Growvantra is a new agency — these are demo and concept projects that show our capability while we build our client portfolio."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <PortfolioCard key={item.id} item={item} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            See all our work <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

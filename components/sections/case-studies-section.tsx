import Link from "next/link";
import { ArrowRight, Megaphone, PenTool, Search, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionHeading } from "./section-heading";
import { caseStudies } from "@/lib/data/case-studies";

const categoryIcons: Record<string, LucideIcon> = {
  SEO: Search,
  "Meta Ads": Megaphone,
  "Content Marketing": PenTool,
};

export function CaseStudiesSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        eyebrow="Case studies"
        title="How we approach real growth problems"
        description="Growvantra is new, so these are concept case studies that show our methodology — not verified client results."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {caseStudies.map((study) => {
          const Icon = categoryIcons[study.category] ?? Search;
          return (
            <Card
              key={study.slug}
              className="h-full shadow-md transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
            >
              <CardHeader>
                <div className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                  <Icon className="size-5" strokeWidth={2.5} />
                </div>
                <Badge variant="secondary" className="mt-3 w-fit">
                  Concept Case Study
                </Badge>
                <CardTitle className="mt-2">{study.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {study.category}
                </p>
                <p className="mt-3 text-sm text-muted-foreground">{study.challenge}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/case-studies"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Read all case studies <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}

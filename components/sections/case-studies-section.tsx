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
              className="group relative h-full min-h-[320px] rounded-[48px_8px] bg-[#3C1461] p-[32px_28px_40px_28px] text-white ring-0 shadow-[4px_4px_15px_0_rgba(0,0,0,0.15)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[8px_8px_25px_0_rgba(0,0,0,0.25)]"
            >
              <CardHeader className="p-0">
                <div className="flex size-16 items-center justify-center rounded-2xl bg-white transition-transform duration-500 ease-out group-hover:scale-110">
                  <Icon className="size-7 text-[#3C1461]" strokeWidth={2.5} />
                </div>
                <Badge variant="secondary" className="mt-5 w-fit bg-white/15 text-white">
                  Concept Case Study
                </Badge>
                <CardTitle className="mt-2 text-xl font-bold text-white">{study.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-orange-400">
                  {study.category}
                </p>
                <p className="mt-3 text-sm text-white/85">{study.challenge}</p>
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

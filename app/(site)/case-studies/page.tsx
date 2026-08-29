import type { Metadata } from "next";
import { SectionHeading } from "@/components/sections/section-heading";
import { ContactCta } from "@/components/sections/contact-cta";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { caseStudies } from "@/lib/data/case-studies";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Case Studies",
  description: `How ${brand.name} approaches growth problems in SEO, paid ads, and content marketing.`,
};

export default function CaseStudiesPage() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6">
        <SectionHeading
          eyebrow="Case studies"
          title="How we approach growth"
          description="Growvantara doesn't have verified client results to publish yet, so these are concept case studies — realistic scenarios that walk through our methodology. They'll be replaced with real client outcomes as engagements complete."
        />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <div className="space-y-8">
          {caseStudies.map((study) => (
            <Card key={study.slug}>
              <CardHeader>
                <Badge variant="secondary" className="w-fit">
                  Concept Case Study
                </Badge>
                <CardTitle className="mt-2 text-2xl">{study.title}</CardTitle>
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {study.category}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm font-semibold">The challenge</p>
                  <p className="mt-1 text-sm text-muted-foreground">{study.challenge}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Our approach</p>
                  <p className="mt-1 text-sm text-muted-foreground">{study.approach}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold">Expected result</p>
                  <p className="mt-1 text-sm text-muted-foreground">{study.result}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <ContactCta />
    </>
  );
}

import { Search, Megaphone, Target, TrendingUp, Users, Zap } from "lucide-react";
import { SectionHeading } from "./section-heading";
import { GrowthChartIllustration } from "@/components/illustrations/marketing-illustrations";

const points = [
  {
    icon: Target,
    title: "Strategy first",
    description:
      "Every campaign starts with your business goals, not a generic template.",
  },
  {
    icon: TrendingUp,
    title: "Results you can measure",
    description:
      "Clear reporting on traffic, leads, and conversions — no vanity metrics.",
  },
  {
    icon: Users,
    title: "A real team, not a black box",
    description:
      "You work directly with the people running your campaigns, start to finish.",
  },
  {
    icon: Zap,
    title: "Fast, modern execution",
    description:
      "Modern tools and a lean process mean campaigns launch in days, not months.",
  },
];

export function WhySection() {
  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHeading eyebrow="Why Global Hood" title="A partner invested in your growth" />

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:items-center">
          <div className="relative mx-auto w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm lg:mx-0">
            <GrowthChartIllustration className="h-auto w-full" />
            <div className="absolute -top-4 -right-4 flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md">
              <Search className="size-5" />
            </div>
            <div className="absolute -bottom-4 -left-4 flex size-12 items-center justify-center rounded-full bg-brand-accent text-brand-accent-foreground shadow-md">
              <Megaphone className="size-5" />
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            {points.map((point) => (
              <div key={point.title} className="text-center sm:text-left">
                <div className="mx-auto flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary sm:mx-0">
                  <point.icon className="size-5" />
                </div>
                <p className="mt-4 font-semibold">{point.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { Target, TrendingUp, Users, Zap } from "lucide-react";
import { SectionHeading } from "./section-heading";

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

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
    </section>
  );
}

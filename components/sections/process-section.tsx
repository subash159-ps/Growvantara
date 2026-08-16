import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    step: "01",
    title: "Discover",
    description: "We learn your business, audience, and goals in a free consultation.",
  },
  {
    step: "02",
    title: "Plan",
    description: "We build a strategy across the channels that fit your business best.",
  },
  {
    step: "03",
    title: "Execute",
    description: "We design, build, and launch — websites, campaigns, and content.",
  },
  {
    step: "04",
    title: "Optimize",
    description: "We track results and continuously improve what's working.",
  },
];

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading eyebrow="Our process" title="How we work together" />

      <div className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-stretch lg:gap-3">
        {steps.map((item, index) => (
          <Fragment key={item.step}>
            <div className="flex-1 rounded-xl border border-border p-6 transition-colors hover:border-primary/40">
              <div className="flex size-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {item.step}
              </div>
              <p className="mt-4 font-semibold">{item.title}</p>
              <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
            </div>
            {index < steps.length - 1 ? (
              <div className="hidden items-center justify-center lg:flex" aria-hidden>
                <ChevronRight className="size-5 text-muted-foreground/30" />
              </div>
            ) : null}
          </Fragment>
        ))}
      </div>
    </section>
  );
}

import { Fragment } from "react";
import { ChevronRight, ClipboardList, Rocket, Search, TrendingUp } from "lucide-react";
import { SectionHeading } from "./section-heading";

const steps = [
  {
    step: "01",
    icon: Search,
    title: "Discover",
    description: "We learn your business, audience, and goals in a free consultation.",
  },
  {
    step: "02",
    icon: ClipboardList,
    title: "Plan",
    description: "We build a strategy across the channels that fit your business best.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Execute",
    description: "We design, build, and launch — websites, campaigns, and content.",
  },
  {
    step: "04",
    icon: TrendingUp,
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
            <div className="group relative flex h-full min-h-[320px] flex-1 flex-col items-start gap-2 rounded-[48px_8px] bg-[#3C1461] p-[32px_28px_40px_28px] text-base font-medium text-white shadow-[4px_4px_15px_0_rgba(0,0,0,0.15)] transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[8px_8px_25px_0_rgba(0,0,0,0.25)]">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-white transition-transform duration-500 ease-out group-hover:scale-110">
                <item.icon className="size-7 text-[#3C1461]" />
              </div>
              <p className="mt-5 text-xl font-bold">{item.title}</p>
              <p className="mt-2 text-sm text-white/85">{item.description}</p>
              <p className="mt-auto pt-6 text-sm font-semibold text-orange-400">Step {item.step}</p>
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

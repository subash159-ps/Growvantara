"use client";

import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide = {
  image: string;
  alt: string;
  heading: string;
};

const slides: Slide[] = [
  {
    image: "/hero/slide-1.webp",
    alt: "Glowing blue orb surrounded by colourful brand and app icons on a deep-blue backdrop",
    heading: "Smart eCommerce & Digital Growth Solutions",
  },
  {
    image: "/hero/slide-2.webp",
    alt: "Businessperson holding a digital 'Increase Revenue' hologram with growth and target icons",
    heading: "Performance Marketing That Drives Real Revenue",
  },
  {
    image: "/hero/slide-3.webp",
    alt: "Hands typing on a laptop overlaid with SEO, analytics and search icons",
    heading: "SEO, Ads & Content Built to Convert",
  },
];

const AUTOPLAY_MS = 6000;

export function Hero() {
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrent((index + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [current]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Highlights"
      className="relative isolate w-full overflow-hidden bg-[#0a1a33] text-white"
    >
      <div className="relative h-[420px] w-full sm:h-[460px] lg:h-[500px]">
        {slides.map((slide, index) => (
          <div
            key={slide.image}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${slides.length}`}
            aria-hidden={index !== current}
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-out",
              index === current ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.image}
              alt={slide.alt}
              loading={index === 0 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#050f22]/85 via-[#050f22]/40 to-transparent"
              aria-hidden
            />
          </div>
        ))}

        <div className="relative z-10 mx-auto flex h-full max-w-6xl items-center px-8 sm:px-12 lg:px-16">
          <h1
            key={current}
            className="max-w-[13ch] text-4xl font-extrabold leading-[1.08] text-white [font-family:var(--font-hero),system-ui,sans-serif] [text-shadow:0_2px_18px_rgba(0,0,0,0.35)] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-500 sm:text-5xl lg:text-[3.5rem]"
          >
            {slides[current].heading}
          </h1>
        </div>

        <button
          type="button"
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:left-5"
        >
          <ChevronLeft className="size-6" />
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 z-20 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/15 text-white backdrop-blur-sm transition hover:bg-white/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:right-5"
        >
          <ChevronRight className="size-6" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === current}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === current
                  ? "w-8 bg-white"
                  : "w-4 bg-white/40 hover:bg-white/60",
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

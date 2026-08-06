"use client";

import { testimonials } from "@/lib/site";
import { Section, SectionHeader } from "../Section";
import { Reveal } from "../Reveal";
import { SpotlightCard } from "../SpotlightCard";

/** Desfase vertical: rompe la fila de tres iguales sin recurrir a otro layout. */
const OFFSETS = ["lg:mt-0", "lg:mt-14", "lg:mt-7"];

export function Testimonials() {
  return (
    <Section>
      <SectionHeader
        label="Clientes"
        title={
          <>
            Lo que dicen{" "}
            <span className="text-muted/70">los que ya lanzaron.</span>
          </>
        }
        align="center"
      />

      <div className="mt-16 grid gap-5 md:mt-20 lg:grid-cols-3 lg:gap-6">
        {testimonials.map((t, i) => (
          <Reveal
            key={t.author}
            direction="up"
            delay={i * 0.1}
            className={OFFSETS[i % OFFSETS.length]}
          >
            <SpotlightCard className="glass h-full rounded-2xl p-7 sm:p-8">
              <figure className="flex h-full flex-col">
              {/* La comilla es el chevron de la marca, no un glifo tipográfico. */}
              <svg
                viewBox="0 0 32 32"
                className="h-6 w-6 shrink-0"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M13 6 L4 16 L13 26"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-violet"
                />
                <path
                  d="M23 6 L28 16 L23 26"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-violet/35"
                />
              </svg>

              <blockquote className="t-body mt-6 flex-1 text-[1rem] text-mist">
                {t.quote}
              </blockquote>

              <figcaption className="mt-8 border-t border-white/[0.07] pt-6">
                <div className="text-[0.95rem] font-semibold text-chrome">
                  {t.author}
                </div>
                <div className="t-label mt-2 text-faint">{t.role}</div>
              </figcaption>
              </figure>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

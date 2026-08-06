"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { steps } from "@/lib/site";
import { Section, SectionHeader } from "../Section";
import { Reveal } from "../Reveal";

/**
 * Proceso.
 *
 * Es la única sección numerada del sitio, porque es la única donde el orden
 * es información: no se puede desarrollar antes de diseñar. El riel de la
 * izquierda se llena con el scroll — el lector ve cuánto del proceso recorrió.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 72%", "end 62%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <Section id="proceso">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        {/* Encabezado fijo mientras se recorren los pasos */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            label="Proceso"
            meta={`${steps.length} etapas`}
            title={
              <>
                Sabés qué pasa{" "}
                <span className="text-muted/70">en cada semana.</span>
              </>
            }
            lead="Ningún proyecto entra en una caja negra. Cada etapa tiene un entregable que podés ver, probar y aprobar antes de seguir."
          />
        </div>

        {/* Pasos */}
        <div ref={ref} className="relative">
          {/* Riel */}
          <div className="absolute bottom-0 left-[1.05rem] top-2 w-px bg-white/[0.08] md:left-[1.3rem]">
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-peri via-violet to-abyss"
              style={{ scaleY: fill }}
            />
          </div>

          <ol className="flex flex-col gap-12 md:gap-16">
            {steps.map((step) => (
              <li key={step.n}>
                <Reveal direction="up" delay={0.05} distance={20}>
                  <div className="grid grid-cols-[2.1rem_minmax(0,1fr)] gap-5 md:grid-cols-[2.6rem_minmax(0,1fr)] md:gap-7">
                    {/* Marcador */}
                    <div className="relative flex justify-center">
                      <span className="relative z-10 flex h-[2.1rem] w-[2.1rem] items-center justify-center rounded-full border border-white/12 bg-void md:h-[2.6rem] md:w-[2.6rem]">
                        <span className="t-mono text-[0.72rem] text-peri md:text-[0.8rem]">
                          {step.n}
                        </span>
                      </span>
                    </div>

                    <div className="pt-1">
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="t-title text-[clamp(1.4rem,2.3vw,1.85rem)] text-chrome">
                          {step.title}
                        </h3>
                        <span className="t-mono text-[0.72rem] text-faint">
                          {step.span}
                        </span>
                      </div>
                      <p className="t-body mt-3.5 max-w-lg text-[0.98rem] text-muted">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

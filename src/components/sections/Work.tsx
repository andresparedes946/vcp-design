"use client";

import { ArrowUpRight } from "lucide-react";
import { projects, whatsappHref } from "@/lib/site";
import { Section, SectionHeader } from "../Section";
import { Reveal } from "../Reveal";
import { SpotlightCard } from "../SpotlightCard";
import { ProjectVisual } from "../ProjectVisual";

/** Ritmo asimétrico: 7-5 / 5-7. Evita la grilla uniforme de cuatro iguales. */
const SPANS = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];

export function Work() {
  return (
    <Section id="proyectos">
      <SectionHeader
        label="Proyectos"
        meta={`${projects.length} casos`}
        title={
          <>
            Software que ya está{" "}
            <span className="text-muted/70">funcionando.</span>
          </>
        }
        lead="Una selección de productos entregados. Cada uno reemplazó un proceso manual que costaba tiempo o dinero."
      />

      <div className="mt-16 grid grid-cols-1 gap-5 md:mt-20 lg:grid-cols-12 lg:gap-6">
        {projects.map((project, i) => (
          <Reveal
            key={project.id}
            direction="up"
            delay={(i % 2) * 0.1}
            className={SPANS[i % SPANS.length]}
          >
            <SpotlightCard className="group glass relative flex h-full flex-col overflow-hidden rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-1 sm:p-5">
              <ProjectVisual project={project} />

              <div className="flex flex-1 flex-col px-1.5 pb-1 pt-6 sm:px-2">
                <div className="flex items-center justify-between gap-4">
                  <span className="t-label text-peri">{project.category}</span>
                  <span className="t-mono text-[0.72rem] text-faint">
                    {project.year}
                  </span>
                </div>

                <h3 className="t-title mt-4 text-[clamp(1.5rem,2.4vw,2rem)] text-chrome">
                  {project.name}
                </h3>

                <p className="t-body mt-3.5 max-w-xl text-[0.95rem] text-muted">
                  {project.summary}
                </p>

                <div className="mt-7 flex flex-wrap items-end justify-between gap-6 border-t border-white/[0.06] pt-6">
                  {/* El resultado, no la tecnología, es lo que se destaca. */}
                  <div>
                    <div
                      className="t-display text-[2.4rem] leading-none"
                      style={{ color: project.accent }}
                    >
                      {project.metric.value}
                    </div>
                    <div className="t-label mt-2.5 text-faint">
                      {project.metric.label}
                    </div>
                  </div>

                  <ul className="flex flex-wrap items-center gap-2">
                    {project.stack.map((tech) => (
                      <li
                        key={tech}
                        className="t-mono rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-[0.68rem] text-mist"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>

      <Reveal direction="up" delay={0.1}>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-7 sm:px-9">
          <p className="t-body max-w-md text-[0.98rem] text-mist">
            ¿Tenés algo parecido en mente? Contame de qué se trata y te digo si
            tiene sentido construirlo.
          </p>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="ESCRIBIR"
            className="group inline-flex items-center gap-2 text-[0.95rem] font-medium text-chrome"
          >
            <span className="border-b border-peri/40 pb-0.5 transition-colors duration-300 group-hover:border-peri">
              Contar mi proyecto
            </span>
            <ArrowUpRight
              className="h-4 w-4 text-peri transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.2}
            />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}

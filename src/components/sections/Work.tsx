"use client";

import { ArrowUpRight } from "lucide-react";
import { projects, whatsappHref } from "@/lib/site";
import { Section, SectionHeader } from "../Section";
import { Reveal } from "../Reveal";
import { SpotlightCard } from "../SpotlightCard";
import { ProjectVisual } from "../ProjectVisual";

/**
 * Ancho de cada tarjeta sobre una grilla de 12.
 *
 * El ritmo por defecto es asimétrico —7-5 / 5-7— para que no se lea como una
 * grilla de iguales. Pero la fila siempre tiene que cerrar en 12: si la
 * cantidad de proyectos es impar, el último ocupa el ancho completo en lugar
 * de dejar un hueco. Con un solo proyecto, eso lo convierte en un destacado.
 */
function spanFor(index: number, total: number) {
  const isLoneLast = total % 2 === 1 && index === total - 1;
  if (isLoneLast) return "lg:col-span-12";
  return index % 4 === 0 || index % 4 === 3 ? "lg:col-span-7" : "lg:col-span-5";
}

export function Work() {
  const total = projects.length;

  return (
    <Section id="proyectos">
      <SectionHeader
        label="Proyectos"
        meta={total === 1 ? "1 caso" : `${total} casos`}
        title={
          <>
            Software que ya está{" "}
            <span className="text-muted/70">funcionando.</span>
          </>
        }
        lead="Una selección de productos entregados. Cada uno reemplazó un proceso manual que costaba tiempo o dinero."
      />

      <div className="mt-16 grid grid-cols-1 gap-5 md:mt-20 lg:grid-cols-12 lg:gap-6">
        {projects.map((project, i) => {
          // A ancho completo la portada quedaría enorme y el texto perdido
          // debajo: ahí conviene poner visual y contenido lado a lado.
          const wide = spanFor(i, total) === "lg:col-span-12";

          return (
          <Reveal
            key={project.id}
            direction="up"
            delay={(i % 2) * 0.1}
            className={spanFor(i, total)}
          >
            <SpotlightCard
              className={`group glass relative h-full overflow-hidden rounded-2xl p-4 transition-transform duration-500 hover:-translate-y-1 sm:p-5 ${
                wide
                  ? "lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-8"
                  : "flex flex-col"
              }`}
            >
              <ProjectVisual project={project} />

              <div
                className={`flex flex-1 flex-col px-1.5 pb-1 pt-6 sm:px-2 ${
                  wide ? "lg:pt-0" : ""
                }`}
              >
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
          );
        })}
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

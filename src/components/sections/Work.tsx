"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { projects, whatsappHref, type Project } from "@/lib/site";
import { Section, SectionHeader } from "../Section";
import { Reveal } from "../Reveal";
import { SpotlightCard } from "../SpotlightCard";
import { ProjectVisual } from "../ProjectVisual";

/** Cuánto baja cada tarjeta respecto de la anterior al quedar pegada. */
const STEP = 26;
/** Distancia desde el borde superior a la que se pega la primera. */
const TOP = 88;

/**
 * El apilado sólo se activa donde tiene sentido: necesita alto de sobra y una
 * tarjeta ancha con la visual al lado del texto. En pantallas chicas las
 * tarjetas se apilarían más altas que el viewport y no se vería nada, así que
 * ahí quedan en lista. También se apaga con `prefers-reduced-motion`.
 */
function useStacking() {
  const reduced = useReducedMotion();
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setWide(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return wide && !reduced;
}

function ProjectCard({
  project,
  index,
  total,
  progress,
  stacking,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  stacking: boolean;
}) {
  /*
    Cada tarjeta se encoge a medida que las siguientes la tapan, así que las de
    abajo del mazo asoman apenas más chicas. La última no se encoge nunca: es
    la que queda a la vista.
  */
  const targetScale = 1 - (total - 1 - index) * 0.05;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);

  return (
    <div
      className={stacking ? "lg:sticky" : ""}
      style={stacking ? { top: TOP + index * STEP } : undefined}
    >
      {/*
        Apiladas, las tarjetas necesitan fondo opaco. `.glass` es casi
        transparente y se apoya en `backdrop-filter`, que difumina lo de atrás
        pero no lo tapa: un titular grande de la tarjeta de abajo se sigue
        leyendo a través de la de arriba. Fuera del apilado se mantiene el
        vidrio, con las partículas del fondo pasando por detrás.
      */}
      <motion.div
        className="origin-top rounded-2xl"
        style={{
          ...(stacking ? { scale, backgroundColor: "var(--color-void)" } : {}),
        }}
      >
        <SpotlightCard className="group glass relative overflow-hidden rounded-2xl p-4 sm:p-5 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-8">
          <ProjectVisual project={project} />

          <div className="flex flex-1 flex-col px-1.5 pb-1 pt-6 sm:px-2 lg:pt-0">
            <div className="flex items-center justify-between gap-4">
              <span className="t-label text-peri">{project.category}</span>
              <span className="t-mono text-[0.72rem] text-faint">
                {project.year}
              </span>
            </div>

            <h3 className="t-title mt-4 text-[clamp(1.5rem,2.4vw,2rem)] text-chrome">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="ABRIR"
                  className="group/link inline-flex items-baseline gap-2.5 transition-colors duration-300 hover:text-peri"
                >
                  {project.name}
                  <ArrowUpRight
                    className="h-[0.85em] w-[0.85em] shrink-0 self-center text-peri transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                    strokeWidth={2.2}
                  />
                </a>
              ) : (
                project.name
              )}
            </h3>

            <p className="t-body mt-3.5 max-w-xl text-[0.95rem] text-muted">
              {project.summary}
            </p>

            {project.requiresAuth && (
              <p className="t-label mt-4 text-faint">
                {project.authNote ??
                  "Acceso privado · sistema interno del cliente"}
              </p>
            )}

            <div className="mt-7 flex flex-wrap items-end justify-between gap-6 border-t border-white/[0.06] pt-6">
              {/*
                El resultado, no la tecnología, es lo que se destaca —
                cuando hay un resultado que mostrar. Si el proyecto todavía
                no tiene el dato medido, la fila queda sólo con el stack en
                vez de exhibir un número inventado.
              */}
              {project.metric && (
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
              )}

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
      </motion.div>
    </div>
  );
}

export function Work() {
  const total = projects.length;
  const stacking = useStacking();
  const stack = useRef<HTMLDivElement>(null);

  /*
    Un solo listener de scroll para todo el mazo. Cada tarjeta deriva su escala
    de este progreso con su propio tramo, en lugar de montar un `useScroll` por
    tarjeta.
  */
  const { scrollYProgress } = useScroll({
    target: stack,
    offset: ["start start", "end end"],
  });

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

      {/*
        El espacio entre tarjetas es lo que da recorrido al apilado: sin él las
        siguientes taparían a las anteriores de golpe.
      */}
      <div ref={stack} className="mt-16 flex flex-col gap-5 md:mt-20 lg:gap-24">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            total={total}
            progress={scrollYProgress}
            stacking={stacking}
          />
        ))}
      </div>

      <Reveal direction="up" delay={0.1}>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-7 sm:px-9 lg:mt-24">
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

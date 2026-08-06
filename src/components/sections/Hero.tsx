"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { services, site, whatsappHref } from "@/lib/site";
import { WordReveal } from "../Reveal";
import { MagneticLink } from "../Magnetic";
import { useSiteReady } from "../Preloader";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Chevron que flanquea el titular: el mismo glifo del isologo.
 *
 * Conserva su proporción (~1:2,3) y va centrado verticalmente. Estirarlo hasta
 * la altura del titular vuelve el ángulo tan agudo que el glifo degenera en una
 * barra diagonal y deja de leerse como paréntesis — un chevron, a diferencia de
 * un corchete, no se puede alargar sin perder su forma. El trazo se dibuja al
 * cargar.
 */
function Chevron({ side, play }: { side: "left" | "right"; play: boolean }) {
  const d = side === "left" ? "M30 6 L8 46 L30 86" : "M10 6 L32 46 L10 86";

  return (
    <svg
      viewBox="0 0 40 92"
      preserveAspectRatio="xMidYMid meet"
      className="h-auto w-full overflow-visible"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`hero-chev-${side}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#cdd2ea" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#a99bff" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#6c5ce7" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <motion.path
        d={d}
        fill="none"
        stroke={`url(#hero-chev-${side})`}
        strokeWidth={3.4}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={play ? { pathLength: 1, opacity: 1 } : {}}
        transition={{
          pathLength: { duration: 1.5, delay: 0.5, ease: EASE },
          opacity: { duration: 0.4, delay: 0.5 },
        }}
      />
    </svg>
  );
}

export function Hero() {
  const ready = useSiteReady();
  const ref = useRef<HTMLDivElement>(null);

  // El hero se hunde y se desenfoca al salir: el fondo queda vivo detrás.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);

  return (
    <div id="top" ref={ref} className="relative min-h-[100svh] w-full">
      <motion.div
        style={{ y, opacity, scale }}
        className="mx-auto flex min-h-[100svh] max-w-[84rem] flex-col justify-center px-5 pb-24 pt-32 sm:px-8 sm:pt-36"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="glass inline-flex items-center gap-2.5 rounded-full py-1.5 pl-2.5 pr-4">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
            </span>
            <span className="t-label text-[0.58rem] text-mist">
              Tomando nuevos proyectos
            </span>
          </span>
          <span className="t-label text-faint">
            {site.role} · {site.location}
          </span>
        </motion.div>

        {/* Titular entre los chevrons de la marca */}
        <div className="mt-9 grid grid-cols-1 items-stretch gap-x-6 md:mt-12 md:grid-cols-[auto_minmax(0,1fr)_auto] lg:gap-x-10">
          <div className="hidden self-center md:block md:w-[clamp(2.2rem,4vw,3.9rem)]">
            <Chevron side="left" play={ready} />
          </div>

          <h1 className="t-display text-[clamp(2.6rem,7.4vw,6.1rem)] text-chrome">
            <WordReveal text="Del problema al producto" play={ready} delay={0.55} />{" "}
            {/*
              `inline-block` no es cosmético: el degradado se pinta con
              `background-clip: text`, y siendo un span en línea con hijos que
              llevan `overflow: hidden`, en pantallas angostas la caja de fondo
              se colapsaba y el texto quedaba invisible — justo la palabra que
              sostiene el titular. Con caja propia, el degradado siempre pinta.
            */}
            <span className="t-chrome inline-block">
              <WordReveal text="en días," play={ready} delay={0.85} />
            </span>{" "}
            <span className="text-muted/85">
              <WordReveal text="no en meses." play={ready} delay={1.0} />
            </span>
          </h1>

          <div className="hidden self-center md:block md:w-[clamp(2.2rem,4vw,3.9rem)]">
            <Chevron side="right" play={ready} />
          </div>
        </div>

        {/* Bajada + acciones */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.3, ease: EASE }}
          className="mt-10 grid gap-10 md:mt-14 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:gap-16"
        >
          <p className="t-body max-w-xl text-[1.05rem] text-mist sm:text-[1.15rem]">
            Apps móviles, plataformas web, sistemas internos, automatizaciones y
            todo lo que tu operación necesite a medida. Primeras entregas en días,
            precio cerrado y el código queda a tu nombre.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <MagneticLink
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="ESCRIBIR"
              className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-peri via-violet to-abyss px-7 py-4 text-[0.95rem] font-semibold text-white shadow-[0_10px_40px_-12px_rgba(124,108,240,0.85)] transition-shadow duration-500 hover:shadow-[0_16px_54px_-10px_rgba(124,108,240,1)]"
            >
              Iniciar un proyecto
              <ArrowUpRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.4}
              />
            </MagneticLink>

            <MagneticLink
              href="#proyectos"
              data-cursor="VER"
              strength={0.22}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/12 px-7 py-4 text-[0.95rem] font-medium text-mist transition-colors duration-300 hover:border-peri/40 hover:text-chrome"
            >
              Ver proyectos
            </MagneticLink>
          </div>
        </motion.div>

        {/* Pie del hero: los tres servicios y el indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-16 md:mt-24"
        >
          <div className="rule" />
          <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
            {/* Se lee de los servicios: una sola fuente de verdad con la
                sección de abajo, para que no prometa algo que ahí no está. */}
            <ul className="flex flex-wrap items-center gap-x-7 gap-y-3">
              {services.map((service) => (
                <li key={service.id} className="t-label text-muted">
                  {service.title}
                </li>
              ))}
            </ul>

            <a
              href="#servicios"
              data-cursor="BAJAR"
              aria-label="Ir a servicios"
              className="group flex items-center gap-3 text-faint transition-colors duration-300 hover:text-peri"
            >
              <span className="t-label text-[0.55rem]">Desplazá</span>
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 group-hover:border-peri/40">
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown className="h-3.5 w-3.5" strokeWidth={2} />
                </motion.span>
              </span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

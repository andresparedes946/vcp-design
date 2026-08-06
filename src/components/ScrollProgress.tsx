"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { nav } from "@/lib/site";

/** Estable a nivel de módulo: si se recalculara por render, el observer se
 *  desmontaría y volvería a montarse en cada pintado. */
const SECTION_IDS = nav.map((n) => n.id);

/** Devuelve el id de la sección que domina el viewport. */
export function useActiveSection(ids: readonly string[]) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            best = id;
          }
        }
        if (best) setActive(best);
      },
      { threshold: [0, 0.15, 0.3, 0.5, 0.75, 1], rootMargin: "-15% 0px -35% 0px" },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/**
 * Progreso de lectura.
 *
 * Dos piezas: una hairline superior con el avance total, y —en pantallas
 * grandes— un riel de puntos a la derecha, uno por sección. Los puntos son el
 * mismo motivo de la elipsis del isologo: el que corresponde a la sección
 * actual se estira en una barra.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const active = useActiveSection(SECTION_IDS);

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[130] h-[2px] w-full origin-left bg-gradient-to-r from-abyss via-violet to-peri"
      />

      <nav
        aria-label="Secciones"
        className="fixed right-7 top-1/2 z-[110] hidden -translate-y-1/2 flex-col items-center gap-3.5 xl:flex"
      >
        {nav.map((item) => {
          const isActive = active === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="group relative flex items-center justify-center py-1"
              aria-current={isActive ? "true" : undefined}
            >
              <span className="sr-only">{item.label}</span>

              <motion.span
                aria-hidden="true"
                className="block rounded-full"
                animate={{
                  width: 6,
                  height: isActive ? 26 : 6,
                  backgroundColor: isActive ? "#a99bff" : "rgba(185,190,212,0.28)",
                }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
              />

              <span className="t-label pointer-events-none absolute right-[calc(100%+0.9rem)] whitespace-nowrap text-[0.55rem] text-muted opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                {item.label}
              </span>
            </a>
          );
        })}
      </nav>
    </>
  );
}

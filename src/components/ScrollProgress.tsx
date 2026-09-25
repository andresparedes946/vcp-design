"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, useScroll, useSpring } from "motion/react";
import { homeSections } from "@/lib/site";

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

const SECTION_IDS = homeSections.map((s) => s.id);

/**
 * Progreso de lectura.
 *
 * Dos piezas: una hairline superior con el avance total, y —sólo en la home y
 * en pantallas grandes— un índice lateral con el nombre de cada sección. Es el
 * índice del documento, el complemento del encabezado de página: si el sitio
 * se lee como una monografía, tiene que poder recorrerse como una.
 *
 * El progreso es una hairline blanca, no una barra de color: la marca ya se
 * gasta en los acentos y una franja violeta cruzando la pantalla en todo
 * momento sería el elemento más ruidoso del sitio.
 */
export function ScrollProgress() {
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    restDelta: 0.001,
  });

  const active = useActiveSection(SECTION_IDS);
  const onHome = pathname === "/";

  return (
    <>
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="fixed left-0 top-0 z-[130] h-px w-full origin-left bg-white/45"
      />

      {onHome && (
        <nav
          aria-label="Índice de la página"
          className="fixed right-7 top-1/2 z-[120] hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
        >
          {homeSections.map((section) => {
            const isActive = active === section.id;
            return (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="group flex items-center gap-3"
              >
                <span
                  className={`t-label text-[0.6rem] transition-all duration-500 ${
                    isActive
                      ? "text-mist opacity-100"
                      : "text-faint opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {section.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`h-px transition-all duration-500 ${
                    isActive ? "w-7 bg-peri" : "w-3.5 bg-white/25 group-hover:w-5"
                  }`}
                />
              </a>
            );
          })}
        </nav>
      )}
    </>
  );
}

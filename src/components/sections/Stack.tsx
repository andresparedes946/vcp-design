"use client";

import { stackGroups, stackMarquee } from "@/lib/site";
import { SectionHeader } from "../Section";
import { Reveal } from "../Reveal";

/**
 * Stack.
 *
 * No usa el contenedor de sección estándar: la marquesina va a ancho completo
 * y el borde de la grilla la cortaría. El listado agrupado que va debajo sí
 * respeta el ancho de lectura.
 */
export function Stack() {
  // Duplicado para que el bucle cierre sin salto: la pista se desplaza -50%.
  const track = [...stackMarquee, ...stackMarquee];

  return (
    <section id="stack" className="relative scroll-mt-24 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[84rem] px-5 sm:px-8">
        <SectionHeader
          label="Stack"
          meta="Herramientas de producción"
          title={
            <>
              Tecnología conocida,{" "}
              <span className="text-muted/70">no experimentos.</span>
            </>
          }
          lead="Elegimos herramientas maduras y con comunidad grande. Si mañana tenés que contratar a otro equipo, va a encontrar código que entiende."
        />
      </div>

      {/* Marquesina */}
      <Reveal direction="none" blur={false}>
        <div className="marquee-mask relative mt-16 overflow-hidden border-y border-white/[0.06] py-6 md:mt-20">
          <div
            className="marquee-track flex w-max items-center gap-x-12"
            style={{ ["--marquee-duration" as string]: "52s" }}
          >
            {track.map((tech, i) => (
              <span key={`${tech}-${i}`} className="flex items-center gap-12">
                <span className="t-label whitespace-nowrap text-[0.75rem] text-mist/75">
                  {tech}
                </span>
                <span className="h-1 w-1 shrink-0 rounded-full bg-violet/45" />
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Agrupado por capa */}
      <div className="mx-auto mt-16 max-w-[84rem] px-5 sm:px-8 md:mt-20">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-3">
          {stackGroups.map((group, i) => (
            <Reveal key={group.label} direction="up" delay={i * 0.1}>
              <div className="flex items-center gap-3.5">
                <span className="t-label text-peri">{group.label}</span>
                <span className="h-px flex-1 bg-gradient-to-r from-white/12 to-transparent" />
              </div>

              <ul className="mt-6 flex flex-col gap-px">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center justify-between border-b border-white/[0.05] py-3 transition-colors duration-300 hover:border-peri/25"
                  >
                    <span className="t-body text-[0.95rem] text-mist transition-colors duration-300 group-hover:text-chrome">
                      {item}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-white/15 transition-all duration-300 group-hover:w-4 group-hover:bg-peri" />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

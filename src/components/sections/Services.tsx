"use client";

import { Check } from "lucide-react";
import { services } from "@/lib/site";
import { Section, SectionHeader } from "../Section";
import { Reveal } from "../Reveal";
import { SpotlightCard } from "../SpotlightCard";

/**
 * Servicios como filas, no como tarjetas.
 *
 * Tres servicios no llenan una grilla sin dejar huecos, y cada uno tiene
 * suficiente contenido (entregables, plazo) como para que una tarjeta lo
 * recorte. La fila deja leer todo de un vistazo y ordena la comparación en
 * columnas: qué es, qué incluye, cuánto tarda.
 *
 * Los códigos APPS / WEB / SAAS vienen del propio isologo — son la bajada de
 * la marca, no una etiqueta inventada.
 */
/**
 * El titular nombra la cantidad de servicios, así que se deriva de los datos:
 * si mañana se agrega o se saca una fila, el texto no queda mintiendo.
 */
const NUMERALES = ["", "Una", "Dos", "Tres", "Cuatro", "Cinco", "Seis", "Siete"];

function contarFormas(n: number) {
  const palabra = NUMERALES[n];
  if (!palabra) return `${n} formas de construir.`;
  return n === 1 ? "Una forma de construir." : `${palabra} formas de construir.`;
}

export function Services() {
  return (
    <Section id="servicios">
      <SectionHeader
        label="Servicios"
        meta={`${services.length} líneas de trabajo`}
        title={
          <>
            {contarFormas(services.length)}{" "}
            <span className="text-muted/70">Una sola manera de trabajar.</span>
          </>
        }
        lead="Elegimos el formato según el problema, no al revés. Si lo que necesitás entra en una web, no te vamos a vender una app."
      />

      <div className="mt-16 md:mt-20">
        <div className="rule" />

        {services.map((service, i) => (
          <Reveal key={service.id} direction="up" delay={i * 0.08} distance={22}>
            <SpotlightCard className="group relative border-b border-white/[0.07] transition-colors duration-500 hover:bg-white/[0.018]">
              <div className="grid gap-6 px-1 py-10 md:grid-cols-[7.5rem_minmax(0,1fr)] md:gap-10 md:py-12 lg:grid-cols-[7.5rem_minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
                {/* Código y plazo */}
                <div className="flex items-center gap-4 md:block">
                  <span className="t-label text-[0.72rem] text-peri transition-colors duration-500 group-hover:text-chrome">
                    {service.index}
                  </span>
                  <span className="t-mono mt-0 block text-[0.72rem] text-faint md:mt-4">
                    {service.span}
                  </span>
                </div>

                {/* Qué es */}
                <div>
                  <h3 className="t-title text-[clamp(1.55rem,2.6vw,2.15rem)] text-chrome">
                    {service.title}
                  </h3>
                  <p className="t-body mt-4 max-w-lg text-[0.98rem] text-muted">
                    {service.summary}
                  </p>
                </div>

                {/* Qué incluye */}
                <ul className="flex flex-col gap-3 lg:pt-2">
                  {service.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <Check
                        className="mt-[0.3rem] h-3.5 w-3.5 shrink-0 text-violet transition-colors duration-500 group-hover:text-peri"
                        strokeWidth={2.6}
                      />
                      <span className="t-body text-[0.92rem] leading-snug text-mist">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

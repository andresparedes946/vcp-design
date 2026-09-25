import type { ReactNode } from "react";
import { Container } from "./Section";
import { Reveal } from "./Reveal";

/**
 * Portada de página interna.
 *
 * La misma gramática que el encabezado de página de la home —etiqueta,
 * hairline, folio— pero a escala de apertura de capítulo. Que todas las
 * páginas abran igual es lo que hace que el sitio se lea como un solo
 * documento y no como seis plantillas distintas.
 */
export function PageHero({
  label,
  folio,
  title,
  lead,
  action,
}: {
  label: string;
  folio?: string;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="relative pb-14 pt-32 sm:pt-36 md:pb-20 lg:pt-44">
      <Container>
        <Reveal direction="up" distance={12}>
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="t-label shrink-0 text-chrome">{label}</span>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-white/[0.16] via-white/[0.08] to-white/[0.03]"
            />
            {folio && (
              <span className="t-mono shrink-0 text-[0.7rem] text-faint">{folio}</span>
            )}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-10 lg:gap-16">
          <Reveal direction="up" delay={0.06} className="md:col-span-7">
            <h1 className="t-display text-chrome text-[clamp(2.5rem,6.6vw,4.8rem)]">
              {title}
            </h1>
          </Reveal>

          {(lead || action) && (
            <Reveal
              direction="up"
              delay={0.14}
              className="flex flex-col items-start gap-7 md:col-span-5 md:justify-end md:pb-2"
            >
              {lead && <p className="t-body max-w-md text-[1.02rem] text-muted">{lead}</p>}
              {action}
            </Reveal>
          )}
        </div>
      </Container>
    </header>
  );
}

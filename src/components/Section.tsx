import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Caja del sitio. Un solo lugar define el ancho y los márgenes laterales. */
export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[84rem] px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`relative scroll-mt-28 py-20 md:py-28 lg:py-36 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/**
 * Encabezado de página.
 *
 * La firma del sitio: una hairline con el nombre de la sección incrustado y el
 * folio en el extremo, como el running head de un libro impreso. No es un
 * separador decorativo — dice en qué parte del documento estás, y es lo que
 * sostiene la lectura del sitio como monografía y no como landing.
 *
 * El folio es opcional y lleva un dato real (cuántos servicios, cuántos
 * proyectos). Cuando no hay nada verdadero que contar, se omite: un contador
 * inventado en el lugar más visible de cada sección es la peor apuesta posible.
 */
export function RunningHead({ label, folio }: { label: string; folio?: string }) {
  return (
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
  );
}

/**
 * Bloque de titular.
 *
 * Asimétrico por defecto: el titular ocupa la mitad izquierda de la grilla y la
 * bajada se corre a la derecha, desalineada hacia abajo. Centrar los dos es lo
 * que hace que cualquier página se lea como una plantilla; el desfase es lo que
 * la hace parecer compuesta.
 */
export function SectionHeader({
  title,
  lead,
  action,
  className = "",
}: {
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-10 lg:gap-16 ${className}`}
    >
      <Reveal direction="up" delay={0.06} className="md:col-span-7">
        <h2 className="t-title text-chrome text-[clamp(2.25rem,5.4vw,4rem)]">{title}</h2>
      </Reveal>

      {(lead || action) && (
        <Reveal
          direction="up"
          delay={0.14}
          className="flex flex-col items-start gap-7 md:col-span-5 md:pt-3"
        >
          {lead && <p className="t-body max-w-md text-[1.02rem] text-muted">{lead}</p>}
          {action}
        </Reveal>
      )}
    </div>
  );
}

/**
 * La voz publicada: la cursiva serif dentro de un titular en Archivo.
 *
 * Se reserva para la palabra que carga el significado de cada titular, una por
 * titular. Es el puente tipográfico entre las dos unidades de negocio —el
 * estudio que construye y la casa que publica— y pierde todo su efecto en
 * cuanto aparece dos veces en la misma frase.
 */
export function Em({ children }: { children: ReactNode }) {
  return <em className="t-editorial">{children}</em>;
}

/** Hairline a sangre. Cierra una sección contra la siguiente. */
export function Bleed() {
  return <div aria-hidden="true" className="h-px w-full bg-white/[0.06]" />;
}

import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

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
    <section
      id={id}
      className={`relative mx-auto w-full max-w-[84rem] scroll-mt-24 px-5 py-24 sm:px-8 md:py-32 lg:py-40 ${className}`}
    >
      {children}
    </section>
  );
}

/**
 * Encabezado de sección.
 *
 * La etiqueta mono lleva el nombre de la sección y, cuando existe, un dato
 * real (cuántos servicios, cuántos proyectos). No hay numeración 01/02/03:
 * las secciones no son una secuencia y el número no diría nada. El único
 * lugar donde se numera es el proceso, porque ahí el orden sí importa.
 */
export function SectionHeader({
  label,
  meta,
  title,
  lead,
  align = "left",
}: {
  label: string;
  meta?: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <header className={`max-w-3xl ${centered ? "mx-auto text-center" : ""}`}>
      <Reveal direction="up" distance={16}>
        <div
          className={`flex items-center gap-3.5 ${centered ? "justify-center" : ""}`}
        >
          <span className="t-label text-peri">{label}</span>
          <span className="h-px w-10 bg-gradient-to-r from-peri/50 to-transparent" />
          {meta && <span className="t-mono text-[0.7rem] text-faint">{meta}</span>}
        </div>
      </Reveal>

      <Reveal direction="up" delay={0.08}>
        <h2 className="t-title mt-6 text-[clamp(2.1rem,5vw,3.6rem)] text-chrome">
          {title}
        </h2>
      </Reveal>

      {lead && (
        <Reveal direction="up" delay={0.16}>
          <p
            className={`t-body mt-6 text-[1.02rem] text-muted sm:text-[1.08rem] ${
              centered ? "mx-auto" : ""
            } max-w-2xl`}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </header>
  );
}

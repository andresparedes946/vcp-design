"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { Project } from "@/lib/site";

/**
 * Visual del proyecto.
 *
 * Si el proyecto tiene captura, se carga con un skeleton real mientras llega
 * (no decorativo: desaparece cuando la imagen termina de cargar). Si todavía
 * no hay captura, se dibuja un panel generado a partir del color del proyecto
 * — preferimos eso antes que un mockup falso.
 */
export function ProjectVisual({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  /**
   * Parallax de la captura dentro de su marco.
   *
   * La imagen se monta un 8% más alta que el recuadro por arriba y por abajo,
   * y se desplaza contra él mientras la tarjeta cruza la pantalla. El marco no
   * se mueve: lo que se mueve es lo que se ve a través suyo, así que la captura
   * se lee como una ventana al producto y no como una foto pegada.
   *
   * El recorrido es del 6% del alto de la imagen, por debajo del 8% que sobra
   * de cada lado — nunca se asoma el fondo.
   *
   * Todos los hooks van antes de cualquier rama: abajo hay un `return`
   * temprano y el orden de hooks no puede depender de él.
   */
  const reduced = useReducedMotion();
  const frame = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: frame,
    offset: ["start end", "end start"],
  });
  const rawY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const y = useSpring(rawY, { stiffness: 110, damping: 30, mass: 0.5 });

  // Si la ruta apunta a un archivo que no está, se cae al panel generado. Sin
  // esto el skeleton giraría para siempre: `onLoad` nunca llega a dispararse.
  if (project.image && !failed) {
    return (
      <div
        ref={frame}
        className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface"
      >
        {!loaded && <div className="skeleton absolute inset-0" />}
        <motion.div
          className="absolute inset-x-0 -top-[8%] -bottom-[8%]"
          style={reduced ? undefined : { y }}
        >
          <Image
            src={project.image}
            alt={`Captura de ${project.name}`}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            onLoad={() => setLoaded(true)}
            onError={() => setFailed(true)}
            className={`object-cover transition-all duration-700 ${
              loaded ? "scale-100 opacity-100 blur-0" : "scale-105 opacity-0 blur-lg"
            } group-hover:scale-[1.04]`}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/[0.06] bg-surface"
      aria-hidden="true"
    >
      {/* Resplandor con el color del proyecto */}
      <div
        className="absolute -left-[10%] -top-[35%] h-[130%] w-[80%] rounded-full blur-3xl transition-transform duration-1000 ease-out group-hover:translate-x-6 group-hover:scale-110"
        style={{
          background: `radial-gradient(circle, ${project.accent}42, transparent 66%)`,
        }}
      />
      <div
        className="absolute -bottom-[45%] -right-[12%] h-[120%] w-[70%] rounded-full blur-3xl transition-transform duration-1000 ease-out group-hover:-translate-x-4"
        style={{
          background: `radial-gradient(circle, ${project.accent}28, transparent 68%)`,
        }}
      />

      {/* Retícula */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      {/* El motivo de la marca, en grande y muy tenue */}
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className="t-mono select-none text-[clamp(3.5rem,9vw,6rem)] leading-none opacity-[0.13] transition-opacity duration-700 group-hover:opacity-25"
          style={{ color: project.accent }}
        >
          &lt;/&gt;
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-void/70 to-transparent" />
    </div>
  );
}

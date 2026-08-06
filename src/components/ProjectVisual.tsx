"use client";

import Image from "next/image";
import { useState } from "react";
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

  // Si la ruta apunta a un archivo que no está, se cae al panel generado. Sin
  // esto el skeleton giraría para siempre: `onLoad` nunca llega a dispararse.
  if (project.image && !failed) {
    return (
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-surface">
        {!loaded && <div className="skeleton absolute inset-0" />}
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

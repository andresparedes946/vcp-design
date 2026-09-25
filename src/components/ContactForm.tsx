"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { budgets, projectTypes, whatsapp } from "@/lib/site";

/**
 * Formulario de contacto.
 *
 * No manda el mensaje a un servidor: lo arma y abre WhatsApp con el texto ya
 * escrito. Es una decisión, no una limitación. Un formulario con backend
 * propio exige un servicio de correo, una casilla que alguien revise y un
 * manejo de datos personales; este estudio contesta por WhatsApp de todos
 * modos, así que el formulario hace lo único que hacía falta — ordenar lo que
 * el visitante tiene que contar para que el primer mensaje llegue con
 * contexto.
 *
 * El beneficio secundario es que no hay envío que pueda fallar en silencio,
 * que es la forma más común de perder una consulta.
 */
export function ContactForm() {
  const [name, setName] = useState("");
  const [type, setType] = useState(projectTypes[0]);
  const [budget, setBudget] = useState(budgets[0]);
  const [detail, setDetail] = useState("");

  const message = [
    `Hola, soy ${name.trim() || "..."}.`,
    `Quiero hacer: ${type}.`,
    `Presupuesto: ${budget}.`,
    detail.trim() && `Sobre el proyecto: ${detail.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  const href = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(message)}`;
  const ready = name.trim().length > 1;

  const field =
    "w-full rounded-lg border border-white/[0.1] bg-white/[0.02] px-4 py-3.5 text-[0.95rem] text-chrome transition-colors duration-300 placeholder:text-faint focus:border-peri/50 focus:outline-none";

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="grid gap-6 sm:grid-cols-2"
      aria-label="Contar tu proyecto"
    >
      <div className="sm:col-span-2">
        <label htmlFor="nombre" className="t-label text-faint">
          Tu nombre
        </label>
        <input
          id="nombre"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Cómo te llamás"
          autoComplete="name"
          className={`mt-3 ${field}`}
        />
      </div>

      <div>
        <label htmlFor="tipo" className="t-label text-faint">
          Qué necesitás
        </label>
        <select
          id="tipo"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className={`mt-3 ${field}`}
        >
          {projectTypes.map((option) => (
            <option key={option} value={option} className="bg-surface">
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="presupuesto" className="t-label text-faint">
          Presupuesto
        </label>
        <select
          id="presupuesto"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          className={`mt-3 ${field}`}
        >
          {budgets.map((option) => (
            <option key={option} value={option} className="bg-surface">
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="sm:col-span-2">
        <label htmlFor="detalle" className="t-label text-faint">
          Contanos un poco más <span className="normal-case">(opcional)</span>
        </label>
        <textarea
          id="detalle"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          rows={4}
          placeholder="Qué hace tu negocio y qué problema querés resolver"
          className={`mt-3 resize-none ${field}`}
        />
      </div>

      <div className="sm:col-span-2">
        <a
          href={ready ? href : undefined}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!ready}
          data-cursor={ready ? "ENVIAR" : undefined}
          onClick={(e) => !ready && e.preventDefault()}
          className={`group inline-flex items-center gap-2.5 rounded-full px-6 py-3.5 text-[0.9rem] font-medium transition-colors duration-300 ${
            ready
              ? "bg-chrome text-void hover:bg-white"
              : "cursor-not-allowed border border-white/[0.1] text-faint"
          }`}
        >
          Enviar por WhatsApp
          <ArrowUpRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={2}
          />
        </a>

        <p className="t-mono mt-4 text-[0.74rem] text-faint">
          {ready
            ? "Se abre WhatsApp con el mensaje escrito. Podés revisarlo antes de enviarlo."
            : "Escribí tu nombre para continuar."}
        </p>
      </div>
    </form>
  );
}

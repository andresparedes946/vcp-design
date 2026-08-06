"use client";

import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, ChevronDown, Mail, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { budgets, projectTypes, site, whatsapp } from "@/lib/site";
import { Section, SectionHeader } from "../Section";
import { Reveal } from "../Reveal";
import { MagneticButton } from "../Magnetic";

type Status = "idle" | "sending" | "sent";

const fieldBase =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3.5 text-[0.95rem] text-chrome placeholder:text-faint transition-colors duration-300 focus:border-peri/50 focus:bg-white/[0.05] focus:outline-none";

/**
 * Select con la flecha dibujada por nosotros. `appearance-none` borra el
 * control nativo —que en Windows llega con su propio gris claro— así que hay
 * que reponer la señal de "esto se despliega".
 */
function SelectField({
  id,
  name,
  options,
}: {
  id: string;
  name: string;
  options: readonly string[];
}) {
  return (
    <div className="relative">
      <select
        id={id}
        name={name}
        required
        className={`${fieldBase} cursor-pointer appearance-none pr-11`}
      >
        {options.map((option) => (
          <option key={option} value={option} className="bg-surface text-chrome">
            {option}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
        strokeWidth={2}
      />
    </div>
  );
}

/**
 * Contacto.
 *
 * Sin backend, un formulario que "envía" y no manda nada sería mentira. Este
 * arma el mensaje con lo que cargaste y abre WhatsApp con todo escrito: llega
 * al mismo lugar que el botón flotante, pero con el contexto del proyecto
 * adentro. El correo queda como segunda vía para quien prefiera escribir.
 */
export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status !== "idle") return;

    const data = new FormData(e.currentTarget);
    const name = String(data.get("nombre") || "").trim();
    const email = String(data.get("email") || "").trim();
    const type = String(data.get("tipo") || "");
    const budget = String(data.get("presupuesto") || "");
    const detail = String(data.get("mensaje") || "").trim();

    const lines = [
      `Hola, soy ${name}.`,
      "",
      `Tipo de proyecto: ${type}`,
      `Presupuesto estimado: ${budget}`,
      email ? `Email de contacto: ${email}` : null,
      "",
      detail,
    ].filter((line) => line !== null);

    const href = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(
      lines.join("\n"),
    )}`;

    // Pausa corta: da acuse de recibo antes de que el navegador cambie de app.
    setStatus("sending");
    window.setTimeout(() => {
      setStatus("sent");
      window.open(href, "_blank", "noopener,noreferrer");
      window.setTimeout(() => setStatus("idle"), 2600);
    }, 620);
  };

  return (
    <Section id="contacto">
      <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div>
          <SectionHeader
            label="Contacto"
            meta="Respuesta en 24 h"
            title={
              <>
                Contame qué{" "}
                <span className="text-muted/70">querés construir.</span>
              </>
            }
            lead="No hace falta que tengas todo definido. Con saber qué problema querés resolver alcanza para empezar a conversar."
          />

          <Reveal direction="up" delay={0.15}>
            <ul className="mt-12 flex flex-col gap-px">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  data-cursor="MAIL"
                  className="group flex items-center gap-4 border-t border-white/[0.07] py-5 transition-colors duration-300 hover:border-peri/25"
                >
                  <Mail className="h-4 w-4 shrink-0 text-violet" strokeWidth={1.9} />
                  <span className="t-body flex-1 text-[0.95rem] text-mist transition-colors duration-300 group-hover:text-chrome">
                    {site.email}
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-peri"
                    strokeWidth={2}
                  />
                </a>
              </li>
              <li className="flex items-center gap-4 border-y border-white/[0.07] py-5">
                <MapPin className="h-4 w-4 shrink-0 text-violet" strokeWidth={1.9} />
                <span className="t-body flex-1 text-[0.95rem] text-mist">
                  {site.location}
                </span>
                <span className="t-mono text-[0.7rem] text-faint">GMT-3</span>
              </li>
            </ul>
          </Reveal>
        </div>

        {/* Formulario */}
        <Reveal direction="up" delay={0.1} distance={30}>
          <form
            onSubmit={onSubmit}
            className="glass rounded-2xl p-6 sm:p-9"
            noValidate={false}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2.5">
                <label htmlFor="nombre" className="t-label text-muted">
                  Nombre
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  type="text"
                  required
                  autoComplete="name"
                  placeholder="Cómo te llamás"
                  className={fieldBase}
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="email" className="t-label text-muted">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@empresa.com"
                  className={fieldBase}
                />
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="tipo" className="t-label text-muted">
                  Tipo de proyecto
                </label>
                <SelectField id="tipo" name="tipo" options={projectTypes} />
              </div>

              <div className="flex flex-col gap-2.5">
                <label htmlFor="presupuesto" className="t-label text-muted">
                  Presupuesto
                </label>
                <SelectField id="presupuesto" name="presupuesto" options={budgets} />
              </div>

              <div className="flex flex-col gap-2.5 sm:col-span-2">
                <label htmlFor="mensaje" className="t-label text-muted">
                  Contame el proyecto
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  required
                  rows={5}
                  placeholder="Qué problema querés resolver, para quién, y si hay una fecha en juego."
                  className={`${fieldBase} resize-y`}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-5">
              <p className="t-body max-w-[17rem] text-[0.8rem] leading-relaxed text-faint">
                Al enviar se abre WhatsApp con el mensaje ya redactado. Podés
                revisarlo antes de mandarlo.
              </p>

              <MagneticButton
                type="submit"
                disabled={status !== "idle"}
                data-cursor={status === "idle" ? "ENVIAR" : undefined}
                className="group inline-flex min-w-[13.5rem] items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-peri via-violet to-abyss px-7 py-4 text-[0.95rem] font-semibold text-white shadow-[0_10px_40px_-12px_rgba(124,108,240,0.8)] transition-shadow duration-500 hover:shadow-[0_16px_54px_-10px_rgba(124,108,240,1)] disabled:cursor-default"
              >
                {status === "idle" && (
                  <>
                    Enviar por WhatsApp
                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.4}
                    />
                  </>
                )}

                {status === "sending" && (
                  <span className="flex items-center gap-2.5">
                    Preparando
                    {/* La elipsis del isologo, ahora como estado de carga. */}
                    <span className="flex items-center gap-1">
                      {[0, 1, 2].map((d) => (
                        <span
                          key={d}
                          className="ellipsis-dot h-1 w-1 rounded-full bg-white"
                          style={{ animationDelay: `${d * 0.16}s` }}
                        />
                      ))}
                    </span>
                  </span>
                )}

                {status === "sent" && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-4 w-4" strokeWidth={2.6} />
                    WhatsApp abierto
                  </motion.span>
                )}
              </MagneticButton>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}

"use client";

import { motion } from "motion/react";
import { Container, Em } from "../Section";
import { Cta } from "../Cta";
import { BrowserFrame, Plate } from "../Device";
import { Parallax, WordReveal } from "../Reveal";

const EASE = [0.16, 1, 0.3, 1] as const;

const EYEBROW = "Digital Studio · Web · Apps · SaaS · E-commerce";

const CAPABILITIES = [
  "Websites",
  "Apps",
  "E-commerce",
  "SaaS",
  "Automatizaciones",
  "Productos digitales",
];

/**
 * Portada.
 *
 * La tesis de la página no es una ilustración ni un degradado: es la obra. La
 * composición de abajo son las tres capturas reales montadas en sus soportes
 * verdaderos —un navegador con su dominio, un teléfono, una lámina— y cada una
 * lleva su pie de figura. Es el gesto que convierte la home en la primera
 * página de una monografía en lugar de en una landing más.
 *
 * El movimiento está medido: el titular entra palabra por palabra una sola vez
 * en toda la carga, y las tres láminas se desplazan a velocidades apenas
 * distintas al hacer scroll. Nada rebota, nada flota.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 sm:pt-36 lg:pt-44">
      <Container>
        <div className="grid gap-y-10 md:grid-cols-12 md:gap-x-10 lg:gap-x-16">
          <div className="md:col-span-8 lg:col-span-7">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE }}
              className="t-label flex items-center gap-3 text-muted"
            >
              <span className="h-1 w-1 rounded-full bg-peri" />
              {EYEBROW}
            </motion.p>

            <h1 className="t-display mt-7 text-chrome text-[clamp(2.6rem,7.4vw,5.6rem)]">
              <WordReveal text="Construimos productos digitales para negocios que quieren" />{" "}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.9, ease: EASE }}
                className="inline-block"
              >
                <Em>crecer</Em>.
              </motion.span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42, duration: 0.85, ease: EASE }}
            className="flex flex-col items-start gap-8 md:col-span-4 md:justify-end md:pb-2 lg:col-span-5"
          >
            <p className="t-body max-w-md text-[1.02rem] text-muted sm:text-[1.06rem]">
              Diseñamos y desarrollamos experiencias digitales de alto nivel: desde
              landing pages y sitios corporativos hasta e-commerce, aplicaciones, SaaS y
              soluciones a medida.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Cta href="/contacto" cursor="HABLEMOS">
                Empezar un proyecto
              </Cta>
              <Cta href="/proyectos" variant="ghost" cursor="VER">
                Ver proyectos
              </Cta>
            </div>
          </motion.div>
        </div>

        {/* Capacidades: una línea de texto, no una fila de tarjetas. */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.9 }}
          className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-2 border-y border-white/[0.07] py-4 md:mt-20"
        >
          {CAPABILITIES.map((item, i) => (
            <li key={item} className="t-label flex items-center gap-3 text-muted">
              {i > 0 && (
                <span aria-hidden="true" className="h-2.5 w-px bg-white/14" />
              )}
              {item}
            </li>
          ))}
        </motion.ul>
      </Container>

      {/* ── Composición de obra ─────────────────────────────────────────── */}

      <Container className="mt-12 md:mt-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 1, ease: EASE }}
          className="grid gap-5 md:grid-cols-12 md:gap-6"
        >
          <Parallax speed={22} className="md:col-span-8">
            <figure>
              <BrowserFrame
                src="/proyectos/aberturas-lujan.jpg"
                alt="Tienda online de Aberturas Luján"
                domain="aberturaslujan.com.ar"
                priority
                sizes="(max-width: 768px) 100vw, 62vw"
              />
              {/*
                Los pies de figura se apilan en pantallas angostas. En una sola
                fila el nombre largo se parte en dos líneas y la categoría
                queda flotando arriba a la derecha, que es el tipo de detalle
                que delata una composición sin revisar.
              */}
              <figcaption className="fig mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                <span>Fig. 01 — Aberturas Luján</span>
                <span className="text-[#9fb3c8]">E-commerce</span>
              </figcaption>
            </figure>
          </Parallax>

          <div className="grid gap-5 md:col-span-4 md:gap-6">
            <Parallax speed={-14}>
              <figure>
                <Plate
                  src="/proyectos/kinetic.png"
                  alt="Panel de gestión de pacientes de KineTic"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <figcaption className="fig mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                  <span>Fig. 02 — KineTic</span>
                  <span className="text-[#38bdf8]">SaaS</span>
                </figcaption>
              </figure>
            </Parallax>

            <Parallax speed={34}>
              <figure>
                <Plate
                  src="/proyectos/estudio-barrionuevo.jpg"
                  alt="Sitio del Estudio Barrionuevo"
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
                <figcaption className="fig mt-3 flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
                  <span>Fig. 03 — Estudio Barrionuevo</span>
                  <span className="text-[#cbb185]">Website</span>
                </figcaption>
              </figure>
            </Parallax>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

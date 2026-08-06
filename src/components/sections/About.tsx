"use client";

import Image from "next/image";
import { principles, site, stats } from "@/lib/site";
import { Section, SectionHeader } from "../Section";
import { Parallax, Reveal, Stagger, StaggerItem } from "../Reveal";
import { Counter } from "../Counter";
import { SpotlightCard } from "../SpotlightCard";

export function About() {
  return (
    <Section id="estudio">
      <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
        <div>
          <SectionHeader
            label="Estudio"
            meta={`Desde ${site.founded}`}
            title={
              <>
                Un estudio chico,{" "}
                <span className="text-muted/70">a propósito.</span>
              </>
            }
          />

          <Reveal direction="up" delay={0.12}>
            <div className="mt-7 flex max-w-xl flex-col gap-5">
              <p className="t-body text-[1.02rem] text-mist">
                VCP Design nació en {site.founded} con una idea simple: la mayoría
                de los negocios no necesitan una agencia de cuarenta personas.
                Necesitan a alguien que entienda su problema y lo resuelva bien.
              </p>
              <p className="t-body text-[0.98rem] text-muted">
                Trabajamos con pocos proyectos a la vez para poder involucrarnos
                en serio en cada uno. Eso significa que a veces hay que esperar
                una fecha de inicio — y también que el proyecto que arranca no
                compite por atención con otros diez.
              </p>
            </div>
          </Reveal>

          {/* Principios */}
          <Stagger className="mt-12 flex flex-col gap-px" amount={0.15}>
            {principles.map((p) => (
              <StaggerItem key={p.title}>
                <div className="group border-t border-white/[0.07] py-6 transition-colors duration-500 hover:border-peri/25">
                  <div className="grid gap-2 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-8">
                    <h3 className="t-title text-[1.15rem] text-chrome transition-colors duration-500 group-hover:text-peri">
                      {p.title}
                    </h3>
                    <p className="t-body text-[0.94rem] text-muted">{p.body}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        {/* La marca */}
        <div className="lg:pt-8">
          <Parallax speed={38}>
            <Reveal direction="up" distance={30}>
              <SpotlightCard className="glass relative overflow-hidden rounded-3xl p-8 sm:p-10">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-1/4 -top-1/3 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(124,108,240,0.28),transparent_65%)] blur-3xl"
                />

                <div className="relative flex flex-col items-center text-center">
                  <Image
                    src="/vcp-design-logo.png"
                    alt="Isologo de VCP Design"
                    width={420}
                    height={420}
                    className="h-auto w-full max-w-[19rem] rounded-2xl"
                    priority={false}
                  />

                  <div className="rule mt-8 w-full" />

                  <p className="t-body mt-8 max-w-xs text-[0.95rem] text-mist">
                    Apps, web y SaaS. Las tres cosas las hacemos con el mismo
                    criterio: que funcione, que se entienda y que se pueda
                    mantener.
                  </p>

                  <p className="t-label mt-7 text-faint">{site.location}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          </Parallax>
        </div>
      </div>

      {/* Números */}
      <Stagger
        className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.04] md:mt-24 md:grid-cols-4"
        amount={0.3}
      >
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="bg-void/85">
            <div className="flex h-full flex-col justify-between gap-6 px-6 py-8 transition-colors duration-500 hover:bg-white/[0.02] sm:px-8 sm:py-10">
              <Counter
                value={stat.value}
                className="t-display t-chrome text-[clamp(2.4rem,5vw,3.4rem)]"
              />
              <span className="t-label text-faint">{stat.label}</span>
            </div>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}

"use client";

import { ArrowUp } from "lucide-react";
import { nav, site, whatsapp, whatsappHref } from "@/lib/site";
import { LogoMark } from "../Logo";
import { Reveal } from "../Reveal";
import { MagneticButton } from "../Magnetic";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-white/[0.07]">
      <div className="mx-auto max-w-[84rem] px-5 py-16 sm:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-9 w-9" strokeWidth={3} />
              <div className="flex flex-col leading-none">
                <span className="t-chrome text-[1.15rem] font-bold tracking-[0.08em] [font-variation-settings:'wdth'_118]">
                  VCP
                </span>
                <span className="t-label mt-1 text-[0.52rem] text-violet/80">
                  DESIGN
                </span>
              </div>
            </div>

            <p className="t-body mt-6 max-w-xs text-[0.94rem] text-muted">
              {site.role} en {site.location}. Construimos apps móviles,
              plataformas web, sistemas a medida y automatizaciones.
            </p>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="t-label text-faint">Navegación</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[0.94rem] text-mist transition-colors duration-300 hover:text-peri"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="t-label text-faint">Contacto</h2>
            <ul className="mt-5 flex flex-col gap-3">
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="CHAT"
                  className="text-[0.94rem] text-mist transition-colors duration-300 hover:text-signal"
                >
                  {site.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="break-all text-[0.94rem] text-mist transition-colors duration-300 hover:text-peri"
                >
                  {site.email}
                </a>
              </li>
              <li className="t-mono pt-1 text-[0.8rem] text-faint">
                {whatsapp.tooltip}
              </li>
            </ul>
          </div>
        </div>

        {/* Cierre: el lettering a escala de página */}
        <Reveal direction="up" distance={30} delay={0.05}>
          <div className="mt-16 select-none overflow-hidden md:mt-20">
            <div
              aria-hidden="true"
              className="t-display t-chrome whitespace-nowrap text-center text-[clamp(3.6rem,15vw,13rem)] leading-[0.85] opacity-[0.22]"
            >
              VCP DESIGN
            </div>
          </div>
        </Reveal>

        <div className="rule mt-10" />

        <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
          <p className="t-mono text-[0.75rem] text-faint">
            © {year} {site.name}. Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-6">
            <p className="t-label hidden text-faint sm:block">{site.tagline}</p>

            <MagneticButton
              type="button"
              onClick={() =>
                window.scrollTo({
                  top: 0,
                  behavior: window.matchMedia("(prefers-reduced-motion: reduce)")
                    .matches
                    ? "auto"
                    : "smooth",
                })
              }
              aria-label="Volver arriba"
              data-cursor="ARRIBA"
              strength={0.25}
              className="group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-muted transition-colors duration-300 hover:border-peri/40 hover:text-peri"
            >
              <ArrowUp
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </MagneticButton>
          </div>
        </div>
      </div>
    </footer>
  );
}

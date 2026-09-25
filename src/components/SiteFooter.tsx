import Link from "next/link";
import { nav, site, socials, whatsappHref } from "@/lib/site";
import { LogoMark } from "./Logo";
import { Container } from "./Section";
import { Reveal } from "./Reveal";

/**
 * Pie del sitio, compuesto como el colofón de un libro.
 *
 * Un colofón es la nota final donde una edición declara cómo fue hecha: con
 * qué tipografías, en qué imprenta, en qué año. Acá cumple la misma función y
 * además hace un trabajo comercial concreto — es un estudio de software
 * diciendo en una línea con qué construye, sin montar otra sección para eso.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-[2] border-t border-white/[0.07]">
      <Container className="py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-9 w-9" strokeWidth={3} />
              <div className="flex flex-col leading-none">
                <span className="t-chrome-brand text-[1.15rem] font-bold tracking-[0.08em] [font-variation-settings:'wdth'_118]">
                  VCP
                </span>
                <span className="t-label mt-1 text-[0.52rem] text-violet/80">DESIGN</span>
              </div>
            </div>

            <p className="t-label mt-6 text-faint">{site.concept}</p>

            <p className="t-body mt-4 max-w-xs text-[0.94rem] text-muted">
              {site.role} en {site.location}. Diseñamos y desarrollamos productos
              digitales, y publicamos recursos para quien quiere entenderlos.
            </p>
          </div>

          <nav aria-label="Pie de página">
            <h2 className="t-label text-faint">Navegación</h2>
            <ul className="mt-5 flex flex-col gap-3">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.94rem] text-mist transition-colors duration-300 hover:text-peri"
                  >
                    {item.label}
                  </Link>
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
              {/*
                Los perfiles oficiales. Además de servir para que alguien nos
                escriba, son el enlace real que respalda la lista `sameAs` de
                los datos estructurados: así Google confirma que el sitio y el
                perfil son la misma marca.
              */}
              {socials.map((profile) => (
                <li key={profile.url}>
                  <a
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer me"
                    aria-label={`${profile.label} de ${site.name}`}
                    className="text-[0.94rem] text-mist transition-colors duration-300 hover:text-peri"
                  >
                    {profile.handle}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cierre: el lettering a escala de página */}
        <Reveal direction="up" distance={26} delay={0.05}>
          <div className="mt-16 select-none overflow-hidden md:mt-20">
            <div
              aria-hidden="true"
              className="t-display t-chrome whitespace-nowrap text-center text-[clamp(3.4rem,15vw,13rem)] leading-[0.85] opacity-[0.14]"
            >
              VCP DESIGN
            </div>
          </div>
        </Reveal>

        <div className="rule mt-10" />

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-mono text-[0.72rem] text-faint">
            © {year} {site.name}. Todos los derechos reservados.
          </p>
          <p className="t-mono text-[0.72rem] text-faint">
            Compuesto en Archivo y Newsreader · Construido con Next.js ·{" "}
            {site.city}, {site.founded}
          </p>
        </div>
      </Container>
    </footer>
  );
}

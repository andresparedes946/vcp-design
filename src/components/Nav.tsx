"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, whatsappHref } from "@/lib/site";
import { Logo } from "./Logo";
import { MagneticLink } from "./Magnetic";
import { useActiveSection } from "./ScrollProgress";
import { useSiteReady } from "./Preloader";

const SECTION_IDS = nav.map((n) => n.id);

export function Nav() {
  const ready = useSiteReady();
  const active = useActiveSection(SECTION_IDS);
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => setCondensed(v > 28));

  // El menú móvil ocupa la pantalla: se bloquea el scroll de fondo.
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : {}}
        transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-[125]"
      >
        <div
          className={`mx-auto flex max-w-[84rem] items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
            condensed ? "py-3" : "py-5"
          }`}
        >
          <a
            href="#top"
            aria-label="VCP Design — inicio"
            data-cursor="INICIO"
            className="relative z-10 shrink-0 transition-opacity duration-300 hover:opacity-80"
          >
            <Logo />
          </a>

          {/* Navegación de escritorio */}
          <nav
            aria-label="Principal"
            className={`hidden items-center gap-1 rounded-full px-2 py-1.5 transition-all duration-500 lg:flex ${
              condensed
                ? "glass shadow-[0_8px_32px_-12px_rgba(0,0,0,0.7)]"
                : "border border-transparent bg-transparent"
            }`}
          >
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[0.83rem] font-medium transition-colors duration-300 ${
                    isActive ? "text-chrome" : "text-muted hover:text-mist"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.07] ring-1 ring-inset ring-white/10"
                      transition={{ type: "spring", stiffness: 380, damping: 34 }}
                    />
                  )}
                  {item.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2.5">
            <MagneticLink
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="ESCRIBIR"
              strength={0.24}
              className="group hidden items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-5 py-2.5 text-[0.82rem] font-medium text-chrome backdrop-blur-md transition-colors duration-300 hover:border-peri/45 hover:bg-violet/12 sm:inline-flex"
            >
              Hablemos
              <ArrowUpRight
                className="h-3.5 w-3.5 text-peri transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.2}
              />
            </MagneticLink>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              className="glass relative z-10 flex h-11 w-11 items-center justify-center rounded-full text-chrome transition-colors duration-300 hover:bg-white/10 lg:hidden"
            >
              <Menu className="h-[18px] w-[18px]" strokeWidth={1.8} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[140] bg-void/95 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex h-full flex-col px-5 py-5 sm:px-8">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                  autoFocus
                  className="glass flex h-11 w-11 items-center justify-center rounded-full text-chrome"
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </button>
              </div>

              <nav aria-label="Principal" className="mt-14 flex flex-col">
                {nav.map((item, i) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.08 + i * 0.06,
                      duration: 0.6,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="group flex items-baseline gap-4 border-b border-white/[0.06] py-5"
                  >
                    <span className="t-label w-7 text-faint">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="t-title text-3xl text-chrome transition-colors duration-300 group-hover:text-peri">
                      {item.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-auto flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet to-abyss px-6 py-4 text-[0.95rem] font-semibold text-white"
              >
                Escribir por WhatsApp
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

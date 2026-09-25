"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { nav, site, whatsappHref } from "@/lib/site";
import { Logo } from "./Logo";
import { MagneticLink } from "./Magnetic";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Nav() {
  const pathname = usePathname();
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

  // Navegar cierra el menú. Sin esto, en una transición de cliente la ruta
  // cambia debajo del overlay y el menú queda tapando la página nueva.
  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[125]">
        <div
          className={`transition-colors duration-500 ${
            condensed
              ? "border-b border-white/[0.07] bg-void/80 backdrop-blur-xl"
              : "border-b border-transparent"
          }`}
        >
          <div
            className={`mx-auto flex max-w-[84rem] items-center justify-between px-5 transition-all duration-500 sm:px-8 ${
              condensed ? "py-3" : "py-5"
            }`}
          >
            <Link
              href="/"
              aria-label={`${site.name} — inicio`}
              data-cursor="INICIO"
              className="relative z-10 shrink-0 transition-opacity duration-300 hover:opacity-80"
            >
              <Logo />
            </Link>

            <nav aria-label="Principal" className="hidden items-center gap-8 lg:flex">
              {nav.map((item) => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`relative py-1 text-[0.85rem] transition-colors duration-300 ${
                      isActive ? "text-chrome" : "text-muted hover:text-mist"
                    }`}
                  >
                    {item.label}
                    {/*
                      El subrayado es una hairline, no una píldora: marca la
                      página igual que una regla de página marca el capítulo
                      abierto, y no agrega otra forma al sistema.
                    */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute -bottom-0.5 left-0 h-px w-full bg-peri"
                        transition={{ type: "spring", stiffness: 380, damping: 34 }}
                      />
                    )}
                  </Link>
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
                className="group hidden items-center gap-2 rounded-full border border-white/[0.14] px-5 py-2.5 text-[0.82rem] font-medium text-chrome transition-colors duration-300 hover:border-peri/45 hover:bg-white/[0.04] sm:inline-flex"
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
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-chrome transition-colors duration-300 hover:bg-white/[0.06] lg:hidden"
              >
                <Menu className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Menú móvil */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[140] bg-void/97 backdrop-blur-2xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-full flex-col px-5 py-5 sm:px-8">
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Cerrar menú"
                  autoFocus
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-chrome"
                >
                  <X className="h-[18px] w-[18px]" strokeWidth={1.8} />
                </button>
              </div>

              <nav aria-label="Principal" className="mt-12 flex flex-col">
                {nav.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 + i * 0.05, duration: 0.55, ease: EASE }}
                  >
                    <Link
                      href={item.href}
                      className="group flex items-baseline gap-5 border-b border-white/[0.06] py-5"
                    >
                      <span className="t-label w-6 text-faint">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="t-title text-3xl text-chrome transition-colors duration-300 group-hover:text-peri">
                        {item.label}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.55, ease: EASE }}
                className="mt-auto flex items-center justify-center gap-2 rounded-full bg-chrome px-6 py-4 text-[0.95rem] font-semibold text-void"
              >
                Empezar un proyecto
                <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

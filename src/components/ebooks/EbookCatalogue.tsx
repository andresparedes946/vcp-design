"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { BookCover } from "../BookCover";
import { TextLink } from "../Cta";
import { buyHref, ebookCategories, ebooks } from "@/lib/ebooks";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Catálogo de publicaciones.
 *
 * Los filtros son enlaces de texto con subrayado, no píldoras de colores: las
 * píldoras son el lenguaje de un marketplace y acá se está hojeando el catálogo
 * de una editorial. Por el mismo motivo las tarjetas no tienen marco — la tapa
 * hace de tarjeta, y el resto es tipografía sobre el fondo.
 *
 * Sólo se muestran las categorías que tienen algo adentro: un filtro vacío es
 * una promesa incumplida en el primer clic.
 */
export function EbookCatalogue() {
  const [active, setActive] = useState<string>("Todos");

  const available = useMemo(
    () =>
      ebookCategories.filter(
        (category) =>
          category === "Todos" || ebooks.some((book) => book.category === category),
      ),
    [],
  );

  const shown = useMemo(
    () =>
      active === "Todos" ? ebooks : ebooks.filter((book) => book.category === active),
    [active],
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Categorías"
        className="flex flex-wrap items-center gap-x-7 gap-y-3 border-y border-white/[0.07] py-5"
      >
        {available.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(category)}
              className={`t-label relative py-1 transition-colors duration-300 ${
                isActive ? "text-chrome" : "text-faint hover:text-mist"
              }`}
            >
              {category}
              {isActive && (
                <motion.span
                  layoutId="ebook-filter"
                  className="absolute -bottom-0.5 left-0 h-px w-full bg-peri"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )}
            </button>
          );
        })}

        <span className="t-mono ml-auto text-[0.72rem] text-faint">
          {shown.length} {shown.length === 1 ? "título" : "títulos"}
        </span>
      </div>

      <motion.ul layout className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((book) => {
            const isAvailable = book.status === "disponible";

            return (
              <motion.li
                key={book.slug}
                layout
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <article className="group flex h-full flex-col">
                  {isAvailable ? (
                    <Link
                      href={`/ebooks/${book.slug}`}
                      aria-label={`Ver la guía ${book.title}`}
                      className="block transition-transform duration-700 hover:-translate-y-1.5"
                    >
                      <BookCover book={book} />
                    </Link>
                  ) : (
                    <div className="opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                      <BookCover book={book} />
                    </div>
                  )}

                  <div className="mt-6 flex items-baseline justify-between gap-3">
                    <span className="t-label text-faint">{book.category}</span>
                    {book.pages && (
                      <span className="t-mono text-[0.72rem] text-faint">
                        {book.pages} pp.
                      </span>
                    )}
                  </div>

                  <h2 className="t-title mt-3 text-[1.25rem] text-chrome">
                    {isAvailable ? (
                      <Link
                        href={`/ebooks/${book.slug}`}
                        className="transition-colors duration-300 hover:text-peri"
                      >
                        {book.title}
                      </Link>
                    ) : (
                      book.title
                    )}
                  </h2>

                  <p className="t-body mt-3 flex-1 text-[0.92rem] text-muted">
                    {book.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/[0.07] pt-5">
                    {isAvailable ? (
                      <>
                        <span className="t-title text-[1.2rem] text-chrome">
                          US$ {book.price}
                        </span>
                        <TextLink href={buyHref(book)} external>
                          Comprar
                        </TextLink>
                      </>
                    ) : (
                      <span className="t-label text-faint">Próximamente</span>
                    )}
                  </div>
                </article>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </motion.ul>
    </div>
  );
}

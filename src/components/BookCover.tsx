import type { Ebook } from "@/lib/ebooks";
import { LogoMark } from "./Logo";

/**
 * Portada de ebook, compuesta en CSS.
 *
 * No hay imagen de tapa y no se usa un mockup genérico: la portada se compone
 * con la tipografía del sitio, igual que la tapa de una colección editorial.
 * Eso resuelve dos cosas a la vez. Cada título nuevo tiene tapa el mismo día
 * que se define el nombre, sin esperar a un diseño; y las cuatro tapas se ven
 * como una colección y no como cuatro archivos sueltos, que es exactamente la
 * diferencia entre una casa editorial y una carpeta de PDFs.
 *
 * El relieve —lomo, canto y barniz— lo ponen las clases `book-cover` y
 * `book-edge` de globals.css. Un rectángulo plano se lee como un archivo; con
 * canto se lee como un producto.
 *
 * Todas las medidas de adentro son relativas a la tapa, no al viewport: el
 * contenedor de consulta (`@container`) hace que el mismo componente componga
 * bien a 19rem en la home y a 8rem en el catálogo. Con unidades de viewport,
 * el título quedaba enorme en la tapa chica y diminuto en la grande, que es el
 * error clásico al escalar una portada.
 */
export function BookCover({
  book,
  className = "",
}: {
  book: Ebook;
  className?: string;
}) {
  const { kicker, lines, tone } = book.cover;

  return (
    <div className={`relative @container ${className}`}>
      <div
        className="book-cover flex aspect-[3/4] w-full flex-col justify-between p-[7%]"
        style={{
          background: `
            radial-gradient(120% 80% at 18% 0%, ${tone}3d 0%, transparent 62%),
            linear-gradient(168deg, #191a22 0%, #0d0e13 58%, #08080b 100%)
          `,
        }}
      >
        <div className="relative z-[3] flex items-start justify-between gap-[4%]">
          <span
            className="t-label text-[clamp(0.4rem,3.1cqw,0.62rem)] leading-[1.5]"
            style={{ color: tone }}
          >
            {kicker}
          </span>
          <LogoMark
            className="w-[9%] shrink-0 opacity-60"
            strokeWidth={4}
          />
        </div>

        <h3 className="t-title relative z-[3] text-[clamp(0.9rem,9.4cqw,2.6rem)] text-chrome">
          {lines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h3>

        <div className="relative z-[3] flex items-end justify-between gap-[4%]">
          <span className="t-label text-[clamp(0.36rem,2.7cqw,0.58rem)] text-muted">
            VCP Design
          </span>
          {book.pages && (
            <span className="t-mono text-[clamp(0.4rem,3cqw,0.62rem)] text-faint">
              {book.pages} pp.
            </span>
          )}
        </div>

        {/* Filete inferior en el tono del título: el distintivo de la colección. */}
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 z-[3] h-[0.9cqw] min-h-[2px]"
          style={{ background: `linear-gradient(90deg, ${tone}, transparent)` }}
        />
      </div>

      <span aria-hidden="true" className="book-edge" />
    </div>
  );
}

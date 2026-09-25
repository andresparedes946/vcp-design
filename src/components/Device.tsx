import Image from "next/image";

/**
 * Marcos de dispositivo.
 *
 * Una captura suelta sobre el fondo se lee como una imagen de stock; la misma
 * captura dentro de un navegador con su dominio real se lee como un producto
 * publicado. Por eso la barra de direcciones lleva el dominio verdadero del
 * proyecto y no un `example.com`: es el detalle que sostiene que esto salió a
 * producción de verdad.
 *
 * Los marcos son deliberadamente sobrios —sin reflejos ni perspectiva— para
 * que la atención quede en la pantalla y no en el marco.
 */

export function BrowserFrame({
  src,
  alt,
  domain,
  priority = false,
  className = "",
  sizes = "(max-width: 1024px) 100vw, 60vw",
}: {
  src: string;
  alt: string;
  domain?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`overflow-hidden rounded-xl border border-white/[0.09] bg-surface shadow-[0_30px_80px_-40px_rgba(0,0,0,0.95)] ${className}`}
    >
      <div className="flex items-center gap-3 border-b border-white/[0.07] bg-elevated/70 px-3.5 py-2.5">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/16" />
          <span className="h-2 w-2 rounded-full bg-white/16" />
          <span className="h-2 w-2 rounded-full bg-white/16" />
        </div>
        {domain && (
          <span className="t-mono truncate rounded-md bg-white/[0.05] px-2.5 py-1 text-[0.62rem] text-faint">
            {domain}
          </span>
        )}
      </div>

      <div className="relative aspect-[16/10] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export function PhoneFrame({
  src,
  alt,
  className = "",
  sizes = "(max-width: 1024px) 40vw, 18vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[1.75rem] border border-white/[0.12] bg-elevated p-1.5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)] ${className}`}
    >
      <div className="relative aspect-[9/19] w-full overflow-hidden rounded-[1.4rem] bg-surface">
        <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
        {/* Isla del altavoz. */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-black/55"
        />
      </div>
    </div>
  );
}

/** Lámina sin marco, para las capturas que ya traen su propio encuadre. */
export function Plate({
  src,
  alt,
  className = "",
  sizes = "(max-width: 1024px) 50vw, 30vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div
      className={`relative aspect-[16/11] overflow-hidden rounded-xl border border-white/[0.09] bg-surface shadow-[0_24px_60px_-34px_rgba(0,0,0,0.9)] ${className}`}
    >
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover object-top" />
    </div>
  );
}

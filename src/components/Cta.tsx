import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";

/**
 * Llamados a la acción.
 *
 * Dos variantes y ninguna más. `solid` es blanco papel sobre negro y se guarda
 * para la acción principal de cada sección; `ghost` es una hairline. El sitio
 * tiene dos conversiones que no compiten —contratar el estudio y comprar una
 * guía— y mantenerlas en la misma forma, distinguidas sólo por jerarquía, es
 * lo que evita que la página parezca gritar dos cosas a la vez.
 *
 * El violeta no se usa acá: se gasta en los acentos tipográficos, y un botón
 * de color en cada sección desarmaría ese presupuesto.
 */
type Variant = "solid" | "ghost";

const base =
  "group inline-flex items-center gap-2.5 rounded-full text-[0.9rem] font-medium transition-colors duration-300";

const styles: Record<Variant, string> = {
  solid: "bg-chrome px-6 py-3.5 text-void hover:bg-white",
  ghost:
    "border border-white/[0.14] px-6 py-3.5 text-chrome hover:border-white/30 hover:bg-white/[0.04]",
};

export function Cta({
  href,
  children,
  variant = "solid",
  external = false,
  cursor,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  cursor?: string;
  className?: string;
}) {
  const Icon = external ? ArrowUpRight : ArrowRight;

  const content = (
    <>
      {children}
      <Icon
        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
        strokeWidth={2}
      />
    </>
  );

  const classes = `${base} ${styles[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor={cursor}
        className={classes}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} data-cursor={cursor} className={classes}>
      {content}
    </Link>
  );
}

/**
 * Enlace de texto con subrayado que se despliega en hover. Para las acciones
 * secundarias dentro de una tarjeta, donde un botón sería demasiado peso.
 */
export function TextLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-current transition-all duration-400 group-hover:w-full" />
      </span>
      <ArrowUpRight
        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        strokeWidth={2}
      />
    </>
  );

  const classes = `group inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-chrome ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {inner}
    </Link>
  );
}

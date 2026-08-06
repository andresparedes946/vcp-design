"use client";

import { useId } from "react";

/**
 * Isologo de VCP Design reconstruido como SVG.
 * Vectorial para que escale sin pérdida y para poder animar el trazo del
 * anillo en el preloader. El PNG original se reserva para OG y favicon.
 */
export function LogoMark({
  className = "",
  strokeWidth = 3,
  animated = false,
}: {
  className?: string;
  strokeWidth?: number;
  animated?: boolean;
}) {
  const uid = useId().replace(/:/g, "");
  const ring = `ring-${uid}`;
  const glyph = `glyph-${uid}`;

  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={ring} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="34%" stopColor="#cdd2ea" />
          <stop offset="62%" stopColor="#a99bff" />
          <stop offset="100%" stopColor="#6c5ce7" />
        </linearGradient>
        <linearGradient id={glyph} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9c2ff" />
          <stop offset="55%" stopColor="#a99bff" />
          <stop offset="100%" stopColor="#7c6cf0" />
        </linearGradient>
      </defs>

      {/* Anillo exterior */}
      <rect
        x="3.6"
        y="3.6"
        width="56.8"
        height="56.8"
        rx="17.5"
        stroke={`url(#${ring})`}
        strokeWidth={strokeWidth}
        className={animated ? "[stroke-dasharray:1] [stroke-dashoffset:0]" : undefined}
      />

      {/* Chevrons — el corazón de la marca: código */}
      <g
        stroke={`url(#${glyph})`}
        strokeWidth={strokeWidth + 0.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M26.5 20.5 L16.5 32 L26.5 43.5" />
        <path d="M37.5 20.5 L47.5 32 L37.5 43.5" />
      </g>

      {/* La elipsis — motivo que se repite en todo el sitio */}
      <g fill={`url(#${glyph})`}>
        <circle cx="28.2" cy="32" r="1.85" />
        <circle cx="32" cy="32" r="1.85" />
        <circle cx="35.8" cy="32" r="1.85" />
      </g>
    </svg>
  );
}

/**
 * Isologo completo: marca + lettering cromado.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-8 w-8 shrink-0" strokeWidth={3.2} />
      <span className="flex flex-col leading-none">
        <span className="t-chrome text-[1.05rem] font-bold tracking-[0.06em] [font-variation-settings:'wdth'_118]">
          VCP
        </span>
        <span className="t-label mt-1 text-[0.5rem] text-violet/80">DESIGN</span>
      </span>
    </span>
  );
}

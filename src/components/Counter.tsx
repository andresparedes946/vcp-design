"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Contador que arranca cuando el número entra en pantalla.
 * Acepta valores mixtos ("80%", "5+", "7d"): anima sólo la parte numérica y
 * conserva prefijo y sufijo tal cual.
 *
 * El parseo va memoizado a propósito. `String.match` devuelve un array nuevo
 * en cada render, y con ese objeto en las dependencias del efecto la animación
 * se cancelaba y reiniciaba en cada frame: el número quedaba clavado cerca de
 * cero en vez de contar.
 */
export function Counter({
  value,
  className = "",
  duration = 1.5,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  const parsed = useMemo(() => {
    const m = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
    if (!m) return null;
    return {
      prefix: m[1],
      target: parseFloat(m[2].replace(",", ".")),
      suffix: m[3],
      decimals: /[.,]/.test(m[2]) ? 1 : 0,
    };
  }, [value]);

  // `null` significa "mostrar el valor final tal cual". Es el estado inicial
  // para que el HTML del servidor —y quien navegue sin JS— vea el número real
  // y no un cero.
  const [display, setDisplay] = useState<number | null>(null);

  useEffect(() => {
    if (!parsed || reduced) return;
    setDisplay(0);
  }, [parsed, reduced]);

  useEffect(() => {
    if (!parsed || reduced || !inView) return;

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 4);

      if (t < 1) {
        setDisplay(parsed.target * eased);
        raf = requestAnimationFrame(tick);
      } else {
        // Volver al string original: así el final es exactamente lo escrito
        // en el contenido, sin artefactos de redondeo.
        setDisplay(null);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed, duration, reduced]);

  const text =
    parsed && display !== null
      ? `${parsed.prefix}${display.toFixed(parsed.decimals)}${parsed.suffix}`
      : value;

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

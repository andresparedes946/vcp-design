"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/**
 * Contador que arranca cuando el número entra en pantalla.
 * Acepta valores mixtos ("40+", "94%", "12d"): anima sólo la parte numérica y
 * conserva el sufijo tal cual.
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
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const match = value.match(/^(\D*)(\d+(?:[.,]\d+)?)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseFloat(match[2].replace(",", ".")) : 0;
  const suffix = match?.[3] ?? "";

  const [display, setDisplay] = useState(match ? 0 : null);

  useEffect(() => {
    if (!match || !inView) return;
    if (reduced) {
      setDisplay(target);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setDisplay(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, reduced, match]);

  if (!match) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const decimals = match[2].includes(".") || match[2].includes(",") ? 1 : 0;

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(display ?? 0).toFixed(decimals)}
      {suffix}
    </span>
  );
}

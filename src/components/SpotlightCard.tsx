"use client";

import { useCallback, useRef, type ReactNode } from "react";

/**
 * Tarjeta con halo que sigue al puntero.
 * Escribe `--mx` / `--my` directamente en el nodo: no re-renderiza React en
 * cada movimiento del mouse. El degradado lo pinta `.spotlight` en el CSS.
 */
export function SpotlightCard({
  children,
  className = "",
  ...rest
}: { children: ReactNode; className?: string } & React.HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  const onPointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const { clientX, clientY } = e;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  }, []);

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={`spotlight edge-lit ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}

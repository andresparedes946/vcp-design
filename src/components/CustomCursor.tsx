"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Cursor personalizado: un punto que sigue al puntero sin retraso y un anillo
 * que llega un instante después. Sobre elementos con `data-cursor` el anillo
 * crece y puede mostrar una etiqueta.
 *
 * Sólo se activa con puntero fino. En touch y en `prefers-reduced-motion` no
 * se monta y el cursor nativo queda intacto.
 */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [pressed, setPressed] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: 0.55 });

  useEffect(() => {
    if (reduced) return;
    const fine = window.matchMedia("(pointer: fine)");
    setEnabled(fine.matches);

    const onChange = (e: MediaQueryListEvent) => setEnabled(e.matches);
    fine.addEventListener("change", onChange);
    return () => fine.removeEventListener("change", onChange);
  }, [reduced]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("cursor-hidden");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "a, button, [data-cursor], input, textarea, select, [role='button']",
      );
      setHovering(Boolean(target));
      setLabel(target?.dataset.cursor || null);
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("cursor-hidden");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[150]">
      {/* Anillo con retraso */}
      <motion.div
        className="absolute left-0 top-0 flex items-center justify-center rounded-full border border-peri/55 backdrop-blur-[1px]"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: label ? 78 : hovering ? 46 : 30,
          height: label ? 78 : hovering ? 46 : 30,
          opacity: visible ? (hovering ? 1 : 0.55) : 0,
          scale: pressed ? 0.82 : 1,
          backgroundColor: hovering
            ? "rgba(124,108,240,0.12)"
            : "rgba(124,108,240,0)",
        }}
        transition={{ type: "spring", stiffness: 420, damping: 30 }}
      >
        {label && (
          <motion.span
            className="t-label text-[0.5rem] text-peri"
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {label}
          </motion.span>
        )}
      </motion.div>

      {/* Punto sin retraso */}
      <motion.div
        className="absolute left-0 top-0 h-[5px] w-[5px] rounded-full bg-peri"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible && !label ? 1 : 0, scale: pressed ? 1.6 : 1 }}
        transition={{ duration: 0.16 }}
      />
    </div>
  );
}

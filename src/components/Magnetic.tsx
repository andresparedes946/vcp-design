"use client";

import { useCallback, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  type HTMLMotionProps,
} from "motion/react";

type Ripple = { id: number; x: number; y: number; size: number };

function useMagnetic(strength: number, ripple: boolean) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(my, { stiffness: 260, damping: 18, mass: 0.4 });

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      mx.set((e.clientX - (rect.left + rect.width / 2)) * strength);
      my.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    },
    [mx, my, reduced, strength],
  );

  const onPointerLeave = useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!ripple || reduced || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.1;
      const id = performance.now() + Math.random();

      setRipples((prev) => [
        ...prev,
        {
          id,
          x: e.clientX - rect.left - size / 2,
          y: e.clientY - rect.top - size / 2,
          size,
        },
      ]);
      window.setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 660);
    },
    [reduced, ripple],
  );

  const rippleNodes = ripples.map((r) => (
    <span
      key={r.id}
      className="ripple"
      style={{ left: r.x, top: r.y, width: r.size, height: r.size }}
    />
  ));

  return {
    ref,
    style: { x, y },
    handlers: { onPointerMove, onPointerLeave, onPointerDown },
    rippleNodes,
  };
}

type Common = {
  children: ReactNode;
  className?: string;
  /** Cuánto se desplaza hacia el puntero. 0 lo desactiva. */
  strength?: number;
  ripple?: boolean;
};

/**
 * Los tipos vienen de `HTMLMotionProps`, no de `ButtonHTMLAttributes`: React y
 * Motion declaran `onAnimationStart` / `onDrag` con firmas distintas y mezclar
 * ambos conjuntos no compila.
 */
type ButtonProps = Common & Omit<HTMLMotionProps<"button">, "children" | "style" | "ref">;
type AnchorProps = Common & Omit<HTMLMotionProps<"a">, "children" | "style" | "ref">;

/** Botón magnético con ripple. */
export function MagneticButton({
  children,
  className = "",
  strength = 0.3,
  ripple = true,
  ...rest
}: ButtonProps) {
  const m = useMagnetic(strength, ripple);
  return (
    <motion.button
      ref={m.ref as React.Ref<HTMLButtonElement>}
      className={`relative overflow-hidden ${className}`}
      style={m.style}
      {...m.handlers}
      {...rest}
    >
      {m.rippleNodes}
      {children}
    </motion.button>
  );
}

/** Enlace magnético con ripple. */
export function MagneticLink({
  children,
  className = "",
  strength = 0.3,
  ripple = true,
  ...rest
}: AnchorProps) {
  const m = useMagnetic(strength, ripple);
  return (
    <motion.a
      ref={m.ref as React.Ref<HTMLAnchorElement>}
      className={`relative overflow-hidden ${className}`}
      style={m.style}
      {...m.handlers}
      {...rest}
    >
      {m.rippleNodes}
      {children}
    </motion.a>
  );
}

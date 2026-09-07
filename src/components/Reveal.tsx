"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const offsetFor = (dir: Direction, distance: number) => {
  switch (dir) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: distance };
    case "right":
      return { x: -distance };
    default:
      return {};
  }
};

/** Aparición al entrar en viewport. Se dispara una sola vez. */
export function Reveal({
  children,
  className = "",
  direction = "up",
  distance = 26,
  delay = 0,
  duration = 0.85,
  blur = true,
}: {
  children: ReactNode;
  className?: string;
  direction?: Direction;
  distance?: number;
  delay?: number;
  duration?: number;
  blur?: boolean;
}) {
  // La regla de `prefers-reduced-motion` en globals.css sólo anula animaciones
  // y transiciones de CSS. Motion anima por JavaScript y se la saltea entera,
  // así que la preferencia hay que respetarla acá: si no, el revelado más
  // repetido del sitio es justo el único que no se apaga.
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        ...offsetFor(direction, distance),
        filter: blur ? "blur(8px)" : "blur(0px)",
      }}
      whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const staggerParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  shown: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

/** Contenedor que escalona la entrada de sus `StaggerItem`. */
export function Stagger({
  children,
  className = "",
  amount = 0.18,
}: {
  children: ReactNode;
  className?: string;
  amount?: number;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={staggerParent}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={staggerChild}>
      {children}
    </motion.div>
  );
}

/**
 * Parallax vertical ligado al scroll.
 * `speed` positivo mueve el contenido más lento que la página.
 */
export function Parallax({
  children,
  className = "",
  speed = 60,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  // Los hooks se llaman siempre, antes de cualquier rama: `useReducedMotion`
  // reacciona a un media query y puede cambiar en caliente, así que salir
  // antes de `useScroll` rompería el orden de hooks entre renders.
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const y = useSpring(raw, { stiffness: 120, damping: 26, mass: 0.4 });

  if (reduced) return <div className={className}>{children}</div>;

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

/**
 * Revelado palabra por palabra.
 * Se usa una sola vez, en el titular del hero: es el momento orquestado de la
 * carga y pierde fuerza si se repite en cada sección.
 *
 * Sin `filter` a propósito. Parte del titular usa `background-clip: text` para
 * el degradado cromado, y un descendiente con filtro se compone en su propia
 * capa: el texto queda recortado contra un fondo que ya no está detrás y
 * desaparece. El deslizamiento enmascarado alcanza.
 */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  play = true,
}: {
  text: string;
  className?: string;
  delay?: number;
  play?: boolean;
}) {
  const reduced = useReducedMotion();
  const words = text.split(" ");

  // El titular tiene que quedar legible igual: se muestra entero, sin el
  // deslizamiento palabra por palabra.
  if (reduced) return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "108%", opacity: 0 }}
            animate={play ? { y: "0%", opacity: 1 } : { y: "108%", opacity: 0 }}
            transition={{ duration: 0.65, delay: delay + i * 0.05, ease: EASE }}
          >
            {word}
            {i < words.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

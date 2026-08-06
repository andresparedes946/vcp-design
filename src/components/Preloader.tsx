"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { LogoMark } from "./Logo";

/** Duración mínima en pantalla: suficiente para leer la marca, no para aburrir. */
const MIN_MS = 1700;

/**
 * Válvula de seguridad. Si `load` no llega —una imagen colgada, una fuente que
 * no resuelve— el sitio igual se muestra. Nunca dejar la puerta cerrada por un
 * recurso que no era imprescindible.
 */
const MAX_MS = 6000;

const ReadyContext = createContext(false);

/** `true` una vez que el preloader empezó a salir — el Hero entra con esto. */
export const useSiteReady = () => useContext(ReadyContext);

export function PreloaderGate({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);
  const [dismounted, setDismounted] = useState(false);
  const startedAt = useRef(0);

  useEffect(() => {
    if (reduced) {
      setProgress(100);
      setReady(true);
      setDismounted(true);
      return;
    }

    startedAt.current = performance.now();
    let raf = 0;
    let assetsDone = document.readyState === "complete";

    const onLoad = () => {
      assetsDone = true;
    };
    if (!assetsDone) window.addEventListener("load", onLoad, { once: true });

    const tick = () => {
      const elapsed = performance.now() - startedAt.current;
      const timeShare = Math.min(elapsed / MIN_MS, 1);

      if (elapsed >= MAX_MS) assetsDone = true;

      // Antes de que los recursos terminen, la barra se acerca al 92 y frena;
      // no miente diciendo "listo" cuando todavía falta.
      const ceiling = assetsDone ? 100 : 92;
      const eased = 1 - Math.pow(1 - timeShare, 3);
      const next = Math.min(eased * 100, ceiling);

      setProgress((prev) => (next > prev ? next : prev));

      if (next >= 100 && assetsDone && elapsed >= MIN_MS) {
        setReady(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("load", onLoad);
    };
  }, [reduced]);

  // Bloquear el scroll mientras el preloader está montado.
  useEffect(() => {
    if (dismounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [dismounted]);

  const pct = Math.round(progress);

  return (
    <ReadyContext.Provider value={ready}>
      <AnimatePresence onExitComplete={() => setDismounted(true)}>
        {!ready && (
          <motion.div
            key="preloader"
            className="fixed inset-0 z-[200] flex items-center justify-center bg-void/92 backdrop-blur-2xl"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
            transition={{ duration: 0.85, ease: [0.83, 0, 0.17, 1] }}
          >
            {/* Halo detrás de la marca */}
            <motion.div
              className="pointer-events-none absolute h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(124,108,240,0.2),transparent_62%)] blur-3xl"
              animate={{ scale: [0.9, 1.08, 0.9], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative flex flex-col items-center">
              {/* Órbita de partículas alrededor del logo */}
              <OrbitField />

              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.82 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.div
                  animate={{
                    filter: [
                      "drop-shadow(0 0 14px rgba(124,108,240,0.35))",
                      "drop-shadow(0 0 38px rgba(169,155,255,0.72))",
                      "drop-shadow(0 0 14px rgba(124,108,240,0.35))",
                    ],
                  }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <LogoMark className="h-24 w-24" strokeWidth={2.6} />
                </motion.div>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-col items-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="t-chrome text-3xl font-bold tracking-[0.16em] [font-variation-settings:'wdth'_120]">
                  VCP
                </span>
                <span className="t-label mt-2.5 text-peri/70">DESIGN</span>
              </motion.div>

              {/* Barra de progreso */}
              <motion.div
                className="mt-11 flex w-[16rem] items-center gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
              >
                <div className="relative h-px flex-1 overflow-hidden bg-white/10">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-violet to-peri"
                    style={{ width: `${progress}%` }}
                    transition={{ ease: "linear" }}
                  />
                  {/* Punta luminosa que viaja con la barra */}
                  <motion.div
                    className="absolute top-1/2 h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-peri shadow-[0_0_12px_3px_rgba(169,155,255,0.85)]"
                    style={{ left: `calc(${progress}% - 3.5px)` }}
                  />
                </div>
                <span className="t-mono w-9 text-right text-[0.7rem] text-muted">
                  {String(pct).padStart(3, "0")}
                </span>
              </motion.div>

              <motion.p
                className="t-label mt-6 text-faint"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
              >
                Apps · Web · SaaS
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </ReadyContext.Provider>
  );
}

/**
 * Partículas en órbita alrededor de la marca.
 * Dos anillos girando en sentidos opuestos a velocidades distintas: da
 * sensación de profundidad sin llegar a ser un "spinner".
 *
 * Se monta sólo en el cliente: las posiciones salen de `Math.cos`/`Math.sin` y
 * los flotantes no serializan igual en servidor que en cliente, lo que rompía
 * la hidratación. Es decoración pura, así que no se pierde nada en el HTML.
 */
function OrbitField() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const rings = [
    { radius: 92, count: 8, duration: 22, direction: 1, size: 3 },
    { radius: 132, count: 12, duration: 34, direction: -1, size: 2 },
  ];

  return (
    <div className="pointer-events-none absolute left-1/2 top-12 -translate-x-1/2 -translate-y-1/2">
      {rings.map((ring, ri) => (
        <motion.div
          key={ri}
          className="absolute left-0 top-0"
          animate={{ rotate: 360 * ring.direction }}
          transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: ring.count }).map((_, i) => {
            const angle = (i / ring.count) * Math.PI * 2;
            return (
              <motion.span
                key={i}
                className="absolute rounded-full bg-peri"
                style={{
                  width: ring.size,
                  height: ring.size,
                  left: Math.cos(angle) * ring.radius,
                  top: Math.sin(angle) * ring.radius,
                }}
                animate={{ opacity: [0.15, 0.85, 0.15], scale: [0.7, 1.25, 0.7] }}
                transition={{
                  duration: 2.4 + (i % 4) * 0.45,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.16,
                }}
              />
            );
          })}
        </motion.div>
      ))}
    </div>
  );
}

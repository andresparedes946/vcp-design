"use client";

import { useEffect, useRef } from "react";

type Mote = {
  x: number;
  y: number;
  r: number;
  drift: number;
  sway: number;
  phase: number;
  alpha: number;
  depth: number;
};

const PALETTE = ["124, 108, 240", "169, 155, 255", "205, 210, 234"];

/**
 * Fondo ambiental del sitio.
 *
 * Cuatro capas, de atrás hacia adelante:
 *   1. Auroras — degradados radiales enormes, desenfocados, en deriva lenta (CSS).
 *   2. Retícula técnica — la cuadrícula del oficio, apenas visible (CSS).
 *   3. Motas — partículas en canvas, tres planos de profundidad con parallax.
 *   4. Grano — ruido SVG que unifica todo y evita el banding de los degradados.
 *
 * El canvas se detiene cuando la pestaña no está visible y no se dibuja nunca
 * si el usuario pidió menos movimiento.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let motes: Mote[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = true;

    // Parallax del puntero: se persigue con suavizado para que nunca "salte".
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Densidad proporcional al área, con techo para no castigar pantallas grandes.
      const count = Math.min(Math.round((width * height) / 16000), 110);

      motes = Array.from({ length: count }, () => {
        const depth = Math.random();
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          r: 0.5 + depth * 1.9,
          drift: 0.06 + depth * 0.22,
          sway: 6 + Math.random() * 20,
          phase: Math.random() * Math.PI * 2,
          alpha: 0.14 + depth * 0.4,
          depth,
        };
      });
    };

    const draw = (t: number) => {
      if (!running) return;

      pointer.x += (pointer.tx - pointer.x) * 0.045;
      pointer.y += (pointer.ty - pointer.y) * 0.045;

      ctx.clearRect(0, 0, width, height);

      for (const m of motes) {
        // Deriva ascendente muy lenta, con un vaivén lateral por mota.
        m.y -= m.drift;
        if (m.y < -12) {
          m.y = height + 12;
          m.x = Math.random() * width;
        }

        const swayX = Math.sin(t * 0.00016 + m.phase) * m.sway;
        const px = m.x + swayX + pointer.x * (0.4 + m.depth * 1.6);
        const py = m.y + pointer.y * (0.4 + m.depth * 1.6);

        // Latido lento: cada mota respira en su propio tiempo.
        const pulse = 0.72 + Math.sin(t * 0.0006 + m.phase * 2) * 0.28;
        const tone = PALETTE[m.depth > 0.72 ? 2 : m.depth > 0.36 ? 1 : 0];

        const halo = ctx.createRadialGradient(px, py, 0, px, py, m.r * 6);
        halo.addColorStop(0, `rgba(${tone}, ${m.alpha * pulse})`);
        halo.addColorStop(1, `rgba(${tone}, 0)`);

        ctx.fillStyle = halo;
        ctx.beginPath();
        ctx.arc(px, py, m.r * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${tone}, ${Math.min(m.alpha * pulse * 1.5, 0.85)})`;
        ctx.beginPath();
        ctx.arc(px, py, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth - 0.5) * 26;
      pointer.ty = (e.clientY / window.innerHeight - 0.5) * 26;
    };

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(draw);
      }
    };

    let resizeTimer: number;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(build, 180);
    };

    build();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void"
    >
      {/* 1 — Auroras */}
      <div className="absolute -left-[22%] -top-[28%] h-[85vh] w-[85vw] rounded-full bg-[radial-gradient(circle,rgba(124,108,240,0.22),transparent_66%)] blur-[110px] [animation:aurora-a_34s_ease-in-out_infinite]" />
      <div className="absolute -right-[26%] top-[14%] h-[75vh] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(59,47,166,0.24),transparent_64%)] blur-[130px] [animation:aurora-b_44s_ease-in-out_infinite]" />
      <div className="absolute -bottom-[30%] left-[8%] h-[80vh] w-[80vw] rounded-full bg-[radial-gradient(circle,rgba(169,155,255,0.14),transparent_66%)] blur-[140px] [animation:aurora-c_52s_ease-in-out_infinite]" />

      {/* 2 — Retícula técnica */}
      <div
        className="absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)",
          backgroundSize: "88px 88px",
          maskImage:
            "radial-gradient(ellipse 120% 80% at 50% 0%, #000 20%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 120% 80% at 50% 0%, #000 20%, transparent 75%)",
        }}
      />

      {/* 3 — Motas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />

      {/* 4 — Grano */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Viñeta: hunde los bordes y centra la atención. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_38%,rgba(5,6,15,0.72)_100%)]" />
    </div>
  );
}

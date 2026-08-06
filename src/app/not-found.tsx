import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export const metadata = { title: "Página no encontrada" };

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[80svh] max-w-3xl flex-col items-center justify-center px-5 text-center">
      <LogoMark className="h-14 w-14 opacity-70" strokeWidth={3} />

      <p className="t-label mt-10 text-peri">Error 404</p>

      <h1 className="t-display mt-6 text-[clamp(2.4rem,7vw,4.5rem)] text-chrome">
        Esta página no existe.
      </h1>

      <p className="t-body mt-6 max-w-md text-[1rem] text-muted">
        El enlace que seguiste no lleva a ningún lado. Puede que la dirección
        haya cambiado.
      </p>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-peri via-violet to-abyss px-7 py-4 text-[0.95rem] font-semibold text-white"
      >
        Volver al inicio
      </Link>
    </div>
  );
}

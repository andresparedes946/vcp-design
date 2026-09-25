/**
 * Fondo.
 *
 * Dos capas, las dos quietas. La versión anterior tenía auroras derivando en
 * bucle; acá el movimiento se saca a propósito: un fondo que nunca se queda
 * quieto compite con el contenido y es lo primero que delata una plantilla.
 *
 * 1. Una única fuente de luz arriba, muy tenue, como la lámpara sobre una mesa
 *    de trabajo. Da profundidad sin teñir la página.
 * 2. Las guías de la grilla de composición, a un 2% de opacidad. No es adorno:
 *    son las mismas columnas contra las que se alinea todo el contenido, y
 *    dejarlas asomar es lo que hace que la página se lea como algo compuesto.
 *    Se apagan por debajo de `lg`, donde la grilla pasa a una sola columna y
 *    las líneas dejarían de coincidir con nada.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div
        className="absolute left-1/2 top-[-28rem] h-[52rem] w-[80rem] -translate-x-1/2 rounded-full opacity-70"
        style={{
          background:
            "radial-gradient(closest-side, rgba(124,108,240,0.14), rgba(124,108,240,0.04) 55%, transparent 100%)",
        }}
      />

      <div className="absolute inset-0 hidden justify-center lg:flex">
        <div className="grid h-full w-full max-w-[84rem] grid-cols-12 px-5 sm:px-8">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="border-l border-white/[0.02] last:border-r" />
          ))}
        </div>
      </div>
    </div>
  );
}

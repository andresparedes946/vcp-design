import { Lock } from "lucide-react";
import type { Project } from "@/lib/site";
import { ProjectVisual } from "./ProjectVisual";
import { TextLink } from "./Cta";

/**
 * Ficha de proyecto.
 *
 * Compuesta como una lámina de monografía: el pie de figura arriba, la captura
 * grande, y los datos debajo. La numeración `FIG. 01` no es adorno — es la
 * única parte del sitio donde la secuencia importa de verdad, porque los
 * proyectos se presentan como un catálogo ordenado de obra entregada.
 *
 * El aviso de acceso es deliberado: mandar a alguien a una pantalla de login
 * sin explicarle por qué se lee como un enlace roto, no como un sistema real
 * en producción.
 */
export function ProjectCard({
  project,
  figure,
  className = "",
}: {
  project: Project;
  /** Número de lámina, 1-indexado. */
  figure: number;
  className?: string;
}) {
  const plate = `Fig. ${String(figure).padStart(2, "0")}`;

  return (
    <article className={`group ${className}`}>
      <div className="flex flex-col gap-1 pb-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
        <span className="fig">{plate}</span>
        <span className="fig" style={{ color: project.accent }}>
          {project.category}
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-white/[0.07]">
        <ProjectVisual project={project} />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5">
          <h3 className="t-title text-[clamp(1.5rem,2.6vw,2rem)] text-chrome">
            {project.name}
          </h3>
          <p className="t-mono mt-2 text-[0.72rem] text-faint">{project.year}</p>

          {project.metric && (
            <p className="mt-5 flex items-baseline gap-2.5">
              <span className="t-title text-2xl text-chrome">{project.metric.value}</span>
              <span className="t-body text-[0.82rem] text-muted">
                {project.metric.label}
              </span>
            </p>
          )}
        </div>

        <div className="md:col-span-7">
          <p className="t-body text-[0.96rem] text-muted">{project.summary}</p>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologías">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="t-mono rounded-full border border-white/[0.09] px-3 py-1 text-[0.7rem] text-mist"
              >
                {tech}
              </li>
            ))}
          </ul>

          {project.url && (
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
              <TextLink href={project.url} external>
                Ver proyecto
              </TextLink>
              {project.requiresAuth && (
                <span className="inline-flex items-center gap-1.5 text-[0.76rem] text-faint">
                  <Lock className="h-3 w-3" strokeWidth={2} />
                  {project.authNote ?? "Sistema interno · requiere cuenta"}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

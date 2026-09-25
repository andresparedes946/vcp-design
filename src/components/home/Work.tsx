import { Section, RunningHead, SectionHeader, Em } from "../Section";
import { ProjectCard } from "../ProjectCard";
import { Cta } from "../Cta";
import { featuredProjects, projects } from "@/lib/site";

/**
 * Proyectos seleccionados.
 *
 * Una lámina por proyecto, a todo el ancho. Meterlos en una grilla de dos
 * columnas entraría más obra en la misma pantalla, pero achicaría las capturas
 * justo en la sección donde la captura es el argumento: quien evalúa contratar
 * un estudio mira la pantalla, no el texto que la acompaña.
 *
 * En la home va la selección; el catálogo completo vive en /proyectos.
 */
export function Work() {
  const rest = projects.length - featuredProjects.length;

  return (
    <Section id="proyectos">
      <RunningHead label="Proyectos" folio={`${projects.length} en producción`} />

      <SectionHeader
        title={
          <>
            Proyectos <Em>seleccionados</Em>.
          </>
        }
        lead="Algunos de los productos digitales que diseñamos y desarrollamos. Todos están publicados y en uso."
        action={
          rest > 0 ? (
            <Cta href="/proyectos" variant="ghost">
              Ver los {projects.length} proyectos
            </Cta>
          ) : undefined
        }
      />

      <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
        {featuredProjects.map((project, i) => (
          <ProjectCard key={project.id} project={project} figure={i + 1} />
        ))}
      </div>
    </Section>
  );
}

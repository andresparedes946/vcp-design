import type { Metadata } from "next";
import { Bleed, Em, Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { ProjectCard } from "@/components/ProjectCard";
import { Cta } from "@/components/Cta";
import { projects } from "@/lib/site";

export const metadata: Metadata = {
  title: "Proyectos",
  description:
    "E-commerce, sitios, SaaS y sistemas de gestión diseñados y desarrollados por VCP Design. Todos publicados y en uso.",
  alternates: { canonical: "/proyectos" },
};

/**
 * Catálogo de obra.
 *
 * Todas las láminas, en el mismo formato y a todo el ancho. No hay filtros por
 * categoría: con cinco proyectos, un filtro agrega una decisión al visitante y
 * no le ahorra ningún scroll — se pone cuando el catálogo lo pida.
 */
export default function ProyectosPage() {
  const rubros = new Set(projects.map((p) => p.category.split(" · ")[0]));

  return (
    <>
      <PageHero
        label="Proyectos"
        folio={`${projects.length} en producción`}
        title={
          <>
            Obra <Em>publicada</Em>.
          </>
        }
        lead={`Productos digitales diseñados y desarrollados por el estudio, en ${rubros.size} rubros distintos. Todos están online y en uso.`}
        action={
          <Cta href="/contacto" cursor="HABLEMOS">
            Empezar un proyecto
          </Cta>
        }
      />

      <Bleed />

      <Section>
        <div className="space-y-20 md:space-y-28">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} figure={i + 1} />
          ))}
        </div>
      </Section>

      <Bleed />

      <Section className="py-20 md:py-24">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="t-title max-w-xl text-[clamp(1.8rem,4vw,2.8rem)] text-chrome">
            El próximo puede ser el <Em>tuyo</Em>.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Cta href="/contacto" cursor="HABLEMOS">
              Hablemos
            </Cta>
            <Cta href="/servicios" variant="ghost">
              Ver servicios
            </Cta>
          </div>
        </div>
      </Section>
    </>
  );
}

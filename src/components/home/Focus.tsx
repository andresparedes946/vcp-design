import { Section, RunningHead, SectionHeader, Em } from "../Section";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { disciplines, stats, testimonials } from "@/lib/site";

/**
 * Enfoque.
 *
 * La sección de prueba social, con una restricción que vale la pena nombrar:
 * acá no hay clientes inventados, ni facturación, ni porcentajes de mejora, ni
 * cantidad de usuarios. Todos los números salen de datos verificables del
 * propio sitio —cuántos proyectos hay cargados, en qué año se fundó—, y la
 * única cita es real y está firmada.
 *
 * Un estudio de cinco proyectos que muestra cinco proyectos es creíble. El
 * mismo estudio anunciando "+200 clientes felices" deja de serlo, y en un
 * mercado donde el comprador googlea antes de responder, eso cuesta la venta.
 */
export function Focus() {
  const [testimonial] = testimonials;

  return (
    <Section id="enfoque">
      <RunningHead label="Enfoque" folio="I" />

      <SectionHeader
        title={
          <>
            Diseñamos soluciones digitales, no solamente{" "}
            <Em>páginas web</Em>.
          </>
        }
        lead="Cada proyecto arranca por el problema del negocio y termina en algo que se puede medir. Lo que sigue es lo que hay entregado hasta hoy, sin redondear."
      />

      <Stagger className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:mt-20 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.label} className="bg-void p-6 sm:p-8">
            <p className="t-title text-[clamp(2rem,4vw,2.9rem)] text-chrome">
              {stat.value}
            </p>
            <p className="t-label mt-3 text-faint">{stat.label}</p>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Las disciplinas, impresas grandes: la capacidad como declaración. */}
      <Reveal direction="up" delay={0.1}>
        <ul className="mt-12 flex flex-wrap items-baseline gap-x-8 gap-y-3 md:mt-16 md:gap-x-14">
          {disciplines.map((item) => (
            <li
              key={item}
              className="t-display text-[clamp(1.9rem,5.6vw,3.6rem)] text-chrome/55 transition-colors duration-500 hover:text-chrome"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      {testimonial && (
        <Reveal direction="up" delay={0.12}>
          <figure className="mt-14 grid gap-6 border-t border-white/[0.07] pt-10 md:mt-20 md:grid-cols-12 md:gap-10">
            <figcaption className="t-label text-faint md:col-span-3 md:pt-2">
              Testimonio
            </figcaption>
            <blockquote className="md:col-span-9">
              <p className="t-title text-[clamp(1.2rem,2.4vw,1.75rem)] leading-[1.35] text-mist">
                «{testimonial.quote}»
              </p>
              <p className="t-mono mt-6 text-[0.78rem] text-faint">
                {testimonial.author} — {testimonial.role}
              </p>
            </blockquote>
          </figure>
        </Reveal>
      )}
    </Section>
  );
}

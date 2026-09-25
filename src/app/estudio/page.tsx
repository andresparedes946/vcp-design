import type { Metadata } from "next";
import { Bleed, Em, RunningHead, Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { principles, site, stack, stats, testimonials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sobre VCP Design",
  description:
    "VCP Design es un estudio digital en Buenos Aires. Diseñamos y desarrollamos productos digitales modernos para empresas, emprendedores y marcas.",
  alternates: { canonical: "/estudio" },
};

/**
 * Sobre el estudio.
 *
 * Una página de "nosotros" suele ser el lugar donde una marca chica se
 * disfraza de grande. Acá se hace lo contrario: el argumento de venta es que
 * hablás con quien construye, así que el texto está en primera persona del
 * plural y sin inflar. Las tres condiciones de trabajo ocupan más espacio que
 * cualquier declaración de misión, porque son lo que un cliente compara
 * cuando pide tres presupuestos.
 */
export default function EstudioPage() {
  const [testimonial] = testimonials;

  return (
    <>
      <PageHero
        label="Estudio"
        folio={site.concept}
        title={
          <>
            Tecnología con <Em>propósito</Em>.
          </>
        }
        lead={`${site.name} es un estudio digital enfocado en diseñar y desarrollar productos digitales modernos para empresas, emprendedores y marcas.`}
        action={
          <Cta href="/contacto" cursor="HABLEMOS">
            Trabajemos juntos
          </Cta>
        }
      />

      <Bleed />

      <Section>
        <div className="grid gap-10 md:grid-cols-12 md:gap-12 lg:gap-16">
          <Reveal direction="up" className="md:col-span-7">
            <div className="space-y-6">
              <p className="t-body text-[1.12rem] text-mist sm:text-[1.25rem]">
                Combinamos diseño, tecnología y estrategia para transformar ideas y
                necesidades de negocio en experiencias digitales reales.
              </p>
              <p className="t-body max-w-xl text-[1rem] text-muted">
                Trabajamos con empresas que necesitan vender online, con profesionales
                que necesitan una presencia seria y con equipos que necesitan un sistema
                interno que hoy resuelven con planillas. En los tres casos el método es
                el mismo: entender el problema, acotar el alcance y entregar algo que
                funcione en producción.
              </p>
              <p className="t-body max-w-xl text-[1rem] text-muted">
                Y desde {site.founded} también publicamos: guías cortas sobre lo que
                aprendemos construyendo, para quien quiere entender antes de contratar.
              </p>
            </div>
          </Reveal>

          <Stagger className="grid grid-cols-2 gap-px self-start overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:col-span-5">
            {stats.map((stat) => (
              <StaggerItem key={stat.label} className="bg-void p-6">
                <p className="t-title text-[clamp(1.7rem,3vw,2.2rem)] text-chrome">
                  {stat.value}
                </p>
                <p className="t-label mt-3 text-faint">{stat.label}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </Section>

      <Bleed />

      <Section>
        <RunningHead label="Cómo trabajamos" folio={`${principles.length} condiciones`} />

        <Stagger className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:mt-16 md:grid-cols-3">
          {principles.map((principle) => (
            <StaggerItem key={principle.title} className="bg-void p-8">
              <h2 className="t-title text-[1.2rem] text-chrome">{principle.title}</h2>
              <p className="t-body mt-4 text-[0.94rem] text-muted">{principle.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </Section>

      <Bleed />

      <Section>
        <RunningHead label="Tecnología" />

        <Reveal direction="up" delay={0.08}>
          <ul className="mt-10 flex flex-wrap items-baseline gap-x-8 gap-y-3 md:mt-14 md:gap-x-12">
            {stack.map((tech) => (
              <li
                key={tech}
                className="t-title text-[clamp(1.3rem,3.4vw,2.4rem)] text-chrome/40 transition-colors duration-500 hover:text-chrome"
              >
                {tech}
              </li>
            ))}
          </ul>
          <p className="t-body mt-8 max-w-xl text-[0.96rem] text-muted">
            Una base corta y estable, elegida para que el producto sea barato de
            mantener después. Al cierre de cada proyecto el repositorio y las
            credenciales se transfieren: nada queda atado al estudio.
          </p>
        </Reveal>
      </Section>

      {testimonial && (
        <>
          <Bleed />
          <Section>
            <figure className="grid gap-6 md:grid-cols-12 md:gap-10">
              <figcaption className="t-label text-faint md:col-span-3 md:pt-3">
                Testimonio
              </figcaption>
              <blockquote className="md:col-span-9">
                <p className="t-title text-[clamp(1.3rem,3vw,2.1rem)] leading-[1.32] text-mist">
                  «{testimonial.quote}»
                </p>
                <p className="t-mono mt-7 text-[0.8rem] text-faint">
                  {testimonial.author} — {testimonial.role}
                </p>
              </blockquote>
            </figure>
          </Section>
        </>
      )}

      <Bleed />

      <Section className="py-20 md:py-24">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="t-title max-w-xl text-[clamp(1.8rem,4vw,2.8rem)] text-chrome">
            Hablás siempre con quien <Em>construye</Em>.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Cta href="/contacto" cursor="HABLEMOS">
              Hablemos
            </Cta>
            <Cta href="/proyectos" variant="ghost">
              Ver proyectos
            </Cta>
          </div>
        </div>
      </Section>
    </>
  );
}

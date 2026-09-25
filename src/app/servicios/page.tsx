import type { Metadata } from "next";
import { Bleed, Container, Em, RunningHead, Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/Reveal";
import { Cta } from "@/components/Cta";
import { Process } from "@/components/home/Process";
import { principles, services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Landing pages, websites, e-commerce, apps, SaaS y automatizaciones. Seis capacidades de VCP Design para empresas y emprendedores.",
  alternates: { canonical: "/servicios" },
};

/**
 * Servicios en detalle.
 *
 * En la home los servicios son una grilla de seis tarjetas; acá pasan a ser
 * seis filas grandes. Es la misma información en otra escala, que es lo que
 * corresponde: quien llega a esta página ya sabe que existe el servicio y
 * viene a evaluar el alcance, no a descubrirlo.
 */
export default function ServiciosPage() {
  return (
    <>
      <PageHero
        label="Servicios"
        folio={`${services.length} capacidades`}
        title={
          <>
            Todo lo que tu negocio necesita para crecer <Em>digitalmente</Em>.
          </>
        }
        lead="Desde una página hasta una plataforma completa. El alcance lo define el problema del negocio, no un paquete cerrado."
        action={
          <Cta href="/contacto" cursor="HABLEMOS">
            Empezar un proyecto
          </Cta>
        }
      />

      <Bleed />

      <Section>
        <ol>
          {services.map((service, i) => (
            <Reveal key={service.id} direction="up" delay={i * 0.04} distance={18}>
              <li
                id={service.id}
                className="grid scroll-mt-28 gap-x-10 gap-y-6 border-b border-white/[0.07] py-10 first:border-t md:grid-cols-12 md:py-14"
              >
                <div className="flex items-baseline gap-5 md:col-span-4 md:flex-col md:gap-4">
                  <span className="t-mono text-[0.78rem] text-peri">{service.index}</span>
                  <h2 className="t-title text-[clamp(1.6rem,3.4vw,2.4rem)] text-chrome">
                    {service.title}
                  </h2>
                </div>

                <div className="md:col-span-6">
                  <p className="t-body max-w-xl text-[1rem] text-muted">
                    {service.summary}
                  </p>

                  <ul className="mt-6 flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <li
                        key={tag}
                        className="t-mono rounded-full border border-white/[0.09] px-3 py-1 text-[0.72rem] text-mist"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="md:col-span-2 md:text-right">
                  {service.span ? (
                    <>
                      <p className="t-label text-faint">Plazo típico</p>
                      <p className="t-mono mt-2 text-[0.92rem] text-mist">
                        {service.span}
                      </p>
                    </>
                  ) : (
                    /*
                      Sin plazo publicado: todavía no hay obra entregada de este
                      tipo que respalde un número. Se prefiere el vacío antes
                      que una promesa que después hay que cumplir.
                    */
                    <p className="t-mono text-[0.82rem] text-faint md:mt-7">
                      A convenir según alcance
                    </p>
                  )}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Bleed />

      <Process />

      <Bleed />

      <Section>
        <RunningHead label="Cómo trabajamos" />

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

      <Section className="py-20 md:py-24">
        <Container className="px-0">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <h2 className="t-title max-w-xl text-[clamp(1.8rem,4vw,2.8rem)] text-chrome">
              Contanos qué necesitás y te decimos <Em>cómo</Em> lo haríamos.
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
        </Container>
      </Section>
    </>
  );
}

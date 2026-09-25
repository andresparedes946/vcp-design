import { Section, RunningHead, Em } from "../Section";
import { Reveal } from "../Reveal";
import { SpotlightCard } from "../SpotlightCard";
import { Cta } from "../Cta";

/**
 * Ecosistema.
 *
 * La bisagra entre las dos unidades de negocio, y el único lugar donde se
 * explican juntas. El titular hace el trabajo conceptual por sí solo: de los
 * tres verbos, el del medio va en cursiva serif, porque «aplicá» es
 * literalmente el puente entre leer una guía y construir un producto. La
 * tipografía dice lo mismo que el texto.
 *
 * Los dos bloques son deliberadamente simétricos en forma y asimétricos en
 * jerarquía: el de construir lleva la acción sólida. El estudio sigue siendo
 * el negocio principal; los recursos son la puerta de entrada.
 */
export function Ecosystem() {
  return (
    <Section id="ecosistema">
      <RunningHead label="Ecosistema" folio="II" />

      <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-10 lg:gap-16">
        <Reveal direction="up" delay={0.06} className="md:col-span-7">
          <h2 className="t-title text-[clamp(2.25rem,5.4vw,4rem)] text-chrome">
            Aprendé. <Em>Aplicá</Em>. Construí.
          </h2>
        </Reveal>

        <Reveal direction="up" delay={0.14} className="md:col-span-5 md:pt-3">
          <p className="t-body max-w-md text-[1.02rem] text-muted">
            Nuestros recursos te ayudan a entender el mundo digital. Y si querés llevar
            esa idea a la realidad, podemos construirla juntos.
          </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:mt-20 md:grid-cols-2">
        <SpotlightCard className="flex flex-col bg-void p-8 sm:p-10 lg:p-12">
          <span className="t-label text-faint">Aprendé</span>

          <h3 className="t-title mt-6 text-[clamp(1.6rem,3vw,2.2rem)] text-chrome">
            Guías y recursos digitales
          </h3>

          <p className="t-body mt-5 flex-1 text-[0.98rem] text-muted">
            Material práctico para decidir con criterio: qué necesita tu negocio, cuánto
            debería costar y cómo darte cuenta de que está funcionando.
          </p>

          <div className="mt-9">
            <Cta href="/ebooks" variant="ghost">
              Explorar recursos
            </Cta>
          </div>
        </SpotlightCard>

        <SpotlightCard className="flex flex-col bg-void p-8 sm:p-10 lg:p-12">
          <span className="t-label text-peri">Construí</span>

          <h3 className="t-title mt-6 text-[clamp(1.6rem,3vw,2.2rem)] text-chrome">
            Webs, apps, e-commerce y software a medida
          </h3>

          <p className="t-body mt-5 flex-1 text-[0.98rem] text-muted">
            Cuando la idea ya está clara, la construimos: diseño, desarrollo, lanzamiento
            y el soporte para que siga creciendo después.
          </p>

          <div className="mt-9">
            <Cta href="/contacto" cursor="HABLEMOS">
              Empezar proyecto
            </Cta>
          </div>
        </SpotlightCard>
      </div>
    </Section>
  );
}

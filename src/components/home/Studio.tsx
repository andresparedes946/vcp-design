import { Section, RunningHead, Em } from "../Section";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { Cta } from "../Cta";
import { principles, site, stack } from "@/lib/site";

/**
 * Sobre VCP Design.
 *
 * Editorial, no corporativa: un bloque de texto grande —el tamaño de una cita
 * de apertura de capítulo— y los tres principios como notas al pie. Lo que
 * diferencia a este estudio no es una declaración de misión sino las tres
 * condiciones de trabajo, así que son ellas las que ocupan lugar.
 *
 * La tecnología entra como una franja al cierre y no como sección propia. El
 * brief es explícito en que tiene que demostrar capacidad sin volverse
 * protagonista, y siete nombres compuestos en grande dicen más que una grilla
 * de veinte logos: se leen como una firma, no como un inventario.
 */
export function Studio() {
  return (
    <Section id="estudio">
      <RunningHead label="Estudio" folio={`Desde ${site.founded}`} />

      <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-10 lg:gap-16">
        <Reveal direction="up" delay={0.06} className="md:col-span-7">
          <h2 className="t-title text-[clamp(2.25rem,5.4vw,4rem)] text-chrome">
            Tecnología con <Em>propósito</Em>.
          </h2>

          <div className="mt-8 space-y-6">
            <p className="t-body text-[1.08rem] text-mist sm:text-[1.18rem]">
              {site.name} es un estudio digital enfocado en diseñar y desarrollar
              productos digitales modernos para empresas, emprendedores y marcas.
            </p>
            <p className="t-body max-w-xl text-[1rem] text-muted">
              Combinamos diseño, tecnología y estrategia para transformar ideas y
              necesidades de negocio en experiencias digitales reales.
            </p>
          </div>

          <div className="mt-10">
            <Cta href="/estudio" variant="ghost">
              Conocer el estudio
            </Cta>
          </div>
        </Reveal>

        <Stagger className="flex flex-col gap-px self-start overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:col-span-5">
          {principles.map((principle) => (
            <StaggerItem key={principle.title} className="bg-void p-7">
              <h3 className="t-title text-[1.12rem] text-chrome">{principle.title}</h3>
              <p className="t-body mt-3 text-[0.92rem] text-muted">{principle.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      {/* ── Tecnología ───────────────────────────────────────────────── */}

      <Reveal direction="up" delay={0.08}>
        <div className="mt-20 border-t border-white/[0.07] pt-10 md:mt-28">
          <h3 className="t-label text-faint">Built with modern technology</h3>

          <ul className="mt-7 flex flex-wrap items-baseline gap-x-7 gap-y-2 md:gap-x-10">
            {stack.map((tech) => (
              <li
                key={tech}
                className="t-title text-[clamp(1.1rem,2.6vw,1.75rem)] text-chrome/45 transition-colors duration-500 hover:text-chrome"
              >
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}

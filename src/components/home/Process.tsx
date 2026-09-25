import { Section, RunningHead, SectionHeader, Em } from "../Section";
import { Reveal } from "../Reveal";
import { steps } from "@/lib/site";

/**
 * Proceso.
 *
 * El único lugar del sitio donde la numeración es información y no adorno:
 * acá el orden importa, porque es el orden en que va a pasar el trabajo.
 *
 * Se compone como el índice de un libro —número, título, descripción y plazo,
 * separados por hairlines— en vez de como cinco tarjetas en fila. La fila de
 * tarjetas sugiere cinco cosas paralelas; la lista numerada sugiere una
 * secuencia, que es lo que efectivamente es.
 */
export function Process() {
  return (
    <Section id="proceso">
      <RunningHead label="Proceso" folio={`${steps.length} etapas`} />

      <SectionHeader
        title={
          <>
            De la idea al <Em>producto</Em>.
          </>
        }
        lead="Un método corto y visible. Sabés en qué etapa está tu proyecto y qué se entrega al final de cada una."
      />

      <ol className="mt-14 md:mt-20">
        {steps.map((step, i) => (
          <Reveal key={step.n} direction="up" delay={i * 0.05} distance={18}>
            <li className="group grid items-baseline gap-x-8 gap-y-3 border-t border-white/[0.07] py-8 last:border-b md:grid-cols-12 md:py-10">
              <div className="flex items-baseline gap-4 md:col-span-3">
                <span className="t-mono text-[0.75rem] text-peri">{step.n}</span>
                <h3 className="t-title text-[1.4rem] text-chrome md:text-[1.6rem]">
                  {step.title}
                </h3>
              </div>

              <p className="t-body text-[0.96rem] text-muted md:col-span-7">{step.body}</p>

              <span className="t-mono text-[0.75rem] text-faint md:col-span-2 md:text-right">
                {step.span}
              </span>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

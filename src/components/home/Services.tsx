import { Section, RunningHead, SectionHeader, Em } from "../Section";
import { Stagger, StaggerItem } from "../Reveal";
import { SpotlightCard } from "../SpotlightCard";
import { Cta } from "../Cta";
import { services } from "@/lib/site";

/**
 * Servicios.
 *
 * Seis capacidades en una grilla. El índice numérico es real —es el orden del
 * catálogo, de lo más acotado a lo más complejo— y sirve de escalera: quien
 * entra buscando una landing ve en la misma pantalla que el mismo estudio
 * también construye el SaaS al que puede querer llegar.
 *
 * El plazo sólo aparece en los servicios donde hay obra entregada que lo
 * respalde. En los otros dos, el espacio queda vacío a propósito: un plazo
 * inventado es una promesa que después alguien tiene que cumplir.
 */
export function Services() {
  return (
    <Section id="servicios">
      <RunningHead label="Servicios" folio={`${services.length} capacidades`} />

      <SectionHeader
        title={
          <>
            Todo lo que tu negocio necesita para crecer{" "}
            <Em>digitalmente</Em>.
          </>
        }
        lead="Desde una página hasta una plataforma completa. El alcance lo define el problema, no un paquete cerrado."
        action={
          <Cta href="/servicios" variant="ghost">
            Ver los servicios en detalle
          </Cta>
        }
      />

      <Stagger className="mt-14 grid gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.07] md:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <StaggerItem key={service.id}>
            <SpotlightCard className="flex h-full flex-col bg-void p-7 sm:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="t-mono text-[0.72rem] text-faint">{service.index}</span>
                {service.span && (
                  <span className="t-mono text-[0.72rem] text-faint">{service.span}</span>
                )}
              </div>

              <h3 className="t-title mt-6 text-[1.6rem] text-chrome">{service.title}</h3>

              <p className="t-body mt-4 flex-1 text-[0.94rem] text-muted">
                {service.summary}
              </p>

              <ul className="mt-7 flex flex-wrap gap-x-3 gap-y-2 border-t border-white/[0.07] pt-5">
                {service.tags.map((tag) => (
                  <li key={tag} className="t-label text-[0.62rem] text-faint">
                    {tag}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-16">
        <p className="t-title text-[clamp(1.3rem,2.6vw,1.9rem)] text-chrome">
          ¿Tenés una idea?
        </p>
        <Cta href="/contacto" cursor="HABLEMOS">
          Hablemos
        </Cta>
      </div>
    </Section>
  );
}

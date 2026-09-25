import { Section, RunningHead, Em } from "../Section";
import { Reveal } from "../Reveal";
import { Cta } from "../Cta";
import { site, socials } from "@/lib/site";

/**
 * Cierre.
 *
 * El titular más grande de la página, y la pregunta más barata de responder:
 * «¿Tenés una idea?» no pide que el visitante ya sepa qué necesita, que es
 * justo el motivo por el que la mayoría no escribe. El texto de abajo le da
 * permiso explícito a no tenerlo claro todavía.
 *
 * Dos acciones, con jerarquías distintas para que no compitan: contratar el
 * estudio en sólido, explorar los recursos en hairline. Y debajo los canales
 * directos, para quien prefiere escribir sin pasar por un formulario.
 */
export function FinalCta() {
  return (
    <Section id="contacto" className="pb-24 md:pb-32">
      <RunningHead label="Contacto" folio="Fin" />

      <div className="mt-12 md:mt-16">
        <Reveal direction="up" distance={24}>
          <h2 className="t-display text-[clamp(3rem,11vw,8.5rem)] text-chrome">
            ¿Tenés una <Em>idea</Em>?
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-10 lg:gap-16">
          <Reveal direction="up" delay={0.1} className="md:col-span-7">
            <p className="t-body max-w-xl text-[1.08rem] text-mist sm:text-[1.15rem]">
              Puede ser una web, una tienda, una aplicación, un SaaS o simplemente una
              idea que todavía no sabés cómo convertir en realidad.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Cta href="/contacto" cursor="HABLEMOS">
                Hablemos
              </Cta>
              <Cta href="/ebooks" variant="ghost">
                Explorar ebooks
              </Cta>
            </div>
          </Reveal>

          <Reveal
            direction="up"
            delay={0.16}
            className="md:col-span-5 md:justify-self-end"
          >
            <dl className="flex flex-col gap-6">
              <div>
                <dt className="t-label text-faint">Escribinos</dt>
                <dd className="mt-2.5">
                  <a
                    href={`mailto:${site.email}`}
                    className="t-title break-all text-[1.1rem] text-chrome underline decoration-white/20 underline-offset-[6px] transition-colors duration-300 hover:decoration-peri"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>

              {socials.map((profile) => (
                <div key={profile.url}>
                  <dt className="t-label text-faint">{profile.label}</dt>
                  <dd className="mt-2.5">
                    <a
                      href={profile.url}
                      target="_blank"
                      rel="noopener noreferrer me"
                      className="t-title text-[1.1rem] text-chrome underline decoration-white/20 underline-offset-[6px] transition-colors duration-300 hover:decoration-peri"
                    >
                      {profile.handle}
                    </a>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

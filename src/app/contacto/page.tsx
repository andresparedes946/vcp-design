import type { Metadata } from "next";
import { Bleed, Em, RunningHead, Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { Cta } from "@/components/Cta";
import { site, socials, steps, whatsappHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contanos qué necesitás y te respondemos con una propuesta. WhatsApp, email o el formulario. VCP Design, Buenos Aires.",
  alternates: { canonical: "/contacto" },
};

/**
 * Contacto.
 *
 * Tres caminos al mismo lugar y ninguno obligatorio: el formulario para quien
 * prefiere que le pregunten qué contar, el WhatsApp para quien ya sabe, el
 * mail para quien necesita dejarlo por escrito.
 *
 * A la derecha va lo que pasa después de escribir. Es la información que más
 * falta en una página de contacto y la que más frena: nadie manda un mensaje
 * si no sabe si le van a contestar hoy o en diez días.
 */
export default function ContactoPage() {
  const [discovery] = steps;

  return (
    <>
      <PageHero
        label="Contacto"
        folio={site.location}
        title={
          <>
            Contanos tu <Em>idea</Em>.
          </>
        }
        lead="Puede ser una web, una tienda, una aplicación, un SaaS o algo que todavía no sabés cómo nombrar. Con que puedas describir el problema alcanza."
      />

      <Bleed />

      <Section>
        <div className="grid gap-12 md:grid-cols-12 md:gap-12 lg:gap-16">
          <div className="md:col-span-7">
            <Reveal direction="up">
              <ContactForm />
            </Reveal>
          </div>

          <div className="md:col-span-5">
            <Reveal direction="up" delay={0.1}>
              <div className="rounded-xl border border-white/[0.07] bg-surface p-8">
                <h2 className="t-label text-faint">Directo</h2>

                <ul className="mt-6 space-y-5">
                  <li>
                    <a
                      href={whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="CHAT"
                      className="t-title text-[1.05rem] text-chrome underline decoration-white/20 underline-offset-[6px] transition-colors duration-300 hover:decoration-signal"
                    >
                      {site.phoneDisplay}
                    </a>
                    <p className="t-mono mt-1.5 text-[0.74rem] text-faint">WhatsApp</p>
                  </li>

                  <li>
                    <a
                      href={`mailto:${site.email}`}
                      className="t-title break-all text-[1.05rem] text-chrome underline decoration-white/20 underline-offset-[6px] transition-colors duration-300 hover:decoration-peri"
                    >
                      {site.email}
                    </a>
                    <p className="t-mono mt-1.5 text-[0.74rem] text-faint">Email</p>
                  </li>

                  {socials.map((profile) => (
                    <li key={profile.url}>
                      <a
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer me"
                        className="t-title text-[1.05rem] text-chrome underline decoration-white/20 underline-offset-[6px] transition-colors duration-300 hover:decoration-peri"
                      >
                        {profile.handle}
                      </a>
                      <p className="t-mono mt-1.5 text-[0.74rem] text-faint">
                        {profile.label}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal direction="up" delay={0.16}>
              <div className="mt-8">
                <h2 className="t-label text-faint">Qué pasa después</h2>
                <ol className="mt-5 space-y-4">
                  <li className="t-body flex gap-4 text-[0.92rem] text-muted">
                    <span className="t-mono shrink-0 text-[0.72rem] text-peri">01</span>
                    Te respondemos y coordinamos una charla corta.
                  </li>
                  <li className="t-body flex gap-4 text-[0.92rem] text-muted">
                    <span className="t-mono shrink-0 text-[0.72rem] text-peri">02</span>
                    {discovery.body}
                  </li>
                  <li className="t-body flex gap-4 text-[0.92rem] text-muted">
                    <span className="t-mono shrink-0 text-[0.72rem] text-peri">03</span>
                    Recibís una propuesta con alcance y precio cerrado.
                  </li>
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </Section>

      <Bleed />

      <Section className="py-20 md:py-24">
        <RunningHead label="Mientras tanto" />
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:gap-12">
          <p className="t-title text-[clamp(1.5rem,3.2vw,2.2rem)] text-chrome md:col-span-7">
            Si todavía estás decidiendo, empezá por la <Em>guía</Em>.
          </p>
          <div className="md:col-span-5 md:pt-2">
            <p className="t-body text-[0.98rem] text-muted">
              Publicamos recursos cortos para ayudarte a decidir qué necesita tu negocio
              antes de contratar a nadie —incluidos nosotros—.
            </p>
            <div className="mt-7">
              <Cta href="/ebooks" variant="ghost">
                Explorar recursos
              </Cta>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

import type { Metadata } from "next";
import { Bleed, Em, RunningHead, Section } from "@/components/Section";
import { PageHero } from "@/components/PageHero";
import { EbookCatalogue } from "@/components/ebooks/EbookCatalogue";
import { CheckoutFlow } from "@/components/ebooks/CheckoutFlow";
import { Cta } from "@/components/Cta";
import { ebooks } from "@/lib/ebooks";

export const metadata: Metadata = {
  title: "Ebooks y recursos digitales",
  description:
    "Guías digitales prácticas de VCP Design sobre negocios, web, marketing e inteligencia artificial. Para emprendedores y profesionales.",
  alternates: { canonical: "/ebooks" },
};

/**
 * La colección.
 *
 * Una tienda, pero compuesta como el catálogo de una editorial: sin banners de
 * oferta, sin contadores, sin insignias. Lo único que vende es la tapa y la
 * primera línea de cada título, que es exactamente como se vende un libro.
 */
export default function EbooksPage() {
  const disponibles = ebooks.filter((book) => book.status === "disponible").length;

  return (
    <>
      <PageHero
        label="Recursos"
        folio={`${ebooks.length} títulos`}
        title={
          <>
            Ideas, estrategias y herramientas para <Em>construir</Em> mejor.
          </>
        }
        lead="Ebooks y recursos digitales creados por VCP Design. Escritos desde lo que aprendimos construyendo productos para otros."
        action={
          disponibles > 0 ? (
            <p className="t-mono text-[0.8rem] text-faint">
              {disponibles} disponible{disponibles === 1 ? "" : "s"} ·{" "}
              {ebooks.length - disponibles} en preparación
            </p>
          ) : undefined
        }
      />

      <Bleed />

      <Section>
        <EbookCatalogue />
      </Section>

      <Bleed />

      <Section>
        <RunningHead label="Cómo se compra" />

        <div className="mt-10 md:mt-14">
          <CheckoutFlow />
        </div>
      </Section>

      <Bleed />

      <Section className="py-20 md:py-24">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <h2 className="t-title max-w-xl text-[clamp(1.8rem,4vw,2.8rem)] text-chrome">
            ¿Querés llevarlo a la <Em>práctica</Em>?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Cta href="/contacto" cursor="HABLEMOS">
              Hablar con VCP Design
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

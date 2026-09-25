import Link from "next/link";
import { Section, RunningHead, SectionHeader, Em } from "../Section";
import { Reveal, Stagger, StaggerItem } from "../Reveal";
import { BookCover } from "../BookCover";
import { Cta, TextLink } from "../Cta";
import { buyHref, ebooks, featuredEbook } from "@/lib/ebooks";

/**
 * Publicaciones.
 *
 * El problema difícil del rediseño se resuelve acá. Los ebooks tienen que
 * existir en la home sin convertir a un estudio de software en una tienda de
 * PDFs, y la solución es de encuadre: no es un catálogo de productos, es la
 * línea editorial del estudio. Una sola tapa protagonista, las próximas como
 * anticipo, y todo el peso comercial —filtros, precios, comparación— empujado
 * a /ebooks, donde quien ya decidió comprar va a buscarlo.
 *
 * La sección va sobre una superficie distinta al resto de la página: es el
 * recurso más barato para decir "esto es otra cosa" sin cambiar de lenguaje.
 */
export function Resources() {
  const upcoming = ebooks.filter((book) => book.status === "proximamente");

  if (!featuredEbook) return null;

  return (
    <div className="relative z-[2] border-y border-white/[0.07] bg-ink">
      <Section id="ebooks">
        <RunningHead label="Recursos" folio="Línea editorial" />

        <SectionHeader
          title={
            <>
              Ideas que podés convertir en <Em>acción</Em>.
            </>
          }
          lead="Guías digitales prácticas para emprendedores, profesionales y negocios que quieren aprovechar mejor la tecnología, la web y la inteligencia artificial."
        />

        {/* ── Título destacado ─────────────────────────────────────────── */}

        <div className="mt-14 grid items-center gap-10 md:mt-20 md:grid-cols-12 md:gap-14">
          <Reveal direction="right" distance={30} className="md:col-span-5">
            <Link
              href={`/ebooks/${featuredEbook.slug}`}
              aria-label={`Ver la guía ${featuredEbook.title}`}
              className="block transition-transform duration-700 hover:-translate-y-1.5"
            >
              <BookCover book={featuredEbook} className="mx-auto max-w-[19rem]" />
            </Link>
          </Reveal>

          <Reveal direction="up" delay={0.1} className="md:col-span-7">
            <p className="t-label text-peri">Disponible ahora</p>

            <h3 className="t-title mt-5 text-[clamp(1.8rem,3.4vw,2.6rem)] text-chrome">
              {featuredEbook.title}
            </h3>

            <p className="t-body mt-5 max-w-xl text-[1rem] text-muted">
              {featuredEbook.description}
            </p>

            <dl className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-y border-white/[0.07] py-5">
              <div>
                <dt className="t-label text-faint">Extensión</dt>
                <dd className="t-mono mt-2 text-[0.92rem] text-mist">
                  {featuredEbook.pages} páginas · {featuredEbook.format}
                </dd>
              </div>
              <div>
                <dt className="t-label text-faint">Precio</dt>
                <dd className="t-title mt-1.5 text-[1.6rem] text-chrome">
                  US$ {featuredEbook.price}
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Cta href={buyHref(featuredEbook)} external cursor="COMPRAR">
                Comprar ebook
              </Cta>
              <Cta href={`/ebooks/${featuredEbook.slug}`} variant="ghost">
                Ver qué incluye
              </Cta>
            </div>
          </Reveal>
        </div>

        {/* ── Próximos títulos ─────────────────────────────────────────── */}

        {upcoming.length > 0 && (
          <div className="mt-20 md:mt-28">
            <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-white/[0.07] pt-8">
              <h3 className="t-label text-faint">Próximos títulos</h3>
              <TextLink href="/ebooks">Ver la colección</TextLink>
            </div>

            <Stagger className="mt-10 grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
              {upcoming.map((book) => (
                <StaggerItem key={book.slug}>
                  <article className="group">
                    {/*
                      Las tapas de los títulos que todavía no salieron van casi
                      a opacidad plena. Bajarlas para marcar que no están
                      disponibles parecía correcto y era un error: una tapa
                      oscura al 45% sobre fondo negro directamente desaparece,
                      y la colección —que es lo que se quiere mostrar— se ve
                      como cuatro huecos. El estado lo dice la etiqueta.
                    */}
                    <div className="opacity-80 transition-opacity duration-500 group-hover:opacity-100">
                      <BookCover book={book} />
                    </div>
                    <h4 className="t-title mt-5 text-[1.02rem] text-mist">{book.title}</h4>
                    <p className="t-label mt-2.5 text-faint">Próximamente</p>
                  </article>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        )}
      </Section>
    </div>
  );
}

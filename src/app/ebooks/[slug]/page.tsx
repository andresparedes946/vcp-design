import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Bleed, Container, Em, RunningHead, Section } from "@/components/Section";
import { Reveal } from "@/components/Reveal";
import { BookCover } from "@/components/BookCover";
import { Cta } from "@/components/Cta";
import { CheckoutFlow } from "@/components/ebooks/CheckoutFlow";
import { buyHref, ebooks, formatPrice, getEbook } from "@/lib/ebooks";
import { site, siteUrl } from "@/lib/site";

/** Las cuatro fichas se generan en el build: son contenido fijo. */
export function generateStaticParams() {
  return ebooks.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const book = getEbook(slug);

  if (!book) return { title: "Recurso no encontrado" };

  return {
    title: book.title,
    description: book.excerpt,
    alternates: { canonical: `/ebooks/${book.slug}` },
    openGraph: {
      type: "article",
      title: `${book.title} · ${site.name}`,
      description: book.excerpt,
      url: `${siteUrl}/ebooks/${book.slug}`,
    },
  };
}

/**
 * Ficha de una publicación.
 *
 * La página tiene un solo trabajo: que alguien decida si esa guía le sirve. De
 * ahí el orden — primero qué vas a poder hacer después de leerla, después qué
 * trae, después para quién es, y recién al final el índice. Las objeciones van
 * en las preguntas frecuentes, antes del último llamado, porque una duda sin
 * responder al lado del botón de compra es la que frena el clic.
 *
 * El precio y la acción quedan fijos en la columna izquierda mientras se
 * scrollea: en una compra de tres dólares la decisión se toma en cualquier
 * punto de la lectura, y no hay que obligar a volver arriba para ejecutarla.
 */
export default async function EbookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const book = getEbook(slug);

  if (!book) notFound();

  const isAvailable = book.status === "disponible";

  /*
    Datos estructurados del producto. Es lo que permite que Google muestre el
    precio y la disponibilidad en el resultado de búsqueda, que para un
    producto de precio bajo es buena parte de la decisión de hacer clic.
  */
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    description: book.description,
    bookFormat: "https://schema.org/EBook",
    inLanguage: "es-AR",
    ...(book.pages ? { numberOfPages: book.pages } : {}),
    author: { "@type": "Organization", name: site.name },
    publisher: { "@id": `${siteUrl}/#organization` },
    url: `${siteUrl}/ebooks/${book.slug}`,
    ...(isAvailable && book.price
      ? {
          offers: {
            "@type": "Offer",
            price: String(book.price),
            priceCurrency: book.currency ?? "ARS",
            availability: "https://schema.org/InStock",
            url: `${siteUrl}/ebooks/${book.slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <header className="relative pb-12 pt-32 sm:pt-36 lg:pt-44">
        <Container>
          <Link
            href="/ebooks"
            className="group inline-flex items-center gap-2 text-[0.82rem] text-muted transition-colors duration-300 hover:text-chrome"
          >
            <ArrowLeft
              className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
              strokeWidth={2}
            />
            Todos los recursos
          </Link>

          <div className="mt-8 flex items-center gap-4 sm:gap-6">
            <span className="t-label shrink-0 text-chrome">{book.category}</span>
            <span
              aria-hidden="true"
              className="h-px flex-1 bg-gradient-to-r from-white/[0.16] via-white/[0.08] to-white/[0.03]"
            />
            <span className="t-mono shrink-0 text-[0.7rem] text-faint">
              {isAvailable ? "Disponible" : "En preparación"}
            </span>
          </div>
        </Container>
      </header>

      <Container>
        <div className="grid gap-12 pb-20 md:grid-cols-12 md:gap-12 lg:gap-16 lg:pb-28">
          {/* ── Columna de compra ─────────────────────────────────────── */}

          <div className="md:col-span-5 lg:col-span-4">
            <div className="md:sticky md:top-28">
              <Reveal direction="up" distance={20}>
                <BookCover book={book} className="mx-auto max-w-[20rem]" />
              </Reveal>

              {isAvailable && (
                <Reveal direction="up" delay={0.1}>
                  <div className="mx-auto mt-10 max-w-[20rem]">
                    <dl className="flex items-end justify-between gap-4 border-b border-white/[0.07] pb-5">
                      <div>
                        <dt className="t-label text-faint">Precio</dt>
                        <dd className="t-title mt-2 text-[2rem] text-chrome">
                          {formatPrice(book)}
                        </dd>
                      </div>
                      <div className="text-right">
                        <dt className="t-label text-faint">Formato</dt>
                        <dd className="t-mono mt-2.5 text-[0.88rem] text-mist">
                          {book.pages} pp. · {book.format}
                        </dd>
                      </div>
                    </dl>

                    <div className="mt-6 flex flex-col gap-3">
                      <Cta
                        href={buyHref(book)}
                        external
                        cursor="COMPRAR"
                        className="justify-center"
                      >
                        Comprar ebook
                      </Cta>
                      <p className="t-mono text-center text-[0.72rem] text-faint">
                        Pago seguro en la tienda · PDF por email
                      </p>
                    </div>
                  </div>
                </Reveal>
              )}
            </div>
          </div>

          {/* ── Contenido ─────────────────────────────────────────────── */}

          <div className="md:col-span-7 lg:col-span-8">
            <Reveal direction="up">
              <h1 className="t-display text-[clamp(2.1rem,5vw,3.4rem)] text-chrome">
                {book.title}
              </h1>
              <p className="t-body mt-7 max-w-2xl text-[1.06rem] text-mist">
                {book.description}
              </p>
            </Reveal>

            {book.outcomes && (
              <Reveal direction="up" delay={0.06}>
                <section className="mt-14">
                  <h2 className="t-label text-faint">Qué vas a poder hacer</h2>
                  <ul className="mt-6">
                    {book.outcomes.map((item) => (
                      <li
                        key={item}
                        className="t-title border-t border-white/[0.07] py-5 text-[1.05rem] leading-snug text-mist last:border-b sm:text-[1.15rem]"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              </Reveal>
            )}

            <div className="mt-14 grid gap-12 sm:grid-cols-2 sm:gap-10">
              {book.includes && (
                <Reveal direction="up" delay={0.06}>
                  <section>
                    <h2 className="t-label text-faint">Qué incluye</h2>
                    <ul className="mt-5 space-y-3">
                      {book.includes.map((item) => (
                        <li
                          key={item}
                          className="t-body flex gap-3 text-[0.94rem] text-muted"
                        >
                          <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-peri" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}

              {book.audience && (
                <Reveal direction="up" delay={0.1}>
                  <section>
                    <h2 className="t-label text-faint">Para quién es</h2>
                    <ul className="mt-5 space-y-3">
                      {book.audience.map((item) => (
                        <li
                          key={item}
                          className="t-body flex gap-3 text-[0.94rem] text-muted"
                        >
                          <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-peri" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </section>
                </Reveal>
              )}
            </div>

            {book.contents && (
              <Reveal direction="up" delay={0.06}>
                <section className="mt-16">
                  <div className="flex items-baseline justify-between gap-4">
                    <h2 className="t-label text-faint">Contenido</h2>
                    <span className="t-mono text-[0.72rem] text-faint">
                      {book.contents.length} secciones
                    </span>
                  </div>

                  {/*
                    El índice hace de vista previa. Mostrar dos páginas borrosas
                    del PDF se ve bien pero no informa; el índice completo le
                    dice al comprador exactamente qué está comprando, que es lo
                    único que quiere saber antes de pagar.
                  */}
                  <ol className="mt-6">
                    {book.contents.map((item, i) => (
                      <li
                        key={item}
                        className="flex items-baseline gap-5 border-t border-white/[0.07] py-4 last:border-b"
                      >
                        <span className="t-mono text-[0.72rem] text-faint">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="t-body text-[0.98rem] text-mist">{item}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </Reveal>
            )}

            {book.faq && (
              <Reveal direction="up" delay={0.06}>
                <section className="mt-16">
                  <h2 className="t-label text-faint">Preguntas frecuentes</h2>
                  <dl className="mt-6">
                    {book.faq.map((entry) => (
                      <div
                        key={entry.q}
                        className="grid gap-x-8 gap-y-2 border-t border-white/[0.07] py-6 last:border-b sm:grid-cols-12"
                      >
                        <dt className="t-title text-[1rem] text-chrome sm:col-span-5">
                          {entry.q}
                        </dt>
                        <dd className="t-body text-[0.94rem] text-muted sm:col-span-7">
                          {entry.a}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              </Reveal>
            )}

            {!isAvailable && (
              <Reveal direction="up">
                <div className="mt-14 rounded-xl border border-white/[0.07] bg-surface p-8">
                  <h2 className="t-title text-[1.2rem] text-chrome">
                    Todavía no salió
                  </h2>
                  <p className="t-body mt-3 text-[0.94rem] text-muted">
                    Esta guía está en preparación. Si querés que te avisemos cuando esté
                    lista, escribinos y te lo mandamos el día que se publica.
                  </p>
                  <div className="mt-7">
                    <Cta href="/contacto" variant="ghost">
                      Avisame cuando salga
                    </Cta>
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </div>
      </Container>

      {isAvailable && (
        <>
          <Bleed />
          <Section>
            <RunningHead label="Cómo se compra" />
            <div className="mt-10 md:mt-14">
              <CheckoutFlow />
            </div>
          </Section>
        </>
      )}

      <Bleed />

      {/* ── Puente al estudio ───────────────────────────────────────── */}

      <Section className="py-20 md:py-28">
        <div className="grid gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <h2 className="t-title text-[clamp(1.9rem,4.4vw,3rem)] text-chrome">
              ¿Querés llevarlo a la <Em>práctica</Em>?
            </h2>
            <p className="t-body mt-6 max-w-xl text-[1.02rem] text-muted">
              Si después de leer esta guía querés crear una web profesional para tu
              negocio, podemos ayudarte a construirla.
            </p>
          </div>

          <div className="flex flex-wrap items-end gap-3 md:col-span-5 md:justify-end">
            <Cta href="/contacto" cursor="HABLEMOS">
              Hablar con {site.name}
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

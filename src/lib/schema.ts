/**
 * Datos estructurados (JSON-LD) — lo que Google lee para entender *quién* es
 * VCP Design, no sólo qué dice el sitio.
 *
 * El HTML le dice a Google qué palabras hay en la página. Esto le dice que hay
 * una organización, cómo se llama, de dónde es, cómo se la contacta y qué
 * perfiles le pertenecen. Con eso puede armar el panel de marca que aparece a
 * la derecha cuando alguien busca "VCP Design" — el momento que más importa,
 * porque es lo que hace un prospecto después de que lo contactás y antes de
 * contestarte.
 *
 * Se valida en https://search.google.com/test/rich-results
 *
 * Se arma como `@graph`: un solo bloque con varias entidades enlazadas por
 * `@id`, que es la forma que Google recomienda cuando hay más de una. Los
 * campos vacíos se podan antes de emitir — un dato en blanco no es neutro,
 * cuenta como señal incompleta.
 */

import { services, site, siteUrl, socialProfiles } from "./site";

/** Saca claves vacías, nulas o arrays sin elementos, en cualquier nivel. */
function prune<T>(value: T): T {
  if (Array.isArray(value)) {
    const items = value.map(prune).filter(isPresent);
    return items as unknown as T;
  }

  if (value !== null && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>)
      .map(([key, val]) => [key, prune(val)] as const)
      .filter(([, val]) => isPresent(val));
    return Object.fromEntries(entries) as T;
  }

  return value;
}

function isPresent(value: unknown): boolean {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === "object") return Object.keys(value).length > 0;
  return true;
}

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

export const organizationSchema = prune({
  "@context": "https://schema.org",
  "@graph": [
    {
      // `ProfessionalService` además de `Organization`: describe mejor a un
      // estudio que vende servicios que `Organization` a secas, y habilita
      // señales locales sin exigir una dirección de calle —que no tenemos, y
      // que inventar sería peor que omitir.
      "@type": ["Organization", "ProfessionalService"],
      "@id": organizationId,
      name: site.name,
      url: `${siteUrl}/`,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/vcp-design-logo.png`,
      },
      image: `${siteUrl}/opengraph-image.png`,
      description: `${site.role} en ${site.location}. Aplicaciones móviles, plataformas web, productos SaaS y sistemas a medida.`,
      slogan: site.tagline,
      foundingDate: String(site.founded),
      email: site.email,
      telephone: site.phoneE164,
      address: {
        "@type": "PostalAddress",
        addressLocality: site.city,
        addressCountry: site.country,
      },
      areaServed: {
        "@type": "Country",
        name: "Argentina",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: site.email,
        telephone: site.phoneE164,
        areaServed: site.country,
        availableLanguage: ["es"],
      },
      // La confirmación de identidad: estos perfiles y este sitio son lo mismo.
      sameAs: socialProfiles,
      // El catálogo sale de `services` en site.ts, así que agregar o cambiar un
      // servicio allá lo actualiza acá solo. Una fuente, no dos.
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Servicios de desarrollo de software",
        itemListElement: services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.title,
            description: service.summary,
            serviceType: service.title,
            provider: { "@id": organizationId },
          },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: `${siteUrl}/`,
      name: site.name,
      inLanguage: "es-AR",
      publisher: { "@id": organizationId },
    },
  ],
});

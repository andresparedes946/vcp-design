import type { MetadataRoute } from "next";
import { ebooks } from "@/lib/ebooks";
import { siteUrl } from "@/lib/site";

/**
 * Mapa del sitio.
 *
 * Se arma solo: las rutas fijas más una entrada por ebook. Cuando se agregue
 * un título a `ebooks.ts`, el sitemap ya lo incluye — que es la única forma de
 * que no se desactualice en la tercera publicación.
 *
 * Las prioridades no son un ranking de importancia para Google (Google las
 * ignora hace años), pero sí ordenan el archivo para quien lo lea a mano.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const pages: { path: string; priority: number; changeFrequency: "monthly" | "weekly" }[] =
    [
      { path: "", priority: 1, changeFrequency: "weekly" },
      { path: "/servicios", priority: 0.9, changeFrequency: "monthly" },
      { path: "/proyectos", priority: 0.9, changeFrequency: "monthly" },
      { path: "/ebooks", priority: 0.8, changeFrequency: "weekly" },
      { path: "/estudio", priority: 0.7, changeFrequency: "monthly" },
      { path: "/contacto", priority: 0.7, changeFrequency: "monthly" },
    ];

  return [
    ...pages.map((page) => ({
      url: `${siteUrl}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...ebooks.map((book) => ({
      url: `${siteUrl}/ebooks/${book.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      // Los títulos publicados valen más que los que todavía no salieron.
      priority: book.status === "disponible" ? 0.8 : 0.4,
    })),
  ];
}

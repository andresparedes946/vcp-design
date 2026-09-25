import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { AmbientBackground } from "@/components/AmbientBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteFooter } from "@/components/SiteFooter";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { organizationSchema } from "@/lib/schema";
import { site, siteUrl } from "@/lib/site";

/**
 * Tres voces, cada una con un trabajo.
 *
 * Archivo es la voz del estudio: su eje de ancho da el contraste entre los
 * titulares expandidos y el cuerpo a ancho normal, igual que el lettering del
 * isologo. Newsreader en cursiva es la voz publicada, y aparece sólo en la
 * palabra acentuada de cada titular y en las bajadas de los ebooks — es lo que
 * hermana el estudio con la línea editorial. JetBrains Mono es la voz
 * utilitaria: folios, pies de figura y datos.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["italic"],
  weight: ["300", "400"],
  display: "swap",
  variable: "--font-newsreader",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

// Es lo que se lee en el resultado de Google y en la vista previa del enlace.
// Google corta alrededor de los 160 caracteres: lo importante va primero.
const description =
  "VCP Design diseña y desarrolla webs, apps, e-commerce, SaaS y soluciones digitales para empresas y emprendedores. También creamos ebooks y recursos digitales.";

const title = `${site.name} | Web, Apps, E-commerce y Productos Digitales`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: `%s · ${site.name}`,
  },
  description,
  // Le dice a Google cuál es la dirección oficial de la página. Sin esto, si el
  // sitio queda accesible por más de una URL —con y sin www, el dominio de
  // Vercel además del propio— Google las trata como páginas distintas y reparte
  // el posicionamiento entre todas en lugar de acumularlo en una.
  alternates: { canonical: "/" },
  keywords: [
    "estudio digital",
    "diseño web",
    "desarrollo web",
    "e-commerce",
    "aplicaciones móviles",
    "SaaS",
    "automatizaciones",
    "ebooks",
    "Buenos Aires",
    "Argentina",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: siteUrl,
    siteName: site.name,
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: { index: true, follow: true },
  /*
    Verificación de Google Search Console.
    En un dominio .vercel.app no se puede verificar por DNS —la zona es de
    Vercel, no nuestra—, así que va por etiqueta HTML: en Search Console se
    elige "Prefijo de la URL", Google da un código, y ese código se carga como
    variable de entorno en Vercel (entorno Production) con este nombre. Sin la
    variable la etiqueta no se emite, que es lo correcto en desarrollo.
  */
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
};

export const viewport: Viewport = {
  themeColor: "#08080b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-AR"
      className={`${archivo.variable} ${newsreader.variable} ${jetbrains.variable}`}
    >
      {/* `grain` imprime una textura de papel sobre toda la página. */}
      <body className="grain antialiased">
        {/*
          Datos estructurados de la marca. Es texto para los buscadores, no se
          ve en pantalla. Va en el body y no en el head porque Next.js sólo
          permite metadata serializable en `metadata`, y este bloque es JSON.
        */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />

        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-violet focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>

        <AmbientBackground />
        <CustomCursor />
        <ScrollProgress />
        <Nav />

        <main id="contenido" className="relative z-[2]">
          {children}
        </main>

        <SiteFooter />
        <WhatsAppFab />

        {/*
          Métrica de visitas. Sin cookies y sin datos personales, así que no
          necesita banner de consentimiento. Sólo emite en Vercel: en
          desarrollo no hace nada.
        */}
        <Analytics />
      </body>
    </html>
  );
}

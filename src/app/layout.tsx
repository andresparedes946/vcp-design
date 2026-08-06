import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

import { AmbientBackground } from "@/components/AmbientBackground";
import { CustomCursor } from "@/components/CustomCursor";
import { Nav } from "@/components/Nav";
import { PreloaderGate } from "@/components/Preloader";
import { ScrollProgress } from "@/components/ScrollProgress";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { site, siteUrl } from "@/lib/site";

/**
 * Una sola superfamilia. El contraste tipográfico lo da el eje de ancho de
 * Archivo (titulares expandidos, cuerpo normal), igual que el lettering del
 * isologo. JetBrains Mono queda como voz utilitaria: etiquetas, índices, datos.
 */
const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-archivo",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-jetbrains",
});

const description =
  "Estudio de software en Buenos Aires. Diseñamos y construimos aplicaciones móviles, plataformas web y productos SaaS de punta a punta.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Apps, Web y SaaS a medida`,
    template: `%s · ${site.name}`,
  },
  description,
  keywords: [
    "desarrollo de software",
    "aplicaciones móviles",
    "desarrollo web",
    "SaaS",
    "Next.js",
    "React Native",
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
    title: `${site.name} — Apps, Web y SaaS a medida`,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Apps, Web y SaaS a medida`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#05060f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${archivo.variable} ${jetbrains.variable}`}>
      <body className="antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded-full focus:bg-violet focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white"
        >
          Saltar al contenido
        </a>

        <PreloaderGate>
          <AmbientBackground />
          <CustomCursor />
          <ScrollProgress />
          <Nav />
          <main id="contenido">{children}</main>
          <WhatsAppFab />
        </PreloaderGate>

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

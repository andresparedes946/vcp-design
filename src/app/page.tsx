import { Bleed } from "@/components/Section";
import { Hero } from "@/components/home/Hero";
import { Focus } from "@/components/home/Focus";
import { Services } from "@/components/home/Services";
import { Process } from "@/components/home/Process";
import { Work } from "@/components/home/Work";
import { Resources } from "@/components/home/Resources";
import { Ecosystem } from "@/components/home/Ecosystem";
import { Studio } from "@/components/home/Studio";
import { FinalCta } from "@/components/home/FinalCta";

/**
 * Portada.
 *
 * El orden es un argumento de venta, no un acomodo: primero la obra (hero y
 * enfoque), después la capacidad (servicios y proceso), después la prueba
 * (proyectos). Recién ahí aparecen los recursos, cuando el visitante ya sabe
 * quién se los vende — al revés, los ebooks abaratarían todo lo que viene
 * después.
 *
 * `Resources` trae su propio fondo y sus propios bordes, así que no lleva
 * hairline alrededor: dos separadores encima del mismo borde se leen como un
 * error de espaciado.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Bleed />
      <Focus />
      <Bleed />
      <Services />
      <Bleed />
      <Process />
      <Bleed />
      <Work />
      <Resources />
      <Ecosystem />
      <Bleed />
      <Studio />
      <Bleed />
      <FinalCta />
    </>
  );
}

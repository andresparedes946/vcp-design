import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { Work } from "@/components/sections/Work";
import { Stack } from "@/components/sections/Stack";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Services />
      <Work />
      <Stack />
      <Process />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}

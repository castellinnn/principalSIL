import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { PresenceRemote } from "@/components/sections/PresenceRemote";
import { Process } from "@/components/sections/Process";
import { WebDesign } from "@/components/sections/WebDesign";
import { About } from "@/components/sections/About";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <PresenceRemote />
      <Process />
      <WebDesign />
      <About />
      <Testimonials />
      <FAQ />
      <Contact />
    </main>
  );
}

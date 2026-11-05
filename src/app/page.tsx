import {
  About,
  Career,
  Contact,
  FAQ,
  Footer,
  Hero,
  Projects,
  Skillset,
  Standout,
  Testimonials,
} from "@/components/sections";
import { MotionProvider } from "@/components/motion-primitives";

export default function Home() {
  return (
    <MotionProvider>
      <main>
        <Hero />
        <About />
        <Skillset />
        <Standout />
        <Projects />
        <Career />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </MotionProvider>
  );
}

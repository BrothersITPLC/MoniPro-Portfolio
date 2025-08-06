import { Testimonials } from "./Testimonials";
import  {Pricing}  from "./Pricing";
import { Features } from "./AiFeatures";
import { ProductSection } from "./Product";
import { HeroSection } from "./Hero";
import { Footer } from "./Footer";
import { useRef } from "react";

function Home() {
  const homeRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={homeRef}>
      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:border-b-[var(--border-dark)] dark:bg-background text-[var(--bg-dark)] dark:text-[var(--neutral-bg)]">
        <HeroSection />
        <ProductSection />
        <Features />
        <Pricing />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}

export default Home;

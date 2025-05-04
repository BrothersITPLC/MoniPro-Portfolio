import { Testimonials } from "./Testimonials";
import { Pricing } from "./Pricing";
 import { AiFeatures } from "./AiFeatures";
import { Product } from "./Product";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
import { useRef, useEffect } from "react";

function Home() {
  const homeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticle = () => {
      if (!homeRef.current) return;

      const particle = document.createElement("div");
      particle.classList.add("particle");

      const size = Math.random() * 20 + 5;
      const posX = Math.random() * homeRef.current.offsetWidth;
      const posY = Math.random() * homeRef.current.offsetHeight;
      const delay = Math.random() * 5;
      const duration = Math.random() * 10 + 10;

      Object.assign(particle.style, {
        width: `${size}px`,
        height: `${size}px`,
        left: `${posX}px`,
        top: `${posY}px`,
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        background: `linear-gradient(135deg, hsl(${Math.random() * 60 + 200}, 80%, 60%), hsl(${Math.random() * 60 + 240}, 80%, 60%))`,
      });

      homeRef.current.appendChild(particle);

      setTimeout(() => {
        homeRef.current?.contains(particle) && homeRef.current.removeChild(particle);
      }, (duration + delay) * 1000);
    };

    const interval = setInterval(createParticle, 300);
    return () => {
      clearInterval(interval);
      homeRef.current?.querySelectorAll(".particle").forEach((p) => p.remove());
    };
  }, []);

  return (
    <div ref={homeRef}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 dark:border-b-[var(--border-dark)] dark:bg-background text-[var(--bg-dark)] dark:text-[var(--neutral-bg)]">
        <Hero />
        <Product />
        <AiFeatures />
        <Pricing />
        <Testimonials />
        <Footer />
      </div>
    </div>
  );
}

export default Home;

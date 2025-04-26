import { Testimonials } from "./Testimonials";
import { Pricing } from "./Pricing";
import { AiFeatures } from "./AiFeatures";
import { Product } from "./Product";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
function Home() {
  return (
    <div>
      <div className="min-h-screen bg-[var(--neutral-bg)] dark:border-b-[var(--border-dark)] dark:bg-background text-[var(--bg-dark)] dark:text-[var(--neutral-bg)]">
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

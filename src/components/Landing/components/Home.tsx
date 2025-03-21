import { Testimonials } from "./Testimonials";
import { Pricing } from "./Pricing";
import { AiFeatures } from "./AiFeatures";
import { Product } from "./Product";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gray-100 dark:border-b-slate-700 dark:bg-background text-gray-950 dark:text-gray-100 ">
        {/* Hero Section */}
        <Hero />
        {/* Product Showcase */}
        <Product />
        {/* AI Features Section */}
        <AiFeatures />
        {/* Pricing Section */}
        <Pricing />
        {/* Testimonials */}
        <Testimonials />
        {/* CTA Footer */}
        <Footer />
        {/* Footer */}
        {/* <CtaFooter /> */}
      </div>
    </div>
  );
}

export default Home;

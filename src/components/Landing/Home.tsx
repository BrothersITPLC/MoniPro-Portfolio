import { Testimonials } from "./Testimonials";
import { CtaFooter } from "./CtaFooter";
import { Pricing } from "./Pricing";
import { AiFeatures } from "./AiFeatures";
import { Product } from "./Product";
import { Hero } from "./Hero";
import { Footer } from "./Footer";
function Home() {
  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white">
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

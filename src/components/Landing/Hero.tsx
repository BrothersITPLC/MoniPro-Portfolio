import { useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { Database, Shield, Zap } from "lucide-react";
const pricingPlans = [
  {
    name: "Basic Plan",
    price: 29,
    description: "Perfect for small teams and startups",
    icon: <Shield className="w-12 h-12 text-blue-400" />,
    features: [
      "Up to 10 servers monitoring",
      "Basic AI insights",
      "Email notifications",
      "5 team members",
      "12-hour data retention",
      "Community support",
    ],
    color: "blue",
    popular: false,
  },
  {
    name: "Premium Plan",
    price: 99,
    description: "Ideal for growing businesses",
    icon: <Zap className="w-12 h-12 text-red-500" />,
    features: [
      "Up to 50 servers monitoring",
      "Advanced AI predictions",
      "Multi-channel alerts",
      "15 team members",
      "30-day data retention",
      "24/7 priority support",
      "Custom dashboards",
      "API access",
    ],
    color: "red",
    popular: true,
  },
  {
    name: "Enterprise Plan",
    price: 299,
    description: "For large-scale operations",
    icon: <Database className="w-12 h-12 text-purple-500" />,
    features: [
      "Unlimited servers monitoring",
      "Custom AI models",
      "Advanced integrations",
      "Unlimited team members",
      "90-day data retention",
      "Dedicated support manager",
      "Custom feature development",
      "SLA guarantee",
      "On-premise deployment",
    ],
    color: "purple",
    popular: false,
  },
];
export function Hero() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  const handleGetStarted = () => {
    navigate("/auth", {
      state: {
        redirectTo: "/payment",
        plan: hoveredPlan !== null ? pricingPlans[hoveredPlan] : null,
      },
    });
  };

  const scrollToHero = () => {
    heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#hero" || !hash) {
      scrollToHero();
    } else if (hash) {
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 300);
    }
  }, []);
  return (
    <div
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover opacity-20"
        >
          <source
            src="https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          AI-Powered Monitoring <br />
          <span className="text-red-500">at Your Fingertips</span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Intelligent monitoring for your entire infrastructure. Get real-time
          insights and predictive analytics powered by advanced AI.
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-red-500 px-8 py-4 rounded-lg text-xl font-semibold hover:bg-red-600 transition-all transform hover:scale-105"
        >
          Start Monitoring Now
        </button>
      </div>
    </div>
  );
}

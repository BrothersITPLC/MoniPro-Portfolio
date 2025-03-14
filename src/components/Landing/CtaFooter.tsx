import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Database, Zap, Shield } from "lucide-react";
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
export function CtaFooter() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const navigate = useNavigate();
  const handleGetStarted = () => {
    // Navigate to auth page with payment as the redirect destination
    navigate("/auth", {
      state: {
        redirectTo: "/payment",
        plan: hoveredPlan !== null ? pricingPlans[hoveredPlan] : null,
      },
    });
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-800 py-2">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <p className="text-xl font-semibold mb-4 md:mb-0">
          Ready to transform your monitoring experience?
        </p>
        <button
          onClick={handleGetStarted}
          className="bg-red-500 px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all transform hover:scale-105 flex items-center"
        >
          Start free trial for 30 Days
          <ChevronRight className="ml-2 w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

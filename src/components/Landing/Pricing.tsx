import React, { useState, useRef } from "react";
import { Shield, Zap, Database, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

export function Pricing() {
  const navigate = useNavigate();

  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);
  const getOriginalPrice = (monthlyPrice: number) => {
    return isYearly ? monthlyPrice * 12 : monthlyPrice;
  };
  const calculatePrice = (monthlyPrice: number, planName: string) => {
    if (isYearly) {
      let discountRate = 0.05; // Default 5% for Basic plan

      if (planName === "Premium Plan") {
        discountRate = 0.08; // 8% for Premium plan
      } else if (planName === "Enterprise Plan") {
        discountRate = 0.1; // 10% for Enterprise plan
      }

      return Math.floor(monthlyPrice * 12 * (1 - discountRate));
    }
    return monthlyPrice;
  };
  const getSavingsPercentage = (planName: string) => {
    if (planName === "Premium Plan") {
      return 8;
    } else if (planName === "Enterprise Plan") {
      return 10;
    }
    return 5; // Basic plan
  };
  const getPriceLabel = () => (isYearly ? "/year" : "/month");

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
    <div
      id="pricing"
      ref={pricingRef}
      className="py-12 px-4 bg-white dark:border-b-slate-700 dark:bg-background text-gray-950 dark:text-gray-100 border-b-[1px]"
    >
      <div className="max-w-7xl mx-auto pt-10 ">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>

          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm p-1.5 rounded-full mt-4   border border-gray-700/50">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                !isYearly
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                isYearly
                  ? "bg-red-500 text-white shadow-lg shadow-red-500/20"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9  bg-white dark:border-b-slate-700 dark:bg-background">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative rounded-2xl p-6 h-full flex flex-col
                  transition-all duration-300 transform bg-white dark:border-b-slate-700 dark:bg-background text-gray-950 dark:text-gray-100
                  ${
                    hoveredPlan === index
                      ? "scale-105 ring-2 ring-red-500 shadow-2xl shadow-red-500/20"
                      : ""
                  }
                `}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6 bg-white dark:border-b-slate-700 dark:bg-background text-gray-950 dark:text-gray-100">
                {plan.icon}
                <h3 className="text-2xl font-bold mt-4 mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  {isYearly && (
                    <span className="text-lg line-through text-gray-500 mr-2">
                      ${getOriginalPrice(plan.price)}
                    </span>
                  )}
                  <span className="text-4xl font-bold">
                    ${calculatePrice(plan.price, plan.name)}
                  </span>
                  <span className="text-gray-400 ml-2">{getPriceLabel()}</span>
                </div>
                {isYearly && (
                  <div className="mt-2">
                    <span className="inline-block bg-green-500/10 text-green-400 text-sm px-2 py-1 rounded">
                      Save {getSavingsPercentage(plan.name)}%
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-grow space-y-3 bg-white dark:border-b-slate-700 dark:bg-background">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check
                      className={`w-5 h-5 text-${plan.color}-500 mr-3 flex-shrink-0`}
                    />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleGetStarted()}
                className={`w-full mt-6 bg-gray-800 text-white py-2.5 px-6 rounded-lg font-semibold 
                    text-center transition-all duration-300 transform hover:scale-105
                    hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20
                    ${
                      hoveredPlan === index ? "bg-red-500 hover:bg-red-600" : ""
                    }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

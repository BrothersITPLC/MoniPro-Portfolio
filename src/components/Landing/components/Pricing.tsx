import { useState, useRef, useEffect } from "react";
import { Shield, Zap, Database, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {
  setSelectedPlane,
  setSelectedPlanType,
} from "@/components/Landing/LandingSlice";

const icons = [
  {
    icon: <Shield className="w-12 h-12 text-blue-400" />,
    color: "blue",
  },
  {
    icon: <Zap className="w-12 h-12 text-red-500" />,
    color: "red",
  },
  {
    icon: <Database className="w-12 h-12 text-purple-500" />,
    color: "purple",
  },
];

export function Pricing() {
  const dispatch = useDispatch();
  const planeData = useSelector((state: RootState) => state.landing.plans);
  const selectedPlanType = useSelector(
    (state: RootState) => state.landing.selectedPlanType
  );
  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const [isYearly, setIsYearly] = useState(false);
  const pricingRef = useRef<HTMLDivElement>(null);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  useEffect(() => {
    dispatch(setSelectedPlanType(isYearly ? "yearly" : "monthly"));
  }, [isYearly, dispatch]);

  const handlePlanSelect = (planIndex: number) => {
    if (planeData) {
      const selectedPlans = planeData[selectedPlanType];
      if (selectedPlans && selectedPlans[planIndex]) {
        const id: number = selectedPlans[planIndex].id;
        dispatch(setSelectedPlane(id));
      }
    }
  };

  const calculatePrice = (price: number, planName: string) => {
    if (isYearly) {
      return price;
    }
    return price;
  };

  const getPriceLabel = () => {
    return isYearly ? "/year" : "/month";
  };

  const getSavingsPercentage = (planName: string) => {
    if (planName === "Basic Plan") return 15;
    if (planName === "Premium Plan") return 20;
    if (planName === "Enterprise Plan") return 25;
    return 0;
  };

  if (!planeData || !planeData[selectedPlanType]) {
    return <div className="text-center py-12">Loading plans...</div>;
  }

  const currentPlans = planeData[selectedPlanType];
  console.log(selectedPlan);
  return (
    <div
      id="pricing"
      ref={pricingRef}
      className="py-12 px-4 bg-white dark:border-b-slate-700 dark:bg-background text-gray-950 dark:text-gray-100 border-b-[1px]"
    >
      <div className="max-w-7xl mx-auto pt-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm p-1.5 rounded-full mt-4 border border-gray-700/50">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-9 bg-white dark:border-b-slate-700 dark:bg-background">
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative rounded-2xl p-6 h-full flex flex-col transition-all duration-300 transform bg-white dark:border-b-slate-700 dark:bg-background text-gray-950 dark:text-gray-100 ${
                hoveredPlan === index
                  ? "scale-105 ring-2 ring-red-500 shadow-2xl shadow-red-500/20"
                  : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-red-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-6">
                {icons[index % icons.length].icon}
                <h3 className="text-2xl font-bold mt-4 mb-2">{plan.name}</h3>
                <p className="text-gray-400 mb-4">{plan.description}</p>
                <div className="flex items-baseline justify-center">
                  {isYearly && (
                    <span className="text-lg line-through text-gray-500 mr-2">
                      ${plan.price * 12}
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
              <div className="flex-grow space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check
                      className={`w-5 h-5 text-${
                        icons[index % icons.length].color
                      }-500 mr-3 flex-shrink-0`}
                    />
                    <span className="text-gray-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              {isAuthenticated ? (
                <button
                  onClick={() => handlePlanSelect(index)}
                  className={`w-full mt-6 bg-gray-800 text-white py-2.5 px-6 rounded-lg font-semibold text-center transition-all duration-300 transform hover:scale-105 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20 ${
                    hoveredPlan === index ? "bg-red-500 hover:bg-red-600" : ""
                  }`}
                >
                  Next Step
                </button>
              ) : (
                <Link
                  to="/auth"
                  className={`w-full mt-6 bg-gray-800 text-white py-2.5 px-6 rounded-lg font-semibold text-center transition-all duration-300 transform hover:scale-105 hover:bg-red-500 hover:shadow-lg hover:shadow-red-500/20 ${
                    hoveredPlan === index ? "bg-red-500 hover:bg-red-600" : ""
                  }`}
                >
                  Get Started
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

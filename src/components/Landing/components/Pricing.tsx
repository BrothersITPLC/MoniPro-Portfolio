import { Shield, Zap, Database, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPlane } from "@/components/Landing/LandingSlice";
import { useGetPlansQuery } from "../api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/store";

const icons = [
  {
    icon: <Shield className="w-12 h-12 text-red-500" />,
    color: "red",
  },
  {
    icon: <Zap className="w-12 h-12 text-red-500" />,
    color: "red",
  },
  {
    icon: <Database className="w-12 h-12 text-red-500" />,
    color: "red",
  },
];

interface PricingProps {
  showSelectedPlan?: boolean;
}

export function Pricing({ showSelectedPlan = false }: PricingProps) {
  const dispatch = useDispatch();
  const { data: plansData, isLoading } = useGetPlansQuery();
  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const handlePlanSelect = (planId: number) => {
    dispatch(setSelectedPlane(planId));
  };

  if (isLoading || !plansData) {
    return (
      <div className="text-center py-12 text-gray-900 dark:text-gray-300">
        Loading plans...
      </div>
    );
  }

  return (
    <div className="relative py-20 px-4 border-b-[1px] justify-center overflow-hidden bg-white dark:border-b-slate-700 dark:bg-background">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-xl md:text-3xl font-bold mb-6 text-center text-gray-900 dark:text-gray-300">
          Flexible Plans <br />
          for Every Need
        </h2>
        <p className="text-xl text-gray-900 dark:text-gray-300 mb-12 max-w-2xl mx-auto text-center">
          Choose the perfect plan that matches your monitoring requirements and
          scale as you grow.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plansData.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative bg-white dark:bg-background border-red-600 dark:border-gray-700 transition-all duration-300 hover:scale-105 
                ${plan.popular ? "border-red-600 shadow-lg scale-105" : ""} 
                ${
                  selectedPlan === plan.id && showSelectedPlan
                    ? "ring-2 ring-red-500"
                    : ""
                }
                ${!showSelectedPlan ? "hover:border-red-400" : ""}`}
            >
              {plan.popular && (
                <Badge
                  variant="default"
                  className="absolute -top-2 left-1/2 -translate-x-1/2 bg-red-500 hover:bg-red-600"
                >
                  Most Popular
                </Badge>
              )}

              <CardHeader>
                <div className="flex justify-center mb-4">
                  {icons[index % icons.length].icon}
                </div>
                <CardTitle className="text-gray-900 dark:text-gray-300">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-900 dark:text-gray-300">
                  {plan.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center text-gray-900 dark:text-gray-300">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="ml-2">/month</span>
                  </div>
                  <div className="space-y-2 mt-4">
                    {plan.deduction.map((discount) => (
                      <Badge
                        key={discount.duration}
                        variant="secondary"
                        className="mr-2 bg-red-100 text-red-500 dark:bg-red-900/30"
                      >
                        Save {discount.percentage}% on {discount.duration} plan
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-red-500 mr-3" />
                      <span className="text-sm text-gray-900 dark:text-gray-300">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {showSelectedPlan ? (
                  <Button
                    className={`w-full mt-6 bg-red-500 hover:bg-red-600 transition-all transform hover:scale-105 ${
                      selectedPlan === plan.id ? "bg-red-600" : ""
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                ) : isAuthenticated ? (
                  <Button
                    className="w-full mt-6 bg-red-500 hover:bg-red-600 transition-all transform hover:scale-105"
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    Select Plan
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    className="w-full mt-6 bg-red-500 hover:bg-red-600 transition-all transform hover:scale-105"
                    asChild
                  >
                    <Link to="/auth">Get Started</Link>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

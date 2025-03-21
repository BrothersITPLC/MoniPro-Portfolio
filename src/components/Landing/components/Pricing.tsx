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
    return <div className="text-center py-12">Loading plans...</div>;
  }

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Choose Your Plan</h2>
          <p className="text-muted-foreground mt-2">
            Select a plan that best suits your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plansData.map((plan, index) => (
            <Card
              key={plan.id}
              className={`relative transition-all duration-300 hover:scale-105 
                ${plan.popular ? "border-primary shadow-lg scale-105" : ""} 
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
                  className="absolute -top-2 left-1/2 -translate-x-1/2"
                >
                  Most Popular
                </Badge>
              )}

              <CardHeader>
                <div className="flex justify-center mb-4">
                  {icons[index % icons.length].icon}
                </div>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="text-center mb-6">
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold">${plan.price}</span>
                    <span className="text-muted-foreground ml-2">/month</span>
                  </div>
                  <div className="space-y-2 mt-4">
                    {plan.deduction.map((discount) => (
                      <Badge
                        key={discount.duration}
                        variant="secondary"
                        className="mr-2"
                      >
                        Save {discount.percentage}% on {discount.duration} plan
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {showSelectedPlan ? (
                  <Button
                    className={`w-full mt-6 ${
                      selectedPlan === plan.id ? "bg-red-500" : ""
                    }`}
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                ) : isAuthenticated ? (
                  <Button
                    className="w-full mt-6"
                    onClick={() => handlePlanSelect(plan.id)}
                  >
                    Select Plan
                  </Button>
                ) : (
                  <Button
                    onClick={() => handlePlanSelect(plan.id)}
                    className="w-full mt-6"
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

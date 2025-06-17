import { useEffect } from "react"; // Added React import
import { Shield, Zap, Database, Check, Crown } from "lucide-react";
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

import { setOrganization } from "../../Home/company/companySclice";
import type { OrganizationDataInfrence } from "../../Home/company/companySclice";

import { AnimatedBackground } from "./AnimatedBackground"; // Import AnimatedBackground

// Updated icons to directly use Tailwind classes
const icons = [
  {
    icon: <Shield className="w-12 h-12 text-primary" />,
  },
  {
    icon: <Zap className="w-12 h-12 text-primary" />,
  },
  {
    icon: <Database className="w-12 h-12 text-primary" />,
  },
  {
    icon: <Crown className="w-12 h-12 text-primary" />,
  },
];

interface PricingProps {
  showSelectedPlan?: boolean;
}

export function Pricing({ showSelectedPlan = false }: PricingProps) {
  const organizationData = useSelector(
    (state: RootState) => state.companyInfo.organizationData
  );

  const dispatch = useDispatch();
  const {
    data: plansData,
    isLoading,
    refetch,
  } = useGetPlansQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handlePlanSelect = (planId: number) => {
    dispatch(setSelectedPlane(planId));

    const selectedPlan = sortedPlansData.find((plan) => plan.id === planId);

    const type =
      selectedPlan?.name.toLowerCase() === "Individual plan".toLowerCase();

    const updatedData: OrganizationDataInfrence = {
      ...organizationData!,
      is_private: type,
    };

    dispatch(setOrganization(updatedData));
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading || !plansData) {
    return (
      <div className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>
        <div className="relative z-10 text-center text-foreground">
          Loading plans...
        </div>
      </div>
    );
  }

  const sortedPlansData = plansData.slice().sort((a, b) => a.price - b.price);

  return (
    <section
      id="pricing"
      className="relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-900 py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Gradient overlays for depth - consistent with Hero and Footer */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/60 to-background/80"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/50"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center space-x-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-primary">
              Pricing & Plans
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Flexible Plans for Every Need
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan that scales with your infrastructure and
            monitoring requirements.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {sortedPlansData
            .filter(
              (plan) =>
                !(
                  user?.is_private === false &&
                  plan.name.toLowerCase() === "individual plan"
                )
            )
            .map((plan, index) => (
              <Card
                key={plan.id}
                className={`p-6 bg-card/50 backdrop-blur-sm border-border/50 transition-all duration-300 hover:scale-[1.02] hover:bg-card/80 group flex flex-col justify-between 
                  ${
                    selectedPlan === plan.id && showSelectedPlan
                      ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                      : ""
                  }`}
              >
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    {icons[index % icons.length].icon}
                  </div>
                  <CardTitle className="text-foreground text-2xl group-hover:text-primary transition-colors duration-300">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground text-sm">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col justify-between pt-0">
                  <div className="text-center mb-6">
                    <div className="flex items-baseline justify-center text-foreground">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className="ml-2 text-muted-foreground">/month</span>
                    </div>
                    <div className="space-y-2 mt-4">
                      {plan.deduction.map((discount) => (
                        <Badge
                          key={discount.duration}
                          variant="outline"
                          className="mr-2 bg-primary/10 text-primary border-primary/20"
                        >
                          Save {discount.percentage}% on {discount.duration}{" "}
                          plan
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-primary mr-3" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {showSelectedPlan ? (
                    <Button
                      size="lg"
                      className={`w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300 ${
                        selectedPlan === plan.id ? "bg-primary/80" : ""
                      }`}
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                    </Button>
                  ) : isAuthenticated ? (
                    <Button
                      size="lg"
                      className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300"
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      Select Plan
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      onClick={() => handlePlanSelect(plan.id)}
                      className="w-full mt-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-md transition-all duration-300"
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
    </section>
  );
}

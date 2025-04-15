import { Shield, Zap, Database, Check, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPlane } from "@/components/Landing/LandingSlice";
import { useGetPlansQuery } from "../../../Landing/api";
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
import { useEffect } from "react";import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ArrowLeft } from "lucide-react"; // Import an icon for the back arrow


import { useUpdateOrganizationPaymentMutation } from '../api'

const icons = [
  {
    icon: <Shield className="w-12 h-12 text-[var(--primary)]" />,
  },
  {
    icon: <Zap className="w-12 h-12 text-[var(--primary)]" />,
  },
  {
    icon: <Database className="w-12 h-12 text-[var(--primary)]" />,
  },
  {
    icon: <Crown className="w-12 h-12 text-[var(--primary)]" />,
  },
];

interface PricingProps {
  showSelectedPlan?: boolean;
}

export function UpdatePricing({ showSelectedPlan = false }: PricingProps) {
  const navigate = useNavigate(); // Initialize useNavigate
  const dispatch = useDispatch();
  const {
    data: plansData,
    isLoading,
    refetch,
  } = useGetPlansQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [updateOrganizationPayment, {isError, error}] = useUpdateOrganizationPaymentMutation();

  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );

  const selectedDuration = useSelector(
    (state: RootState) => state.landing.selectedPlanType
  );

  let selectedDurationId = 0; 

  if (selectedDuration === "monthly") {
    selectedDurationId = 1;
  } else if (selectedDuration === "quarterly") {
    selectedDurationId = 2;
  } else if (selectedDuration === "yearly") {
    selectedDurationId = 3;
  }

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );

  const handlePlanSelect = (planId: number) => {
    dispatch(setSelectedPlane(planId));
  };

  const UpdatePricing = () => {
    updateOrganizationPayment({
      id: user?.organization_id,
      data: { 
        organization_payment_duration: selectedDurationId,
        organization_payment_plan: selectedPlan 
      }
    });
    toast.success("Pricing plan updated sucessfully.");
  };

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading || !plansData) {
    return (
      <div className="text-center py-12 text-gray-900 dark:text-gray-300">
        Loading plans...
      </div>
    );
  }

  const sortedPlansData = plansData.slice().sort((a, b) => a.price - b.price);

  return (
    <div
      id="pricing"
      className="py-20 px-4 border-b-[1px] justify-center overflow-hidden bg-white dark:border-b-slate-700 dark:bg-background"
    >
      <button
        className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-[var(--secondary)] text-white hover:bg-[var(--secondary)] transition-all transform hover:scale-105"
        onClick={() => navigate("/home/subscription")}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>
      <div className="max-w-max mx-auto">
        <h2 className="text-xl md:text-3xl font-bold mb-12 text-center text-gray-900 dark:text-gray-300">
          Update Pricing Plan <br />
          
        </h2>


        <div className="flex flex-row justify-center gap-8">
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
                className={`bg-white dark:bg-background border-[var(--primary)] dark:border-gray-700 transition-all duration-300 hover:scale-105  
                ${
                  selectedPlan === plan.id && showSelectedPlan
                    ? "ring-2 ring-[var(--primary)]"
                    : ""
                }
                ${!showSelectedPlan ? "hover:border-[var(--secondary)]" : ""}`}
                style={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div className="relative pt-4">
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
                </div>

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
                          className="mr-2 bg-[var(--acent)] text-[var(--primary)] dark:bg-[var(--acent)]/30"
                        >
                          Save {discount.percentage}% on {discount.duration}{" "}
                          plan
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center">
                        <Check className="w-5 h-5 text-[var(--primary)] mr-3" />
                        <span className="text-sm text-gray-900 dark:text-gray-300">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {showSelectedPlan ? (
                    <Button
                      className={`w-full mt-6 bg-[var(--primary)] hover:bg-[var(--secondary)] transition-all transform hover:scale-105 ${
                        selectedPlan === plan.id ? "bg-[var(--secondary)]" : ""
                      }`}
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                    </Button>
                  ) : isAuthenticated ? (
                    <Button
                      className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--secondary)] transition-all transform hover:scale-105"
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      Select Plan
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handlePlanSelect(plan.id)}
                      className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--secondary)] transition-all transform hover:scale-105"
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
      <div className="flex justify-between mt-8">
        <Button 
          className="flex items-center gap-2 bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]" 
          onClick={UpdatePricing}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
        {isError && (
          <div className="text-red-500">
            Error: {error?.data?.message || "Failed to update billing cycle"}
          </div>
        )}
      </div>

    </div>
  );
}

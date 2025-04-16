import { Shield, Zap, Database, Check, Crown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useGetPlansQuery } from "../../../Landing/api";
import { setOrganization } from "../companySclice";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { OrganizationDataInfrence } from "../companySclice";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RootState } from "@/app/store";
import { useEffect, useState } from "react";
import { toast } from "sonner"; 
import { ArrowLeft, ArrowRight, } from "lucide-react";

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
  onNext: (step: number) => void;
  setSelectedPlan: (planId: number) => void; // Add prop type for setSelectedPlanId
}

export function PricingStep({ showSelectedPlan = false, onNext, setSelectedPlan }: PricingProps) {

  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );  

  const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
  
  const dispatch = useDispatch();

  const {
    data: plansData,
    isLoading,
    refetch,
  } = useGetPlansQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const organizationData = useSelector(
    (state: RootState) => state.companyInfo.organizationData
  );

  const { user } = useSelector(
    (state: RootState) => state.auth
  );

 const handlePlanSelect = (planId: number) => {
    const updatedData: OrganizationDataInfrence = {
      ...organizationData!,
      organization_payment_plan: planId,
    };
    dispatch(setOrganization(updatedData));
    setSelectedPlan(planId);
    setSelectedPlanId(planId); 
  };

  const handleNext = () => {
    if (!selectedPlanId) {  
      toast.error("Please select a pricing type to continue.");
      return;
    }
    onNext(4); // Always go to step 4 (Subscription Plan)
  };

  const onPrevious = () => {
    onNext(2); // Go back to Information step
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

  // Filter plans based on organization's privacy status and plan name
  const filteredPlans = organizationData?.is_private
    ? sortedPlansData.filter(plan => plan.name.toLowerCase() === 'individual plan')
    : sortedPlansData.filter(plan => plan.name.toLowerCase() !== 'individual plan');
      
  return (
    <div
      id="pricing"
      className="py-20 px-4 border-b-[1px] justify-center overflow-hidden bg-white dark:border-b-slate-700 dark:bg-background"
    >
      <div className="max-w-max mx-auto">
        <div className="flex flex-row justify-center gap-8">
          {filteredPlans
            .filter(
              (plan) =>
                !(
                  user?.is_private === true &&
                  plan.name.toLowerCase() === "individual plan"
                )
            )
            .map((plan, index) => (
              <Card
                key={plan.id}
                className={`bg-white dark:bg-background border-[var(--primary)] dark:border-gray-700 transition-all duration-300 hover:scale-105  
                ${
                  selectedPlanId === plan.id && showSelectedPlan
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

                  <Button
                      className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--secondary)] transition-all transform hover:scale-105"
                      onClick={() => handlePlanSelect(plan.id)}
                    >
                      Select Plan
                 </Button>

                </CardContent>
              </Card>
            ))}

        </div>
            <div className="flex justify-between mt-8">
                <Button
                      variant="outline"
                      onClick={onPrevious}
                      className="flex items-center gap-2"
                >
                      <ArrowLeft className="w-4 h-4" />
                      Previous Step
                </Button>
               
                <Button
                onClick={handleNext}
                className="flex items-center gap-2 bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]"
                >
                   Next Step
                   <ArrowRight className="w-4 h-4" />
                </Button>
            </div>
      </div>
    </div>
  );
}

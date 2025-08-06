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
import { setSelectedPlane } from "@/components/Landing/LandingSlice";

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

interface ChangePaymentProps {
  setShowPricing: (value: boolean) => void;
}

export function ChangePayment({ setShowPricing }: ChangePaymentProps) {
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

  const { user } = useSelector((state: RootState) => state.auth);

  const handlePlanUpdate = (planId: number) => {
    const updatedData: OrganizationDataInfrence = {
      ...organizationData!,
      organization_payment_plan: planId,
    };
    setSelectedPlanId(planId);
    dispatch(setOrganization(updatedData));
    dispatch(setSelectedPlane(planId));
  };

  const handleupdate = () => {
    if (selectedPlanId === null) {
      toast.error("Please select a plan");
      return;
    }
    setShowPricing(false);
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

  // Filter plans based on organization's privacy status
  const filteredPlans = organizationData?.is_private
    ? sortedPlansData.filter(
        (plan) => plan.name.toLowerCase() === "individual plan"
      )
    : sortedPlansData.filter(
        (plan) => plan.name.toLowerCase() !== "individual plan"
      );

  return (
    <div
      id="pricing"
      className="py-12 px-4 border-b-[1px] justify-center overflow-hidden bg-white dark:border-b-slate-700 dark:bg-background"
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
                  selectedPlanId === plan.id
                    ? "ring-2 ring-[var(--primary)]"
                    : ""
                }
                hover:border-[var(--secondary)]`}
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
                    onClick={() => handlePlanUpdate(plan.id)}
                  >
                    Select Plan
                  </Button>
                </CardContent>
              </Card>
            ))}
        </div>
        <Button
          className="w-full mt-6 bg-[var(--primary)] hover:bg-[var(--secondary)] transition-all transform hover:scale-105"
          onClick={handleupdate}
        >
          Update Plan
        </Button>
        <div></div>
      </div>
    </div>
  );
}

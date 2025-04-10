import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { setOrganization } from "../companySclice";
import type { OrganizationDataInfrence } from "../companySclice";
import { toast } from "sonner";
import { Pricing } from "@/components/Landing/components/Pricing";
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  RefreshCcw,
  CalendarDays,
  CalendarCheck,
} from "lucide-react";
import { setSelectedPlane } from "@/components/Landing/LandingSlice";

interface PlanSelectionProps {
  onNext: (step: number) => void;
}

const subscriptionSchema = z.object({
  organization_payment_plan: z.number().min(1, "Payment plan is required"),
  organization_payment_duration: z
    .number()
    .min(1, "Payment duration is required"),
});

export function SubscriptionStep({ onNext }: PlanSelectionProps) {
  const dispatch = useDispatch();
  const organizationData = useSelector(
    (state: RootState) => state.companyInfo.organizationData
  );
  const plans = useSelector((state: RootState) => state.landing.plans);
  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );

  // State declarations
  const [showPricing, setShowPricing] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState<number>(
    organizationData?.organization_payment_duration || 0
  );

  // Form setup
  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      organization_payment_plan:
        organizationData?.organization_payment_plan || 0,
      organization_payment_duration:
        organizationData?.organization_payment_duration || 0,
    },
  });

  // Automatically select Individual plan if is_private is true
  useEffect(() => {
    if (organizationData?.is_private) {
      const individualPlan = plans?.find(
        (plan) => plan.name.toLowerCase() === "individual plan"
      );
      if (individualPlan) {
        dispatch(setSelectedPlane(individualPlan.id));
      }
    }
  }, [organizationData?.is_private, plans, dispatch]);

  // Plan change handler
  const handlePlanChange = (planId: number) => {
    dispatch(setSelectedPlane(planId));
    const updatedData: OrganizationDataInfrence = {
      ...organizationData!,
      organization_payment_plan: planId,
    };
    dispatch(setOrganization(updatedData));
    setShowPricing(false);
  };

  const handleDurationSelect = (durationId: number) => {
    setSelectedDuration(durationId);
    const updatedData: OrganizationDataInfrence = {
      ...organizationData!,
      organization_payment_duration: durationId,
      organization_payment_plan: selectedPlan,
    };
    dispatch(setOrganization(updatedData));
    form.setValue("organization_payment_duration", durationId);
    form.setValue("organization_payment_plan", selectedPlan);
  };

  const handleNext = () => {
    if (!selectedDuration) {
      toast.error("Please select a subscription duration to continue.");
      return;
    }
    onNext(4);
  };

  const onPrevious = () => {
    onNext(2);
  };

  const handleChangePlan = () => {
    setShowPricing(true);
  };

  const selectedPlanData = plans?.find((plan) => plan.id === selectedPlan);

  if (!selectedPlanData) {
    return <div>Loading plan details...</div>;
  }

  if (showPricing) {
    return (
      <div className="max-w-7xl mx-auto py-10">
        <Pricing
          showSelectedPlan={true}
          onPlanSelect={(planId) => {
            dispatch(setSelectedPlane(planId));
            handlePlanChange(planId);
          }}
        />
        <div className="mt-8 flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowPricing(false)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Subscription
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 mt-12">
      {/* Add Change Plan button for non-private accounts */}
      {!organizationData?.is_private && (
        <div className="mb-4">
          <Button
            variant="outline"
            onClick={handleChangePlan}
            className="hover:text-red-700 hover:bg-red-50 transition-colors"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Change Selected Plan
          </Button>
        </div>
      )}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-3 flex items-center justify-center gap-2"></h2>
        <div className="text-center mb-4 bg-[var(--light)] dark:bg-neutral-800 dark:border-2 dark:text-white py-3 rounded-lg">
          <span className="text-lg font-medium inline-flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-[var(--secondary)]" />
            Selected Plan:{" "}
            <span className="text-red-600 font-semibold">
              {selectedPlanData.name}
            </span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Monthly Card */}
        <Card
          className={`cursor-pointer transition-all hover:scale-105 group ${
            selectedDuration === 1
              ? "border-[var(--secondary)] shadow-lg ring-2 ring-[var(--secondary)]/20"
              : "hover:border-[var(--secondary)]/50"
          }`}
          onClick={() => handleDurationSelect(1)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar
                className={`w-5 h-5 ${
                  selectedDuration === 1
                    ? "text-[var(--secondary)]"
                    : "text-gray-400 group-hover:text-[var(--secondary)]"
                }`}
              />
              Monthly
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-3">
              <p className="text-3xl font-bold text-[var(--secondary)]">
                ${selectedPlanData?.price}
              </p>
              <p className="text-muted-foreground">Billed Monthly</p>
              {selectedDuration === 1 && (
                <div className="text-[var(--secondary)] text-sm font-medium">
                  ✓ Currently Selected
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Other duration cards */}
        {selectedPlanData.deduction.map((duration) => (
          <Card
            key={duration.duration_id}
            className={`cursor-pointer transition-all hover:scale-105 group ${
              selectedDuration === duration.duration_id
                ? "border-[var(--secondary)] shadow-lg ring-2 ring-[var(--secondary)]/20"
                : "hover:border-[var(--secondary)]/50"
            }`}
            onClick={() => handleDurationSelect(duration.duration_id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                {duration.duration === "yearly" ? (
                  <CalendarCheck
                    className={`w-5 h-5 ${
                      selectedDuration === duration.duration_id
                        ? "text-[var(--secondary)]"
                        : "text-gray-400 group-hover:text-[var(--secondary)]"
                    }`}
                  />
                ) : (
                  <CalendarDays
                    className={`w-5 h-5 ${
                      selectedDuration === duration.duration_id
                        ? "text-[var(--secondary)]"
                        : "text-gray-400 group-hover:text-[var(--secondary)]"
                    }`}
                  />
                )}
                {duration.duration === "yearly" ? "Yearly" : "Quarterly"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="bg-[var(--light)] dark:bg-neutral-800 text-[var(--secondary)] font-bold text-2xl py-2 rounded-full">
                  {duration.percentage}% OFF
                </div>
                <p className="text-muted-foreground">
                  {duration.duration === "yearly"
                    ? "Annual Billing"
                    : "Quarterly Billing"}
                </p>
                <p className="text-lg font-semibold text-[var(--secondary)]">
                  $
                  {Math.round(
                    selectedPlanData?.price * (1 - duration.percentage / 100)
                  )}
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    / month
                  </span>
                </p>
                {selectedDuration === duration.duration_id && (
                  <div className="text-[var(--secondary)] text-sm font-medium">
                    ✓ Currently Selected
                  </div>
                )}
              </div>
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
          disabled={!selectedDuration}
          className="flex items-center gap-2 bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]"
        >
          Next Step
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}

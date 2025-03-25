import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { PlanFeature } from "@/components/Landing/LandingSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
interface SubscriptionStepProps {
  form: UseFormReturn<any>;
  selectedPlan: number;
  plansData: PlanFeature[] | undefined;
  onPrevious: () => void;
  onNext: () => void;
  onChangePlan: () => void; // Add this prop for handling plan change
}

export function SubscriptionStep({
  form,
  selectedPlan,
  plansData,
  onPrevious,
  onNext,
  onChangePlan,
}: SubscriptionStepProps) {
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);
  const { user } = useSelector((state: RootState) => state.auth);
  const handleDurationSelect = (durationId: number) => {
    setSelectedDuration(durationId);
    form.setValue("organization_payment_duration", durationId); // Update this line
    form.setValue("duration_id", durationId); // Keep this for backward compatibility if needed
  };

  const selectedPlanData = plansData?.find((plan) => plan.id === selectedPlan);

  return (
    <div className="max-w-3xl mx-auto py-10">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-center mb-2">
          Select Subscription Duration
        </h2>
        {selectedPlanData && (
          <div className="text-center mb-4">
            <span className="text-lg font-medium text-primary">
              Selected Plan: {selectedPlanData.name}
            </span>
          </div>
        )}
        <p className="text-center text-muted-foreground">
          Choose your preferred billing cycle
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {selectedPlan && !user?.is_private && (
          <div className="col-span-full mb-4">
            <Button
              variant="link"
              onClick={onChangePlan}
              className="text-blue-500 hover:text-blue-700"
            >
              Change Selected Plan
            </Button>
          </div>
        )}

        {/* Monthly Card */}
        <Card
          className={`cursor-pointer transition-all hover:scale-105 ${
            selectedDuration === 1
              ? "border-primary shadow-lg"
              : "hover:border-primary"
          }`}
          onClick={() => handleDurationSelect(1)}
        >
          <CardHeader>
            <CardTitle>Monthly</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">
                ${selectedPlanData?.price}
              </p>
              <p className="text-muted-foreground">Monthly Billing</p>
            </div>
          </CardContent>
        </Card>

        {/* Other duration cards */}
        {selectedPlanData?.deduction.map((duration) => (
          <Card
            key={duration.duration_id}
            className={`cursor-pointer transition-all hover:scale-105 ${
              selectedDuration === duration.duration_id
                ? "border-primary shadow-lg"
                : "hover:border-primary"
            }`}
            onClick={() => handleDurationSelect(duration.duration_id)}
          >
            <CardHeader>
              <CardTitle className="capitalize">{duration.duration}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">
                  {duration.percentage}% OFF
                </p>
                <p className="text-muted-foreground">
                  {duration.duration === "yearly"
                    ? "Annual Billing"
                    : "Quarterly Billing"}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  ${selectedPlanData?.price * (1 - duration.percentage / 100)} /
                  month
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Button variant="outline" onClick={onPrevious}>
          Previous Step
        </Button>
        <Button onClick={onNext} disabled={!selectedDuration}>
          Next Step
        </Button>
      </div>
    </div>
  );
}

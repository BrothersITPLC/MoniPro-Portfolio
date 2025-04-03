import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UseFormReturn } from "react-hook-form";
import { PlanFeature } from "@/components/Landing/LandingSlice";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { Calendar, Clock, ArrowLeft, ArrowRight, RefreshCcw, CalendarDays, CalendarCheck } from "lucide-react";

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
    form.setValue("organization_payment_duration", durationId);
    form.setValue("duration_id", durationId);
  };

  const selectedPlanData = plansData?.find((plan) => plan.id === selectedPlan);

  return (
    <div className="max-w-3xl mx-auto py-10 mt-12">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-3 flex items-center justify-center gap-2">
          <Clock className="w-8 h-8 text-red-500" />
          Select Subscription Duration
        </h2>
        {selectedPlanData && (
          <div className="text-center mb-4 bg-red-50 py-3 rounded-lg">
            <span className="text-lg font-medium inline-flex items-center gap-2">
              <RefreshCcw className="w-5 h-5 text-red-500" />
              Selected Plan:{" "}
              <span className="text-red-600 font-semibold">{selectedPlanData.name}</span>
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {selectedPlan && !user?.is_private && (
          <div className="col-span-full mb-4">
            <Button
              variant="outline"
              onClick={onChangePlan}
              className="text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Change Selected Plan
            </Button>
          </div>
        )}

        {/* Monthly Card */}
        <Card
          className={`cursor-pointer transition-all hover:scale-105 group ${
            selectedDuration === 1
              ? "border-red-500 shadow-lg ring-2 ring-red-500/20"
              : "hover:border-red-500/50"
          }`}
          onClick={() => handleDurationSelect(1)}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar className={`w-5 h-5 ${selectedDuration === 1 ? 'text-red-500' : 'text-gray-400 group-hover:text-red-500'}`} />
              Monthly
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-3">
              <p className="text-3xl font-bold text-red-500">
                ${selectedPlanData?.price}
              </p>
              <p className="text-muted-foreground">Billed Monthly</p>
              {selectedDuration === 1 && (
                <div className="text-red-500 text-sm font-medium">
                  ✓ Currently Selected
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Other duration cards */}
        {selectedPlanData?.deduction.map((duration) => (
          <Card
            key={duration.duration_id}
            className={`cursor-pointer transition-all hover:scale-105 group ${
              selectedDuration === duration.duration_id
                ? "border-red-500 shadow-lg ring-2 ring-red-500/20"
                : "hover:border-red-500/50"
            }`}
            onClick={() => handleDurationSelect(duration.duration_id)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                {duration.duration === "yearly" ? (
                  <CalendarCheck className={`w-5 h-5 ${selectedDuration === duration.duration_id ? 'text-red-500' : 'text-gray-400 group-hover:text-red-500'}`} />
                ) : (
                  <CalendarDays className={`w-5 h-5 ${selectedDuration === duration.duration_id ? 'text-red-500' : 'text-gray-400 group-hover:text-red-500'}`} />
                )}
                {duration.duration === "yearly" ? "Yearly" : "Quarterly"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="bg-red-50 text-red-500 font-bold text-2xl py-2 rounded-full">
                  {duration.percentage}% OFF
                </div>
                <p className="text-muted-foreground">
                  {duration.duration === "yearly" ? "Annual Billing" : "Quarterly Billing"}
                </p>
                <p className="text-lg font-semibold text-red-500">
                  ${Math.round(selectedPlanData?.price * (1 - duration.percentage / 100))}
                  <span className="text-sm text-muted-foreground"> / month</span>
                </p>
                {selectedDuration === duration.duration_id && (
                  <div className="text-red-500 text-sm font-medium">
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
          onClick={onNext} 
          disabled={!selectedDuration}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600"
        >
          Next Step
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
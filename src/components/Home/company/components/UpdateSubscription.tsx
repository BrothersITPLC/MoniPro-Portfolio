import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { RootState } from "@/app/store";
import { useGetPlansQuery } from "@/components/Landing/api";
import { useUpdateOrganizationPaymentMutation } from "../api";
import { Pricing } from "@/components/Landing/components/Pricing";
import { SubscriptionStep } from "./SubscriptionStep";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster } from "@/components/ui/sonner";
import { SubscriptionConfirmationDialog } from "./SubscriptionConfirmationDialog";

export function UpdateSubscription() {
  const [showPricing, setShowPricing] = useState(false);
  const [showDuration, setShowDuration] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );

  const { user } = useSelector((state: RootState) => state.auth);

  const { data: plansData, isLoading } = useGetPlansQuery();
  const [updatePayment, { isLoading: isUpdating }] =
    useUpdateOrganizationPaymentMutation();

  const form = useForm({
    defaultValues: {
      organization_payment_plane: selectedPlan,
      organization_payment_duration: null,
    },
  });

  // Get the selected duration details
  const getDurationDetails = () => {
    const durationId = form.getValues("organization_payment_duration");
    const currentPlan = plansData?.find((plan) => plan.id === selectedPlan);

    if (!currentPlan || !durationId) return { name: "Monthly", savings: 0 };

    if (durationId === 1) return { name: "Monthly", savings: 0 };

    const durationInfo = currentPlan.deduction.find(
      (d) => d.duration_id === durationId
    );

    return {
      name: durationInfo?.duration || "Monthly",
      savings: durationInfo?.percentage || 0,
    };
  };

  const handleUpdatePlan = () => {
    const duration = form.getValues("organization_payment_duration");
    if (!selectedPlan || !duration) {
      toast.error("Please select both plan and duration");
      return;
    }
    setShowConfirmation(true);
  };

  const confirmUpdate = async () => {
    try {
      const duration = form.getValues("organization_payment_duration");
      const payload = {
        organization_payment_plane: selectedPlan,
        organization_payment_duration: duration,
      };

      await updatePayment({
        id: user?.organization_id,
        data: payload,
      }).unwrap();

      toast.success("Subscription updated successfully!");
      setShowPricing(false);
      setShowDuration(false);
      setShowConfirmation(false);
    } catch (error) {
      toast.error("Failed to update subscription");
      console.error("Update error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading subscription details...</p>
      </div>
    );
  }

  const currentPlan = plansData?.find((plan) => plan.id === selectedPlan);
  const durationDetails = getDurationDetails();

  const renderContent = () => {
    if (showPricing) {
      return (
        <div>
          <Pricing showSelectedPlan={true} />
          <div className="flex justify-center gap-4 mt-6">
            <Button variant="outline" onClick={() => setShowPricing(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (selectedPlan) {
                  setShowDuration(true);
                  setShowPricing(false);
                } else {
                  toast.error("Please select a plan first");
                }
              }}
            >
              Continue with Selected Plan
            </Button>
          </div>
        </div>
      );
    }

    if (showDuration) {
      return (
        <div>
          <SubscriptionStep
            form={form}
            selectedPlan={selectedPlan}
            plansData={plansData}
            onPrevious={() => setShowDuration(false)}
            onNext={handleUpdatePlan}
            onChangePlan={() => {
              setShowDuration(false);
              setShowPricing(true);
            }}
          />
        </div>
      );
    }

    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              Review and manage your current subscription plan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-medium">
                    {currentPlan?.name || "No Plan Selected"}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    ${currentPlan?.price}/month
                  </p>
                </div>
                <Button onClick={() => setShowPricing(true)}>
                  Change Plan
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Billing Cycle</CardTitle>
            <CardDescription>
              Update your billing duration to save more
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setShowDuration(true)}>
              Update Billing Cycle
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster />
      <SubscriptionConfirmationDialog
        open={showConfirmation}
        onOpenChange={setShowConfirmation}
        onConfirm={confirmUpdate}
        isLoading={isUpdating}
        planName={currentPlan?.name || ""}
        planPrice={currentPlan?.price || 0}
        duration={durationDetails.name}
        savings={durationDetails.savings}
      />
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Subscription Management</h1>
        <p className="text-muted-foreground mt-2">
          Update or change your subscription plan and billing cycle
        </p>
      </div>
      {renderContent()}
    </div>
  );
}

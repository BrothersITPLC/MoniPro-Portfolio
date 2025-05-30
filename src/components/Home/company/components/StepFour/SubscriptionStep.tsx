import { Button } from "@/components/ui/button";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { setOrganization } from "../../companySclice";
import { useNavigate } from "react-router-dom";
import type { OrganizationDataInfrence } from "../../companySclice";
import { toast } from "sonner";
import {
  Calendar,
  ArrowLeft,
  ArrowRight,
  RefreshCcw,
  CalendarDays,
  CalendarCheck,
} from "lucide-react";
import { ChangePayment } from "../ChangePaymentplan";
import { useGetPlansQuery } from "../../../../Landing/api";
import { useOrganizationInfoMutation } from "../../api";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface PlanSelectionProps {
  onNext: (step: number) => void;
  selectedPlanId: number | null;
}

const subscriptionSchema = z.object({
  organization_payment_duration: z
    .number()
    .min(1, "Payment duration is required"),
});

export function SubscriptionStep({
  onNext,
  selectedPlanId,
}: PlanSelectionProps) {
  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );

  const dispatch = useDispatch();
  const organizationData = useSelector(
    (state: RootState) => state.companyInfo.organizationData
  );

  const { data: plansData, isLoading: isPlanDataLoading } = useGetPlansQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  const navigate = useNavigate();

  const [showPricing, setShowPricing] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedDuration, setSelectedDuration] = useState<number>(
    organizationData?.organization_payment_duration || 0
  );

  const form = useForm<z.infer<typeof subscriptionSchema>>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      organization_payment_duration:
        organizationData?.organization_payment_duration || 0,
    },
  });

  const selectedPlanData = plansData?.find(
    (plan) => plan.id === selectedPlanId
  );

  const handleDurationSelect = (durationId: number) => {
    setSelectedDuration(durationId);
    const updatedData: OrganizationDataInfrence = {
      ...organizationData!,
      organization_payment_duration: durationId,
    };

    dispatch(setOrganization(updatedData));
    form.setValue("organization_payment_duration", durationId);
  };

  const onPrevious = () => {
    onNext(selectedPlan === 0 ? 3 : 1);
  };

  const handleChangePlan = () => {
    setShowPricing(true);
  };

  if (isPlanDataLoading || !selectedPlanData) {
    return <div>Loading plan details...</div>;
  }

  //////////////////////////////////////////////////////////
  const [organizationInfo, { isLoading: isSubmitting }] =
    useOrganizationInfoMutation();

  const handleConfirmSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await organizationInfo(organizationData).unwrap();

      setIsLoading(false);
      setShowConfirmDialog(false);

      if (response.status === "success") {
        toast.success(response.message || "Profile updated successfully");

        setTimeout(() => {
          navigate("/home/payment");
        }, 300);
      } else {
        toast.error(response.message || "An error occurred during submission");
        onNext(1);
      }
    } catch (error: any) {
      setIsLoading(false);
      setShowConfirmDialog(false);

      const errorMessage =
        error?.data?.message ||
        "Failed to process your request. Please try again.";
      toast.error(errorMessage);

      onNext(1);
    }
  };

  //////////////////////////////////////////////////
  if (showPricing) {
    return (
      <div className="max-w-7xl mx-auto py-6">
        <div className="flex justify-center">
          <Button
            variant="outline"
            onClick={() => setShowPricing(false)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Subscription
          </Button>
        </div>
        <ChangePayment setShowPricing={setShowPricing} />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10 mt-12">
      {selectedPlan != 0 && (
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
          type="submit"
          disabled={isLoading || isSubmitting || !selectedDuration}
          onClick={() => setShowConfirmDialog(true)}
          className="flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--primary)] text-white"
        >
          {isLoading || isSubmitting ? "Processing..." : "Complete Setup"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to complete your First subscription setup.The next
              step is to complete the payment process.Are you sure you want to
              proceed?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading || isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSubmit}
              disabled={isLoading || isSubmitting}
              className="bg-[var(--secondary)] hover:bg-[var(--primary)]"
            >
              {isLoading || isSubmitting
                ? "Processing..."
                : "Confirm and Complete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

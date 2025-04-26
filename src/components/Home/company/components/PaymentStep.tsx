import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import Telebit from "@/components/ui/images/telebirr.jpg";
import chapa from "@/components/ui/images/chapa.jpg";
import * as z from "zod";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { setOrganization } from "../companySclice";
import type { OrganizationDataInfrence } from "../companySclice";
import { useOrganizationInfoMutation } from "../api";
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
import { setSelectedPlane } from "@/components/Landing/LandingSlice";

interface PlanSelectionProps {
  onNext: (step: number) => void;
  selectedPlanId: number;  // Add type annotation
}

export function PaymentStep({ onNext, selectedPlanId }: PlanSelectionProps) {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedPlan = useSelector((state: RootState) => state.landing.SelectedPlane);

  const organizationData = useSelector(
    (state: RootState) => state.companyInfo.organizationData
  );
  const [organizationInfo, { isLoading: isSubmitting }] =
    useOrganizationInfoMutation();

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(
    organizationData?.payment_provider || 0
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const onSubmit = async () => {
    if (!selectedPaymentMethod) {
      toast.error("Please select a payment method to continue.");
      return;
    }

    // Update the organization data with the selected payment method
    const updatedData: OrganizationDataInfrence = {
      ...organizationData!,
      payment_provider: selectedPaymentMethod,
    };
    
    console.log("updatedData", updatedData);
    dispatch(setOrganization(updatedData));

    // Show confirmation dialog
    setShowConfirmDialog(true);
  };

  const handleConfirmSubmit = async () => {
    setIsLoading(true);
    try {
      dispatch(setSelectedPlane(selectedPlanId));
      
      const response = await organizationInfo(organizationData).unwrap();

      setIsLoading(false);
      setShowConfirmDialog(false);

      if (response.status === "success") {
        toast.success(response.message || "Profile updated successfully");
        console.log("this is the final data to be sent", response);
        
        setTimeout(() => {
          navigate("/home/dashboard");
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

  const handleSubmit = () => {
    onSubmit();
  };

  const onPrevious = () => {
    onNext(selectedPlan === 0 ? 4 : 2); // If selectedPlan is 0, go back to Subscription Plan, else go back to Subscription Plan
  };

  return (
    <>
      <div className="max-w-3xl mx-auto py-10">
        <div className="text-center mb-10 mt-30">
          {/* <h2 className="text-2xl font-bold mb-2">Select Payment Method</h2>
          <p className="text-muted-foreground">
            Choose your preferred payment method to complete your subscription
          </p> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card
            className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedPaymentMethod === 1
                ? "ring-2 ring-[var(--secondary)] bg-red-50"
                : "hover:border-[var(--secondary)]"
            }`}
            onClick={() => setSelectedPaymentMethod(1)}
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 overflow-hidden rounded-lg">
                  <img
                    src={Telebit}
                    alt="TelleBirr"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">TelleBirr</h3>
              </div>
              <p className="text-muted-foreground">
                Pay using TelleBirr mobile money
              </p>
              {selectedPaymentMethod === 1 && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-6 h-6 text-[var(--secondary)]" />
                </div>
              )}
            </div>
          </Card>

          <Card
            className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
              selectedPaymentMethod === 2
                ? "ring-2 ring-[var(--secondary)] bg-red-50"
                : "hover:border-[var(--secondary)]"
            }`}
            onClick={() => setSelectedPaymentMethod(2)}
          >
            <div className="p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 overflow-hidden rounded-lg">
                  <img
                    src={chapa}
                    alt="Chapa"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold">Chapa</h3>
              </div>
              <p className="text-muted-foreground">
                Pay using Chapa payment gateway
              </p>
              {selectedPaymentMethod === 2 && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="w-6 h-6 text-[var(--secondary)]" />
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="flex justify-between mt-12">
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
            disabled={isLoading || isSubmitting || !selectedPaymentMethod}
            onClick={handleSubmit}
            className="flex items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--primary)] text-white"
          >
            {isLoading || isSubmitting ? "Processing..." : "Complete Setup"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Subscription</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to complete your subscription setup. This will
              finalize your account configuration and payment method selection.
              Are you sure you want to proceed?
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
    </>
  );
}

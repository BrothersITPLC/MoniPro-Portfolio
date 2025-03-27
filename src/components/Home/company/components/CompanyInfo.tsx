import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { CompanyInfoStep } from "./CompanyInfoStep";
import { SubscriptionStep } from "./SubscriptionStep";
import { PaymentStep } from "./PaymentStep";
import { Button } from "@/components/ui/button";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useOrganizationInfoMutation } from "../api";
import { Pricing } from "@/components/Landing/components/Pricing";
import { Toaster } from "@/components/ui/sonner";

// First, update the form schema to include duration_id
const formSchema = z.object({
  organization_name: z.string().min(1, "Organization Name is required"),
  organization_phone: z
    .string()
    .min(1, "Organization Phone Number is required"),
  organization_website: z
    .string()
    .min(1, "Organization Website Url is required"),
  organization_description: z
    .string()
    .min(1, "Company Description is required"),
  payment_provider: z.number().optional(),
  organization_payment_plane: z.number().optional(),
  organization_payment_duration: z.number().optional(),
  duration_id: z.number().optional(), // Add this field
  user_id: z.number().optional(),
});

const steps = [
  { id: 1, name: "Company Information" },
  { id: 2, name: "Subscription Plan" },
  { id: 3, name: "Payment Method" },
];

// Add this import
import { useGetPlansQuery } from "@/components/Landing/api";

export function CompanyInfo() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1);
  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const [showPricing, setShowPricing] = useState(false);

  // Move the query hook to the top level
  const {
    data: plansData,
    isLoading: isPlansLoading,
    error: plansError,
  } = useGetPlansQuery();

  // Add the API mutation hook
  const [submitOrganizationInfo, { isLoading }] = useOrganizationInfoMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization_name: user?.user_name || "",
      organization_phone: user?.organization_phone || "",
      organization_website: user?.organization_website || "",
      organization_description: user?.organization_description || "",
      payment_provider: 1,
      user_id: user?.user_id,
      organization_payment_plane: selectedPlan,
    },
  });

  // Update form values when selectedPlan or selectedPaymentMethod changes
  useEffect(() => {
    form.setValue("organization_payment_plane", selectedPlan);
    form.setValue("payment_provider", selectedPaymentMethod);
  }, [selectedPlan, selectedPaymentMethod, form]);

  // Then in the onSubmit function, update the finalSubmission object
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (currentStep === 3) {
        if (!selectedPaymentMethod) {
          toast.error("Please select a payment method before submitting.");
          return;
        }

        const finalSubmission = {
          ...values,
          payment_provider: selectedPaymentMethod,
          organization_payment_plane: selectedPlan,
          organization_payment_duration: values.duration_id,
          user_id: user?.user_id,
        };

        console.log("Final Submission:", finalSubmission);

        // Make the API call
        const response = await submitOrganizationInfo(finalSubmission).unwrap();
        console.log("API Response:", response);

        toast.success("Organization information submitted successfully!");
        navigate("/home/team");
      } else {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
  };

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1));
  };

  const handleChangePlan = () => {
    setShowPricing(true);
  };

  const renderStepContent = () => {
    if (showPricing) {
      return (
        <div>
          <Pricing showSelectedPlan={true} />
          <div className="flex justify-center mt-4">
            <Button
              variant="default"
              onClick={() => setShowPricing(false)}
              className="px-6"
            >
              Continue with Selected Plan
            </Button>
          </div>
        </div>
      );
    }

    switch (currentStep) {
      case 1:
        return <CompanyInfoStep form={form} onSubmit={onSubmit} />;
      case 2:
        if (isPlansLoading) {
          return (
            <div className="flex items-center justify-center py-10">
              <div className="text-center">
                <p>Loading subscription plans...</p>
              </div>
            </div>
          );
        }

        if (plansError) {
          return (
            <div className="flex items-center justify-center py-10">
              <div className="text-center text-red-500">
                <p>Error loading subscription plans. Please try again later.</p>
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  className="mt-4"
                >
                  Go Back
                </Button>
              </div>
            </div>
          );
        }

        return (
          <SubscriptionStep
            form={form}
            selectedPlan={selectedPlan}
            plansData={plansData}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onChangePlan={handleChangePlan}
          />
        );
      case 3:
        return (
          <PaymentStep
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            onPrevious={handlePrevious}
            onSubmit={form.handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4">
      <Toaster />
      <div className="mb-8">
        <div className="flex items-center justify-center space-x-4">
          {steps.map((step) => (
            <div key={step.id} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= step.id
                    ? "bg-red-500 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                {step.id}
              </div>
              <span className="ml-2 text-sm font-medium">{step.name}</span>
              {step.id !== steps.length && (
                <div className="w-12 h-1 mx-4 bg-gray-200">
                  <div
                    className={`h-full ${
                      currentStep > step.id ? "bg-red-500" : ""
                    }`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {renderStepContent()}
    </div>
  );
}

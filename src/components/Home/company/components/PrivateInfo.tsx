import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useEffect } from "react";
import { SubscriptionStep } from "./SubscriptionStep";
import { PaymentStep } from "./PaymentStep";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { usePrivateInfoMutation } from "../api";
import { Toaster } from "@/components/ui/sonner";
import { useGetPlansQuery } from "@/components/Landing/api";
import { setSelectedPlane } from "@/components/Landing/LandingSlice";

const formSchema = z.object({
  payment_provider: z.number().optional(),
  organization_payment_plane: z.number().optional(),
  organization_payment_duration: z.number().optional(),
  user_id: z.number().optional(),
  duration_id: z.number().optional(),
});

const steps = [
  { id: 1, name: "Subscription Plan" },
  { id: 2, name: "Payment Method" },
];

export function PrivateInfo() {
  const dispatch = useDispatch();

  const { user } = useSelector((state: RootState) => state.auth);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1);
  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );

  const { data: RefechedplansData, refetch } = useGetPlansQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

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
  const [submitPrivateInfo, { isLoading }] = usePrivateInfoMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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

  useEffect(() => {
    refetch();
    if (user?.is_private) {
      const planId = RefechedplansData?.find(
        (plan) => plan.name.toLowerCase() === "individual plan"
      )?.id;
      dispatch(setSelectedPlane(planId || 4));
    }
  }, [user]);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (currentStep === 2) {
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
        await submitPrivateInfo(finalSubmission).unwrap();
        toast.success("Private account information submitted successfully!");
        navigate("/home/dashbord");
      } else {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length));
      }
    } catch (error) {
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
    switch (currentStep) {
      case 1:
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
              </div>
            </div>
          );
        }

        return (
          <SubscriptionStep
            form={form}
            selectedPlan={selectedPlan}
            plansData={plansData}
            onPrevious={() => navigate(-1)}
            onNext={handleNext}
            onChangePlan={handleChangePlan}
          />
        );
      case 2:
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

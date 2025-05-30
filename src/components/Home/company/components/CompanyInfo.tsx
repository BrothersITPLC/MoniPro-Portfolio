import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CheckSquare, Clock, CreditCard, User } from "lucide-react";

import type { RootState } from "@/app/store";
import { PlanSelection } from "./StepOne/PlanSelection";
import { PersonalInfoStep } from "./StepTwo/PersonalInfoStep";
import { CompanyInfoStep } from "./StepTwo/CompanyInfoStep";
import { PricingStep } from "./StepThree/PaymentplaneSelection";
import { SubscriptionStep } from "./StepFour/SubscriptionStep";
import { setOrganization } from "../companySclice";

export function CompanyInfo() {
  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );

  const [selectedPlanId, setSelectedPlanId] = useState<number>(0);

  const steps =
    selectedPlan === 0
      ? [
          { id: 1, name: "Account Type", icon: CheckSquare },
          { id: 2, name: "Information", icon: User },
          { id: 3, name: "Payment Plane", icon: CreditCard },
          { id: 4, name: "Subscription Plan", icon: Clock },
        ]
      : [
          { id: 1, name: "Information", icon: User },
          { id: 2, name: "Subscription Plan", icon: Clock },
        ];

  const dispatch = useDispatch();

  const organizationData = useSelector(
    (state: RootState) => state.companyInfo.organizationData
  );
  const userData = useSelector((state: RootState) => state.auth);

  console.log("This is selectedPlan", selectedPlanId);

  const user_id = userData?.user?.user_id;

  const [currentStep, setCurrentStep] = useState(selectedPlan === 0 ? 1 : 1);

  const handleNext = (step: number) => {
    setCurrentStep(step);
  };

  // Initialize organization data with user_id when component mounts
  useEffect(() => {
    if (user_id && organizationData) {
      dispatch(
        setOrganization({
          ...organizationData,
          user_id: user_id,
        })
      );
    }
  }, []);

  return (
    <div className="container mx-auto">
      {/* Updated stepper UI with animations */}
      <div className="flex items-center justify-center pt-4 mb-12">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className="relative">
              {/* Step circle with icon */}
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep >= step.id
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-950"
                }`}
              >
                <step.icon className="w-6 h-6" />
                {/* Completion check mark */}
                {currentStep > step.id && (
                  <div className="absolute -right-3 -bottom-3 bg-white p-1.5 rounded-full shadow-lg">
                    <svg
                      className="w-4 h-4 text-primary"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={5}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
              {/* Step name */}
              <div
                className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium ${
                  currentStep >= step.id ? "text-primary" : "text-gray-500"
                }`}
              >
                {step.name}
              </div>
            </div>
            {/* Connector line */}
            {index < steps.length - 1 && (
              <div className="w-64 mx-4 h-1 bg-gray-200">
                <div
                  className={`h-full transition-all duration-300 ${
                    currentStep > step.id ? "bg-primary" : ""
                  }`}
                  style={{
                    width:
                      currentStep > step.id
                        ? "100%"
                        : currentStep === step.id
                        ? "50%"
                        : "0%",
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Plan Selection (only for selectedPlan === 0) */}
      {selectedPlan === 0 && currentStep === 1 && (
        <PlanSelection onNext={handleNext} />
      )}

      {/* Step 2 for selectedPlan === 0, Step 1 for others: Information */}
      {((selectedPlan === 0 && currentStep === 2) ||
        (selectedPlan !== 0 && currentStep === 1)) && (
        <>
          {organizationData?.is_private ? (
            <PersonalInfoStep onNext={handleNext} />
          ) : (
            <CompanyInfoStep onNext={handleNext} />
          )}
        </>
      )}

      {/* Step 3: Pricing (only for selectedPlan === 0) */}
      {selectedPlan === 0 && currentStep === 3 && (
        <PricingStep onNext={handleNext} setSelectedPlan={setSelectedPlanId} />
      )}

      {/* Step 4 for selectedPlan === 0, Step 2 for others: Subscription */}
      {((selectedPlan === 0 && currentStep === 4) ||
        (selectedPlan !== 0 && currentStep === 2)) && (
        <SubscriptionStep
          onNext={handleNext}
          selectedPlanId={selectedPlan === 0 ? selectedPlanId : selectedPlan}
        />
      )}

      {/* Step 5 for selectedPlan === 0, Step 3 for others: Payment
      {((selectedPlan === 0 && currentStep === 5) ||
        (selectedPlan !== 0 && currentStep === 3)) && (
        <PaymentStep
          onNext={handleNext}
          selectedPlanId={selectedPlan === 0 ? selectedPlanId : selectedPlan}
        />
      )} */}
    </div>
  );
}

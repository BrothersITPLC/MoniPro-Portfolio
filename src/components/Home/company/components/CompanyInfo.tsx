import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "@/app/store";
import { PlanSelection } from "./PlanSelection";
import { PersonalInfoStep } from "./PersonalInfoStep";
import { CompanyInfoStep } from "./CompanyInfoStep";
import { SubscriptionStep } from "./SubscriptionStep";
import { PaymentStep } from "./PaymentStep";
import { setOrganization } from "../companySclice";

const steps = [
  { id: 1, name: "Account Type" },
  { id: 2, name: "Information" },
  { id: 3, name: "Subscription Plan" },
  { id: 4, name: "Payment Method" },
];

export function CompanyInfo() {
  const dispatch = useDispatch();

  const organizationData = useSelector(
    (state: RootState) => state.companyInfo.organizationData
  );
  const userData = useSelector((state: RootState) => state.auth);
  const user_id = userData?.user?.user_id;

  const [currentStep, setCurrentStep] = useState(1);

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
      <div className="flex items-center justify-center space-x-8 my-8">
        {steps.map((step) => (
          <div
            key={step.id}
            className={`flex items-center ${
              currentStep >= step.id ? "text-primary" : "text-gray-400"
            }`}
          >
            <div className="w-8 h-8 rounded-full border flex items-center justify-center mr-2">
              {step.id}
            </div>
            <span>{step.name}</span>
          </div>
        ))}
      </div>

      {currentStep === 1 && <PlanSelection onNext={handleNext} />}

      {currentStep === 2 && (
        <>
          {organizationData?.is_private ? (
            <PersonalInfoStep onNext={handleNext} />
          ) : (
            <CompanyInfoStep onNext={handleNext} />
          )}
        </>
      )}

      {currentStep === 3 && <SubscriptionStep onNext={handleNext} />}

      {currentStep === 4 && <PaymentStep onNext={handleNext} />}
    </div>
  );
}

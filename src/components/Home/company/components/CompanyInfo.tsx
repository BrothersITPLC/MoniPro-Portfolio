import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useState, useEffect } from "react"
import { CompanyInfoStep } from "./CompanyInfoStep"
import { PersonalInfoStep } from "./personal-info-step"
import { PlanSelectionStep } from "./plane-selection-step"
import { SubscriptionStep } from "./SubscriptionStep"
import { PaymentStep } from "./PaymentStep"
import { CreditCard, Clock, User, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { useOrganizationInfoMutation } from "../api"
import { Pricing } from "@/components/Landing/components/Pricing"
import { Toaster } from "@/components/ui/sonner"

// First, update the form schema to include plan type and personal info fields
const formSchema = z
  .object({
    // Common fields
    payment_provider: z.number().optional(),
    organization_payment_plane: z.number().optional(),
    organization_payment_duration: z.number().optional(),
    duration_id: z.number().optional(),
    user_id: z.number().optional(),
    plan_type: z.enum(["false", "true"]).optional(),

    // Company fields
    organization_name: z.string().optional(),
    organization_phone: z.string().optional(),
    organization_website: z.string().optional(),
    organization_description: z.string().optional(),

    // Personal fields
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    phone_number: z.string().optional(),
    email: z.string().optional(),
    personal_website: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.plan_type === "false") {
        return (
          !!data.organization_name &&
          !!data.organization_phone &&
          !!data.organization_website &&
          !!data.organization_description
        )
      } else if (data.plan_type === "true") {
        return !!data.first_name && !!data.last_name && !!data.phone_number && !!data.email
      }
      return true
    },
    {
      message: "Required fields are missing",
      path: ["plan_type"],
    },
  )

// Updated steps array with plan selection as the first step
const steps = [
  { id: 1, name: "Plan Type", icon: CheckSquare },
  { id: 2, name: "Information", icon: User },
  { id: 3, name: "Subscription Plan", icon: Clock },
  { id: 4, name: "Payment Method", icon: CreditCard },
]

// Add this import
import { useGetPlansQuery } from "@/components/Landing/api"

export function CompanyInfo() {
  const { user } = useSelector((state: RootState) => state.auth)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1)
  const selectedPlan = useSelector((state: RootState) => state.landing.SelectedPlane)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedPlanType, setSelectedPlanType] = useState<"false" | "true" | null>(null)
  const navigate = useNavigate()
  const [showPricing, setShowPricing] = useState(false)

  // Move the query hook to the top level
  const { data: plansData, isLoading: isPlansLoading, error: plansError } = useGetPlansQuery()

  // Add the API mutation hook
  const [submitOrganizationInfo, { isLoading }] = useOrganizationInfoMutation()

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
      plan_type: undefined,
      first_name: "",
      last_name: "",
      phone_number: "",
      email: user?.email || "",
      personal_website: "",
    },
  })

  // Update form values when selectedPlan, selectedPaymentMethod, or selectedPlanType changes
  useEffect(() => {
    form.setValue("organization_payment_plane", selectedPlan)
    form.setValue("payment_provider", selectedPaymentMethod)
    if (selectedPlanType) {
      form.setValue("plan_type", selectedPlanType)
    }
  }, [selectedPlan, selectedPaymentMethod, selectedPlanType, form])

  // Then in the onSubmit function, update the finalSubmission object
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (currentStep === 4) {
        if (!selectedPaymentMethod) {
          toast.error("Please select a payment method before submitting.")
          return
        }

        const finalSubmission = {
          ...values,
          payment_provider: selectedPaymentMethod,
          organization_payment_plane: selectedPlan,
          organization_payment_duration: values.duration_id,
          user_id: user?.user_id,
          plan_type: selectedPlanType,
        }

        console.log("Final Submission:", finalSubmission);

        const response = await submitOrganizationInfo(finalSubmission).unwrap()

        if (response.status === "success") {
          toast.success(response.message || "Information submitted successfully!")
          setTimeout(() => {
            navigate("/home/dashboard")
          }, 1000)
        } else {
          toast.error(response.message || "Failed to submit the form. Please try again.")
        }
      } else {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length))
      }
    } catch (error: any) {
      // Handle specific error messages from the backend
      const errorMessage = error?.data?.message || "Failed to submit the form. Please try again."

      if (error?.status === 404) {
        // Handle 404 errors (User or Organization not found)
        toast.error(errorMessage)
      } else if (error?.status === 400) {
        // Handle 400 errors (Bad Request)
        toast.error(errorMessage)
      } else {
        // Handle other errors
        toast.error(errorMessage)
      }
    }
  }

  const handleNext = () => {
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length))
  }

  const handlePrevious = () => {
    setCurrentStep((prevStep) => Math.max(prevStep - 1, 1))
  }

  const handleChangePlan = () => {
    setShowPricing(true)
  }

  const handlePlanTypeSelection = () => {
    if (selectedPlanType) {
      setCurrentStep(2)
    } else {
      toast.error("Please select a plan type to continue.")
    }
  }

  const renderStepContent = () => {
    if (showPricing) {
      return (
        <div>
          <Pricing showSelectedPlan={true} />
          <div className="flex justify-center mt-4">
            <Button variant="default" onClick={() => setShowPricing(false)} className="px-6">
              Continue with Selected Plan
            </Button>
          </div>
        </div>
      )
    }

    switch (currentStep) {
      case 1:
        return (
          <PlanSelectionStep
            selectedPlanType={selectedPlanType as "false" | "true"}
            setSelectedPlanType={setSelectedPlanType}
            onNext={handlePlanTypeSelection}
          />
        )
      case 2:
        return selectedPlanType === "false" ? (
          <CompanyInfoStep form={form} onSubmit={onSubmit} onPrevious={handlePrevious} />
        ) : (
          <PersonalInfoStep form={form} onSubmit={onSubmit} onPrevious={handlePrevious} />
        )
      case 3:
        if (isPlansLoading) {
          return (
            <div className="flex items-center justify-center py-10">
              <div className="text-center">
                <p>Loading subscription plans...</p>
              </div>
            </div>
          )
        }

        if (plansError) {
          return (
            <div className="flex items-center justify-center py-10">
              <div className="text-center text-red-500">
                <p>Error loading subscription plans. Please try again later.</p>
                <Button variant="outline" onClick={handlePrevious} className="mt-4">
                  Go Back
                </Button>
              </div>
            </div>
          )
        }

        return (
          <SubscriptionStep
            form={form}
            selectedPlan={selectedPlan}
            plansData={plansData}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onChangePlan={handleChangePlan}
            planType={selectedPlanType}
          />
        )
      case 4:
        return (
          <PaymentStep
            selectedPaymentMethod={selectedPaymentMethod}
            setSelectedPaymentMethod={setSelectedPaymentMethod}
            onPrevious={handlePrevious}
            onSubmit={form.handleSubmit(onSubmit)}
            isLoading={isLoading}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="container mx-auto">
      <Toaster />
      <div className="pt-4">
        {" "}
        {/* Reduced top padding */}
        <div className="flex items-center justify-center">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className="relative">
                {/* Step circle with icon */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    currentStep >= step.id ? "bg-[var(--secondary)] text-white" : "bg-gray-100 text-gray-950"
                  }`}
                >
                  <step.icon className="w-6 h-6" />
                  {/* Completion check mark */}
                  {currentStep > step.id && (
                    <div className="absolute -right-3 -bottom-3  p-1.5 shadow-lg">
                      <svg
                        className="w-4 h-4 text-[var(--secondary)]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>
                {/* Step name */}
                <div
                  className={`absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm font-medium ${
                    currentStep >= step.id ? "text-red" : "text-gray-500"
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
                      currentStep > step.id ? "bg-[var(--secondary)]" : ""
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
  )
}

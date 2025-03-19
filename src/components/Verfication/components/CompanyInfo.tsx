import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { Pricing } from "@/components/Landing/components/Pricing";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useOrganizationInfoMutation } from "../api";

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
  user_id: z.number().optional(),
});

const steps = [
  { id: 1, name: "Company Information" },
  { id: 2, name: "Subscription Plan" },
  { id: 3, name: "Payment Method" },
];

export function CompanyInfo() {
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  console.log(userData);
  const dispatch = useDispatch();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(1);
  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  // Add the API mutation hook
  const [submitOrganizationInfo, { isLoading }] = useOrganizationInfoMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      organization_name: userData.user_name || "",
      organization_phone: userData.organization_phone || "",
      organization_website: userData.organization_website || "",
      organization_description: userData.organization_description || "",
      payment_provider: 1,
      user_id: userData.user_id,
      organization_payment_plane: selectedPlan,
    },
  });

  // Update form values when selectedPlan or selectedPaymentMethod changes
  useEffect(() => {
    form.setValue("organization_payment_plane", selectedPlan);
    form.setValue("payment_provider", selectedPaymentMethod);
  }, [selectedPlan, selectedPaymentMethod, form]);

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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="max-w-3xl mx-auto py-10">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 w-full"
              >
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="organization_name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Organization Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="organization_phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Fhone</FormLabel>
                          <FormControl>
                            <Input placeholder="09123456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="organization_website"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Website</FormLabel>
                          <FormControl>
                            <Input placeholder="Company Url" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="organization_description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about your company"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit">Next Step</Button>
              </form>
            </Form>
          </div>
        );

      case 2:
        return (
          <div>
            <Pricing />
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevious}>
                Previous Step
              </Button>
              <Button onClick={handleNext}>Next Step</Button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="max-w-3xl mx-auto py-10">
            <h2 className="text-2xl font-bold mb-6 text-center">
              Choose Payment Method
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                type="button"
                onClick={() => setSelectedPaymentMethod(1)}
                className={`p-6 border rounded-lg transition-all ${
                  selectedPaymentMethod === 1
                    ? "border-red-500"
                    : "hover:border-red-500"
                }`}
              >
                <h3 className="text-xl font-semibold">TelleBirr</h3>
                <p className="text-gray-500">
                  Pay using TelleBirr mobile money
                </p>
              </button>

              <button
                type="button"
                onClick={() => setSelectedPaymentMethod(2)}
                className={`p-6 border rounded-lg transition-all ${
                  selectedPaymentMethod === 2
                    ? "border-red-500"
                    : "hover:border-red-500"
                }`}
              >
                <h3 className="text-xl font-semibold">Chapa</h3>
                <p className="text-gray-500">Pay using Chapa payment gateway</p>
              </button>
            </div>

            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handlePrevious}>
                Previous Step
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                onClick={form.handleSubmit(onSubmit)}
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4">
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

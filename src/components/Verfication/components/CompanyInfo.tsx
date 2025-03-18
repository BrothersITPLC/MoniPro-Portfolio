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
import { useState } from "react";
import { Pricing } from "@/components/Landing/Pricing";
import { useNavigate } from "react-router-dom";
// import { useComponyinfoMutation } from "@/redux/ComponyinfoApi";

const formSchema = z.object({
  name_7811949518: z.string().min(1, "Username is required"),
  name_0426901616: z.string().min(1, "First Name is required"),
  name_0426901617: z.string().min(1, "Last Name is required"),
  name_0340965101: z.string().min(1, "Company Name is required"),
  name_9879081346: z.string().min(1, "Company Description is required"),
  name_4244877314: z.string().optional(),
});

const steps = [
  { id: 1, name: "Company Information" },
  { id: 2, name: "Subscription Plan" },
  { id: 3, name: "Payment Method" },
];

export function CompanyInfo() {
  // const [submitComponyInfo, { isLoading }] = useComponyinfoMutation();

  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name_7811949518: "",
      name_0426901616: "",
      name_0426901617: "",
      name_0340965101: "",
      name_9879081346: "",
      name_4244877314: "",
    },
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<
    string | null
  >(null);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (currentStep === 3) {
        if (!selectedPaymentMethod) {
          toast.error("Please select a payment method before submitting.");
          return;
        }

        const finalSubmission = {
          ...values,
          selectedPlan,
          selectedPaymentMethod,
        };
        console.log("Final Submission:", finalSubmission);

        // **Post Data to API**
        // const response = await submitComponyInfo(finalSubmission).unwrap();

        // Handle successful API response
        toast.success("Form submitted successfully!");
        // console.log("API Response:", response);

        // Navigate to success page
        navigate("/home/team", { state: finalSubmission });
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
                      name="name_7811949518"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input placeholder="shadcn" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="name_0426901616"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
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
                      name="name_0426901617"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="col-span-6">
                    <FormField
                      control={form.control}
                      name="name_0340965101"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Company Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Acme Inc." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="name_9879081346"
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
            <Pricing
              onSubscriptionSelect={handleNext}
              setSelectedPlan={setSelectedPlan}
            />
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
                onClick={() => {
                  setSelectedPaymentMethod("TelleBirr");
                  toast.success("TelleBirr selected!");
                }}
                className={`p-6 border rounded-lg transition-all ${
                  selectedPaymentMethod === "TelleBirr"
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
                onClick={() => {
                  setSelectedPaymentMethod("Chapa");
                  toast.success("Chapa selected!");
                }}
                className={`p-6 border rounded-lg transition-all ${
                  selectedPaymentMethod === "Chapa"
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
                variant="outline"
                onClick={() => {
                  if (!selectedPaymentMethod) {
                    toast.error(
                      "Please select a payment method before submitting."
                    );
                    return;
                  }
                  onSubmit(form.getValues()); // Ensure form values are passed
                }}
              >
                Submit
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

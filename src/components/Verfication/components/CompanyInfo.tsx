import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Pricing } from "@/components/Landing/Pricing";

// Fix the duplicate field name in the schema
const formSchema = z.object({
  name_7811949518: z.string().min(1),
  name_0426901616: z.string().min(1),
  name_0340965101: z.string().min(1), // Changed from duplicate name
  name_9879081346: z.string().min(1),
  name_4244877314: z.string(),
});

const steps = [
  { id: 1, name: "Company Information" },
  { id: 2, name: "Subscription Plan" },
  { id: 3, name: "Payment Method" },
];

export function CompanyInfo() {
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      console.log(values);
      setCurrentStep(2); // Move to subscription step
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 max-w-3xl mx-auto py-10 w-full"
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
                          <Input placeholder="shadcn" type="" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
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
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" type="" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
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
                    name="name_0426901616"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" type="" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="col-span-6">
                  <FormField
                    control={form.control}
                    name="name_0340965101" // Changed from duplicate name
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" type="" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
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
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="shadcn" type="" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button type="submit">Next Step</Button>
              </div>
            </form>
          </Form>
        );
      case 2:
        return (
          <div>
            <div className="flex justify-start mb-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(1)}
                className="mr-4"
              >
                Previous Step
              </Button>
            </div>
            <Pricing onSubscriptionSelect={() => setCurrentStep(3)} />
          </div>
        );
      case 3:
        return (
          <div className="max-w-3xl mx-auto py-10">
            <div className="flex justify-start mb-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(2)}
                className="mr-4"
              >
                Previous Step
              </Button>
            </div>
            <h2 className="text-2xl font-bold mb-6">Choose Payment Method</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => {
                  /* Handle TelleBirr payment */
                }}
                className="p-6 border rounded-lg hover:border-red-500 transition-all"
              >
                <h3 className="text-xl font-semibold">TelleBirr</h3>
                <p className="text-gray-500">
                  Pay using TelleBirr mobile money
                </p>
              </button>

              <button
                onClick={() => {
                  /* Handle Chapa payment */
                }}
                className="p-6 border rounded-lg hover:border-red-500 transition-all"
              >
                <h3 className="text-xl font-semibold">Chapa</h3>
                <p className="text-gray-500">Pay using Chapa payment gateway</p>
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto px-4">
      {/* Stepper UI */}
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

      {/* Step Content */}
      {renderStepContent()}
    </div>
  );
}

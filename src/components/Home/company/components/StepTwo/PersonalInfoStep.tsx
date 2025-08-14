import {
  User,
  Globe,
  Phone,
  FileText,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
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
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { setOrganization } from "../../companySclice";
import type { OrganizationDataInfrence } from "../../companySclice";

interface PlanSelectionProps {
  onNext: (step: number) => void;
}
const personalInfoSchema = z.object({
  first_name: z.string().min(1, "first name name is required"),
  last_name: z.string().min(1, "last name name name is required"),
  organization_phone: z
    .string()
    .regex(
      /^0[79]\d{8}$/,
      "Phone number must be 10 digits and start with 09 or 07"
    ),
  organization_website: z.string().optional(),
  organization_description: z.string().optional(),
});
export function PersonalInfoStep({ onNext }: PlanSelectionProps) {
  const dispatch = useDispatch();

  const selectedPlan = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );

  const organizationData = useSelector(
    (state: RootState) => state.companyInfo.organizationData
  );

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: organizationData?.first_name || "",
      last_name: organizationData?.last_name || "",
      organization_phone: organizationData?.organization_phone || "",
      organization_website: organizationData?.organization_website || "",
      organization_description:
        organizationData?.organization_description || "",
    },
  });

  const onSubmit = (data: z.infer<typeof personalInfoSchema>) => {
    const updatedData: OrganizationDataInfrence = {
      ...organizationData!,
      ...data,
      organization_phone: `+251${data.organization_phone}`,
    };
    dispatch(setOrganization(updatedData));
    onNext(selectedPlan === 0 ? 3 : 2); // If selectedPlan is 0, go to step 3, else go to step 2
  };

  const onPrevious = () => {
    onNext(selectedPlan === 0 ? 1 : 1);
  };
  return (
    <div className="max-w-3xl mx-auto py-10 mt-10">
      <Card className="border-none shadow-none">
        <CardHeader className="space-y-1">
          {/* <CardTitle className="text-2xl font-bold">Personal Information</CardTitle> */}
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 w-full"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="first_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base">
                        <User className="h-5 w-5 text-muted-foreground" />
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your first name"
                          {...field}
                          className="border-border/60 focus-visible:ring-primary/20 h-11 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="last_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base">
                        <User className="h-5 w-5 text-muted-foreground" />
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your last name"
                          {...field}
                          className="border-border/60 focus-visible:ring-primary/20 h-11 text-base"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
 
                <FormField
                  control={form.control}
                  name="organization_phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        Company Phone
                      </FormLabel>
                      <FormControl>
                        <div className="flex">
                          {/* Fixed prefix */}
                          <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-border/60 rounded-l-md text-gray-500 h-11">
                            +251
                          </span>
                          {/* Only allow 9 digits input */}
                          <Input
                            placeholder="987654352 or 787654352"
                            {...field}
                            onChange={(e) => {
                              // Ensure only numbers and max 9 digits
                              const value = e.target.value.replace(/\D/g, "").slice(0, 9);
                              field.onChange(value);
                            }}
                            className="rounded-l-none border-border/60 focus-visible:ring-primary/20"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="organization_website"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        Personal Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://yourwebsite.com"
                          {...field}
                          className="border-border/60 focus-visible:ring-primary/20"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="organization_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about yourself..."
                        {...field}
                        className="border-border/60 focus-visible:ring-primary/20 min-h-[120px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-2 flex justify-between">
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
                  className="flex text-white items-center gap-2 bg-[var(--secondary)] hover:bg-[var(--primary)]"
                >
                  Next Step
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

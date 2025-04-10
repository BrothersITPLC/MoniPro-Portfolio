import { Card } from "@/components/ui/card";
import { CheckCircle2, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { setOrganization } from "../companySclice";
import type { OrganizationDataInfrence } from "../companySclice";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

const subscriptionTypeSchema = z.object({
  is_private: z.boolean().refine((val) => val !== undefined, {
    message: "Account type must be selected",
  }),
});

interface PlanSelectionProps {
  onNext: (step: number) => void;
}

export function PlanSelection({ onNext }: PlanSelectionProps) {
  const dispatch = useDispatch();
  const organizationData = useSelector(
    (state: RootState) => state.companyInfo.organizationData
  );

  const form = useForm<z.infer<typeof subscriptionTypeSchema>>({
    resolver: zodResolver(subscriptionTypeSchema),
    defaultValues: {
      is_private: undefined,
    },
  });

  const handleAccountTypeSelection = (type: boolean) => {
    const updatedData: OrganizationDataInfrence = {
      ...organizationData, // spread existing data first
      is_private: type, // then override is_private
      payment_provider: organizationData?.payment_provider ?? 0,
      organization_payment_plane:
        organizationData?.organization_payment_plane ?? 0,
      organization_payment_duration:
        organizationData?.organization_payment_duration ?? 0,
      user_id: organizationData?.user_id ?? 0,
      plan_type: organizationData?.plan_type ?? 0,
      organization_phone: organizationData?.organization_phone ?? "",
      organization_website: organizationData?.organization_website ?? "",
      organization_name: organizationData?.organization_name ?? "",
      first_name: organizationData?.first_name ?? "",
      last_name: organizationData?.last_name ?? "",
      organization_description:
        organizationData?.organization_description ?? "",
    };

    dispatch(setOrganization(updatedData));
    form.setValue("is_private", type, { shouldValidate: true });
  };

  const handleNext = () => {
    form.trigger().then((isValid) => {
      if (!isValid || organizationData?.is_private === undefined) {
        toast.error("Please select an account type to continue.");
        return;
      }
      onNext(2);
    });
  };

  return (
    <>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">Select Plan Type</h2>
        <p className="text-muted-foreground mt-2">
          Choose the type of plan that best fits your needs
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card
          className={`relative group cursor-pointer transition-all duration-300 hover:scale-105${
            organizationData?.is_private === false
              ? "ring-2 ring-[var(--secondary)] bg-red-50"
              : "hover:border-[var(--secondary)]"
          }`}
          onClick={() => handleAccountTypeSelection(false)}
        >
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-lg">
                <Building2 className="w-8 h-8 text-[var(--secondary)]" />
              </div>
              <h3 className="text-xl font-semibold">Company Plan</h3>
            </div>
            <p className="text-muted-foreground">
              For businesses and organizations with multiple users
            </p>
            {organizationData?.is_private === false && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="w-6 h-6 text-[var(--secondary)]" />
              </div>
            )}
          </div>
        </Card>

        <Card
          className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
            organizationData?.is_private === true
              ? "ring-2 ring-[var(--secondary)] bg-red-50"
              : "hover:border-[var(--secondary)]"
          }`}
          onClick={() => handleAccountTypeSelection(true)}
        >
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-lg">
                <User className="w-8 h-8 text-[var(--secondary)]" />
              </div>
              <h3 className="text-xl font-semibold">Individual Plan</h3>
            </div>
            <p className="text-muted-foreground">
              For personal use with a single subscription
            </p>
            {organizationData?.is_private === true && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="w-6 h-6 text-[var(--secondary)]" />
              </div>
            )}
          </div>
        </Card>
      </div>
      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleNext}
          disabled={organizationData?.is_private === undefined}
        >
          Next
        </Button>
      </div>
    </>
  );
}

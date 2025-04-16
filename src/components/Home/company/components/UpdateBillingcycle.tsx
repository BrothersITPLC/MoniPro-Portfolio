import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, CalendarDays, CalendarCheck } from "lucide-react"
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import {  useState ,useEffect} from 'react';  // Add useState import
import { useUpdateOrganizationPaymentMutation } from '../api'
import { toast } from "sonner";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ArrowLeft } from "lucide-react"; // Import an icon for the back arrow

export function Updatebillingcycle() {

  const navigate = useNavigate();

  const [planId, setPlanId] = useState<number>(0);

  const [updateOrganizationPayment, { isLoading, isSuccess, isError, error }] = useUpdateOrganizationPaymentMutation();
  
  const [selectedDuration, setSelectedDuration] = useState(1);  // Replace static value with state

  const { user } = useSelector((state: RootState) => state.auth);

  const plans = useSelector((state: RootState) => state.landing.plans);

  const selectedPlanId = useSelector(
    (state: RootState) => state.landing.SelectedPlane
  );

  const selectedPlanData = plans?.find((plan) => plan.id === selectedPlanId);

  const UpdateBillingCycle = () => {
    updateOrganizationPayment({
      id: user?.organization_id,
      data: { 
        organization_payment_duration: selectedDuration,
        organization_payment_plan: planId 
      }
    });

    toast.success("Billing cycle updated sucessfully.");
  };



  useEffect(() => {
    if (plans && user?.organization_payment_plan) {
      const matchedPlan = plans.find(
        plan =>
          plan.name.toLowerCase().trim() ===
          user.organization_payment_plan.toLowerCase().trim()
      );
      setPlanId(matchedPlan ? matchedPlan.id : 0);
    }
  }, []);

  return (
    <div className="container mx-auto py-10 mt-12">
      <button
        className="flex items-center gap-2 mb-4 p-2 rounded-lg bg-[var(--secondary)] text-white hover:bg-[var(--secondary)] transition-all transform hover:scale-105"
        onClick={() => navigate("/home/subscription")}
      >
        <ArrowLeft className="w-5 h-5" />
        Back
      </button>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-center mb-3 flex items-center justify-center gap-2"></h2>
        <div className="text-center mb-4 bg-[var(--light)] dark:bg-neutral-800 dark:border-2 dark:text-white py-3 rounded-lg">
          <span className="text-lg font-medium inline-flex items-center gap-2">
            Previously Selected Billing Cycle: <span className="text-red-600 font-semibold">{user?.
organization_payment_duration
}</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Monthly Card - Add onClick */}
        <Card
          onClick={() => setSelectedDuration(1)}
          className={`cursor-pointer transition-all hover:scale-105 group ${
            selectedDuration === 1
              ? "border-[var(--secondary)] shadow-lg ring-2 ring-[var(--secondary)]/20"
              : "hover:border-[var(--secondary)]/50"
          }`}
        >
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calendar
                className={`w-5 h-5 ${
                  selectedDuration === 1
                    ? "text-[var(--secondary)]"
                    : "text-gray-400 group-hover:text-[var(--secondary)]"
                }`}
              />
              Monthly
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-3">
              <p className="text-3xl font-bold text-[var(--secondary)]">${selectedPlanData?.price}</p>
              <p className="text-muted-foreground">Billed Monthly</p>
              {selectedDuration === 1 && (
                <div className="text-[var(--secondary)] text-sm font-medium">✓ Currently Selected</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Other duration cards - Add onClick */}
        {selectedPlanData.deduction.map((duration, index) => (
          <Card
            key={index}
            onClick={() => setSelectedDuration(duration.duration_id)}
            className={`cursor-pointer transition-all hover:scale-105 group ${
              selectedDuration === duration.duration_id
                ? "border-[var(--secondary)] shadow-lg ring-2 ring-[var(--secondary)]/20"
                : "hover:border-[var(--secondary)]/50"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                {duration.duration === "yearly" ? (
                  <CalendarCheck
                    className={`w-5 h-5 ${
                      selectedDuration === duration.duration_id
                        ? "text-[var(--secondary)]"
                        : "text-gray-400 group-hover:text-[var(--secondary)]"
                    }`}
                  />
                ) : (
                  <CalendarDays
                    className={`w-5 h-5 ${
                      selectedDuration === duration.duration_id
                        ? "text-[var(--secondary)]"
                        : "text-gray-400 group-hover:text-[var(--secondary)]"
                    }`}
                  />
                )}
                {duration.duration === "yearly" ? "Yearly" : "Quarterly"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-3">
                <div className="bg-[var(--light)] dark:bg-neutral-800 text-[var(--secondary)] font-bold text-2xl py-2 rounded-full">
                  {duration.percentage}% OFF
                </div>
                <p className="text-muted-foreground">
                  {duration.duration === "yearly" ? "Annual Billing" : "Quarterly Billing"}
                </p>
                <p className="text-lg font-semibold text-[var(--secondary)]">
                  ${Math.round(selectedPlanData?.price * (1 - duration.percentage / 100))}
                  <span className="text-sm text-muted-foreground"> / month</span>
                </p>
                {selectedDuration === duration.duration_id && (
                  <div className="text-[var(--secondary)] text-sm font-medium">✓ Currently Selected</div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Button 
          className="flex items-center gap-2 bg-[var(--secondary)] text-white hover:bg-[var(--secondary)]" 
          onClick={UpdateBillingCycle}
          disabled={isLoading}
        >
          {isLoading ? "Updating..." : "Update"}
        </Button>
        {isError && (
          <div className="text-red-500">
            Error: {error?.data?.message || "Failed to update billing cycle"}
          </div>
        )}
      </div>
    </div>
  )
}

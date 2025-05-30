import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import Telebit from "@/components/ui/images/telebirr.jpg";
import chapa from "@/components/ui/images/chapa.jpg";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { setOrganization } from "../companySclice";
import type { OrganizationDataInfrence } from "../companySclice";
import {
  useGetPaymentProvidersQuery,
  useInitilizeChapaPaymentMutation,
} from "../api";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

type PaymentProvider = {
  id: number;
  name: string;
};
export function PaymentStep() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: paymentProviders, isLoading: isPaymentProviderLoading } =
    useGetPaymentProvidersQuery(undefined, {
      refetchOnMountOrArgChange: true,
    });

  const [isLoading, setIsLoading] = useState(false);
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState(0);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const [initilizeChapaPayment] = useInitilizeChapaPaymentMutation();

  const handleConfirmSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await initilizeChapaPayment({
        payment_provider: selectedPaymentProvider,
      }).unwrap();

      // Check for success response with redirect_url
      if (result.status === "success" && result.redirect_url) {
        toast.success(result.message);
        window.location.href = result.redirect_url;
      } else if (result.url) {
        // Fallback to previous implementation if structure is different
        window.location.href = result.url;
      } else {
        // Handle unexpected response format
        toast.error("Unable to process payment. Please try again.");
      }
    } catch (error: any) {
      // Handle error response
      const errorMessage =
        error?.data?.message || "Payment initialization failed";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setShowConfirmDialog(false);
    }
  };

  const onProviderSelect = (providerId: number) => {
    setSelectedPaymentProvider(providerId);
    setShowConfirmDialog(true);
  };

  return (
    <>
      {isPaymentProviderLoading && <Spinner />}

      {!isPaymentProviderLoading &&
        (!paymentProviders ||
          !paymentProviders.data ||
          paymentProviders.data.length === 0) && (
          <div className="w-full p-8 text-center">
            <p>No payment providers available. Please try again later.</p>
          </div>
        )}

      <div className="grid grid-cols-2 gap-4 w-full p-8">
        {paymentProviders &&
          paymentProviders.data &&
          paymentProviders.data.map((provider: PaymentProvider) => {
            return (
              <Card
                key={provider.id}
                className="border border-slate-300 rounded-md"
              >
                <CardContent
                  className=" cursor-pointer hover:scale-105 transition-all duration-300"
                  onClick={() => onProviderSelect(provider.id)}
                >
                  <p className=" text-center">{provider.name}</p>
                </CardContent>
              </Card>
            );
          })}
      </div>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
            <AlertDialogDescription>
              you are about to complete your payment. This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSubmit}
              disabled={isLoading}
              className="bg-[var(--secondary)] hover:bg-[var(--primary)]"
            >
              {isLoading ? "Processing..." : "Confirm and Complete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

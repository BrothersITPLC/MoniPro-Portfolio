import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { CheckCircle2, XCircle } from "lucide-react";
import { useVerifyChapaPaymentMutation } from "@/components/Home/company/api";

export function PaymentVerification() {
  const navigate = useNavigate();
  const { uuid } = useParams<{ uuid: string }>();
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
  const [message, setMessage] = useState<string>("");
  const [verifyChapaPayment] = useVerifyChapaPaymentMutation();

  useEffect(() => {
    const verifyPayment = async () => {
      if (!uuid) {
        toast.error("Invalid payment reference");
        setTimeout(() => navigate("/home/payment"), 3000);
        return;
      }

      try {
        const response = await verifyChapaPayment({ tx_ref: uuid }).unwrap();

        if (response.status === "success") {
          setIsSuccess(true);
          setMessage(response.message || "Payment successful.");
          toast.success(response.message || "Payment successful.");
          setTimeout(() => navigate("/home/dashboard"), 3000);
        } else {
          setIsSuccess(false);
          setMessage(response.message || "Payment verification failed.");
          toast.error(response.message || "Payment verification failed.");
          setTimeout(() => navigate("/home/payment"), 5000);
        }
      } catch (error: any) {
        setIsSuccess(false);
        const errorMessage =
          error?.data?.message ||
          "Payment verification failed. Please try again.";
        setMessage(errorMessage);
        toast.error(errorMessage);
        setTimeout(() => navigate("/home/payment"), 5000);
      }
    };

    verifyPayment();
  }, [uuid, navigate, verifyChapaPayment]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg text-center">
        {isSuccess === null ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Verifying Payment</h2>
            <div className="flex justify-center my-8">
              <Spinner className="h-12 w-12 text-primary" />
            </div>
            <p className="text-gray-600">
              Please wait while we verify your payment...
            </p>
          </>
        ) : isSuccess ? (
          <>
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <h2 className="text-2xl font-bold text-green-600">
              Payment Successful!
            </h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <p className="text-gray-500 mt-4">Redirecting to dashboard...</p>
          </>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <XCircle className="h-16 w-16 text-red-500" />
            </div>
            <h2 className="text-2xl font-bold text-red-600">Payment Failed</h2>
            <p className="text-gray-600 mt-2">{message}</p>
            <p className="text-gray-500 mt-4">Redirecting to payment page...</p>
          </>
        )}
      </div>
    </div>
  );
}

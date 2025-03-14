import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import PaymentForm from "../components/Paymentform";

export function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { redirectTo, plan } = location.state || {
    redirectTo: "/dashboard",
    plan: null,
  };
  const [showPayment, setShowPayment] = useState(false);

  const handleAuthSuccess = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = (paymentMethod: string) => {
    navigate(redirectTo, { state: { plan, paymentComplete: true } });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div
        className={`w-full bg-gray-800 p-8 ${
          !showPayment ? "max-w-md" : "min-h-screen"
        }`}
      >
        {!showPayment ? (
          <AuthForm onSuccess={handleAuthSuccess} />
        ) : (
          <div className="container mx-auto px-4 py-8">
            <PaymentForm onSubmit={handlePaymentSuccess} />
          </div>
        )}
      </div>
    </div>
  );
}

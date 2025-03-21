import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface PaymentStepProps {
  selectedPaymentMethod: number;
  setSelectedPaymentMethod: (method: number) => void;
  onPrevious: () => void;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
}

export function PaymentStep({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  onPrevious,
  onSubmit,
  isLoading,
}: PaymentStepProps) {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await onSubmit();
      toast.success("Payment method selected successfully!");
      navigate("/home/dashboard");
    } catch (error) {
      toast.error("Failed to process payment method. Please try again.");
    }
  };

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
          <p className="text-gray-500">Pay using TelleBirr mobile money</p>
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
        <Button variant="outline" onClick={onPrevious}>
          Previous Step
        </Button>
        <Button type="submit" disabled={isLoading} onClick={handleSubmit}>
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
}

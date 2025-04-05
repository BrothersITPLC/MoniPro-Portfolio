import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import Telebit from "@/components/ui/images/telebirr.jpg"
import chapa from "@/components/ui/images/chapa.jpg"

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
      <div className="text-center mb-10 mt-30">
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card
          className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedPaymentMethod === 1
              ? "ring-2 ring-violet-500 bg-red-50"
              : "hover:border-violet-500"
          }`}
          onClick={() => setSelectedPaymentMethod(1)}
        >
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 overflow-hidden rounded-lg">
                <img 
                  src={Telebit} 
                  alt="TelleBirr" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">TelleBirr</h3>
            </div>
            <p className="text-muted-foreground">Pay using TelleBirr mobile money</p>
            {selectedPaymentMethod === 1 && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="w-6 h-6 text-violet-500" />
              </div>
            )}
          </div>
        </Card>

        <Card
          className={`relative group cursor-pointer transition-all duration-300 hover:scale-105 ${
            selectedPaymentMethod === 2
              ? "ring-2 ring-violet-500 bg-red-50"
              : "hover:border-violet-500"
          }`}
          onClick={() => setSelectedPaymentMethod(2)}
        >
          <div className="p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 overflow-hidden rounded-lg">
                <img 
                  src={chapa} 
                  alt="Chapa" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold">Chapa</h3>
            </div>
            <p className="text-muted-foreground">Pay using Chapa payment gateway</p>
            {selectedPaymentMethod === 2 && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="w-6 h-6 text-violet-500" />
              </div>
            )}
          </div>
        </Card>
      </div>

      <div className="flex justify-between mt-12">
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
          disabled={isLoading} 
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600"
        >
          {isLoading ? "Processing..." : "Complete Setup"}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}
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
import { PaymentUpdatePayload } from "../type";

interface SubscriptionConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isLoading: boolean;
  planName: string;
  planPrice: number;
  duration: string;
  savings?: number;
}

export function SubscriptionConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading,
  planName,
  planPrice,
  duration,
  savings,
}: SubscriptionConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-gradient-to-b from-gray-900 to-black border-2 border-red-500/30 shadow-xl shadow-red-500/20">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
            Confirm Subscription Update
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-300">
            <p className="mb-4">
              You are about to update your subscription plan. Please review the
              details:
            </p>
            <div className="bg-gray-800/50 p-4 rounded-md mb-4">
              <div className="flex justify-between mb-2">
                <span>Plan:</span>
                <span className="font-medium text-white">{planName}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Price:</span>
                <span className="font-medium text-white">
                  ${planPrice}/month
                </span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Billing Cycle:</span>
                <span className="font-medium text-white capitalize">
                  {duration}
                </span>
              </div>
              {savings && savings > 0 && (
                <div className="flex justify-between mt-3 pt-3 border-t border-gray-700">
                  <span>Savings:</span>
                  <span className="font-medium text-green-400">
                    {savings}% OFF
                  </span>
                </div>
              )}
            </div>
            <p className="text-sm">
              By confirming, your subscription will be updated immediately and
              your billing cycle will be adjusted accordingly.
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-700 hover:bg-gray-600 text-white border-0">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-500 text-white"
          >
            {isLoading ? "Processing..." : "Confirm Update"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

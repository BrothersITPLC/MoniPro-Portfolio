import { toast } from "sonner";
import { logoutState } from "@/components/Auth/AutSlice";
import { store } from "@/app/store";

export const handleUnauthorized = () => {
  toast.error("Session expired. Please login again.");
  store.dispatch(logoutState());
};

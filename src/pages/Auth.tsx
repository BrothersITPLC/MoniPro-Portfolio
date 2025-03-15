import { Login } from "@/components/Auth/components/Login";
import { Signup } from "@/components/Auth/components/Signup";

import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export function Auth() {
  const isSignup = useSelector((state: RootState) => state.global.is_signup);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isSignup ? <Signup /> : <Login />}
    </div>
  );
}

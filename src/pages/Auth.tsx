import { useState } from "react";
import { Login } from "@/components/Auth/components/Login";
import { SignupWrapper } from "@/components/Auth/components/SignupWrapper";
import { ForgotPassword } from "@/components/Auth/components/ForgotPassword";

export function Auth() {
  const [authState, setAuthState] = useState<"login" | "signup" | "reset">(
    "login"
  );

  const toggleAuth = (state: "login" | "signup" | "reset") =>
    setAuthState(state);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {authState === "signup" ? (
        <SignupWrapper onToggle={() => toggleAuth("login")} />
      ) : authState === "reset" ? (
        <ForgotPassword onToggle={() => toggleAuth("login")} />
      ) : (
        <Login
          onToggle={() => toggleAuth("signup")}
          onReset={() => toggleAuth("reset")}
        />
      )}
    </div>
  );
}

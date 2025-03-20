import { Login } from "@/components/Auth/components/Login";
import { Signup } from "@/components/Auth/components/Signup";
import { useState } from "react";

export function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const toogleSignup = () => setIsSignup(!isSignup);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {isSignup ? (
        <Signup onToggle={toogleSignup} />
      ) : (
        <Login onToggle={toogleSignup} />
      )}
    </div>
  );
}

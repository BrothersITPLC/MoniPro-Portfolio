import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, useNavigate } from "react-router-dom";
import { CompanySignup } from "./InitialSignup";
import { Button } from "@/components/ui/button";
import { handleGoogleAuth } from "./GoogleAuth";
import { toast } from "sonner";
import { House, Loader2 } from "lucide-react";
import { handleTelegramAuth } from "./TelegramAuth";

interface SignupProps extends React.ComponentProps<"div"> {
  onToggle: () => void;
}

export function SignupWrapper(onToggle: SignupProps) {
  const navigate = useNavigate();
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isTelegramLoading, setIsTelegramLoading] = useState(false);

  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (event.data && event.data.action === "google-authentication-success") {
        toast.success("Google signup successful!");
        setIsGoogleLoading(false);

        // Check if organization info is completed
        if (event.data.user && !event.data.user.organization_info_completed) {
          navigate("/home/comp-info");
        } else {
          navigate("/home/dashboard");
        }
      }
    };

    window.addEventListener("message", messageHandler);
    return () => window.removeEventListener("message", messageHandler);
  }, [navigate]);


  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      if (event.data && event.data.action === "telegram-authentication-success") {
        toast.success("Telegram Signup successful!");
        setIsTelegramLoading(false);
        // Check if organization info is completed
        if (event.data.user && !event.data.user.organization_info_completed) {
          navigate("/home/comp-info");
        } else {
          navigate("/home/dashboard");
        }
      }
    };

    window.addEventListener("message", messageHandler);
    return () => window.removeEventListener("message", messageHandler);
  }, [navigate]);

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      await handleGoogleAuth();
    } catch (error: any) {
      setIsGoogleLoading(false);
      toast.error(error.message || "Google authentication failed");
    }
  };

  const handleTelegramLogin = async () => {
    try {
      setIsTelegramLoading(true);
      await handleTelegramAuth();
    } catch (error: any) {
      setIsTelegramLoading(false);
      toast.error(error.message || "Telegram authentication failed");
    }
  };

  return (
    <div className="flex flex-col w-full max-w-[440px] gap-6">
      <Card className="border border-[var(--primary)] dark:border-gray-700 bg-white dark:bg-background hover:shadow-2xl transition-all duration-300">
        <CardHeader className="text-center space-y-3">
          <Link to="/" className="flex justify-center items-center">
            <House className="h-8 w-8 text-[var(--primary)]" />
          </Link>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-300">
            Welcome
          </CardTitle>
          <CardDescription className="text-gray-900 dark:text-gray-300">
            Signup with your Google Or Github account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full border-[var(--primary)] dark:border-gray-700 hover:bg-[var(--light)] dark:hover:bg-violet-900/30 transition-all duration-300 hover:scale-105"
                type="button"
                onClick={handleGoogleLogin}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <svg
                    className="w-5 h-5 mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                )}
                {isGoogleLoading ? "Connecting..." : "Signup with Google"}
              </Button>

              <Button
                variant="outline"
                className="w-full border-[var(--primary)] dark:border-gray-700 hover:bg-[var(--light)] dark:hover:bg-violet-900/30 transition-all duration-300 hover:scale-105"
                type="button"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-github"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                </svg>
                Signup with Github
              </Button>


              <Button
                  variant="outline"
                  className="w-full border-[var(--primary)] dark:border-gray-700 hover:bg-[var(--light)] dark:hover:bg-violet-900/30 transition-all duration-300 hover:scale-105"
                  type="button"
                  onClick={handleTelegramLogin}
                  disabled={isTelegramLoading}
                >
                  {isTelegramLoading ? (  
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-telegram"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571c284 .194 .568 .387 .936 .629q .14 .092 .27 .187c .331 .236 .63 .448 .997 .414c .214 -.02 .435 -.22 .547 -.82c .265 -1.417 .786 -4.486 .906 -5.751a1,4,1,4,0,0,0,-0,13a34,34,0,0,0,-0,217a53,53,0,0,0,-114,-93"/>
                    </svg>
                  )}      
                  {isTelegramLoading ? "Connecting..." : "Login with Telegram"}
              </Button>

            </div>
            <div className="relative text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white dark:bg-background px-2 text-gray-900 dark:text-gray-300">
                  Or continue with Email
                </span>
              </div>
            </div>

            <CompanySignup />
          </div>
        </CardContent>
        <div className="text-center text-sm text-gray-900 dark:text-gray-300">
          Already have an account?
          <button
            type="button"
            className="text-[var(--primary)] underline underline-offset-4 cursor-pointer transition-colors"
            onClick={onToggle.onToggle}
          >
            Login
          </button>
        </div>
      </Card>
      <div className="text-center text-xs text-gray-900 dark:text-gray-300">
        By clicking continue, you agree to our
        <a
          href="#"
          className="text-[var(--primary)] underline underline-offset-4 transition-colors"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="text-[var(--primary)] underline underline-offset-4 transition-colors"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}

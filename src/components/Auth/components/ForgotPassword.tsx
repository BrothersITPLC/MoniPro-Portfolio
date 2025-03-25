import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { House } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { usePasswordForgotMutation } from "../api";

export function ForgotPassword({}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // RTK Query hook for password forgot functionality
  const [passwordForgot] = usePasswordForgotMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await passwordForgot({ email });

      // Check if the response contains data
      if ("data" in response) {
        if (response.data.status === "success") {
          toast.success(
            response.data.message || "Reset link sent to your email"
          );
          navigate("/password-reset");
        } else {
          // Handle success response with error status (unlikely but possible)
          toast.error(response.data.message || "Failed to send reset link");
        }
      } else if ("error" in response) {
        // Handle different error status codes
        const errorData = response.error as any;
        const statusCode = errorData?.status;
        const message = errorData?.data?.message || "Failed to send reset link";

        switch (statusCode) {
          case 429:
            toast.error(
              message || "Please wait before requesting another reset link"
            );
            break;
          case 500:
            toast.error(
              message || "Server error occurred. Please try again later"
            );
            break;
          case 502:
            toast.error(
              message || "Email service unavailable. Please try again later"
            );
            break;
          default:
            toast.error(message || "Failed to send reset link");
        }
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to send reset link");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto w-full">
      <Card className="border border-red-600 dark:border-gray-700 bg-white dark:bg-background hover:shadow-2xl transition-all duration-300">
        <CardHeader className="text-center space-y-3">
          <Link
            to="/"
            className="flex items-center justify-center hover:scale-105 transition-all duration-300"
          >
            <House className="h-8 w-8 text-red-500" />
          </Link>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-300">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-gray-900 dark:text-gray-300">
            Enter your email to receive a password reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label
                  htmlFor="email"
                  className="text-gray-900 dark:text-gray-300"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
              <div className="text-center text-sm text-gray-900 dark:text-gray-300">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="text-red-500 hover:text-red-600 underline underline-offset-4 transition-colors"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

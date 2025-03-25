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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export function ResetPassword({}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      // Add your API call here
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.message || "Failed to reset password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center">
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
              Reset Password
            </CardTitle>
            <CardDescription className="text-gray-900 dark:text-gray-300">
              Enter your new password
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
                    value={formData.email}
                    onChange={handleChange}
                    className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label
                    htmlFor="otp"
                    className="text-gray-900 dark:text-gray-300"
                  >
                    OTP
                  </Label>
                  <InputOTP
                    maxLength={6}
                    value={formData.otp}
                    onChange={(value) =>
                      setFormData((prev) => ({ ...prev, otp: value }))
                    }
                    className="gap-2"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={0}
                        className="border-red-600 dark:border-gray-700"
                      />
                      <InputOTPSlot
                        index={1}
                        className="border-red-600 dark:border-gray-700"
                      />
                      <InputOTPSlot
                        index={2}
                        className="border-red-600 dark:border-gray-700"
                      />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot
                        index={3}
                        className="border-red-600 dark:border-gray-700"
                      />
                      <InputOTPSlot
                        index={4}
                        className="border-red-600 dark:border-gray-700"
                      />
                      <InputOTPSlot
                        index={5}
                        className="border-red-600 dark:border-gray-700"
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <div className="grid gap-3">
                  <Label
                    htmlFor="password"
                    className="text-gray-900 dark:text-gray-300"
                  >
                    New Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <div className="grid gap-3">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-900 dark:text-gray-300"
                  >
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? "Resetting..." : "Reset Password"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

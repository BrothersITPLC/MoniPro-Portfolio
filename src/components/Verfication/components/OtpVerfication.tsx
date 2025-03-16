import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { House } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOtpVerficationMutation } from "../api";

export function OtpVerfication({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useOtpVerficationMutation();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp || otp.length !== 6) {
      toast.error("Please enter a valid email and 6-digit OTP");
      return;
    }

    try {
      const response = await verifyOtp({
        email,
        otp,
      }).unwrap();

      if (response.status === "success") {
        toast.success(response.message || "Email verified successfully");
        navigate("/login");
      } else {
        toast.error(response.message || "Verification failed");
      }
    } catch (error: any) {
      toast.error(
        error.data?.message || "Failed to verify OTP. Please try again."
      );
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <Link to="/" className="flex items-center">
            <House className="h-6 w-6" />
          </Link>
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Please verify your email using the OTP
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="otp">OTP</Label>
                  <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By signing up, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

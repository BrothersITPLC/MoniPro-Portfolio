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
import { House } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useOtpVerficationMutation } from "../api";
import { OtpVerificationCredentials, otpVerificationSchema } from "../type";

// Use the OTP verification type from the shared types file

export function OtpVerfication() {
  const navigate = useNavigate();
  const [verifyOtp, { isLoading }] = useOtpVerficationMutation();

  // Initialize form with react-hook-form and zod validation
  const form = useForm<OtpVerificationCredentials>({
    resolver: zodResolver(otpVerificationSchema),
    defaultValues: {
      email: "",
      otp: "",
    },
  });

  const onSubmit = async (data: OtpVerificationCredentials) => {
    try {
      const response = await verifyOtp({
        email: data.email,
        otp: data.otp,
      }).unwrap();

      if (response.status === "success") {
        toast.success(response.message || "Email verified successfully");
        navigate("/login");
      } else {
        toast.error(response.message || "Verification failed");
        navigate("/verification");
      }
    } catch (error: any) {
      let errorMessage = "Failed to verify OTP. Please try again.";

      if (error.data) {
        if (
          error.data.non_field_errors &&
          Array.isArray(error.data.non_field_errors)
        ) {
          errorMessage = error.data.non_field_errors[0];
        } else if (typeof error.data.message === "string") {
          errorMessage = error.data.message;
        } else if (typeof error.data === "object") {
          const firstErrorField = Object.keys(error.data)[0];
          if (firstErrorField && Array.isArray(error.data[firstErrorField])) {
            errorMessage = error.data[firstErrorField][0];
          }
        }
      }

      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col gap-6">
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
              <div className="grid gap-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="m@example.com"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>OTP</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By signing up, you agree to our <a href="#">Terms of Service</a> and{" "}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

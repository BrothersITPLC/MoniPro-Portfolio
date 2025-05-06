import { useState } from "react";
import { Lock, Shield, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChangePasswordMutation } from "@/components/Auth/api";
import { toast } from "sonner";
const passwordSchema = z
  .object({
    old_password: z.string().min(6, "Password must be at least 6 characters"),
    new_password: z.string().min(6, "Password must be at least 6 characters"),
    confirm_password: z
      .string()
      .min(6, "Password must be at least 6 characters"),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords don't match",
    path: ["confirm_password"],
  });

type APIError = {
  data?: {
    message?: string;
  };
};
export function PasswordUpdate() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      old_password: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const [updatePassword] = useChangePasswordMutation();

  const onSubmit = async (values: z.infer<typeof passwordSchema>) => {
    setIsSubmitting(true);

    try {
      const response = await updatePassword(values).unwrap();
      if (response.status === "success") {
        toast.success(response?.message || "Password updated successfully");
        form.reset();
      }
      toast.error(response?.message || "Failed to update password");
      form.reset();
    } catch (err) {
      const ererror = err as APIError;
      const errorMessage =
        ererror?.data?.message || "Failed to update password";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <>
      <CardHeader className="bg-[var(--neutral-bg)] py-8 dark:bg-[var(--bg-dark)]">
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-16 rounded-full bg-[var(--primary)]/10 flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-[var(--primary)]" />
          </div>
          <CardTitle className="text-2xl font-bold text-[var(--primary)]">
            Password Settings
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-8 bg-[var(--white)] dark:bg-[var(--bg-dark)]">
        <div className="max-w-md mx-auto">
          <div className="bg-[var(--amber-50)] border-l-4 border-[var(--amber-400)] p-4 mb-6 dark:bg-[var(--amber-950)]/30 dark:border-[var(--amber-800)]">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-[var(--amber-400)] dark:text-[var(--amber-300)]"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-[var(--amber-700)] dark:text-[var(--amber-300)]">
                  Make sure to use a strong password that you don't use
                  elsewhere.
                </p>
              </div>
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="old_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium text-[var(--text-heading)]">
                      <Lock className="h-5 w-5 text-[var(--primary)]" />
                      Current Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your current password"
                        {...field}
                        className="border-[var(--border-light)] focus-visible:ring-[var(--primary)]/20 h-12 text-base rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-[var(--error-text)]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="new_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium text-[var(--text-heading)]">
                      <Lock className="h-5 w-5 text-[var(--primary)]" />
                      New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter new password"
                        {...field}
                        className="border-[var(--border-light)] focus-visible:ring-[var(--primary)]/20 h-12 text-base rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-[var(--error-text)]" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium text-[var(--text-heading)]">
                      <Lock className="h-5 w-5 text-[var(--primary)]" />
                      Confirm New Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm new password"
                        {...field}
                        className="border-[var(--border-light)] focus-visible:ring-[var(--primary)]/20 h-12 text-base rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-[var(--error-text)]" />
                  </FormItem>
                )}
              />

              <div className="pt-4 flex justify-end">
                <Button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] hover:opacity-90 text-[var(--white)] rounded-lg px-6 py-2.5 h-auto shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </CardContent>
    </>
  );
}

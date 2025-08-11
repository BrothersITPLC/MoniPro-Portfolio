import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useInitialRegisterMutation } from "../api";
import { RegisterCredentials, registerSchema } from "../type";

export function CompanySignup() {
  const navigate = useNavigate();
  const [registerMutation, { isLoading }] = useInitialRegisterMutation();

  const form = useForm<RegisterCredentials>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      password2: "",
    },
  });

  const onSubmit = async (data: RegisterCredentials) => {
    try {
      const response = await registerMutation(data).unwrap();

      if (response.status === "success") {
        toast.success(response.message || "Registration successful");
        navigate("/verification");
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error: any) {
      if (error.data?.message && typeof error.data.message === "object") {
        const errorMessages = Object.entries(error.data.message)
          .map(
            ([field, errors]) => `${field}: ${(errors as string[]).join(", ")}`
          )
          .join("; ");
        toast.error(errorMessages || "Failed to register. Please try again.");
      } else {
        toast.error(
          error.data?.message || "Failed to register. Please try again."
        );
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="m@example.com" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          <div className="grid grid-cols-1 gap-4">
          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
         </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-[var(--primary)] transition-all duration-300 transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Signup"}
        </Button>
      </form>
    </Form>
  );
}
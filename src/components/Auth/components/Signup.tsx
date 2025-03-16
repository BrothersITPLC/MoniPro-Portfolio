import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { setIsSignup } from "@/app/global";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
import { Link } from "react-router-dom";

import { useRegisterMutation } from "../api";

export function Signup({ className, ...props }: React.ComponentProps<"div">) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.password2) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
      }).unwrap();

      if (response.status === "success") {
        toast.success(response.message || "Registration successful");
        navigate("/verification");
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (error: any) {
      if (error.data?.message && typeof error.data.message === "object") {
        // Handle field-specific errors
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <Link to="/" className="flex items-center">
            <House className="h-6 w-6" />
          </Link>
          <CardTitle className="text-xl">Welcome</CardTitle>
          <CardDescription>Signup with your Google account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Signup with Google
                </Button>
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                <span className="bg-card text-muted-foreground relative z-10 px-2">
                  Or continue with Email
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="name">Organization Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Brothers IT PLC"
                    required
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <div className="flex items-center">
                    <Label htmlFor="password2">Confirm Password</Label>
                  </div>
                  <Input
                    id="password2"
                    type="password"
                    required
                    value={formData.password2}
                    onChange={handleChange}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing up..." : "Signup"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <button
                  type="button"
                  className="underline underline-offset-4 cursor-pointer"
                  onClick={() => dispatch(setIsSignup(false))}
                >
                  Login
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

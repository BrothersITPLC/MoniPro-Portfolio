import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { House } from "lucide-react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../api";

interface LoginProps extends React.ComponentProps<"div"> {
  onToggle: () => void;
  onReset: () => void;
}
export function Login({ className, onToggle, onReset, ...props }: LoginProps) {
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const user = useSelector((state: any) => state.auth.user);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      if (!user.organization_info_completed && user.is_private) {
        navigate("/home/private-info");
      } else if (!user.organization_info_completed && !user.is_private) {
        navigate("/home/comp-info");
      } else {
        navigate("/home/dashboard");
      }
    }
  }, [user, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData).unwrap();
      toast.success("Login successful");
      // Navigation will be handled by the useEffect hook
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to login. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-md mx-auto">
      <Card className="border border-red-600 dark:border-gray-700 bg-white dark:bg-background hover:shadow-2xl transition-all duration-300">
        <CardHeader className="text-center space-y-3">
          <Link
            to="/"
            className="flex items-center justify-center hover:scale-105 transition-all duration-300"
          >
            <House className="h-8 w-8 text-red-500" />
          </Link>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-300">
            Welcome back
          </CardTitle>
          <CardDescription className="text-gray-900 dark:text-gray-300">
            Login with your Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button
                  variant="outline"
                  className="w-full border-red-600 dark:border-gray-700 hover:bg-red-50 dark:hover:bg-red-900/30 transition-all duration-300 hover:scale-105"
                  type="button"
                >
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
                  Login with Google
                </Button>
              </div>
              <div className="relative text-center">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                </div>
                <span className="relative z-10 bg-white dark:bg-background px-4 text-sm text-gray-900 dark:text-gray-300">
                  Or continue with Email
                </span>
              </div>
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
                  <div className="flex items-center">
                    <button
                      className="ml-auto text-sm text-red-500 hover:text-red-600 hover:underline transition-colors"
                      onClick={onReset}
                    >
                      Forgot your password?
                    </button>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300 hover:scale-105"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </div>
              <div className="text-center text-sm text-gray-900 dark:text-gray-300">
                Don&apos;t have an account?{" "}
                <button
                  type="button"
                  className="text-red-500 hover:text-red-600 underline underline-offset-4 cursor-pointer transition-colors"
                  onClick={onToggle}
                >
                  Sign up
                </button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-xs text-gray-900 dark:text-gray-300">
        By signing in, you agree to our{" "}
        <a
          href="#"
          className="text-red-500 hover:text-red-600 underline underline-offset-4 transition-colors"
        >
          Terms of Service
        </a>{" "}
        and{" "}
        <a
          href="#"
          className="text-red-500 hover:text-red-600 underline underline-offset-4 transition-colors"
        >
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}

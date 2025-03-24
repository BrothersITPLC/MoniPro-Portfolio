import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useRegisterMutation } from "../api";

export function PrivateSignup({ isPrivate }: { isPrivate: boolean }) {
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    password2: "",
    is_private: isPrivate,
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
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phoneNumber,
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
    <form onSubmit={handleSubmit}>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label
              htmlFor="firstName"
              className="text-gray-900 dark:text-gray-300"
            >
              First Name
            </Label>
            <Input
              id="firstName"
              type="text"
              placeholder="Abebe"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="lastName"
              className="text-gray-900 dark:text-gray-300"
            >
              Last Name
            </Label>
            <Input
              id="lastName"
              type="text"
              placeholder="Chala"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>
        <div className="grid gap-3">
          <Label
            htmlFor="phoneNumber"
            className="text-gray-900 dark:text-gray-300"
          >
            Phone Number
          </Label>
          <Input
            id="phoneNumber"
            type="tel"
            placeholder="+1234567890"
            required
            value={formData.phoneNumber}
            onChange={handleChange}
            className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            required
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password2">Confirm Password</Label>
            <Input
              id="password2"
              type="password"
              required
              value={formData.password2}
              onChange={handleChange}
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer bg-red-500 hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
          disabled={isLoading}
        >
          {isLoading ? "Signing up..." : "Signup"}
        </Button>
      </div>
    </form>
  );
}

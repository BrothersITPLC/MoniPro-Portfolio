import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { usePrivateRegisterMutation } from "../api";

export function PrivateSignup() {
  const navigate = useNavigate();
  const [register, { isLoading }] = usePrivateRegisterMutation();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    password2: "",
    organization_website: "",
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
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        password2: formData.password2,
        organization_website: formData.organization_website,
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
              htmlFor="first_name"
              className="text-gray-900 dark:text-gray-300"
            >
              First Name
            </Label>
            <Input
              id="first_name"
              type="text"
              placeholder="Abebe"
              required
              value={formData.first_name}
              onChange={handleChange}
              className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
            />
          </div>
          <div className="grid gap-3">
            <Label
              htmlFor="last_name"
              className="text-gray-900 dark:text-gray-300"
            >
              Last Name
            </Label>
            <Input
              id="last_name"
              type="text"
              placeholder="Chala"
              required
              value={formData.last_name}
              onChange={handleChange}
              className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <Label htmlFor="phone" className="text-gray-900 dark:text-gray-300">
              Phone Number
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+1234567890"
              required
              value={formData.phone}
              onChange={handleChange}
              className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
            />
          </div>{" "}
          <div className="grid gap-3">
            <Label
              htmlFor="organization_website"
              className="text-gray-900 dark:text-gray-300"
            >
              Personal Website
            </Label>
            <Input
              id="organization_website"
              type="tel"
              placeholder="www.example.com"
              required
              value={formData.organization_website}
              onChange={handleChange}
              className="border-red-600 dark:border-gray-700 focus:ring-red-500 focus:border-red-500"
            />
          </div>
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

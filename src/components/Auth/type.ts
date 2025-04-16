import * as z from "zod";

// Zod schema for registration credentials validation
export const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email({ message: "Invalid email format" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least one lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least one number" }),
    password2: z.string().min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.password === data.password2, {
    message: "Passwords do not match",
    path: ["password2"],
  });

// Zod schema for OTP verification credentials validation
export const otpVerificationSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email format" }),
  otp: z
    .string()
    .min(6, { message: "OTP must be 6 digits" })
    .max(6, { message: "OTP must be 6 digits" })
    .regex(/^\d+$/, { message: "OTP must contain only numbers" }),
});

// Type for registration credentials derived from the Zod schema
export type RegisterCredentials = z.infer<typeof registerSchema>;

// Type for OTP verification credentials derived from the Zod schema
export type OtpVerificationCredentials = z.infer<typeof otpVerificationSchema>;

// Type for the API response
export interface RegisterResponse {
  status: string;
  message?: string;
  data?: any;
}

// Type for the OTP verification response
export interface OtpVerificationResponse {
  status: string;
  message?: string;
  data?: any;
}

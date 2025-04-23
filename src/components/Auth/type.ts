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

export const updateUserProfileSchema = z.object({
  organization_name: z
    .string()
    .min(1, { message: "Organization name is required" })
    .min(10, {
      message: "Organization name must be at least 10 characters long",
    }),

  phone: z.string().regex(/^0[79]\d{8}$/, {
    message: "Phone number must be 10 digits and start with 09 or 07",
  }),
  organization_website: z.string().optional(),

  organization_description: z
    .string()
    .min(1, { message: "Organization description is required" })
    .min(2, {
      message: "Organization description must be at least 2 characters long",
    }),

  first_name: z
    .string()
    .min(1, { message: "First name is required" })
    .min(3, { message: "First name must be at least 3 characters long" }),

  last_name: z
    .string()
    .min(1, { message: "Last name is required" })
    .min(3, { message: "Last name must be at least 3 characters long" }),
});

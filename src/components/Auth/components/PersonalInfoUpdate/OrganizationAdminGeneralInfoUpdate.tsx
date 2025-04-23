import { useState } from "react";
import {
  User,
  Globe,
  Phone,
  FileText,
  Info,
  Building2,
  Loader2,
} from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";
import { ProfilePictureUpdate } from "@/components/Auth/components/PersonalInfoUpdate/ProfilePictureUpdate";
import { updateUserProfileSchema } from "@/components/Auth/type";
import { useUpdateProfileMutation } from "@/components/Auth/api";
import { toast } from "sonner";

type APIError = {
  data?: {
    message?: string;
  };
};

export function OrganizationAdminGeneralInfoUpdate() {
  const organizationData = useSelector((state: RootState) => state.auth.user);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof updateUserProfileSchema>>({
    resolver: zodResolver(updateUserProfileSchema),
    defaultValues: {
      first_name: organizationData?.first_name || "",
      last_name: organizationData?.last_name || "",
      phone: organizationData?.phone || "",
      organization_website: organizationData?.organization_website || "",
      organization_description:
        organizationData?.organization_description || "",
      organization_name: organizationData?.organization_name || "",
    },
  });

  const [updateInfo] = useUpdateProfileMutation();

  const onSubmit = async (values: z.infer<typeof updateUserProfileSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await updateInfo(values).unwrap();
      if (response.status === "success") {
        toast.success(response?.message || "Information updated successfully");
        form.reset();
      } else {
        toast.error(response?.message || "Failed to update information");
      }
    } catch (err) {
      const ererror = err as APIError;
      const errorMessage =
        ererror?.data?.message || "Failed to update information";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <CardHeader className="bg-[var(--light)] py-8">
        <div className="flex flex-col items-center mb-4">
          <ProfilePictureUpdate
            profilePicture={organizationData?.profile_picture}
            firstName={organizationData?.first_name}
            lastName={organizationData?.last_name}
          />
          <CardTitle className="text-2xl font-bold text-primary">
            Personal Information
          </CardTitle>
        </div>
      </CardHeader>

      <CardContent className="p-8 bg-white">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium text-gray-700">
                      <User className="h-5 w-5 text-[var(--primary)]" />
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your first name"
                        {...field}
                        className="border-[var(--accent)] focus-visible:ring-[var(--primary)]/20 h-12 text-base rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium text-gray-700">
                      <User className="h-5 w-5 text-[var(--primary)]" />
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your last name"
                        {...field}
                        className="border-[var(--accent)] focus-visible:ring-[var(--primary)]/20 h-12 text-base rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            {!organizationData?.is_private && (
              <FormField
                control={form.control}
                name="organization_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium text-gray-700">
                      <Building2 className="h-5 w-5 text-[var(--primary)]" />
                      Organization Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter organization name"
                        {...field}
                        className="border-[var(--accent)] focus-visible:ring-[var(--primary)]/20 h-12 text-base rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium text-gray-700">
                      <Phone className="h-5 w-5 text-[var(--primary)]" />
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., 09123456789"
                        {...field}
                        className="border-[var(--accent)] focus-visible:ring-[var(--primary)]/20 h-12 text-base rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organization_website"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium text-gray-700">
                      <Globe className="h-5 w-5 text-[var(--primary)]" />
                      company Website
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://yourwebsite.com"
                        {...field}
                        className="border-[var(--accent)] focus-visible:ring-[var(--primary)]/20 h-12 text-base rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="bg-[var(--light)] p-6 rounded-lg border border-[var(--accent)]">
              <FormField
                control={form.control}
                name="organization_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2 text-base font-medium text-gray-700">
                      <FileText className="h-5 w-5 text-[var(--primary)]" />
                      About your company
                    </FormLabel>
                    <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                      <Info className="h-4 w-4 text-[var(--secondary)]" />
                      <span>Tell us about your company</span>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Tell us about company..."
                        {...field}
                        className="border-[var(--accent)] focus-visible:ring-[var(--primary)]/20 min-h-[150px] bg-white rounded-lg"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                className="flex items-center gap-2 bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] hover:opacity-90 text-white rounded-lg px-6 py-2.5 h-auto shadow-md"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Information"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </>
  );
}

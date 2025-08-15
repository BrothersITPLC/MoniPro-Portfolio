import {
  User,
  Globe,
  Phone,
  FileText,
  ArrowLeft,
  Info,
  Camera,
  Building2,
  Lock,
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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/app/store";
import { setOrganization } from "../companySclice";
import type { OrganizationDataInfrence } from "../companySclice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useUpdateInfoMutation } from "@/app/services/authApi"

const personalInfoSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  organization_phone: z
  .string()
  .regex(/^\d{9}$/, {
    message: "Phone number must be 9 digits after +251",
  }),
  organization_website: z.string().optional(),
  organization_description: z.string().optional(),
  organization_name: z.string().optional(),
});

export function PersonalInfoUpdate() {
  const organizationData = useSelector((state: RootState) => state.auth.user);

  const form = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      first_name: organizationData?.first_name || "",
      last_name: organizationData?.last_name || "",
      organization_phone: organizationData?.organization_phone || "",
      organization_website: organizationData?.organization_website || "",
      organization_description:
        organizationData?.organization_description || "",
      organization_name: organizationData?.organization_name || "",
    },
  });

  //   const [updateInfo] = useUpdateInfoMutation();

  const onSubmit = async (values: z.infer<typeof personalInfoSchema>) => {
    // try {
    //   const response = await updateInfo(values).unwrap();
    //   toast.success('Information updated successfully');
    // } catch (err) {
    //   toast.error('Failed to update information');
    // }
  };

  return (
    <div className="container ml-10 pb-10 ">
      <Card className="border-[var(--accent)] shadow-md">
        <CardHeader className="bg-[var(--light)]  py-8">
          <div className="flex flex-col items-center mb-4">
            <div className="relative mb-4  ">
              <Avatar className="w-18 h-18 border-4 border-[var(--primary)]">
                <AvatarImage
                  src="/placeholder.svg?height=96&width=96"
                  alt="Profile picture"
                />
                <AvatarFallback className="bg-[var(--secondary)] text-white text-xl">
                  JD
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                className="absolute bottom-0 right-0 rounded-full bg-primary hover:bg-secondary text-white w-8 h-8"
              >
                <Camera className="h-4 w-4" />
                <span className="sr-only">Change profile picture</span>
              </Button>
            </div>
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
                        <User className="h-5 w-8 text-[var(--primary)]" />
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
                        <User className="h-5 w-8 text-[var(--primary)]" />
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

              {organizationData?.is_admin && (
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
                  name="organization_phone"
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
                        Personal Website
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <FormField
                  control={form.control}
                  name="previous_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base font-medium text-gray-700">
                        <Lock className="h-5 w-5 text-[var(--primary)]" />
                        Previous Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter previous password"
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
                  name="current_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base font-medium text-gray-700">
                        <Lock className="h-5 w-5 text-[var(--primary)]" />
                        New Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter new password"
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
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2 text-base font-medium text-gray-700">
                        <Lock className="h-5 w-5 text-[var(--primary)]" />
                        Confirm Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Confirm new password"
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
                        About You
                      </FormLabel>
                      <div className="flex items-center gap-2 mb-2 text-sm text-gray-600">
                        <Info className="h-4 w-4 text-[var(--secondary)]" />
                        <span>
                          Tell us about your background, interests, and
                          expertise
                        </span>
                      </div>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us about yourself..."
                          {...field}
                          className="border-[var(--accent)] focus-visible:ring-[var(--primary)]/20 min-h-[150px] bg-white rounded-lg"
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-2 flex justify-between">
                <Button
                  variant="outline"
                  className="flex items-center gap-2 border-[var(--secondary)] text-[var(--secondary)] hover:bg-[var(--light)] hover:text-[var(--primary)] rounded-lg px-6 py-2.5 h-auto"
                >
                  <ArrowLeft className="w-5 h-3" />
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="flex items-center gap-2 bg-gradient-to-r from-[var(--secondary)] to-[var(--primary)] hover:opacity-90 text-white rounded-lg px-6 py-2.5 h-auto shadow-md"
                >
                  Update
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

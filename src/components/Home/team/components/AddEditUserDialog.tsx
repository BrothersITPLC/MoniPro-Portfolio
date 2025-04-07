import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { User, Mail, Lock, MessageSquare } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"

export interface UserFormData {
  username: string
  firstName: string
  lastName: string
  status: boolean
  password: string
  confirmPassword: string
  mediaTypes: {
    email: boolean
    telegram: boolean
  }
  email: string
  telegramusername: string
}

const formSchema = z
  .object({
    username: z.string().min(2, "Username must be at least 2 characters"),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    status: z.boolean().default(true),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
    mediaTypes: z.object({
      email: z.boolean().default(false),
      telegram: z.boolean().default(false),
    }),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    telegramusername: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

interface UserFormProps {
  onSubmit: (data: UserFormData) => void
  initialData?: Partial<UserFormData>
  isEditing?: boolean
}

export function UserForm({ onSubmit, initialData, isEditing = false }: UserFormProps) {
  const { user } = useSelector((state: RootState) => state.auth)
  const [selectedMediaType, setSelectedMediaType] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: initialData?.username || "",
      firstName: initialData?.firstName || "",
      lastName: initialData?.lastName || "",
      status: initialData?.status ?? true,
      password: initialData?.password || "",
      confirmPassword: initialData?.confirmPassword || "",
      mediaTypes: initialData?.mediaTypes || {
        email: false,
        telegram: false,
      },
      email: initialData?.email || "",
      telegramusername: initialData?.telegramusername || "",
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data as UserFormData)
  }

  const handleMediaTypeChange = (value: string) => {
    setSelectedMediaType(value)

    // Reset the other field when switching media types
    if (value === "email") {
      form.setValue("telegramusername", "")
      form.setValue("mediaTypes.email", true)
      form.setValue("mediaTypes.telegram", false)
    } else if (value === "telegram") {
      form.setValue("email", "")
      form.setValue("mediaTypes.email", false)
      form.setValue("mediaTypes.telegram", true)
    }
  }

  return (
    <div className="w-full">
      <div className="space-y-2 mb-8">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">{isEditing ? "Edit User" : "Create New User"}</h2>
        </div>
        <p className="text-muted-foreground">
          {isEditing ? "Update user information" : "Fill in the details to create a new user"}
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    First Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="John"
                      {...field}
                      className="transition-all focus-visible:ring-primary/20 focus-visible:ring-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Last Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Doe"
                      {...field}
                      className="transition-all focus-visible:ring-primary/20 focus-visible:ring-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  Username
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe"
                    {...field}
                    className="transition-all focus-visible:ring-primary/20 focus-visible:ring-4"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                      className="transition-all focus-visible:ring-primary/20 focus-visible:ring-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                    Confirm Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="******"
                      {...field}
                      className="transition-all focus-visible:ring-primary/20 focus-visible:ring-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 mb-4">
                <FormControl>
                  <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Active Status</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormItem className="mb-4">
              <FormLabel className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                Select Media Type
              </FormLabel>
              <Select onValueChange={handleMediaTypeChange} value={selectedMediaType || ""}>
                <FormControl>
                  <SelectTrigger className="transition-all focus-visible:ring-primary/20 focus-visible:ring-4">
                    <SelectValue placeholder="Select media type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="telegram">Telegram</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>

            {selectedMediaType === "email" && (
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john.doe@example.com"
                        {...field}
                        className="transition-all focus-visible:ring-primary/20 focus-visible:ring-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {selectedMediaType === "telegram" && (
              <FormField
                control={form.control}
                name="telegramusername"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      Telegram Username
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="@johndoe"
                        {...field}
                        className="transition-all focus-visible:ring-primary/20 focus-visible:ring-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button type="button" variant="outline" className="sm:flex-1" onClick={() => form.reset()}>
              Cancel
            </Button>
            <Button type="submit" className="sm:flex-1 bg-primary hover:bg-primary/90 transition-colors">
              {isEditing ? "Update User" : "Create User"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}


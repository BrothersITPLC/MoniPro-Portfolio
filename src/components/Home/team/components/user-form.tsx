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
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import type { User as UserType, UserFormData } from "../types"

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
    // Add permissions fields if needed
    permissions: z
      .object({
        addVM: z.boolean().default(false),
        addUser: z.boolean().default(false),
        controlVM: z.array(z.string()).default([]),
      })
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine(
    (data) => {
      if (data.mediaTypes.email && !data.email) return false
      if (data.mediaTypes.telegram && !data.telegramusername) return false
      return true
    },
    {
      message: "Required field for selected media type",
      path: ["email"],
    },
  )

interface UserFormProps {
  onSubmit: (data: UserFormData) => void
  user: UserType | null
  open: boolean
  onOpenChange: (open: boolean) => void
  isEditing?: boolean
}

export function UserForm({ onSubmit, user, open, onOpenChange, isEditing = false }: UserFormProps) {
  const { user: currentUser } = useSelector((state: RootState) => state.auth)
  const [selectedMediaType, setSelectedMediaType] = useState<string | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      status: true,
      password: "",
      confirmPassword: "",
      mediaTypes: {
        email: false,
        telegram: false,
      },
      email: "",
      telegramusername: "",
      permissions: {
        addVM: false,
        addUser: false,
        controlVM: [],
      },
    },
  })

  // Update form when user changes
  useEffect(() => {
    if (user && open) {
      // Determine selected media type
      let mediaType = null
      if (user.permissions.mediaTypes.email) mediaType = "email"
      else if (user.permissions.mediaTypes.telegram) mediaType = "telegram"

      setSelectedMediaType(mediaType)

      form.reset({
        username: user.firstName.toLowerCase() + user.lastName.toLowerCase(), // Example username generation
        firstName: user.firstName,
        lastName: user.lastName,
        status: user.status,
        password: "", // Don't prefill password for security
        confirmPassword: "",
        mediaTypes: user.permissions.mediaTypes,
        email: user.email || "",
        telegramusername: "", // Add if available in your user object
        permissions: {
          addVM: user.permissions.addVM,
          addUser: user.permissions.addUser,
          controlVM: user.permissions.controlVM,
        },
      })
    } else if (!user && open) {
      // Reset form for new user
      form.reset({
        username: "",
        firstName: "",
        lastName: "",
        status: true,
        password: "",
        confirmPassword: "",
        mediaTypes: {
          email: false,
          telegram: false,
        },
        email: "",
        telegramusername: "",
        permissions: {
          addVM: false,
          addUser: false,
          controlVM: [],
        },
      })
      setSelectedMediaType(null)
    }
  }, [user, open, form])

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 pb-5">
            <User className="h-5 w-5 text-[var(--secondary)]" />
            {isEditing ? "Edit User" : "Create New User"}
          </DialogTitle>

        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John"
                        {...field}
                        className="transition-all focus-visible:ring-[var(--secondary)]/20 focus-visible:ring-4"
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
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Last Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Doe"
                        {...field}
                        className="transition-all focus-visible:ring-[var(--secondary)]/20 focus-visible:ring-4"
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
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    Username
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="johndoe"
                      {...field}
                      className="transition-all focus-visible:ring-[var(--secondary)]/20 focus-visible:ring-4"
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
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        {...field}
                        className="transition-all focus-visible:ring-[var(--secondary)]/20 focus-visible:ring-4"
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
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      Confirm Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="******"
                        {...field}
                        className="transition-all focus-visible:ring-[var(--secondary)]/20 focus-visible:ring-4"
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
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
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
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                  Select Media Type
                </FormLabel>
                <Select onValueChange={handleMediaTypeChange} value={selectedMediaType || ""}>
                  <FormControl>
                    <SelectTrigger className="transition-all focus-visible:ring-[var(--secondary)]/20 focus-visible:ring-4">
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
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john.doe@example.com"
                          {...field}
                          className="transition-all focus-visible:ring-[var(--secondary)]/20 focus-visible:ring-4"
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
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        Telegram Username
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="@johndoe"
                          {...field}
                          className="transition-all focus-visible:ring-[var(--secondary)]/20 focus-visible:ring-4"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Permissions Section */}
            <div className="space-y-4 pt-4 border-t">
              <h3 className="text-lg font-medium text-[var(--secondary)]">User Permissions</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="permissions.addVM"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Can Add VM</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="permissions.addUser"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Can Add Users</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <DialogFooter className="pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-200"
              >
                Cancel
              </Button>
              <Button type="submit" className="bg-[var(--secondary)] hover:bg-[var(--secondary)] text-white">
                {isEditing ? "Update User" : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export function AddEditUserDialog({
  open,
  onOpenChange,
  user,
  onSubmit,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: UserType | null
  onSubmit: (data: UserFormData) => void
}) {
  return <UserForm open={open} onOpenChange={onOpenChange} user={user} onSubmit={onSubmit} isEditing={!!user} />
}


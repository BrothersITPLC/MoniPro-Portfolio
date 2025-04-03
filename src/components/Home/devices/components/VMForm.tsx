import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { Server, Globe, User, Lock, Network, Wifi } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { VMFormData } from "../types"

const formSchema = z.object({
  domainName: z.string().min(1, "Domain name is required"),
  username: z.string().min(2, "Username must be at least 2 characters"),
  // Simplified password validation - just require input
  password: z.string().min(1, "Password is required"),
  // Enhanced IP address validation
  ipAddress: z.string().refine(
    (value) => {
      if (!value) return false
      const parts = value.split(".")
      if (parts.length !== 4) return false
      return parts.every((part) => {
        const num = Number.parseInt(part, 10)
        return !isNaN(num) && num >= 0 && num <= 255
      })
    },
    { message: "Please enter a valid IP address (e.g., 192.168.1.1)" },
  ),
  networkType: z.string().min(1, "Please select a network type"),
  belong_to: z.number().min(1, "Owner is required"),
})

interface VMFormProps {
  onSubmit: (data: VMFormData) => void
  initialData?: Partial<VMFormData>
  isEditing?: boolean
}

export function VMForm({ onSubmit, initialData, isEditing = false }: VMFormProps) {
  const { user } = useSelector((state: RootState) => state.auth)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domainName: initialData?.domainName || "",
      username: initialData?.username || "",
      password: initialData?.password || "",
      ipAddress: initialData?.ipAddress || "",
      networkType: initialData?.networkType || "",
      belong_to: initialData?.belong_to || user?.user_id,
    },
  })

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const submissionData = {
      ...data,
      belong_to: user?.user_id || 0,
    }
    onSubmit(submissionData)
  }

  return (
    <div className="w-full">
      <div className="space-y-2 mb-8">
        <div className="flex items-center space-x-2">
          <Server className="h-5 w-5 text-primary" />
          <h2 className="text-2xl font-bold">{isEditing ? "Edit Virtual Machine" : "Create New Virtual Machine"}</h2>
        </div>
        <p className="text-muted-foreground">
    
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="domainName"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    Domain Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example.com"
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
              name="ipAddress"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="flex items-center gap-2">
                    <Network className="h-4 w-4 text-muted-foreground" />
                    IP Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="192.168.1.1"
                      {...field}
                      className="transition-all focus-visible:ring-primary/20 focus-visible:ring-4"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="admin"
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
          </div>

          <FormField
            control={form.control}
            name="networkType"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  Network Type
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="transition-all focus-visible:ring-primary/20 focus-visible:ring-4">
                      <SelectValue placeholder="Select network type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button type="button" variant="outline" className="sm:flex-1" onClick={() => form.reset()}>
              Cancel
            </Button>
            <Button type="submit" className="sm:flex-1 bg-primary hover:bg-primary/90 transition-colors">
              {isEditing ? "Update VM" : "Create VM"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}


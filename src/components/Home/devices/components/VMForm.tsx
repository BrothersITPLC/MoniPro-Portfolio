import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { VMFormData } from "../types";

const formSchema = z.object({
  domainName: z.string().optional(),
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  ipAddress: z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid IP address"),
  networkType: z.string().min(1, "Please select a network type"),
});

interface VMFormProps {
  onSubmit: (data: VMFormData) => void;
  initialData?: Partial<VMFormData>;
  isEditing?: boolean;
}

export function VMForm({
  onSubmit,
  initialData,
  isEditing = false,
}: VMFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      domainName: initialData?.domainName || "",
      username: initialData?.username || "",
      password: initialData?.password || "",
      ipAddress: initialData?.ipAddress || "",
      networkType: initialData?.networkType || "",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const completeData: VMFormData = {
      ...data,
      id: initialData?.id,
      domainName: data.domainName || "",
      status: initialData?.status || "stopped",
      resources: initialData?.resources || {
        cpu: 0,
        memory: 0,
        storage: 0,
      },
    };

    onSubmit(completeData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="domainName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domain Name (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="admin" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="******" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="ipAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IP Address</FormLabel>
              <FormControl>
                <Input placeholder="192.168.1.1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="networkType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Network Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select network type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEditing ? "Update VM" : "Create VM"}
        </Button>
      </form>
    </Form>
  );
}

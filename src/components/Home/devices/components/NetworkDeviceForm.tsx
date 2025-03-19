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
import { NetworkFormData } from "../types";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  deviceType: z.string().min(1, "Please select a device type"),
  ipAddress: z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid IP address"),
  subnetMask: z
    .string()
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid subnet mask"),
  gateway: z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid gateway"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  status: z.enum(["active", "inactive", "maintenance"]),
});

interface NetworkDeviceFormProps {
  onSubmit: (data: NetworkFormData) => void;
  initialData?: Partial<NetworkFormData>;
  isEditing?: boolean;
}

export function NetworkDeviceForm({
  onSubmit,
  initialData,
  isEditing = false,
}: NetworkDeviceFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      deviceType: initialData?.deviceType || "",
      ipAddress: initialData?.ipAddress || "",
      subnetMask: initialData?.subnetMask || "",
      gateway: initialData?.gateway || "",
      location: initialData?.location || "",
      status: initialData?.status || "inactive",
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    const completeData: NetworkFormData = {
      ...data,
      id: initialData?.id,
      metrics: initialData?.metrics || {
        bandwidth: 0,
        latency: 0,
        packetLoss: 0,
      },
    };

    onSubmit(completeData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Name</FormLabel>
              <FormControl>
                <Input placeholder="Core Router" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="deviceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Device Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select device type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="router">Router</SelectItem>
                  <SelectItem value="switch">Switch</SelectItem>
                  <SelectItem value="firewall">Firewall</SelectItem>
                  <SelectItem value="loadbalancer">Load Balancer</SelectItem>
                </SelectContent>
              </Select>
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
          name="subnetMask"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subnet Mask</FormLabel>
              <FormControl>
                <Input placeholder="255.255.255.0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gateway"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gateway</FormLabel>
              <FormControl>
                <Input placeholder="192.168.1.254" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Server Room A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          {isEditing ? "Update Device" : "Add Device"}
        </Button>
      </form>
    </Form>
  );
}

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
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
  networkType: z.string().min(1, "Please select a network type"),
  ipAddress: z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid IP address"),
  subnetMask: z
    .string()
    .regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid subnet mask"),
  gateway: z.string().regex(/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid gateway"),
  belong_to: z.number().min(1, "Owner is required"),
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
  const { user } = useSelector((state: RootState) => state.auth);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      deviceType: initialData?.deviceType || "",
      networkType: initialData?.networkType || "",
      ipAddress: initialData?.ipAddress || "",
      subnetMask: initialData?.subnetMask || "",
      gateway: initialData?.gateway || "",
      belong_to: initialData?.belong_to || user?.user_id,
    },
  });

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    onSubmit(data);
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

        <Button type="submit" className="w-full">
          {isEditing ? "Update Device" : "Add Device"}
        </Button>
      </form>
    </Form>
  );
}

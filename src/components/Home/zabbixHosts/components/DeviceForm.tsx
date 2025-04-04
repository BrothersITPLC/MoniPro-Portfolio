import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const schema = z.object({
  host: z.string().min(1, "Host name is required"),
  ip: z.string().optional(),
  dns: z.string().optional(),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  network_type: z.string().min(1, "Network type is required"),
  device_type: z.string(),
  network_device_type: z.string().optional(),
});

interface DeviceFormProps {
  onSubmit: (data: any) => void;
  type: "vm" | "network";
  onTypeChange: (type: "vm" | "network") => void;
}

export function DeviceForm({ onSubmit, type, onTypeChange }: DeviceFormProps) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      host: "",
      ip: "",
      dns: "",
      username: "",
      password: "",
      network_type: "",
      device_type: type,
      network_device_type: "",
    },
  });

  return (
    <div className="space-y-6">
      <Tabs value={type} onValueChange={onTypeChange}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="vm">Virtual Machine</TabsTrigger>
          <TabsTrigger value="network">Network Device</TabsTrigger>
        </TabsList>
      </Tabs>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="host"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Host Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ip"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IP Address (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dns"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>DNS (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {type === "network" && (
            <FormField
              control={form.control}
              name="network_device_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Device Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="router">Router</SelectItem>
                      <SelectItem value="switch">Switch</SelectItem>
                      <SelectItem value="firewall">Firewall</SelectItem>
                      <SelectItem value="loadbalancer">
                        Load Balancer
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="network_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Network Type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
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

          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit">Create Device</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

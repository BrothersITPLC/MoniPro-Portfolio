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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Server, Network, Key, Globe, Database } from "lucide-react";

const schema = z.object({
  host: z.string().min(1, "Host name is required"),
  ip: z.string().optional(),
  dns: z.string().optional(),
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
  network_type: z.string().min(1, "Network type is required"),
  device_type: z.string(),
  network_device_type: z.string().optional(),
}).refine(
    (data) => {
      if (data.device_type === "network") {
        return data.network_device_type !== undefined && data.network_device_type !== "";
      }
      return true;
    },
    {
      message: "Network device type is required",
      path: ["network_device_type"],
    }
  );
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
    <Card className="w-full max-w-2xl border-none shadow-none ">
      <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100  py-2">
         <CardTitle className="flex items-center gap-2 text-slate-800 ">
           {type === "vm" ? (
             <Server className="h-5 w-5 text-emerald-500" />
           ) : (
             <Network className="h-5 w-5 text-violet-500" />
           )}
           {type === "vm" ? "Virtual Machine Setup" : "Network Device Setup"}
         </CardTitle>
     </CardHeader>
      <CardContent className="p-4">
         <Tabs value={type} onValueChange={onTypeChange} className="mb-4">
           <TabsList className="grid w-full grid-cols-2">
             <TabsTrigger value="vm" className="flex items-center gap-2">
               <Server className="h-4 w-4" />
               <span>Virtual Machine</span>
             </TabsTrigger>
             <TabsTrigger value="network" className="flex items-center gap-2">
               <Network className="h-4 w-4" />
               <span>Network Device</span>
             </TabsTrigger>
           </TabsList>
         </Tabs>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <div className="bg-[var(--slate-50)] p-3 rounded-lg border border-[var(--slate-100)]">
              <h3 className="text-sm font-medium text-[var(--slate-700)] mb-2 flex items-center gap-2">
                <Database className="h-4 w-4 text-[var(--slate-500)]" />
                Device Information
              </h3>
              <div className="space-y-3">
                <FormField
                  control={form.control}
                  name="host"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--slate-700)]">
                        Host Name <span className="text-[var(--red-300)]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter host name"
                          className="focus-visible:ring-[var(--emerald-500)] h-9"
                        />
                      </FormControl>
                      <FormMessage className="text-[var(--red-500)]" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="ip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[var(--slate-700)]">
                          IP Address (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="192.168.1.1"
                            className="focus-visible:ring-[var(--emerald-500)] h-9"
                          />
                        </FormControl>
                        <FormMessage className="text-[var(--red-500)]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dns"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-[var(--slate-700)]">
                          DNS (Optional)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="dns.example.com"
                            className="focus-visible:ring-[var(--emerald-500)] h-9"
                          />
                        </FormControl>
                        <FormMessage className="text-[var(--red-500)]" />
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
                        <FormLabel className="text-[var(--slate-700)]">
                          Device Type
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="focus-visible:ring-[var(--emerald-500)] h-9">
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
                        <FormMessage className="text-[var(--red-500)]" />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>

            <div className="bg-[var(--slate-50)] p-3 rounded-lg border border-[var(--slate-100)]">
              <h3 className="text-sm font-medium text-[var(--slate-700)] mb-2 flex items-center gap-2">
                <Key className="h-4 w-4 text-[var(--slate-500)]" />
                Authentication
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--slate-700)]">
                        Username <span className="text-[var(--red-300)]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="admin"
                          className="focus-visible:ring-[var(--emerald-500)] h-9"
                        />
                      </FormControl>
                      <FormMessage className="text-[var(--red-500)]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-[var(--slate-700)]">
                        Password <span className="text-[var(--red-300)]">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="••••••••"
                          className="focus-visible:ring-[var(--emerald-500)] h-9"
                        />
                      </FormControl>
                      <FormMessage className="text-[var(--red-500)]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="bg-[var(--slate-50)] p-3 rounded-lg border border-[var(--slate-100)]">
              <h3 className="text-sm font-medium text-[var(--slate-700)] mb-2 flex items-center gap-2">
                <Globe className="h-4 w-4 text-[var(--slate-500)]" />
                Network Configuration
              </h3>
              <FormField
                control={form.control}
                name="network_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[var(--slate-700)]">
                      Network Type <span className="text-[var(--red-300)]">*</span>
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="focus-visible:ring-[var(--emerald-500)] h-9">
                          <SelectValue placeholder="Select network type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="public">Public</SelectItem>
                        <SelectItem value="private">Private</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-[var(--red-500)]" />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-4 pt-2">

              <Button
                type="button"
                variant="outline"
                onClick={() => form.reset()}
                className="border-[var(--gray-300)] hover:bg-[var(--gray-50)] text-[var(--gray-700)]"
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="bg-[var(--primary)] text-[var(--white)] hover:bg-[var(--secondary)]"
              >
                Create Device
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

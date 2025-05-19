import { useState, useEffect } from "react";
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
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const schema = z.object({
  host: z.string().min(1, "Host name is required"),
  ip: z.string().optional(),
  dns: z.string().optional(),
  network_device_type: z.string().optional(),
});
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Server, Network, Database } from "lucide-react";

type FormInputs = z.infer<typeof schema>;

type DeviceCreationFormProps = {
  onSubmit: (data: any) => void;
  initialData?: any;
  initialType?: "vm" | "network";
};

export function DeviceCreationForm({
  onSubmit,
  initialData,
  initialType,
}: DeviceCreationFormProps) {
  const [type, setType] = useState<"vm" | "network">(initialType || "vm");

  const form = useForm<FormInputs>({
    resolver: zodResolver(schema),
    defaultValues: {
      host: "",
      ip: "",
      dns: "",
      network_device_type: "",
    },
  });

  // Update form when initialData changes (for editing)
  useEffect(() => {
    if (initialData) {
      form.reset({
        host: initialData.host || "",
        ip: initialData.ip || "",
        dns: initialData.dns || "",
        network_device_type: initialData.network_device_type || "",
      });
    }
  }, [initialData, form]);

  // Update type when initialType changes
  useEffect(() => {
    if (initialType) {
      setType(initialType);
    }
  }, [initialType]);

  const onTypeChange = (value: string) => {
    if (value === "vm" || value === "network") {
      setType(value);
    }
  };

  const handleSubmit = (data: FormInputs) => {
    onSubmit({
      ...data,
      device_type: type,
    });
  };

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
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-3"
          >
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
                      <FormLabel>
                        Host Name{" "}
                        <span className="text-[var(--red-300)]">*</span>
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
                {initialData ? "Update Device" : "Create Device"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DeviceForm } from "./DeviceForm";
import { DeviceList } from "./DeviceList";
import { SecurityConfirmation } from "./SecurityConfirmation";
import { useCreateHostMutation } from "../api";
import { toast } from "sonner";
import { useGetZabixHostesQuery } from "../api";

export function DeviceManager() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<"vm" | "network">("vm");
  const [pendingData, setPendingData] = useState<any>(null);

  const { data, isLoading } = useGetZabixHostesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [createHost] = useCreateHostMutation();

  // Safely extract hosts array from the response
  const hosts = Array.isArray(data?.data) ? data.data : [];

  // Filter hosts based on device type
  const vms = hosts.filter((host) => host.device_type === "vm");
  const networkDevices = hosts.filter((host) => host.device_type === "network");

  const handleSubmit = (data: any) => {
    setPendingData(data);
    setIsConfirmationOpen(true);
    setIsFormOpen(false);
  };

  const handleConfirm = async () => {
    try {
      await createHost(pendingData).unwrap();
      toast.success(
        `${
          deviceType === "vm" ? "Virtual machine" : "Network device"
        } created successfully`
      );
      setIsConfirmationOpen(false);
      setPendingData(null);
    } catch (error) {
      toast.error("Failed to create device");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Tabs defaultValue="vm" className="w-full">
        <div className="flex justify-between items-center mb-6">
          <TabsList>
            <TabsTrigger value="vm">Virtual Machines</TabsTrigger>
            <TabsTrigger value="network">Network Devices</TabsTrigger>
          </TabsList>
          <Button onClick={() => setIsFormOpen(true)}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>

        <TabsContent value="vm">
          <DeviceList devices={vms} type="vm" isLoading={isLoading} />
        </TabsContent>
        <TabsContent value="network">
          <DeviceList
            devices={networkDevices}
            type="network"
            isLoading={isLoading}
          />
        </TabsContent>
      </Tabs>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DeviceForm
            onSubmit={handleSubmit}
            type={deviceType}
            onTypeChange={setDeviceType}
          />
        </DialogContent>
      </Dialog>

      <SecurityConfirmation
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        onConfirm={handleConfirm}
        type={deviceType}
      />
    </div>
  );
}

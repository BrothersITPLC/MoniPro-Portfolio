import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Server, Network, CloudCog, Database } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DeviceList } from "./DeviceList";
import { toast } from "sonner";
import {
  useGetLocalHostsQuery,
  useCreateLocalHostMutation,
  useUpdateLocalHostMutation,
  useDeleteLocalHostMutation,
  useLazyCheckHostAvailabilityQuery,
} from "../api";
import { DeviceCreationForm } from "@/components/Home/zabbixHosts/components/Forms/DeviceCreationForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type Hosts = {
  id: number;
  host: string;
  ip: string;
  dns: string;
  device_type: string;
  network_device_type: string;
  host_group: number;
};

export function DeviceManager() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deviceType, setDeviceType] = useState<"vm" | "network">("vm");
  const [deviceSource, setDeviceSource] = useState<"local" | "hosted">("local");
  const [pendingData, setPendingData] = useState<any>(null);
  const [editingDevice, setEditingDevice] = useState<any>(null);
  const [deletingDeviceId, setDeletingDeviceId] = useState<string | null>(null);

  const { data, isLoading } = useGetLocalHostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [createHost] = useCreateLocalHostMutation();
  const [updateHost] = useUpdateLocalHostMutation();
  const [deleteHost] = useDeleteLocalHostMutation();

  const hosted_devices = data?.data?.hosted_hosts || [];
  const local_hosts = data?.data?.local_hosts || [];

  const local_hosts_vm = local_hosts.filter(
    (device: Hosts) => device.device_type === "vm"
  );
  const local_hosts_network = local_hosts.filter(
    (device: Hosts) => device.device_type === "network"
  );
  const hosted_devices_vm = hosted_devices.filter(
    (device: Hosts) => device.device_type === "vm"
  );
  const hosted_devices_network = hosted_devices.filter(
    (device: Hosts) => device.device_type === "network"
  );

  const handleSubmit = (data: any) => {
    if (!data.ip && !data.dns) {
      toast.error("Please provide either IP address or DNS");
      return;
    }
    const formattedData = {
      ...data,
      device_type: deviceType,
    };

    if (editingDevice) {
      handleUpdate(formattedData);
    } else {
      handleAvailabilityCheck(formattedData.ip, formattedData.dns);
      setPendingData(formattedData);
      setIsConfirmDialogOpen(true);
    }
  };

  const handleCreate = async () => {
    try {
      const result = await createHost(pendingData).unwrap();

      if (result.status !== "success") {
        toast.error(result.message || "Failed to create host");
        return;
      }
      toast.success(result.message || "Device created successfully");
      setPendingData(null);
      setIsConfirmDialogOpen(false);
    } catch (error: any) {
      toast.error(
        error.data?.message || error.error || "Failed to create device"
      );
    }
  };

  const openEditForm = (device: any) => {
    setDeviceType(device.device_type);
    setEditingDevice(device);
    const formData = {
      host: device.host,
      ip: device.ip || "",
      dns: device.dns || "",
      device_type: device.device_type || "",
      network_device_type: device.network_device_type || "",
    };
    setPendingData(formData);
    setIsFormOpen(true);
  };

  const handleUpdate = async (formData?: any) => {
    if (!editingDevice) return;
    const dataToUpdate = formData || pendingData;
    if (!dataToUpdate) return;
    try {
      const result = await updateHost({
        id: editingDevice.id,
        ...dataToUpdate,
      }).unwrap();

      if (result.status !== "success") {
        toast.error(result.message || "Failed to update host");
        return;
      }
      toast.success(result.message || "Device updated successfully");
      setEditingDevice(null);
      setPendingData(null);
      setIsFormOpen(false);
    } catch (error) {
      toast.error("Failed to update device");
    }
  };

  const handleDelete = async () => {
    if (!deletingDeviceId) return;
    try {
      const result = await deleteHost(deletingDeviceId).unwrap();

      if (result.status !== "success") {
        toast.error(result.message || "Failed to delete host");
        return;
      }
      toast.success(result.message || "Device deleted successfully");
      setDeletingDeviceId(null);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      toast.error("Failed to delete device");
    }
  };

  const openDeleteDialog = (deviceId: string) => {
    setDeletingDeviceId(deviceId);
    setIsDeleteDialogOpen(true);
  };

  const [
    triggerCheckHostAvailability,
    {
      data: isAvailabilityData,
      error: availabilityError,
      isLoading: isAvailabilityLoading,
    },
  ] = useLazyCheckHostAvailabilityQuery();

  const handleAvailabilityCheck = async (ip: string, dns: string) => {
    let is_domain = true;
    let host = "";

    if (!ip && !dns) {
      toast.error("Please provide either IP address or DNS");
      return;
    }

    host = ip || dns;
    is_domain = !ip;

    try {
      const result = await triggerCheckHostAvailability({
        host,
        isDomain: is_domain,
      }).unwrap();
      if (result.status !== "success") {
        toast.error(result.message || "Failed to check availability");
        return;
      }
      toast.success(result.message || "Host availability checked successfully");
    } catch (err: any) {
      toast.error(err?.data.message || "Failed to check availability.");
    }
  };

  return (
    <div className="container mx-auto py-8">
      <Tabs
        defaultValue="local"
        className="w-full"
        onValueChange={(value) => setDeviceSource(value as "local" | "hosted")}
      >
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <TabsList className="w-full md:w-[400px] p-1 bg-muted/80 backdrop-blur-sm rounded-xl shadow-md">
            <TabsTrigger 
              value="local" 
              className="flex-1 py-3 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Database className="h-4 w-4" />
              <span>Local Devices</span>
            </TabsTrigger>
            <TabsTrigger 
              value="hosted" 
              className="flex-1 py-3 data-[state=active]:bg-background data-[state=active]:shadow-md rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
            >
              <CloudCog className="h-4 w-4" />
              <span>Hosted Devices</span>
            </TabsTrigger>
          </TabsList>
          <Button
            onClick={() => {
              setEditingDevice(null);
              setPendingData(null);
              setIsFormOpen(true);
            }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>

        <TabsContent value="local" className="mt-6 animate-in fade-in-50 slide-in-from-left-5 duration-300">
          <Tabs
            defaultValue="vm"
            className="w-full"
            onValueChange={(value) => setDeviceType(value as "vm" | "network")}
          >
            <TabsList className="w-full md:w-[400px] mb-6 p-1 bg-muted/80 backdrop-blur-sm rounded-xl shadow-sm">
              <TabsTrigger 
                value="vm" 
                className="flex-1 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Server className="h-4 w-4" />
                <span>VM Devices</span>
              </TabsTrigger>
              <TabsTrigger 
                value="network" 
                className="flex-1 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Network className="h-4 w-4" />
                <span>Network Devices</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vm" className="animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
              <DeviceList
                devices={local_hosts_vm}
                type="vm"
                isLoading={isLoading}
                onEdit={openEditForm}
                onDelete={openDeleteDialog}
                isHosted={false}
              />
            </TabsContent>
            <TabsContent value="network" className="animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
              <DeviceList
                devices={local_hosts_network}
                type="network"
                isLoading={isLoading}
                onEdit={openEditForm}
                onDelete={openDeleteDialog}
                isHosted={false}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="hosted" className="mt-6 animate-in fade-in-50 slide-in-from-right-5 duration-300">
          <Tabs
            defaultValue="vm"
            className="w-full"
            onValueChange={(value) => setDeviceType(value as "vm" | "network")}
          >
            <TabsList className="w-full md:w-[400px] mb-6 p-1 bg-muted/80 backdrop-blur-sm rounded-xl shadow-sm">
              <TabsTrigger 
                value="vm" 
                className="flex-1 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Server className="h-4 w-4" />
                <span>VM Devices</span>
              </TabsTrigger>
              <TabsTrigger 
                value="network" 
                className="flex-1 py-2 data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Network className="h-4 w-4" />
                <span>Network Devices</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vm" className="animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
              <DeviceList
                devices={hosted_devices_vm}
                type="vm"
                isLoading={isLoading}
                onEdit={openEditForm}
                onDelete={openDeleteDialog}
                isHosted={true}
              />
            </TabsContent>
            <TabsContent value="network" className="animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
              <DeviceList
                devices={hosted_devices_network}
                type="network"
                isLoading={isLoading}
                onEdit={openEditForm}
                onDelete={openDeleteDialog}
                isHosted={true}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Device Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent className="bg-background border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              {editingDevice ? "Edit Device" : "Add New Device"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              {editingDevice
                ? "Update the details of your device below."
                : "Fill in the details to add a new device to your inventory."}
            </DialogDescription>
          </DialogHeader>
          <DeviceCreationForm
            onSubmit={handleSubmit}
            initialData={pendingData}
            initialType={deviceType}
          />
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog for Create */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        {isAvailabilityLoading ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Confirming if the host is Availible or the Dns will get resolved
              </DialogTitle>
              <DialogDescription>
                Confirming if the host is Availible or the Dns will get resolved{" "}
              </DialogDescription>
            </DialogHeader>
            <Spinner className="h-12 w-12 text-primary" />
          </DialogContent>
        ) : isAvailabilityData ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{isAvailabilityData?.message}</DialogTitle>
              <DialogDescription>
                {isAvailabilityData?.message}
              </DialogDescription>
            </DialogHeader>

            <p className="text-green-500">
              The host is available or the DNS has been resolved
              successfully.you can proceed with creating the device.
            </p>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsConfirmDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreate}>Create</Button>
            </DialogFooter>
          </DialogContent>
        ) : availabilityError ? (
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Error</DialogTitle>
              <DialogDescription>
                {availabilityError?.data?.message}
              </DialogDescription>
            </DialogHeader>
            <p className="text-red-500">
              The host is not available or the DNS could not be resolved.But you
              can still proceed with creating the device.
            </p>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsConfirmDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreate}>Proceed</Button>
            </DialogFooter>
          </DialogContent>
        ) : (
          ""
        )}
      </Dialog>

      {/* Confirmation Dialog for Delete */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              device.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

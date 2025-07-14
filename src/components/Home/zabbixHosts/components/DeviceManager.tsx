import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
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
        <div className="flex justify-between items-center mb-6 dark:border-2 dark:bg-black dark:text-white">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="local">Local Devices</TabsTrigger>
            <TabsTrigger value="hosted">Hosted Devices</TabsTrigger>
          </TabsList>
          <Button
            onClick={() => {
              setEditingDevice(null);
              setPendingData(null);
              setIsFormOpen(true);
            }}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Device
          </Button>
        </div>

        <TabsContent value="local" className="mt-6">
          <Tabs
            defaultValue="vm"
            className="w-full"
            onValueChange={(value) => setDeviceType(value as "vm" | "network")}
          >
            <TabsList className="w-[400px] mb-6">
              <TabsTrigger value="vm">VM Devices</TabsTrigger>
              <TabsTrigger value="network">Network Devices</TabsTrigger>
            </TabsList>

            <TabsContent value="vm">
              <DeviceList
                devices={local_hosts_vm}
                type="vm"
                isLoading={isLoading}
                onEdit={openEditForm}
                onDelete={openDeleteDialog}
              />
            </TabsContent>
            <TabsContent value="network">
              <DeviceList
                devices={local_hosts_network}
                type="network"
                isLoading={isLoading}
                onEdit={openEditForm}
                onDelete={openDeleteDialog}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="hosted" className="mt-6">
          <Tabs
            defaultValue="vm"
            className="w-full"
            onValueChange={(value) => setDeviceType(value as "vm" | "network")}
          >
            <TabsList className="w-[400px] mb-6">
              <TabsTrigger value="vm">VM Devices</TabsTrigger>
              <TabsTrigger value="network">Network Devices</TabsTrigger>
            </TabsList>

            <TabsContent value="vm">
              <DeviceList
                devices={hosted_devices_vm}
                type="vm"
                isLoading={isLoading}
                onEdit={openEditForm}
                onDelete={openDeleteDialog}
              />
            </TabsContent>
            <TabsContent value="network">
              <DeviceList
                devices={hosted_devices_network}
                type="network"
                isLoading={isLoading}
                onEdit={openEditForm}
                onDelete={openDeleteDialog}
              />
            </TabsContent>
          </Tabs>
        </TabsContent>
      </Tabs>

      {/* Create/Edit Device Form Dialog */}
      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingDevice ? "Edit Device" : "Add New Device"}
            </DialogTitle>
            <DialogDescription>
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

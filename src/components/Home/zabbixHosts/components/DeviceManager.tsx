import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
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
  const [pendingData, setPendingData] = useState<any>(null);
  const [editingDevice, setEditingDevice] = useState<any>(null);
  const [deletingDeviceId, setDeletingDeviceId] = useState<string | null>(null);

  const { data, isLoading } = useGetLocalHostsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [createHost] = useCreateLocalHostMutation();
  const [updateHost] = useUpdateLocalHostMutation();
  const [deleteHost] = useDeleteLocalHostMutation();

  const hosts = Array.isArray(data?.data) ? data.data : [];

  const vms = hosts.filter((host: Hosts) => host.device_type === "vm");
  const networkDevices = hosts.filter(
    (host: Hosts) => host.device_type === "network"
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
    } catch (error) {
      toast.error("Failed to create device");
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

  return (
    <div className="container mx-auto py-8">
      <Tabs
        defaultValue="vm"
        className="w-full"
        onValueChange={(value) => setDeviceType(value as "vm" | "network")}
      >
        <div className="flex justify-between items-center mb-6 dark:border-2 dark:bg-black dark:text-white">
          <TabsList>
            <TabsTrigger value="vm">Virtual Machines</TabsTrigger>
            <TabsTrigger value="network">Network Devices</TabsTrigger>
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

        <TabsContent value="vm">
          <DeviceList
            devices={vms}
            type="vm"
            isLoading={isLoading}
            onEdit={openEditForm}
            onDelete={openDeleteDialog}
          />
        </TabsContent>
        <TabsContent value="network">
          <DeviceList
            devices={networkDevices}
            type="network"
            isLoading={isLoading}
            onEdit={openEditForm}
            onDelete={openDeleteDialog}
          />
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Device Creation</DialogTitle>
            <DialogDescription>
              Please review and confirm that you want to create this device.
            </DialogDescription>
          </DialogHeader>
          <p>Are you sure you want to create this device?</p>
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

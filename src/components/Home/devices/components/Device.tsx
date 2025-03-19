import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { VMForm } from "./VMForm";
import { NetworkDeviceForm } from "./NetworkDeviceForm";
import { VMList } from "./VMList";
import { NetworkDeviceList } from "./NetworkDeviceList";
import { MonitoringConfirmationDialog } from "./MonitoringConfirmationDialog";
import { VMFormData, NetworkFormData } from "../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Dummy data for VMs
const dummyVMs: VMFormData[] = [
  {
    id: "vm-1",
    domainName: "web-server-01.example.com",
    username: "admin",
    password: "securepass123",
    ipAddress: "192.168.1.10",
    networkType: "private",
    status: "running",
    resources: {
      cpu: 65,
      memory: 72,
      storage: 48,
    },
  },
  {
    id: "vm-2",
    domainName: "db-server-01.example.com",
    username: "dbadmin",
    password: "dbpass456",
    ipAddress: "192.168.1.11",
    networkType: "private",
    status: "running",
    resources: {
      cpu: 82,
      memory: 56,
      storage: 75,
    },
  },
  {
    id: "vm-3",
    domainName: "app-server-01.example.com",
    username: "appuser",
    password: "app789pass",
    ipAddress: "192.168.1.12",
    networkType: "hybrid",
    status: "stopped",
    resources: {
      cpu: 0,
      memory: 5,
      storage: 62,
    },
  },
];

// Dummy data for network devices
const dummyNetworkDevices: NetworkFormData[] = [
  {
    id: "net-1",
    name: "Core Router",
    deviceType: "router",
    ipAddress: "192.168.0.1",
    subnetMask: "255.255.255.0",
    gateway: "192.168.0.254",
    location: "Server Room A",
    status: "active",
    metrics: {
      bandwidth: 78,
      latency: 5,
      packetLoss: 0.2,
    },
  },
  {
    id: "net-2",
    name: "Edge Firewall",
    deviceType: "firewall",
    ipAddress: "192.168.0.2",
    subnetMask: "255.255.255.0",
    gateway: "192.168.0.254",
    location: "DMZ",
    status: "active",
    metrics: {
      bandwidth: 45,
      latency: 8,
      packetLoss: 0.1,
    },
  },
  {
    id: "net-3",
    name: "Distribution Switch",
    deviceType: "switch",
    ipAddress: "192.168.0.3",
    subnetMask: "255.255.255.0",
    gateway: "192.168.0.254",
    location: "Floor 2",
    status: "maintenance",
    metrics: {
      bandwidth: 30,
      latency: 2,
      packetLoss: 0.5,
    },
  },
];

function Device() {
  const [vms, setVMs] = useState<VMFormData[]>([]);
  const [networkDevices, setNetworkDevices] = useState<NetworkFormData[]>([]);
  const [isVMFormOpen, setIsVMFormOpen] = useState(false);
  const [isNetworkFormOpen, setIsNetworkFormOpen] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [confirmationType, setConfirmationType] = useState<"vm" | "network">(
    "vm"
  );
  const [pendingData, setPendingData] = useState<any>(null);
  const [editingVM, setEditingVM] = useState<VMFormData | null>(null);
  const [editingNetworkDevice, setEditingNetworkDevice] =
    useState<NetworkFormData | null>(null);

  // Load dummy data on component mount
  useEffect(() => {
    setVMs(dummyVMs);
    setNetworkDevices(dummyNetworkDevices);
  }, []);

  // Handle VM form submission
  const handleVMSubmit = (data: VMFormData) => {
    setPendingData(data);
    setConfirmationType("vm");
    setIsConfirmationOpen(true);
    setIsVMFormOpen(false);
  };

  // Handle Network Device form submission
  const handleNetworkSubmit = (data: NetworkFormData) => {
    setPendingData(data);
    setConfirmationType("network");
    setIsConfirmationOpen(true);
    setIsNetworkFormOpen(false);
  };

  // Handle confirmation dialog confirmation
  const handleConfirmation = () => {
    if (confirmationType === "vm") {
      if (editingVM) {
        // Update existing VM
        setVMs(vms.map((vm) => (vm.id === editingVM.id ? pendingData : vm)));
        setEditingVM(null);
      } else {
        // Add new VM with simulated metrics
        const newVM = {
          ...pendingData,
          id: crypto.randomUUID(),
          resources: {
            cpu: Math.floor(Math.random() * 60) + 10,
            memory: Math.floor(Math.random() * 70) + 15,
            storage: Math.floor(Math.random() * 50) + 20,
          },
          status: "running",
        };
        setVMs([...vms, newVM]);
      }
    } else {
      if (editingNetworkDevice) {
        // Update existing network device
        setNetworkDevices((devices) =>
          devices.map((device) =>
            device.id === editingNetworkDevice.id ? pendingData : device
          )
        );
        setEditingNetworkDevice(null);
      } else {
        // Add new network device with simulated metrics
        const newDevice = {
          ...pendingData,
          id: crypto.randomUUID(),
          metrics: {
            bandwidth: Math.floor(Math.random() * 60) + 10,
            latency: Math.floor(Math.random() * 100),
            packetLoss: Math.random() * 2,
          },
          status: "active",
        };
        setNetworkDevices([...networkDevices, newDevice]);
      }
    }
    setIsConfirmationOpen(false);
    setPendingData(null);
  };

  // Handle VM edit
  const handleEditVM = (vm: VMFormData) => {
    setEditingVM(vm);
    setIsVMFormOpen(true);
  };

  // Handle VM delete
  const handleDeleteVM = (id: string) => {
    setVMs(vms.filter((vm) => vm.id !== id));
  };

  // Handle Network Device edit
  const handleEditNetworkDevice = (device: NetworkFormData) => {
    setEditingNetworkDevice(device);
    setIsNetworkFormOpen(true);
  };

  // Handle Network Device delete
  const handleDeleteNetworkDevice = (id: string) => {
    setNetworkDevices(networkDevices.filter((device) => device.id !== id));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Infrastructure Management</h1>

      <Tabs defaultValue="vm" className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="vm">Virtual Machines</TabsTrigger>
            <TabsTrigger value="network">Network Devices</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button
              onClick={() => {
                setEditingVM(null);
                setIsVMFormOpen(true);
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add VM
            </Button>
            <Button
              onClick={() => {
                setEditingNetworkDevice(null);
                setIsNetworkFormOpen(true);
              }}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Network Device
            </Button>
          </div>
        </div>

        <TabsContent value="vm" className="mt-6">
          <VMList vms={vms} onEdit={handleEditVM} onDelete={handleDeleteVM} />
        </TabsContent>

        <TabsContent value="network" className="mt-6">
          <NetworkDeviceList
            devices={networkDevices}
            onEdit={handleEditNetworkDevice}
            onDelete={handleDeleteNetworkDevice}
          />
        </TabsContent>
      </Tabs>

      {/* VM Form Dialog */}
      <Dialog open={isVMFormOpen} onOpenChange={setIsVMFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingVM ? "Edit Virtual Machine" : "Add Virtual Machine"}
            </DialogTitle>
          </DialogHeader>
          <VMForm
            onSubmit={handleVMSubmit}
            initialData={editingVM || undefined}
            isEditing={!!editingVM}
          />
        </DialogContent>
      </Dialog>

      {/* Network Device Form Dialog */}
      <Dialog open={isNetworkFormOpen} onOpenChange={setIsNetworkFormOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editingNetworkDevice
                ? "Edit Network Device"
                : "Add Network Device"}
            </DialogTitle>
          </DialogHeader>
          <NetworkDeviceForm
            onSubmit={handleNetworkSubmit}
            initialData={editingNetworkDevice || undefined}
            isEditing={!!editingNetworkDevice}
          />
        </DialogContent>
      </Dialog>

      {/* Monitoring Confirmation Dialog */}
      <MonitoringConfirmationDialog
        open={isConfirmationOpen}
        onOpenChange={setIsConfirmationOpen}
        onConfirm={handleConfirmation}
        deviceType={confirmationType}
      />
    </div>
  );
}

export default Device;

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Laptop2, Network, Wifi, Shield, Router } from "lucide-react";

interface VMFormData {
  domainName: string;
  username: string;
  password: string;
  ipAddress: string;
  networkType: string;
}

interface NetworkFormData {
  deviceType: string;
  ipAddress: string;
  subnetMask: string;
  gateway: string;
  name: string;
  location: string;
  status: "active" | "inactive" | "maintenance";
}

function Device() {
  const [showVMConfirm, setShowVMConfirm] = useState(false);
  const [showNetworkConfirm, setShowNetworkConfirm] = useState(false);
  const [vmFormData, setVMFormData] = useState<VMFormData>({
    domainName: "",
    username: "",
    password: "",
    ipAddress: "",
    networkType: "",
  });
  const [networkFormData, setNetworkFormData] = useState<NetworkFormData>({
    deviceType: "",
    ipAddress: "",
    subnetMask: "",
    gateway: "",
    name: "",
    location: "",
    status: "inactive",
  });

  const handleVMSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowVMConfirm(true);
  };

  const handleNetworkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateIPAddress(networkFormData.ipAddress)) {
      alert("Please enter a valid IP address");
      return;
    }
    setShowNetworkConfirm(true);
  };

  const validateIPAddress = (ip: string) => {
    const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipRegex.test(ip)) return false;
    const parts = ip.split(".");
    return parts.every((part) => parseInt(part) >= 0 && parseInt(part) <= 255);
  };

  const handleVMConfirm = () => {
    console.log("VM Form submitted:", vmFormData);
    setShowVMConfirm(false);
  };

  const handleNetworkConfirm = () => {
    console.log("Network Form submitted:", networkFormData);
    setShowNetworkConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12 bg-gradient-to-r from-red-500 via-red-400 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
          Infrastructure Management
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* VM Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full h-40 bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 border-2 border-red-400/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/30"
                variant="default"
              >
                <div className="flex flex-col items-center gap-4">
                  <Laptop2 className="h-12 w-12" />
                  <span className="text-xl font-semibold">Virtual Machine</span>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-2 border-red-500/30 shadow-xl shadow-red-500/20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                  Create Virtual Machine
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Configure your new virtual machine instance.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleVMSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="domain"
                      className="text-white text-sm font-medium"
                    >
                      Domain Name (Optional)
                    </Label>
                    <Input
                      id="domain"
                      value={vmFormData.domainName}
                      onChange={(e) =>
                        setVMFormData({
                          ...vmFormData,
                          domainName: e.target.value,
                        })
                      }
                      placeholder="example.com"
                      className="bg-gray-800/50 border-red-500/30 text-white placeholder:text-gray-400 focus:ring-red-500/50 focus:border-red-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="username"
                      className="text-white text-sm font-medium"
                    >
                      Username
                    </Label>
                    <Input
                      id="username"
                      required
                      value={vmFormData.username}
                      onChange={(e) =>
                        setVMFormData({
                          ...vmFormData,
                          username: e.target.value,
                        })
                      }
                      className="bg-gray-800/50 border-red-500/30 text-white placeholder:text-gray-400 focus:ring-red-500/50 focus:border-red-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="password"
                      className="text-white text-sm font-medium"
                    >
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={vmFormData.password}
                      onChange={(e) =>
                        setVMFormData({
                          ...vmFormData,
                          password: e.target.value,
                        })
                      }
                      className="bg-gray-800/50 border-red-500/30 text-white placeholder:text-gray-400 focus:ring-red-500/50 focus:border-red-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="ip"
                      className="text-white text-sm font-medium"
                    >
                      IP Address
                    </Label>
                    <Input
                      id="ip"
                      required
                      value={vmFormData.ipAddress}
                      onChange={(e) =>
                        setVMFormData({
                          ...vmFormData,
                          ipAddress: e.target.value,
                        })
                      }
                      placeholder="192.168.1.1"
                      className="bg-gray-800/50 border-red-500/30 text-white placeholder:text-gray-400 focus:ring-red-500/50 focus:border-red-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="network-type"
                      className="text-white text-sm font-medium"
                    >
                      Network Type
                    </Label>
                    <Select
                      value={vmFormData.networkType}
                      onValueChange={(value) =>
                        setVMFormData({ ...vmFormData, networkType: value })
                      }
                    >
                      <SelectTrigger className="bg-gray-800/50 border-red-500/30 text-white focus:ring-red-500/50 focus:border-red-500/50">
                        <SelectValue placeholder="Select network type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-red-500/30 text-white">
                        <SelectItem
                          value="vpn"
                          className="hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer"
                        >
                          VPN
                        </SelectItem>
                        <SelectItem
                          value="internet"
                          className="hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer"
                        >
                          INTERNET
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30"
                  >
                    Create VM
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>

          {/* Network Device Modal */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className="w-full h-40 bg-gradient-to-br from-red-500 via-red-600 to-red-700 hover:from-red-600 hover:via-red-700 hover:to-red-800 border-2 border-red-400/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/30"
                variant="default"
              >
                <div className="flex flex-col items-center gap-4">
                  <Network className="h-12 w-12" />
                  <span className="text-xl font-semibold">Network Device</span>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-b from-gray-900 to-black border-2 border-red-500/30 shadow-xl shadow-red-500/20">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                  Add Network Device
                </DialogTitle>
                <DialogDescription className="text-gray-300">
                  Configure your new network device.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleNetworkSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label
                      htmlFor="device-name"
                      className="text-white text-sm font-medium"
                    >
                      Device Name
                    </Label>
                    <Input
                      id="device-name"
                      required
                      value={networkFormData.name}
                      onChange={(e) =>
                        setNetworkFormData({
                          ...networkFormData,
                          name: e.target.value,
                        })
                      }
                      placeholder="Core-Switch-01"
                      className="bg-gray-800/50 border-red-500/30 text-white placeholder:text-gray-400 focus:ring-red-500/50 focus:border-red-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="device-type"
                      className="text-white text-sm font-medium"
                    >
                      Device Type
                    </Label>
                    <Select
                      value={networkFormData.deviceType}
                      onValueChange={(value) =>
                        setNetworkFormData({
                          ...networkFormData,
                          deviceType: value,
                        })
                      }
                    >
                      <SelectTrigger className="bg-gray-800/50 border-red-500/30 text-white focus:ring-red-500/50 focus:border-red-500/50">
                        <SelectValue placeholder="Select device type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-red-500/30 text-white">
                        <SelectItem
                          value="switch"
                          className="hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer flex items-center gap-2"
                        >
                          <Wifi className="h-4 w-4" /> Switch
                        </SelectItem>
                        <SelectItem
                          value="router"
                          className="hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer flex items-center gap-2"
                        >
                          <Router className="h-4 w-4" /> Router
                        </SelectItem>
                        <SelectItem
                          value="firewall"
                          className="hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer flex items-center gap-2"
                        >
                          <Shield className="h-4 w-4" /> Firewall
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="device-ip"
                      className="text-white text-sm font-medium"
                    >
                      IP Address
                    </Label>
                    <Input
                      id="device-ip"
                      required
                      value={networkFormData.ipAddress}
                      onChange={(e) =>
                        setNetworkFormData({
                          ...networkFormData,
                          ipAddress: e.target.value,
                        })
                      }
                      placeholder="192.168.1.1"
                      className="bg-gray-800/50 border-red-500/30 text-white placeholder:text-gray-400 focus:ring-red-500/50 focus:border-red-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="subnet-mask"
                      className="text-white text-sm font-medium"
                    >
                      Subnet Mask
                    </Label>
                    <Input
                      id="subnet-mask"
                      required
                      value={networkFormData.subnetMask}
                      onChange={(e) =>
                        setNetworkFormData({
                          ...networkFormData,
                          subnetMask: e.target.value,
                        })
                      }
                      placeholder="255.255.255.0"
                      className="bg-gray-800/50 border-red-500/30 text-white placeholder:text-gray-400 focus:ring-red-500/50 focus:border-red-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="gateway"
                      className="text-white text-sm font-medium"
                    >
                      Gateway
                    </Label>
                    <Input
                      id="gateway"
                      required
                      value={networkFormData.gateway}
                      onChange={(e) =>
                        setNetworkFormData({
                          ...networkFormData,
                          gateway: e.target.value,
                        })
                      }
                      placeholder="192.168.1.254"
                      className="bg-gray-800/50 border-red-500/30 text-white placeholder:text-gray-400 focus:ring-red-500/50 focus:border-red-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="location"
                      className="text-white text-sm font-medium"
                    >
                      Location
                    </Label>
                    <Input
                      id="location"
                      value={networkFormData.location}
                      onChange={(e) =>
                        setNetworkFormData({
                          ...networkFormData,
                          location: e.target.value,
                        })
                      }
                      placeholder="Data Center A"
                      className="bg-gray-800/50 border-red-500/30 text-white placeholder:text-gray-400 focus:ring-red-500/50 focus:border-red-500/50 transition-colors"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label
                      htmlFor="status"
                      className="text-white text-sm font-medium"
                    >
                      Initial Status
                    </Label>
                    <Select
                      value={networkFormData.status}
                      onValueChange={(
                        value: "active" | "inactive" | "maintenance"
                      ) =>
                        setNetworkFormData({
                          ...networkFormData,
                          status: value,
                        })
                      }
                    >
                      <SelectTrigger className="bg-gray-800/50 border-red-500/30 text-white focus:ring-red-500/50 focus:border-red-500/50">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-red-500/30 text-white">
                        <SelectItem
                          value="active"
                          className="hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer"
                        >
                          Active
                        </SelectItem>
                        <SelectItem
                          value="inactive"
                          className="hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer"
                        >
                          Inactive
                        </SelectItem>
                        <SelectItem
                          value="maintenance"
                          className="hover:bg-red-500/20 focus:bg-red-500/20 cursor-pointer"
                        >
                          Maintenance
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium px-6 py-2 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/30"
                  >
                    Add Device
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* VM Confirmation Dialog */}
        <AlertDialog open={showVMConfirm} onOpenChange={setShowVMConfirm}>
          <AlertDialogContent className="bg-gradient-to-b from-gray-900 to-black border-2 border-red-500/30 shadow-xl shadow-red-500/20">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                Confirm VM Creation
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                Are you sure you want to create this virtual machine? This
                action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border-red-500/30">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/30"
                onClick={handleVMConfirm}
              >
                Create VM
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Network Device Confirmation Dialog */}
        <AlertDialog
          open={showNetworkConfirm}
          onOpenChange={setShowNetworkConfirm}
        >
          <AlertDialogContent className="bg-gradient-to-b from-gray-900 to-black border-2 border-red-500/30 shadow-xl shadow-red-500/20">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-500 bg-clip-text text-transparent">
                Confirm Device Addition
              </AlertDialogTitle>
              <AlertDialogDescription className="text-gray-300">
                Are you sure you want to add this network device? This action
                cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="bg-gray-800 text-white hover:bg-gray-700 border-red-500/30">
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white shadow-lg hover:shadow-red-500/30"
                onClick={handleNetworkConfirm}
              >
                Add Device
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

export default Device;

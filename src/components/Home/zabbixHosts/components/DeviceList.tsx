import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Server, Network } from "lucide-react";

interface DeviceListProps {
  devices: any[];
  type: "vm" | "network";
  isLoading: boolean;
}

export function DeviceList({ devices, type, isLoading }: DeviceListProps) {
  const getIcon = (deviceType: string) => {
    if (type === "network") {
      switch (deviceType) {
        case "router": return "🌐";
        case "switch": return "🔄";
        case "firewall": return "🔒";
        case "loadbalancer": return "⚖️";
        default: return "📱";
      }
    }
    return null;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading devices...</div>;
  }

  if (devices.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        {type === "vm" ? <Server className="mx-auto h-12 w-12 text-gray-400" /> 
          : <Network className="mx-auto h-12 w-12 text-gray-400" />}
        <h3 className="mt-2 text-lg font-medium">No {type === "vm" ? "Virtual Machines" : "Network Devices"}</h3>
        <p className="mt-1 text-sm text-gray-500">Add a device to start monitoring</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {devices.map((device) => (
        <Card key={device.hostid}>
          <CardHeader>
            <CardTitle>
              {type === "network" && getIcon(device.network_device_type)}
              {device.host}
            </CardTitle>
            <CardDescription>{device.ip || device.dns}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Network Type:</span>{" "}
                {device.network_type}
              </div>
              {type === "network" && device.network_device_type && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Device Type:</span>{" "}
                  {device.network_device_type}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button variant="destructive" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Server, Network } from "lucide-react";
import { Link } from "react-router-dom";

interface DeviceListProps {
  devices: any[];
  type: "vm" | "network";
  isLoading: boolean;
}

export function InfrastructureShowcase({
  devices,
  type,
  isLoading,
}: DeviceListProps) {
  const getIcon = (deviceType: string) => {
    if (type === "network") {
      switch (deviceType) {
        case "router":
          return "🌐";
        case "switch":
          return "🔄";
        case "firewall":
          return "🔒";
        case "loadbalancer":
          return "⚖️";
        default:
          return "📱";
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
        {type === "vm" ? (
          <Server className="mx-auto h-12 w-12 text-gray-400" />
        ) : (
          <Network className="mx-auto h-12 w-12 text-gray-400" />
        )}
        <h3 className="mt-2 text-lg font-medium">
          No {type === "vm" ? "Virtual Machines" : "Network Devices"}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Add a device to start monitoring
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {devices.map((device) => (
        <Card key={device.hostid}>
          <Link to={`/home/zabbixhost/${device.hostid}`}>
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
          </Link>
        </Card>
      ))}
    </div>
  );
}

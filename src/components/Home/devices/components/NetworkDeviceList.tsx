import { Network } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Network as NetworkIcon } from "lucide-react";

interface NetworkDeviceListProps {
  devices: Network[];
  onEdit: (device: Network) => void;
  onDelete: (id: string) => void;
}

export function NetworkDeviceList({
  devices,
  onEdit,
  onDelete,
}: NetworkDeviceListProps) {
  const getDeviceIcon = (type: string) => {
    switch (type) {
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
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {devices.length === 0 ? (
        <div className="col-span-full text-center p-8 border border-dashed rounded-lg">
          <NetworkIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No Network Devices Added</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add a network device to start monitoring
          </p>
        </div>
      ) : (
        devices.map((device) => (
          <Card key={device.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>
                    <span className="mr-2">
                      {getDeviceIcon(device.deviceType)}
                    </span>
                    {device.name}
                  </CardTitle>
                  <CardDescription>{device.ipAddress}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">Type:</span>{" "}
                    {device.deviceType}
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Network:</span>{" "}
                    {device.networkType}
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Gateway:</span>{" "}
                  {device.gateway}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Subnet:</span>{" "}
                  {device.subnetMask}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(device)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(device.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}

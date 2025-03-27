import { VM, Network } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Server, Network as NetworkIcon } from "lucide-react";


interface InfrastructureShowcaseProps {
  vms: VM[];
  networks: Network[];
}

export function InfrastructureShowcase({
  vms,
  networks,
}: InfrastructureShowcaseProps) {
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
    <div className="space-y-8">
      {/* VMs Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Virtual Machines</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vms.slice(0, 3).map((vm) => (
            <Card
              key={vm.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start gap-2">
                  <Server className="h-5 w-5 text-blue-500" />
                  <div>
                    <CardTitle className="text-lg">
                      {vm.domainName || vm.ipAddress}
                    </CardTitle>
                    <CardDescription>{vm.ipAddress}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground">
                  {vm.networkType} Network
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Network Devices Section */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Network Infrastructure</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {networks.slice(0, 3).map((device) => (
            <Card
              key={device.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <CardHeader className="pb-2">
                <div className="flex items-start gap-2">
                  <span className="text-xl">
                    {getDeviceIcon(device.deviceType)}
                  </span>
                  <div>
                    <CardTitle className="text-lg">{device.name}</CardTitle>
                    <CardDescription>{device.deviceType}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-4">
                <p className="text-sm text-muted-foreground">
                  {device.networkType} Network
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

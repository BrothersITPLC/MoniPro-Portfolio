import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  Cpu,
  MemoryStick,
  HardDrive,
  Network,
} from "lucide-react";
interface VMAlert {
  name: string;
  status: "critical" | "warning" | "normal";
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

const vmAlerts: VMAlert[] = [
  {
    name: "uimes",
    status: "critical",
    cpu: 92,
    memory: 87,
    disk: 95,
    network: 78,
  },
  {
    name: "orc",
    status: "warning",
    cpu: 75,
    memory: 82,
    disk: 65,
    network: 45,
  },
  {
    name: "osta-vm-1",
    status: "normal",
    cpu: 45,
    memory: 52,
    disk: 48,
    network: 30,
  },
];

export function PerformanceAlerts() {
  const getStatusIcon = (status: VMAlert["status"]) => {
    switch (status) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      case "normal":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };

  const getMetricColor = (value: number): string => {
    if (value >= 80) return "text-destructive";
    if (value >= 70) return "text-orange-400";
    return "text-green-500";
  };

  const criticalVMs = vmAlerts.filter((vm) => vm.status === "critical");
  const warningVMs = vmAlerts.filter((vm) => vm.status === "warning");
  const normalVMs = vmAlerts.filter((vm) => vm.status === "normal");

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <Badge variant="destructive">{criticalVMs.length} Critical</Badge>
          <Badge variant="secondary">{warningVMs.length} Warning</Badge>
          <Badge variant="default">{normalVMs.length} Normal</Badge>
        </div>
        <CardTitle className="text-2xl">Performance Monitoring</CardTitle>
        <CardDescription>
          Virtual Machine Resource Usage Overview
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 gap-4">
            <TabsTrigger value="all">All VMs</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="warning">Warning</TabsTrigger>
            <TabsTrigger value="normal">Normal</TabsTrigger>
          </TabsList>

          {["all", "critical", "warning", "normal"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <ScrollArea className="h-[70vh]">
                <div className="space-y-4">
                  {vmAlerts
                    .filter((vm) => tab === "all" || vm.status === tab)
                    .map((vm) => (
                      <Card key={vm.name}>
                        <CardHeader className="p-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(vm.status)}
                            <CardTitle className="text-lg">{vm.name}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="grid grid-cols-2 gap-4">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center justify-between rounded-lg bg-muted p-3 cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <Cpu className="h-4 w-4" />
                                    <span>CPU</span>
                                  </div>
                                  <span
                                    className={`font-medium ${getMetricColor(
                                      vm.cpu
                                    )}`}
                                  >
                                    {vm.cpu}%
                                  </span>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">
                                    CPU Usage
                                  </h4>
                                  <p className="text-sm">
                                    Current processor utilization
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>

                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center justify-between rounded-lg bg-muted p-3 cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <MemoryStick className="h-4 w-4" />
                                    <span>Memory</span>
                                  </div>
                                  <span
                                    className={`font-medium ${getMetricColor(
                                      vm.memory
                                    )}`}
                                  >
                                    {vm.memory}%
                                  </span>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">
                                    Memory Usage
                                  </h4>
                                  <p className="text-sm">
                                    Current RAM utilization
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>

                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center justify-between rounded-lg bg-muted p-3 cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <HardDrive className="h-4 w-4" />
                                    <span>Disk</span>
                                  </div>
                                  <span
                                    className={`font-medium ${getMetricColor(
                                      vm.disk
                                    )}`}
                                  >
                                    {vm.disk}%
                                  </span>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">
                                    Disk Usage
                                  </h4>
                                  <p className="text-sm">
                                    Storage space utilization
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>

                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center justify-between rounded-lg bg-muted p-3 cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <Network className="h-4 w-4" />
                                    <span>Network</span>
                                  </div>
                                  <span
                                    className={`font-medium ${getMetricColor(
                                      vm.network
                                    )}`}
                                  >
                                    {vm.network}%
                                  </span>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">
                                    Network Usage
                                  </h4>
                                  <p className="text-sm">
                                    Network bandwidth utilization
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </ScrollArea>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}

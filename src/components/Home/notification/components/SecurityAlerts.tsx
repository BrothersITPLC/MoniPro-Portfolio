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
import { Shield, ShieldAlert, ShieldCheck, Clock, Info } from "lucide-react";

interface SecurityAlert {
  name: string;
  status: "critical" | "warning" | "secure";
  unauthorizedAccess: number;
  firewallBreaches: number;
  malwareDetections: number;
  suspiciousActivity: number;
  lastUpdated: string;
}

const securityAlerts: SecurityAlert[] = [
  {
    name: "uimes-prod",
    status: "critical",
    unauthorizedAccess: 15,
    firewallBreaches: 3,
    malwareDetections: 2,
    suspiciousActivity: 24,
    lastUpdated: "2 minutes ago",
  },
  {
    name: "orc-main",
    status: "warning",
    unauthorizedAccess: 5,
    firewallBreaches: 1,
    malwareDetections: 0,
    suspiciousActivity: 12,
    lastUpdated: "5 minutes ago",
  },
  {
    name: "osta-vm-1",
    status: "secure",
    unauthorizedAccess: 0,
    firewallBreaches: 0,
    malwareDetections: 0,
    suspiciousActivity: 2,
    lastUpdated: "1 minute ago",
  },
  {
    name: "uimes-dev",
    status: "warning",
    unauthorizedAccess: 8,
    firewallBreaches: 1,
    malwareDetections: 0,
    suspiciousActivity: 15,
    lastUpdated: "10 minutes ago",
  },
  {
    name: "orc-backup",
    status: "secure",
    unauthorizedAccess: 2,
    firewallBreaches: 0,
    malwareDetections: 0,
    suspiciousActivity: 5,
    lastUpdated: "15 minutes ago",
  },
  {
    name: "osta-vm-2",
    status: "critical",
    unauthorizedAccess: 20,
    firewallBreaches: 4,
    malwareDetections: 3,
    suspiciousActivity: 30,
    lastUpdated: "3 minutes ago",
  },
  {
    name: "uimes-test",
    status: "warning",
    unauthorizedAccess: 7,
    firewallBreaches: 2,
    malwareDetections: 0,
    suspiciousActivity: 18,
    lastUpdated: "7 minutes ago",
  },
  {
    name: "orc-staging",
    status: "secure",
    unauthorizedAccess: 1,
    firewallBreaches: 0,
    malwareDetections: 0,
    suspiciousActivity: 4,
    lastUpdated: "20 minutes ago",
  },
  {
    name: "osta-vm-3",
    status: "warning",
    unauthorizedAccess: 6,
    firewallBreaches: 1,
    malwareDetections: 1,
    suspiciousActivity: 14,
    lastUpdated: "8 minutes ago",
  },
  {
    name: "uimes-qa",
    status: "secure",
    unauthorizedAccess: 3,
    firewallBreaches: 0,
    malwareDetections: 0,
    suspiciousActivity: 7,
    lastUpdated: "25 minutes ago",
  },
  {
    name: "orc-dr",
    status: "critical",
    unauthorizedAccess: 12,
    firewallBreaches: 2,
    malwareDetections: 1,
    suspiciousActivity: 22,
    lastUpdated: "4 minutes ago",
  },
];

export function SecurityAlerts() {
  const getStatusColor = (value: number, type: string): string => {
    switch (type) {
      case "unauthorizedAccess":
        return value > 10
          ? "text-destructive"
          : value > 5
          ? "text-orange-400"
          : "text-green-500";
      case "firewallBreaches":
        return value > 2
          ? "text-destructive"
          : value > 0
          ? "text-orange-400"
          : "text-green-500";
      case "malwareDetections":
        return value > 0 ? "text-destructive" : "text-green-500";
      case "suspiciousActivity":
        return value > 20
          ? "text-destructive"
          : value > 10
          ? "text-orange-400"
          : "text-green-500";
      default:
        return "text-muted-foreground";
    }
  };
  const getStatusIcon = (status: SecurityAlert["status"]) => {
    switch (status) {
      case "critical":
        return <ShieldAlert className="h-5 w-5 text-destructive" />;
      case "warning":
        return <Shield className="h-5 w-5 text-orange-400" />;
      case "secure":
        return <ShieldCheck className="h-5 w-5 text-green-500" />;
    }
  };

  const criticalAlerts = securityAlerts.filter(
    (vm) => vm.status === "critical"
  );
  const warningAlerts = securityAlerts.filter((vm) => vm.status === "warning");
  const secureAlerts = securityAlerts.filter((vm) => vm.status === "secure");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Security Notfication</CardTitle>
        <CardDescription>
          Virtual Machine Security Status Overview
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 gap-4">
            <TabsTrigger value="all" className="gap-2">
              All
              <Badge variant="outline">{securityAlerts.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="critical" className="gap-2">
              Critical
              <Badge variant="destructive">{criticalAlerts.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="warning" className="gap-2">
              Warning
              <Badge variant="secondary">{warningAlerts.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="secure" className="gap-2">
              Secure
              <Badge variant="default">{secureAlerts.length}</Badge>
            </TabsTrigger>
          </TabsList>

          {["all", "critical", "warning", "secure"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <ScrollArea className="h-[70vh]">
                <div className="space-y-4">
                  {securityAlerts
                    .filter((vm) => tab === "all" || vm.status === tab)
                    .map((vm) => (
                      <Card key={vm.name}>
                        <CardHeader className="p-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(vm.status)}
                            <CardTitle className="text-lg">{vm.name}</CardTitle>
                            <div className="ml-auto flex items-center text-sm text-muted-foreground">
                              <Clock className="mr-1 h-4 w-4" />
                              {vm.lastUpdated}
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="grid grid-cols-2 gap-4">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center justify-between rounded-lg bg-muted p-3 cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <Info className="h-4 w-4" />
                                    <span>Access</span>
                                  </div>
                                  <span
                                    className={`font-medium ${getStatusColor(
                                      vm.unauthorizedAccess,
                                      "unauthorizedAccess"
                                    )}`}
                                  >
                                    {vm.unauthorizedAccess} attempts
                                  </span>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">
                                    Unauthorized Access Attempts
                                  </h4>
                                  <p className="text-sm">
                                    Detected login attempts from unauthorized
                                    sources
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>

                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center justify-between rounded-lg bg-muted p-3 cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <Info className="h-4 w-4" />
                                    <span>Firewall</span>
                                  </div>
                                  <span
                                    className={`font-medium ${getStatusColor(
                                      vm.firewallBreaches,
                                      "firewallBreaches"
                                    )}`}
                                  >
                                    {vm.firewallBreaches} detected
                                  </span>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">
                                    Firewall Breach Attempts
                                  </h4>
                                  <p className="text-sm">
                                    Detected attempts to bypass firewall rules
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>

                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center justify-between rounded-lg bg-muted p-3 cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <Info className="h-4 w-4" />
                                    <span>Malware</span>
                                  </div>
                                  <span
                                    className={`font-medium ${getStatusColor(
                                      vm.malwareDetections,
                                      "malwareDetections"
                                    )}`}
                                  >
                                    {vm.malwareDetections} found
                                  </span>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">
                                    Malware Detections
                                  </h4>
                                  <p className="text-sm">
                                    Identified potential malware activities
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>

                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center justify-between rounded-lg bg-muted p-3 cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <Info className="h-4 w-4" />
                                    <span>Suspicious</span>
                                  </div>
                                  <span
                                    className={`font-medium ${getStatusColor(
                                      vm.suspiciousActivity,
                                      "suspiciousActivity"
                                    )}`}
                                  >
                                    {vm.suspiciousActivity} events
                                  </span>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">
                                    Suspicious Activities
                                  </h4>
                                  <p className="text-sm">
                                    Unusual behavior patterns detected
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

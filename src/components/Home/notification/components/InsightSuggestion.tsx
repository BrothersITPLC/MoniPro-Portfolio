import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, AlertTriangle, Info, Bot } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  useGetAlertListQuery,
  useGetAiExplanationMutation,
} from "@/components/Home/notification/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ReactMarkdown from "react-markdown";

interface Alert {
  id: string;
  description: string;
  severity: string;
  comments: string;
  timestamp: string;
}

interface AlertGroup {
  [hostName: string]: {
    active: Alert[];
    inactive: Alert[];
  };
}

export function InsightSuggestion() {
  const { data: alertData } = useGetAlertListQuery();
  const [selectedHost, setSelectedHost] = useState<string>("all");
  const [getAiExplanation] = useGetAiExplanationMutation();
  const [aiExplanations, setAiExplanations] = useState<Record<string, string>>(
    {}
  );
  const [loadingExplanations, setLoadingExplanations] = useState<
    Record<string, boolean>
  >({});

  const handleGetAiExplanation = async (alertId: string) => {
    if (aiExplanations[alertId]) return;

    setLoadingExplanations((prev) => ({ ...prev, [alertId]: true }));
    try {
      const response = await getAiExplanation(alertId).unwrap();
      setAiExplanations((prev) => ({ ...prev, [alertId]: response.insight }));
    } catch (error) {
      console.error("Failed to fetch AI explanation:", error);
      setAiExplanations((prev) => ({
        ...prev,
        [alertId]: "Failed to load AI explanation. Please try again.",
      }));
    } finally {
      setLoadingExplanations((prev) => ({ ...prev, [alertId]: false }));
    }
  };

  const getIcon = (severity: string) => {
    switch (severity) {
      case "Disaster":
      case "High":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "Average":
      case "Warning":
        return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      default:
        return <Info className="h-5 w-5 text-blue-400" />;
    }
  };

  const getSeverityColor = (severity: string): string => {
    switch (severity) {
      case "Disaster":
        return "text-red-700 bg-red-100";
      case "High":
        return "text-red-500 bg-red-50";
      case "Average":
        return "text-orange-500 bg-orange-50";
      case "Warning":
        return "text-yellow-600 bg-yellow-50";
      case "Information":
        return "text-blue-500 bg-blue-50";
      default:
        return "text-gray-500 bg-gray-50";
    }
  };

  // Add this function to get unique hosts
  const getUniqueHosts = (data: AlertGroup | undefined) => {
    if (!data) return [];
    return ["all", ...Object.keys(data)];
  };

  // Modify getAllAlerts to filter by host
  const getAllAlerts = (data: AlertGroup | undefined) => {
    if (!data) return [];
    return Object.entries(data).flatMap(([hostName, hostData]) => {
      if (selectedHost !== "all" && selectedHost !== hostName) return [];
      return [...hostData.active, ...hostData.inactive].map((alert) => ({
        ...alert,
        hostName,
      }));
    });
  };

  const uniqueHosts = getUniqueHosts(alertData);
  const allAlerts = getAllAlerts(alertData);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-6">
          <AlertCircle className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Zabbix Alerts</CardTitle>
            <CardDescription>
              System monitoring alerts and notifications
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <Select value={selectedHost} onValueChange={setSelectedHost}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select host" />
            </SelectTrigger>
            <SelectContent>
              {uniqueHosts.map((host) => (
                <SelectItem key={host} value={host}>
                  {host === "all" ? "All Hosts" : host}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6 gap-2">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="Average">Average</TabsTrigger>
            <TabsTrigger value="Warning">Warning</TabsTrigger>
            <TabsTrigger value="Information">Info</TabsTrigger>
            <TabsTrigger value="Disaster">Disaster</TabsTrigger>
            <TabsTrigger value="High">High</TabsTrigger>
          </TabsList>

          {["all", "Disaster", "High", "Average", "Warning", "Information"].map(
            (tab) => (
              <TabsContent key={tab} value={tab}>
                <ScrollArea className="h-[70vh]">
                  <div className="space-y-4">
                    {allAlerts.filter(
                      (alert) => tab === "all" || alert.severity === tab
                    ).length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <Info className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-lg font-medium text-muted-foreground">
                          No {tab === "all" ? "alerts" : `${tab} alerts`} found
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          All systems are running normally
                        </p>
                      </div>
                    ) : (
                      allAlerts
                        .filter(
                          (alert) => tab === "all" || alert.severity === tab
                        )
                        .map((alert, index) => (
                          <Card
                            key={index}
                            className="border-2 hover:shadow-md transition-shadow"
                          >
                            <CardHeader className="p-4">
                              <div className="flex items-center gap-2">
                                {getIcon(alert.severity)}
                                <div className="flex-1">
                                  <CardTitle className="text-lg">
                                    {alert.description}
                                  </CardTitle>
                                  <div className="flex items-center gap-2 mt-2">
                                    <Badge variant="outline">
                                      {alert.hostName}
                                    </Badge>
                                    <Badge
                                      className={getSeverityColor(
                                        alert.severity
                                      )}
                                    >
                                      {alert.severity}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              {alert.comments && (
                                <p className="text-sm text-muted-foreground mb-4">
                                  {alert.comments}
                                </p>
                              )}

                              <Accordion type="single" collapsible>
                                <AccordionItem value="ai-explanation">
                                  <AccordionTrigger
                                    className="flex items-center gap-2"
                                    onClick={() =>
                                      handleGetAiExplanation(alert.id)
                                    }
                                  >
                                    <Bot className="h-4 w-4" />
                                    <span>AI Explanation</span>
                                  </AccordionTrigger>
                                  <AccordionContent>
                                    <div className="text-sm p-4 bg-muted rounded-lg">
                                      {loadingExplanations[alert.id] ? (
                                        <div className="flex items-center justify-center py-2">
                                          <span className="animate-pulse">
                                            Loading AI explanation...
                                          </span>
                                        </div>
                                      ) : aiExplanations[alert.id] ? (
                                        <ReactMarkdown>
                                          {aiExplanations[alert.id] || ""}
                                        </ReactMarkdown>
                                      ) : (
                                        <p>Click to load AI explanation</p>
                                      )}
                                    </div>
                                  </AccordionContent>
                                </AccordionItem>
                              </Accordion>
                            </CardContent>
                          </Card>
                        ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            )
          )}
        </Tabs>
      </CardContent>
    </Card>
  );
}

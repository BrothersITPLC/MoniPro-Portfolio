import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lightbulb, AlertCircle, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Brain, Sparkles, Bot } from "lucide-react"; // Add these imports
interface Insight {
  title: string;
  description: string;
  severity: "critical" | "warning" | "info";
  vm: string;
  lastUpdated: string;
  aiConfidence: number;
  category: "performance" | "security" | "optimization" | "maintenance";
  suggestedAction: string;
}

const insights: Insight[] = [
  {
    title: "Critical CPU Usage Pattern",
    description:
      "AI has detected an unusual CPU usage pattern indicating potential resource contention.",
    severity: "critical",
    vm: "uimes-prod",
    lastUpdated: "5 minutes ago",
    aiConfidence: 95,
    category: "performance",
    suggestedAction:
      "Scale up CPU resources by 2 cores based on workload analysis",
  },
  {
    title: "Memory Leak Detected",
    description:
      "Gradual memory increase detected in Java process. Investigate application memory management and consider implementing garbage collection optimization.",
    severity: "critical",
    vm: "orc-main",
    lastUpdated: "10 minutes ago",
    aiConfidence: 92,
    category: "performance",
    suggestedAction:
      "Implement memory leak detection and optimize garbage collection cycles",
  },
  {
    title: "Disk Space Warning",
    description:
      "System drive reaching 85% capacity. Clean up temporary files and consider expanding storage capacity.",
    severity: "warning",
    vm: "osta-vm-2",
    lastUpdated: "15 minutes ago",
    aiConfidence: 88,
    category: "maintenance",
    suggestedAction: "Schedule disk cleanup and plan storage expansion",
  },
  {
    title: "Network Latency Spike",
    description:
      "Unusual network latency detected in the last hour. Monitor network traffic patterns and check for potential bottlenecks.",
    severity: "warning",
    vm: "uimes-dev",
    lastUpdated: "20 minutes ago",
    aiConfidence: 85,
    category: "performance",
    suggestedAction:
      "Analyze network traffic patterns and optimize routing configuration",
  },
  {
    title: "Database Performance",
    description:
      "Slow query execution times observed. Review and optimize database queries, consider adding appropriate indexes.",
    severity: "warning",
    vm: "orc-backup",
    lastUpdated: "25 minutes ago",
    aiConfidence: 90,
    category: "optimization",
    suggestedAction:
      "Review and optimize database queries, add missing indexes",
  },
  {
    title: "SSL Certificate Expiry",
    description:
      "SSL certificate will expire in 15 days. Plan for certificate renewal to avoid service interruption.",
    severity: "info",
    vm: "osta-vm-1",
    lastUpdated: "30 minutes ago",
    aiConfidence: 100,
    category: "maintenance",
    suggestedAction: "Schedule SSL certificate renewal within next 7 days",
  },
  {
    title: "Backup Validation",
    description:
      "Recent backup completed successfully but took longer than usual. Review backup configuration and storage performance.",
    severity: "info",
    vm: "uimes-qa",
    lastUpdated: "35 minutes ago",
    aiConfidence: 87,
    category: "maintenance",
    suggestedAction:
      "Optimize backup configuration and verify storage performance",
  },
];

export function InsightSuggestion() {
  const getIcon = (severity: Insight["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-orange-400" />;
      case "info":
        return <Lightbulb className="h-5 w-5 text-blue-400" />;
    }
  };

  const getCategoryColor = (category: Insight["category"]): string => {
    switch (category) {
      case "performance":
        return "text-purple-500";
      case "security":
        return "text-blue-500";
      case "optimization":
        return "text-green-500";
      case "maintenance":
        return "text-orange-400";
    }
  };

  const criticalInsights = insights.filter((i) => i.severity === "critical");
  const warningInsights = insights.filter((i) => i.severity === "warning");
  const infoInsights = insights.filter((i) => i.severity === "info");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2 mb-6">
          <Brain className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">AI Insights</CardTitle>
            <CardDescription>
              Machine Learning-powered system analysis and recommendations
            </CardDescription>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Badge variant="destructive">
            {criticalInsights.length} Critical
          </Badge>
          <Badge variant="secondary">{warningInsights.length} Warnings</Badge>
          <Badge variant="default">{infoInsights.length} Insights</Badge>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 gap-4">
            <TabsTrigger value="all">All Insights</TabsTrigger>
            <TabsTrigger value="critical">Critical</TabsTrigger>
            <TabsTrigger value="warning">Warning</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>

          {["all", "critical", "warning", "info"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <ScrollArea className="h-[70vh]">
                <div className="space-y-4">
                  {insights
                    .filter(
                      (insight) => tab === "all" || insight.severity === tab
                    )
                    .map((insight, index) => (
                      <Card
                        key={index}
                        className="border-2 hover:shadow-md transition-shadow"
                      >
                        <CardHeader className="p-4">
                          <div className="flex items-center gap-2">
                            {getIcon(insight.severity)}
                            <CardTitle className="text-lg">
                              {insight.title}
                            </CardTitle>
                            <div className="ml-auto flex items-center gap-2">
                              <Bot className="h-4 w-4 text-primary" />
                              <span className="text-sm text-muted-foreground">
                                {insight.aiConfidence}% confidence
                              </span>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-4">
                            <HoverCard>
                              <HoverCardTrigger asChild>
                                <div className="flex items-center justify-between rounded-lg bg-muted p-3 cursor-pointer">
                                  <div className="flex items-center gap-2">
                                    <Sparkles className="h-4 w-4" />
                                    <span
                                      className={getCategoryColor(
                                        insight.category
                                      )}
                                    >
                                      {insight.category
                                        .charAt(0)
                                        .toUpperCase() +
                                        insight.category.slice(1)}
                                    </span>
                                  </div>
                                  <Badge variant="outline">{insight.vm}</Badge>
                                </div>
                              </HoverCardTrigger>
                              <HoverCardContent>
                                <div className="space-y-2">
                                  <h4 className="text-sm font-semibold">
                                    AI Analysis
                                  </h4>
                                  <p className="text-sm">
                                    {insight.description}
                                  </p>
                                </div>
                              </HoverCardContent>
                            </HoverCard>

                            <div className="bg-muted/50 p-3 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <Bot className="h-4 w-4 text-primary" />
                                <span className="font-medium">
                                  Suggested Action
                                </span>
                              </div>
                              <p className="text-sm">
                                {insight.suggestedAction}
                              </p>
                            </div>
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

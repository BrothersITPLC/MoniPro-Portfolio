import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import {
  Activity,
  HardDrive,
  Database,
  Network,
  Clock,
  Link2,
  Signal,
} from "lucide-react";
import {
  useGetHostItemsQuery,
  useGetTemplateNamesQuery,
} from "@/components/Home/zabbixHosts/api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Dashboard } from "./graphs/Dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export function ItemWrapper() {
  const { hostId } = useParams();
  const [selectedTab, setSelectedTab] = useState("cpu");
  const [tNames, setTNames] = useState([]);

  const { data: hostItems, isLoading } = useGetHostItemsQuery({
    hostids: hostId,
    name: selectedTab.toUpperCase(),
  });

  const { data: templateNames, isLoading: TemplateNamesIsLoading } =
    useGetTemplateNamesQuery({
      hostids: hostId,
    });

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  useEffect(() => {
    if (templateNames) {
      setTNames(templateNames.data);
    } else {
      setTNames([]);
    }
  }, [templateNames]);
  return (
    <div className="bg-[var(--background)] p-6 rounded-xl shadow-lg border border-[var(--border)]">
      <Tabs
        defaultValue="cpu"
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full flex justify-between mb-6 bg-[var(--muted)] border-b border-[var(--border)]">
          {tNames.map((name) => (
            <TabsTrigger
              value={name}
              key={name}
              className="text-[var(--foreground)]"
            >
              <Activity className="w-4 h-4 text-[var(--primary)]" />
              {name}
            </TabsTrigger>
          ))}
        </TabsList>

        {isLoading ? (
          <div className="p-4 space-y-4">
            <Skeleton className="h-[300px] w-full rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
              <Skeleton className="h-[200px] w-full rounded-lg" />
            </div>
          </div>
        ) : (
          <>
            <TabsContent value="cpu">
              <Dashboard items={hostItems?.data || []} title="CPU Monitoring" />
            </TabsContent>
            <TabsContent value="memory">
              <Dashboard
                items={hostItems?.data || []}
                title="Memory Monitoring"
              />
            </TabsContent>
            <TabsContent value="disk">
              <Dashboard
                items={hostItems?.data || []}
                title="Disk Monitoring"
              />
            </TabsContent>
            <TabsContent value="interface">
              <Dashboard
                items={hostItems?.data || []}
                title="Network Monitoring"
              />
            </TabsContent>
            <TabsContent value="uptime">
              <Dashboard
                items={hostItems?.data || []}
                title="Uptime Monitoring"
              />
            </TabsContent>
            <TabsContent value="connections">
              <Dashboard
                items={hostItems?.data || []}
                title="Connections Monitoring"
              />
            </TabsContent>
            <TabsContent value="ping">
              <Dashboard
                items={hostItems?.data || []}
                title="Ping Monitoring"
              />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}

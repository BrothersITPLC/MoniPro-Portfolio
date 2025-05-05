import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  HardDrive,
  Database,
  Network,
  Clock,
  Link2,
  Signal,
} from "lucide-react";
import { useGetHostItemsQuery } from "@/components/Home/zabbixHosts/api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { Dashboard } from "./graphs/Dashboard";
import { Skeleton } from "@/components/ui/skeleton";

export function ItemWrapper() {
  const { hostId } = useParams();
  const [selectedTab, setSelectedTab] = useState("cpu");

  const { data: hostItems, isLoading } = useGetHostItemsQuery({
    hostids: hostId,
    name: selectedTab.toUpperCase(),
  });

  const handleTabChange = (value: string) => {
    setSelectedTab(value);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg dark:border-2 dark:bg-black dark:text-white">
      <Tabs
        defaultValue="cpu"
        className="w-full"
        onValueChange={handleTabChange}
      >
        <TabsList className="w-full flex justify-between mb-6 bg-[var(--card)] border-b">
          <TabsTrigger value="cpu" className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-[var(--primary)]" />
            CPU
          </TabsTrigger>
          <TabsTrigger value="memory" className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-[var(--primary)]" />
            Memory
          </TabsTrigger>
          <TabsTrigger value="disk" className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[var(--primary)]" />
            Disk
          </TabsTrigger>
          <TabsTrigger value="interface" className="flex items-center gap-2">
            <Network className="w-4 h-4 text-[var(--primary)]" />
            Network
          </TabsTrigger>
          <TabsTrigger value="uptime" className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-[var(--primary)]" />
            Uptime
          </TabsTrigger>
          <TabsTrigger value="connections" className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-[var(--primary)]" />
            Connections
          </TabsTrigger>
          <TabsTrigger value="ping" className="flex items-center gap-2">
            <Signal className="w-4 h-4 text-[var(--primary)]" />
            Ping
          </TabsTrigger>
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

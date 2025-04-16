import { useEffect } from "react";
import { Banner } from "../Banner";
import { InfrastructureShowcase } from "../zabbixHosts/components/InfrastructureShowcase";
import { useSelector } from "react-redux";
import {
  useSetZabbixCredentialsFirstMutation,
  useSetZabbixUserMutation,
} from "@/components/Auth/api";
import {
  Server,
  Network,
  Users,
  Database,
  AlertTriangle,
  ClipboardList,
} from "lucide-react";

import type { User } from "@/components/Auth/AutSlice";

const customStyles = `
  :root {
    --primary: #7c3aed !important; 
    --secondary: #8b5cf6 !important; 
    --accent: #ddd6fe !important; 
    --light: #f5f3ff !important;
  }
`;

export function LandingWrapper() {
  const user = useSelector((state: any) => state.auth.user);
  console.log(user);
  const [setZabbixCredentialsFirst] = useSetZabbixCredentialsFirstMutation();
  const [setZabbixUser] = useSetZabbixUserMutation();

  const handleSetZabbixCredentials = async (user: User | null) => {
    if (user && !user.user_have_zabbix_credentials) {
      try {
        await setZabbixCredentialsFirst({}).unwrap();
      } catch (error) {
        console.error("Failed to set Zabbix credentials:", error);
      }
    }
  };

  const handleSetZabbixUser = async (user: User | null) => {
    if (user && !user.user_have_zabbix_user) {
      try {
        await setZabbixUser({}).unwrap();
      } catch (error) {
        console.error("Failed to set Zabbix user:", error);
      }
    }
  };

  useEffect(() => {
    if (user && user.organization_info_completed) {
      const setupZabbix = async () => {
        await handleSetZabbixCredentials(user);
        await handleSetZabbixUser(user);
      };
      setupZabbix();
    }
  }, [user]);

  const mockVMs = [
    {
      hostid: "1",
      host: "localhost",
      ip: "10.10.10.15:10050",
      items_count: "43",
      triggers_count: "15",
      graphs_count: "8",
      status: "Enabled",
      availability: "ZBX",
      agent_type: "Linux by Zabbix agent",
    },
    {
      hostid: "2",
      host: "test-without-ip-1",
      ip: "1.1.1.1:10050",
      items_count: "43",
      triggers_count: "15",
      graphs_count: "8",
      status: "Enabled",
      availability: "ZBX",
      agent_type: "Linux by Zabbix agent",
    },
    {
      hostid: "3",
      host: "test-without-ip-2",
      ip: "1.1.1.1:10050",
      items_count: "43",
      triggers_count: "15",
      graphs_count: "8",
      status: "Enabled",
      availability: "ZBX",
      agent_type: "Linux by Zabbix agent",
    },
  ];

  const mockNetworkDevices = [
    {
      hostid: "4",
      host: "aman-bpms",
      ip: "bpms.brothersit.dev:10050",
      network_device_type: "router",
      status: "Enabled",
      availability: "ZBX ",
    },
    {
      hostid: "5",
      host: "prms",
      ip: "196.188.182.82:10050",
      network_device_type: "switch",
      status: "Enabled",
      availability: "ZBX ",
    },
  ];

  const isLoading = false;
  const vms = mockVMs;
  const networkDevices = mockNetworkDevices;

  const dashboardData = {
    totalHosts: vms.length + networkDevices.length,
    vmCount: vms.length,
    networkCount: networkDevices.length,
    totalUsers: 8,
    recentProblems: [
      {
        id: 1,
        name: "Server01 CPU High",
        severity: "high",
        time: "10 min ago",
      },
      {
        id: 2,
        name: "Network Switch Down",
        severity: "critical",
        time: "1 hour ago",
      },
    ],
    recentTasks: [
      {
        id: 1,
        user: "John Doe",
        action: "Restarted Server03",
        time: "15 min ago",
      },
      {
        id: 2,
        user: "Jane Smith",
        action: "Updated firewall rules",
        time: "2 hours ago",
      },
    ],
  };

  return (
    <div className="w-full">
      <style>{customStyles}</style>
      <Banner />
      <div className="container mx-auto py-8 space-y-8">
        {/* Dashboard Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Total Hosts Card */}
          <div className="bg-[#f5f3ff] rounded-lg p-4 shadow-sm border border-[#ddd6fe]">
            <div className="flex items-start gap-3">
              <div className="bg-[#7c3aed] p-3 rounded-full">
                <Database className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Hosts
                </h3>
                <p className="text-2xl font-bold text-[#7c3aed]">
                  {dashboardData.totalHosts}
                </p>
                <div className="mt-2 flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Server className="size-4 text-[#8b5cf6]" />
                    <span className="text-gray-700">
                      {dashboardData.vmCount} Virtual Machines
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Network className="size-4 text-[#8b5cf6]" />
                    <span className="text-gray-700">
                      {dashboardData.networkCount} Network Devices
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Total Users Card */}
          <div className="bg-[#f5f3ff] rounded-lg p-4 shadow-sm border border-[#ddd6fe]">
            <div className="flex items-center gap-3">
              <div className="bg-[#8b5cf6] p-3 rounded-full">
                <Users className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Total Users
                </h3>
                <p className="text-2xl font-bold text-[#8b5cf6]">
                  {dashboardData.totalUsers}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Problems Card */}
          <div className="bg-[#f5f3ff] rounded-lg p-4 shadow-sm border border-[#ddd6fe]">
            <div className="flex items-start gap-3">
              <div className="bg-[#7c3aed] p-3 rounded-full">
                <AlertTriangle className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Recent Problems
                </h3>
                <div className="mt-2 space-y-2">
                  {dashboardData.recentProblems.map((problem) => (
                    <div key={problem.id} className="text-sm">
                      <p className="font-medium text-gray-700">
                        {problem.name}
                      </p>
                      <p className="text-xs text-gray-500">{problem.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Tasks Card */}
          <div className="bg-[#f5f3ff] rounded-lg p-4 shadow-sm border border-[#ddd6fe]">
            <div className="flex items-start gap-3">
              <div className="bg-[#8b5cf6] p-3 rounded-full">
                <ClipboardList className="size-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">
                  Recent Tasks
                </h3>
                <div className="mt-2 space-y-2">
                  {dashboardData.recentTasks.map((task) => (
                    <div key={task.id} className="text-sm">
                      <p className="font-medium text-gray-700">{task.action}</p>
                      <p className="text-xs text-gray-500">
                        by {task.user} • {task.time}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Virtual Machines Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 bg-[#f5f3ff] p-3 rounded-lg">
            <Server className="size-6 text-[#7c3aed]" />
            Virtual Machines
          </h2>
          <InfrastructureShowcase
            devices={vms}
            type="vm"
            isLoading={isLoading}
          />
        </section>

        {/* Network Devices Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 bg-[#f5f3ff] p-3 rounded-lg">
            <Network className="size-6 text-[#7c3aed]" />
            Network Devices
          </h2>
          <InfrastructureShowcase
            devices={networkDevices}
            type="network"
            isLoading={isLoading}
          />
        </section>
      </div>
    </div>
  );
}

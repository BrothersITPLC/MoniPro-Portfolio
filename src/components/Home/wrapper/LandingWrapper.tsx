import { useEffect } from "react";
import { Banner } from "../Banner";
import { InfrastructureShowcase } from "@/components/Home/zabbixHosts/components/InfrastructureShowcase";
import { useGetZabixHostesQuery } from "@/components/Home/zabbixHosts/api";
import { useSelector } from "react-redux";
import {
  useSetZabbixCredentialsFirstMutation,
  useSetZabbixUserMutation,
} from "@/components/Auth/api";

import type { User } from "@/components/Auth/AutSlice";

export function LandingWrapper() {
  const user = useSelector((state: any) => state.auth.user);
  const [setZabbixCredentialsFirst] = useSetZabbixCredentialsFirstMutation();
  const [setZabbixUser] = useSetZabbixUserMutation();

  const handleSetZabbixCredentials = async (user: User | null) => {
    if (user && !user.user_have_zabbix_credentials_1) {
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

  const { data: zabixhosts, isLoading } = useGetZabixHostesQuery({});

  // Separate devices into VMs and network devices
  const devices = zabixhosts?.data || [];
  const vms = devices.filter((device) => !device.network_device_type);
  const networkDevices = devices.filter((device) => device.network_device_type);

  return (
    <div className="w-full">
      <Banner />
      <div className="container mx-auto py-8 space-y-8">
        <h1 className="text-3xl font-bold mb-8">Infrastructure Dashboard</h1>

        {/* Virtual Machines Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Virtual Machines</h2>
          <InfrastructureShowcase
            devices={vms}
            type="vm"
            isLoading={isLoading}
          />
        </section>

        {/* Network Devices Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Network Devices</h2>
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

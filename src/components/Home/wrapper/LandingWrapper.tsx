import { useEffect } from "react";
import { Banner } from "../Banner";
import { InfrastructureShowcase } from "@/components/Home/devices/components/InfrastructureShowcase";
import { useGetVmsQuery, useGetNetworksQuery } from "../devices/api";
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
    if (user) {
      const setupZabbix = async () => {
        await handleSetZabbixCredentials(user);
        await handleSetZabbixUser(user);
      };

      setupZabbix();
    }
  }, [user]);

  const { data: vmsData } = useGetVmsQuery({});
  const { data: networksData } = useGetNetworksQuery({});

  const vms = vmsData?.data || [];
  const networks = networksData?.data || [];

  return (
    <div className="w-full">
      <Banner />
      <div className="container mx-auto py-8">
        <InfrastructureShowcase vms={vms} networks={networks} />
      </div>
    </div>
  );
}

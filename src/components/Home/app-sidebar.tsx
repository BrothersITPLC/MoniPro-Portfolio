import * as React from "react";
import { Settings2, Monitor, Bell } from "lucide-react";
import { NavMain } from "@/components/Home/nav-main";
import { NavUser } from "@/components/Home/nav-user";
import { TeamSwitcher } from "@/components/Home/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { InfrastructerList } from "@/components/Home/types";
import { useGetZabixHostesQuery } from "@/components/Home/zabbixHosts/api";
import { useDispatch, useSelector } from "react-redux";
import { setHosts } from "./zabbixHosts/zabbixSlice";

// This is sample data.
const getDefaultNavData = () => ({
  navMain: [
    {
      title: "Devices",
      url: "#",
      icon: Monitor,
      isActive: true,
      items: [],
    },
    {
      title: "Notfication",
      url: "#",
      icon: Bell,
      items: [
        {
          title: "Security Alerts",
          url: "/home/notification/security",
        },
        {
          title: "Performance Alerts",
          url: "/home/notification/performance",
        },
        {
          title: "Insight and suggestion",
          url: "/home/notification/insight-suggestion",
        },
      ],
    },

    {
      title: "Settings",
      url: "/home",
      icon: Settings2,
      items: [
        {
          title: "Information",
          url: "/home/comp-info",
        },
        {
          title: "Team",
          url: "/home/team",
        },
        {
          title: "Manage Devices",
          url: "/home/device-mangment",
        },
      ],
    },
  ],
});

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  deviceList?: InfrastructerList;
}

export function AppSidebar({ deviceList, ...props }: AppSidebarProps) {
  const { hosts } = useSelector((state: any) => state.zabbixhosts);
  const dispatch = useDispatch();
  const { data: ZabbixhostList } = useGetZabixHostesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [navData, setNavData] = React.useState(getDefaultNavData());

  // Effect to update Redux store when Zabbix data is fetched
  React.useEffect(() => {
    if (ZabbixhostList?.data) {
      dispatch(setHosts(ZabbixhostList.data));
    }
  }, [ZabbixhostList, dispatch]);

  // Effect to update navigation when hosts data changes
  React.useEffect(() => {
    if (hosts && hosts.length > 0) {
      const updatedNavData = { ...getDefaultNavData() };

      // Create items for each host
      const hostItems = hosts.map((host) => ({
        title: host.host,
        url: `/home/zabbixhost/${host.hostid}`,
        key: `host-${host.hostid}`,
      }));

      // Update the Devices section with host items
      updatedNavData.navMain[0].items = hostItems;
      setNavData(updatedNavData);
    }
  }, [hosts]);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

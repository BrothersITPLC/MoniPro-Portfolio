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
  const [navData, setNavData] = React.useState(getDefaultNavData());

  React.useEffect(() => {
    if (deviceList) {
      const updatedNavData = { ...getDefaultNavData() };
      const deviceItems = [];

      // Add VMs to the device items
      if (deviceList.vms && deviceList.vms.length > 0) {
        const vmItems = deviceList.vms.map((vm) => ({
          title: vm.username,
          url: `/home/vm/${vm.id}`,
          key: `vm-${vm.id}`, // Add a unique key property
        }));
        deviceItems.push(...vmItems);
      }

      // Add Networks to the device items
      if (deviceList.networks && deviceList.networks.length > 0) {
        const networkItems = deviceList.networks.map((network) => ({
          title: network.name,
          url: `/home/network/${network.id}`,
          key: `network-${network.id}`, // Add a unique key property
        }));
        deviceItems.push(...networkItems);
      }

      // Update the Devices items with combined VM and Network data
      updatedNavData.navMain[0].items = deviceItems;

      setNavData(updatedNavData);
    }
  }, [deviceList]);

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

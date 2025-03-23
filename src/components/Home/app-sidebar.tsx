import * as React from "react";
import { Settings2, SquareTerminal, Bell } from "lucide-react";
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
import { useGetInfrastructureListQuery } from "@/components/Landing/api";

// This is sample data.
const getDefaultNavData = () => ({
  navMain: [
    {
      title: "Devices",
      url: "#",
      icon: SquareTerminal,
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

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: infrastructureList, isLoading } =
    useGetInfrastructureListQuery();
  const [navData, setNavData] = React.useState(getDefaultNavData());

  React.useEffect(() => {
    if (infrastructureList && infrastructureList.length > 0) {
      const updatedNavData = { ...getDefaultNavData() };

      // Get the first infrastructure item
      const infrastructure = infrastructureList[0];

      // Update the Devices items with VM data from the API
      if (infrastructure.vms && infrastructure.vms.length > 0) {
        updatedNavData.navMain[0].items = infrastructure.vms.map((vm) => ({
          title: vm.domainName,
          url: "/home/dashboard",
        }));
      }

      setNavData(updatedNavData);
    }
  }, [infrastructureList]);

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

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

// This is sample data.
const data = {
  navMain: [
    {
      title: "Devices",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Uemis",
          url: "/home/dashboard",
        },
        {
          title: "Orc",
          url: "/home/dashboard",
        },
        {
          title: "OSTA-vm-1",
          url: "/home/dashboard",
        },
      ],
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
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

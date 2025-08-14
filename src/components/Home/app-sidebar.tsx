// import { useEffect, useState, ComponentProps } from "react";
// import { Settings2, Monitor, Bell } from "lucide-react";
// import { NavMain } from "@/components/Home/nav-main";
// import { NavUser } from "@/components/Home/nav-user";
// import { useGetTemplatesQuery } from "@/components/Home/zabbixHosts/api";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarRail,
// } from "@/components/ui/sidebar";
// import { InfrastructerList } from "@/components/Home/types";
// import { useGetZabixHostesQuery } from "@/components/Home/zabbixHosts/api";
// const getDefaultNavData = () => ({
//   navMain: [
//     {
//       title: "Devices",
//       url: "#",
//       icon: Monitor,
//       isActive: true,
//       items: [],
//     },
//     {
//       title: "Notification",
//       url: "#",
//       icon: Bell,
//       items: [
//         {
//           title: "Security Alerts",
//           url: "/home/notification/security",
//         },
//         {
//           title: "Performance Alerts",
//           url: "/home/notification/performance",
//         },
//         {
//           title: "Insight and Suggestion",
//           url: "/home/notification/insight-suggestion",
//         },
//       ],
//     },
//     {
//       title: "Settings",
//       url: "/home",
//       icon: Settings2,
//       items: [
//         {
//           title: "Information",
//           url: "/home/info-update",
//         },
//         {
//           title: "Team",
//           url: "/home/team",
//         },
//         {
//           title: "Manage Devices",
//           url: "/home/device-mangment",
//         },
//       ],
//     },
//   ],
// });

// interface AppSidebarProps extends ComponentProps<typeof Sidebar> {
//   deviceList?: InfrastructerList;
// }

// interface Hosts {
//   host: string;
//   host_id: string;
// }

// export function AppSidebar({ deviceList, ...props }: AppSidebarProps) {
//   const [navData, setNavData] = useState(getDefaultNavData());
//   const { data: ZabbixhostList } = useGetZabixHostesQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });

//   useEffect(() => {
//     if (ZabbixhostList?.data?.length > 0) {
//       const updatedNavData = { ...getDefaultNavData() };
//       const hostItems = ZabbixhostList.data.map((host: Hosts) => ({
//         title: host.host,
//         url: `/home/host/${host.host_id}`,
//         key: `host-${host.host_id}`,
//       }));
//       updatedNavData.navMain[0].items = hostItems;
//       setNavData(updatedNavData);
//     }
//   }, [ZabbixhostList]);

//   const { data: templateGroupData } = useGetTemplatesQuery(undefined, {
//     refetchOnMountOrArgChange: true,
//   });
//   console.log(templateGroupData);

//   return (
    
//     <Sidebar
//       collapsible="icon"
//       className="bg-background border-r border-border"
//       {...props}
//     >
//       <SidebarContent className="py-4">
//         <NavMain items={navData.navMain} />
//       </SidebarContent>
//       <SidebarFooter className="border-t border-border px-4 py-3">
//         <NavUser />
//       </SidebarFooter>
//       <SidebarRail className="bg-accent" />
//     </Sidebar>
//   );
// }

import  React,{useEffect} from "react";
import { Settings2, Monitor, Bell } from "lucide-react";
import { NavMain } from "@/components/Home/nav-main";
import { NavUser } from "@/components/Home/nav-user";
import TeamSwitcher from "@/components/Home/team-switcher";
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
import { useGetPlansQuery } from "@/components/Landing/api";
import { setPlans } from "@/components/Landing/LandingSlice";

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
      title: "Notification",
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
          title: "Insight and Suggestion",
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
          url: "/home/info-update",
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
  const dispatch = useDispatch();

  const { data: plansData, refetch } = useGetPlansQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const { hosts } = useSelector((state: any) => state.zabbixhosts);
  const { data: ZabbixhostList } = useGetZabixHostesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [navData, setNavData] = React.useState(getDefaultNavData());

  React.useEffect(() => {
    if (ZabbixhostList?.data) {
      dispatch(setHosts(ZabbixhostList.data));
    }
  }, [ZabbixhostList, dispatch]);

  useEffect(() => {
    if (hosts && hosts.length > 0) {
      const updatedNavData = { ...getDefaultNavData() };
      const hostItems = hosts.map((host) => ({
        title: host.host,
        url: `/home/zabbixhost/${host.hostid}`,
        key: `host-${host.hostid}`,
      }));
      updatedNavData.navMain[0].items = hostItems;
      setNavData(updatedNavData);
    }
  }, [hosts]);
  useEffect(() => {
    refetch();
    if (plansData) {
      dispatch(setPlans(plansData));
    }
  }, [plansData, dispatch, refetch]);
  return (
    <Sidebar 
      collapsible="icon" 
      className="bg-white border-r border-[#ddd6fe]" 
      {...props}
    >
      <SidebarHeader className="border-b border-[#ddd6fe] px-4 py-3">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className="py-4">
        <NavMain items={navData.navMain} />
      </SidebarContent>
      <SidebarFooter className="border-t border-[#ddd6fe] px-4 py-3">
        <NavUser />
      </SidebarFooter>
      <SidebarRail className="bg-[#f5f3ff]" />
    </Sidebar>
  );
}
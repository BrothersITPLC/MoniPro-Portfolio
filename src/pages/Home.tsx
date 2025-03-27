import { AppSidebar } from "@/components/Home/app-sidebar";
import { useGetInfrastructureListQuery } from "@/components/Home/api";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { ModeToggle } from "@/components/Global/ModeToggle";
import { Outlet } from "react-router-dom";

export function Home() {
  const { data: deviceList, refetch } = useGetInfrastructureListQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  useEffect(() => {
    refetch();
  }, [deviceList, refetch]);

  // Get the first item if deviceList is an array, or use the deviceList directly if it's already the correct shape
  const sidebarDeviceList = Array.isArray(deviceList)
    ? deviceList[0]
    : deviceList;

  return (
    <SidebarProvider>
      <AppSidebar deviceList={sidebarDeviceList} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 w-full justify-between p-5">
          <div></div>
          <ModeToggle />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

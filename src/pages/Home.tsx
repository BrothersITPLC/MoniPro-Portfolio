import { AppSidebar } from "@/components/Home/app-sidebar";
import { useGetInfrastructureListQuery } from "@/components/Home/api";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useEffect } from "react";
import { ModeToggle } from "@/components/Global/ModeToggle";
import { Outlet } from "react-router-dom";
import { NavUser } from "@/components/Home/nav-user";

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

  const sidebarDeviceList = Array.isArray(deviceList)
    ? deviceList[0]
    : deviceList;

  return (
    <SidebarProvider>
      <AppSidebar deviceList={sidebarDeviceList} />
      <SidebarInset className="flex flex-col h-screen overflow-hidden">
        <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-4 bg-background border-b border-border transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 w-full justify-between px-6">
          <div></div>
          <div className="flex items-center gap-4">
            <NavUser />
            <ModeToggle />
          </div>
        </header>
        <main className="flex-1 overflow-auto">
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Outlet />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}

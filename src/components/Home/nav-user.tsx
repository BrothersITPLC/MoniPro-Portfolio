import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
  UserRoundCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLogoutMutation } from "@/components/Auth/api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/app/store";
import { logoutState } from "@/components/Auth/AutSlice";

export function NavUser() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const [logout, { isLoading }] = useLogoutMutation();

  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    try {
      const response = await logout().unwrap();

      if (response.status === "success") {
        toast.success(response.message || "Logout successful");
        dispatch(logoutState());
        navigate("/");
      } else {
        toast.error(response.message || "Logout failed");
      }
    } catch (error: any) {
      toast.error(error.data?.message || "Failed to Logout. Please try again.");
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-[#f5f3ff] transition-all duration-200 rounded-xl p-2
                         data-[state=open]:bg-[#f5f3ff] data-[state=open]:shadow-md"
            >
              <Avatar className="h-10 w-10 rounded-lg border-2 border-[#7c3aed]">
                <AvatarImage 
                  src={user?.user_name} 
                  alt={user?.user_name}
                  className="object-cover"
                />
                <AvatarFallback className="rounded-lg bg-[#8b5cf6] text-white">
                  <UserRoundCheck className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight ml-3">
                <span className="truncate font-semibold text-[15px] text-gray-800">
                  {user?.user_name}
                </span>
                <span className="truncate text-[13px] text-gray-600">
                  {user?.user_email}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto size-5 text-[#8b5cf6]" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[280px] rounded-xl shadow-lg border border-[#ddd6fe]"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={8}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-3 p-3 text-left">
                <Avatar className="h-12 w-12 rounded-lg border-2 border-[#7c3aed]">
                  <AvatarImage 
                    src={user?.user_name} 
                    alt={user?.user_name}
                    className="object-cover" 
                  />
                  <AvatarFallback className="rounded-lg bg-[#8b5cf6] text-white">
                    <UserRoundCheck className="h-6 w-6" />
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-semibold text-[16px] text-gray-800">
                    {user?.user_name}
                  </span>
                  <span className="truncate text-[14px] text-gray-600">
                    {user?.user_email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-[#ddd6fe]" />
            <DropdownMenuGroup>
              <Link to="/home/subscription">
                <DropdownMenuItem className="py-2.5 px-3 text-[14px] cursor-pointer
                                          hover:bg-[#f5f3ff] focus:bg-[#f5f3ff]
                                          rounded-lg mx-1 my-0.5">
                  <Sparkles className="mr-2 h-5 w-5 text-[#7c3aed]" />
                  <span className="font-medium">Update Subscription Plan</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#ddd6fe]" />
            <DropdownMenuGroup className="p-1">
              <DropdownMenuItem className="py-2.5 px-3 text-[14px] cursor-pointer
                                        hover:bg-[#f5f3ff] focus:bg-[#f5f3ff]
                                        rounded-lg">
                <BadgeCheck className="mr-2 h-5 w-5 text-[#8b5cf6]" />
                <span className="font-medium">Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5 px-3 text-[14px] cursor-pointer
                                        hover:bg-[#f5f3ff] focus:bg-[#f5f3ff]
                                        rounded-lg">
                <CreditCard className="mr-2 h-5 w-5 text-[#8b5cf6]" />
                <span className="font-medium">Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2.5 px-3 text-[14px] cursor-pointer
                                        hover:bg-[#f5f3ff] focus:bg-[#f5f3ff]
                                        rounded-lg">
                <Bell className="mr-2 h-5 w-5 text-[#8b5cf6]" />
                <span className="font-medium">Notifications</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-[#ddd6fe]" />
            <DropdownMenuItem 
              onClick={handleSubmit}
              className="py-2.5 px-3 text-[14px] cursor-pointer
                       hover:bg-red-50 focus:bg-red-50 text-red-600
                       rounded-lg mx-1 my-0.5"
            >
              <LogOut className="mr-2 h-5 w-5" />
              <span className="font-medium">Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
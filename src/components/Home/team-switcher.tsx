import { ChevronDown, UserRoundCheck } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/store";

export default function SidebarHeader() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="p-4 border-b border-[#ddd6fe]">
      <Link
        to="/home/dashboard"
        className="flex items-center gap-3 p-2 rounded-md hover:bg-[#f5f3ff] transition-colors"
      >
        <Avatar className="h-10 w-10 rounded-lg border-2 border-[#7c3aed]">
          <AvatarImage
            src={user?.profile_picture}
            alt={user?.user_name}
            className="object-cover"
          />
          <AvatarFallback className="rounded-lg bg-[#8b5cf6] text-white">
            <UserRoundCheck className="h-5 w-5" />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="font-medium text-[#7c3aed]">
            {user?.user_name || "Dashboard"}
          </span>
          <span className="text-xs text-[#8b5cf6]">Workspace</span>
        </div>

        <ChevronDown className="ml-auto size-4 text-[#8b5cf6]" />
      </Link>
    </div>
  );
}

import { AlignVerticalDistributeEnd } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
export function TeamSwitcher() {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
      <Link to="/home/dashboard" className="hover-pointer">
        <div className="flex items-center gap-4">
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <AlignVerticalDistributeEnd className="size-4" />
          </div>
          <div>{user?.user_name}</div>{" "}
        </div>{" "}
      </Link>
    </div>
  );
}

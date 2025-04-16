import { AlignVerticalDistributeEnd, ChevronDown } from "lucide-react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"

export default function SidebarHeader() {
  const { user } = useSelector((state: RootState) => state.auth)

  return (
    <div className="p-4 border-b border-[#ddd6fe]">
      <Link
        to="/home/dashboard"
        className="flex items-center gap-3 p-2 rounded-md hover:bg-[#f5f3ff] transition-colors"
      >
        <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-[#7c3aed] text-white shadow-sm">
          <AlignVerticalDistributeEnd className="size-4" />
        </div>

        <div className="flex flex-col">
          <span className="font-medium text-[#7c3aed]">{user?.user_name || "Dashboard"}</span>
          <span className="text-xs text-[#8b5cf6]">Workspace</span>
        </div>

        <ChevronDown className="ml-auto size-4 text-[#8b5cf6]" />
      </Link>
    </div>
  )
}

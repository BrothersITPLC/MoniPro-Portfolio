import { Outlet } from "react-router-dom";

export function NotificationWrapper() {
  return (
    <div className="w-full p-4 md:p-6 lg:p-8">
      <div className="max-w-[95%] mx-auto">
        <Outlet />
      </div>
    </div>
  );
}

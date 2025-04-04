import Device from "@/components/Home/devices/components/Device";
import { DeviceManager } from "@/components/Home/zabbixHosts/components/DeviceManager";

export function DeviceWrapper() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <DeviceManager />
    </div>
  );
}

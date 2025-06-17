import { Server, Network, CheckCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface DeviceListProps {
  devices: any[];
  type: "vm" | "network";
  isLoading: boolean;
}

export function InfrastructureShowcase({
  devices,
  type,
  isLoading,
}: DeviceListProps) {
  const getIcon = (deviceType: string) => {
    if (type === "network") {
      switch (deviceType) {
        case "router":
          return "🌐";
        case "switch":
          return "🔄";
        case "firewall":
          return "🔒";
        case "loadbalancer":
          return "⚖️";
        default:
          return "📱";
      }
    }
    return null;
  };

  const getStatusBadge = (status: string) => {
    if (status === "Enabled") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--success-bg)] text-[var(--success-text)]">
          <CheckCircle className="w-3 h-3 mr-1" />
          Enabled
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--error-bg)] text-[var(--error-text)]">
        <AlertCircle className="w-3 h-3 mr-1" />
        Disabled
      </span>
    );
  };

  const getAvailabilityBadge = (availability: string) => {
    if (availability === "ZBX") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--error-bg)] text-[var(--error-text)]">
          ZBX
        </span>
      );
    } else if (availability === "ZBX ") {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[var(--success-bg)] text-[var(--success-text)]">
          ZBX
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
        {availability}
      </span>
    );
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading devices...</div>;
  }

  if (devices.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        {type === "vm" ? (
          <Server className="mx-auto h-12 w-12 text-[var(--icon-muted)]" />
        ) : (
          <Network className="mx-auto h-12 w-12 text-[var(--icon-muted)]" />
        )}
        <h3 className="mt-2 text-lg font-medium">
          No {type === "vm" ? "Virtual Machines" : "Network Devices"}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Add a device to start monitoring
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] p-6 rounded-lg border border-[var(--border)]">
      {isLoading ? (
        <div className="text-[var(--muted-foreground)] text-center py-8">
          Loading devices...
        </div>
      ) : devices.length === 0 ? (
        <div className="text-center p-8 border border-dashed rounded-lg border-[var(--border)]">
          {type === "vm" ? (
            <Server className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
          ) : (
            <Network className="mx-auto h-12 w-12 text-[var(--muted-foreground)]" />
          )}
          <p className="mt-4 text-[var(--muted-foreground)]">
            No {type === "vm" ? "virtual machines" : "network devices"} found
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-[var(--light)] dark:border-2 dark:bg-black ">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-heading)] dark:text-[var(--neutral-bg)] ">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-heading)] dark:text-[var(--neutral-bg)] ">
                  Items
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-heading)] dark:text-[var(--neutral-bg)] ">
                  Triggers
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-heading)] dark:text-[var(--neutral-bg)] ">
                  Graphs
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-heading)] dark:text-[var(--neutral-bg)] ">
                  IP/DNS
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-heading)] dark:text-[var(--neutral-bg)] ">
                  Agent
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-heading)] dark:text-[var(--neutral-bg)] ">
                  Status
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-[var(--text-heading)] dark:text-[var(--neutral-bg)] ">
                  Availability
                </th>
              </tr>
            </thead>
            <tbody>
              {devices.map((device) => (
                <tr
                  key={device.hostid}
                  className="border-b hover:bg-[var(--light)] dark:hover:text-black hover:bg-[var(--white)] transition-colors"
                >
                  <td className="px-4 py-3">
                    <Link
                      // to={`/home/zabbixhost/${device.hostid}`}
                      to={`/home/zabbixhost/10659`}
                      className="flex items-center text-[#7c3aed] hover:underline"
                    >
                      {type === "network" &&
                        getIcon(device.network_device_type)}
                      {device.host}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Link
                      to={`/items/${device.hostid}`}
                      className="text-[var(--secondary)] hover:underline"
                    >
                      Items {device.items_count || ""}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Link
                      to={`/triggers/${device.hostid}`}
                      className="text-[var(--secondary)] hover:underline"
                    >
                      Triggers {device.triggers_count || ""}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Link
                      to={`/graphs/${device.hostid}`}
                      className="text-[var(--secondary)] hover:underline"
                    >
                      Graphs {device.graphs_count || ""}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {device.ip || device.dns}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {device.agent_type || "Linux by Zabbix agent"}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {getStatusBadge(device.status || "Enabled")}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {getAvailabilityBadge(device.availability || "ZBX")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

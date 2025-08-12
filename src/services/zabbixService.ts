import { BaseUrl } from "../constant/BaseUrl";

interface ZabbixInterface {
  ip: string;
  dns: string;
  useip: string;
  type: string;
}

interface ZabbixItem {
  itemid: string;
  name: string;
  key_: string;
  lastvalue: string;
  units: string;
}

interface ZabbixHost {
  hostid: string;
  host: string;
  name: string;
  status: string;
  interfaces: ZabbixInterface[];
  items: ZabbixItem[];
}

interface ZabbixData {
  status: string;
  data: ZabbixHost[];
}

export const fetchZabbixData = async (): Promise<ZabbixData> => {
  try {
    const response = await fetch(`${BaseUrl}/zabbix-data/`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken":
          document.cookie.split("csrftoken=")[1]?.split(";")[0] || "",
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch Zabbix data");
    }

    return {
      status: "success",
      data: data.data || [],
    };
  } catch (error) {
    console.error("Zabbix data fetch error:", error);
    throw new Error(
      error instanceof Error ? error.message : "Failed to fetch monitoring data"
    );
  }
};

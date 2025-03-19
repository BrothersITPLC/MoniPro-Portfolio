export interface VMFormData {
  id?: string;
  domainName: string;
  username: string;
  password: string;
  ipAddress: string;
  networkType: string;
  status: "running" | "stopped" | "error";
  resources: {
    cpu: number;
    memory: number;
    storage: number;
  };
}

export interface NetworkFormData {
  id?: string;
  deviceType: string;
  ipAddress: string;
  subnetMask: string;
  gateway: string;
  name: string;
  location: string;
  status: "active" | "inactive" | "maintenance";
  metrics: {
    bandwidth: number;
    latency: number;
    packetLoss: number;
  };
}

export interface ResourceMetrics {
  cpu: number;
  memory: number;
  storage: number;
  bandwidth: number;
}

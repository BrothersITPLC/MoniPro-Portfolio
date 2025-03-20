// Base VM type from API
export interface VM {
  id: string;
  domainName: string;
  username: string;
  password: string;
  ipAddress: string;
  networkType: string;
}

// Form data for VM creation/update
export interface VMFormData {
  domainName: string;
  username: string;
  password: string;
  ipAddress: string;
  networkType: string;
  belong_to: number;
}

// Base Network type from API
export interface Network {
  id: string;
  name: string;
  deviceType: string;
  networkType: string;
  ipAddress: string;
  subnetMask: string;
  gateway: string;
}

// Form data for Network creation/update
export interface NetworkFormData {
  name: string;
  deviceType: string;
  networkType: string;
  ipAddress: string;
  subnetMask: string;
  gateway: string;
  belong_to: number;
}

// API response structure
export interface ApiResponse<T> {
  data: T[];
  message: string;
  success: boolean;
}

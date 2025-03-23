export interface Deduction {
  duration_id: number;
  duration: "quarterly" | "yearly";
  percentage: number;
}

export interface PlanFeature {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
  deduction: Deduction[];
}

export interface VM {
  id: number;
  domainName: string;
}

export interface Network {
  id: number;
  name: string;
}

export interface InfrastructerList {
  vms: VM[];
  networks: Network[];
}

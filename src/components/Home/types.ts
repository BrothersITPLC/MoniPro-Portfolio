export interface VM {
  id: number;
  username: string;
}

export interface Network {
  id: number;
  name: string;
}

export interface InfrastructerList {
  vms: VM[];
  networks: Network[];
}

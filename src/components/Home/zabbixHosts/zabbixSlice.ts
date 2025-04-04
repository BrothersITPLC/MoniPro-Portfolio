import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Host {
  id: number;
  host: string;
  hostid: string;
  ip: string;
  dns: string | null;
  port: number;
  hostgroup_name: string;
  hostgroupid: string;
}

interface ZabbixState {
  hosts: Host[];
}

const initialState: ZabbixState = {
  hosts: [],
};

const zabbixSlice = createSlice({
  name: "zabbix",
  initialState,
  reducers: {
    setHosts: (state, action: PayloadAction<Host[]>) => {
      state.hosts = action.payload;
    },
  },
});

export const { setHosts } = zabbixSlice.actions;

// Add selector
export const selectHosts = (state: { zabbixhosts: ZabbixState }) =>
  state.zabbixhosts.hosts;

export default zabbixSlice.reducer;

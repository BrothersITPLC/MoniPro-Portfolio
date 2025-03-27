import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VM, Network } from "./types";
import { deviceApi } from "./api";
interface DeviceState {
  vms: VM[];
  networks: Network[];
  loading: boolean;
  error: string | null;
}
const initialState: DeviceState = {
  vms: [],
  networks: [],
  loading: false,
  error: null,
};
const deviceSlice = createSlice({
  name: "deviceSlice",
  initialState,
  reducers: {
    setVMs: (state, action: PayloadAction<VM[]>) => {
      state.vms = action.payload;
    },
    setNetworks: (state, action: PayloadAction<Network[]>) => {
      state.networks = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(deviceApi.endpoints.getVms.matchPending, (state) => {
        state.loading = true;
      })
      .addMatcher(
        deviceApi.endpoints.getVms.matchFulfilled,
        (state, action) => {
          state.vms = action.payload.data;
          state.loading = false;
        }
      )
      .addMatcher(
        deviceApi.endpoints.getNetworks.matchFulfilled,
        (state, action) => {
          state.networks = action.payload.data;
          state.loading = false;
        }
      );
  },
});
export const { setVMs, setNetworks } = deviceSlice.actions;
export default deviceSlice.reducer;

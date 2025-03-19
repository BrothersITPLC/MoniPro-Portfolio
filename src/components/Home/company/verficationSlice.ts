import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrganizationData {
  organization_name: string;
  organization_phone: string;
  organization_website: string;
  organization_description: string;
  organization_payment_plane: number;
  payment_provider: number;
  user_id: number;
}

interface LandingState {
  organizationData: OrganizationData | null;
}

const initialState: LandingState = {
  organizationData: null,
};

const LandingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<OrganizationData>) => {
      state.organizationData = action.payload;
    },
  },
});

export const { setOrganization } = LandingSlice.actions;
export default LandingSlice.reducer;

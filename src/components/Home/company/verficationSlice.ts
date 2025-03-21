import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrganizationData {
  organization_name: string;
  organization_phone: string;
  organization_website: string;
  organization_description: string;
  organization_payment_plane: number;
  organization_payment_duration: number;
  payment_provider: number;
  user_id: number;
  duration_id?: number;
}

interface LandingState {
  organizationData: OrganizationData | null;
  selectedDuration: number | null;
}

const initialState: LandingState = {
  organizationData: null,
  selectedDuration: null,
};

const LandingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    setOrganization: (state, action: PayloadAction<OrganizationData>) => {
      state.organizationData = action.payload;
    },
    setSelectedDuration: (state, action: PayloadAction<number>) => {
      state.selectedDuration = action.payload;
    },
  },
});

export const { setOrganization, setSelectedDuration } = LandingSlice.actions;
export default LandingSlice.reducer;

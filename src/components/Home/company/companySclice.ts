import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface OrganizationDataInfrence {
  is_private: Boolean;
  payment_provider: number;
  organization_payment_plan: number;
  organization_payment_duration: number;
  user_id: number;
  plan_type: number;
  organization_phone: string;
  organization_website: string;
  organization_name: string;
  first_name: string;
  last_name: string;
  organization_description: string;
}

interface LandingState {
  organizationData: OrganizationDataInfrence | null;
  selectedDuration: number | null;
}

const initialState: LandingState = {
  organizationData: {
    is_private: false,
    payment_provider: 0,
    organization_payment_plan: 0,
    organization_payment_duration: 0,
    user_id: 0,
    plan_type: 0,
    organization_phone: "",
    organization_website: "",
    organization_name: "",
    first_name: "",
    last_name: "",
    organization_description: "",
  },
  selectedDuration: null,
};

const CompanyInfoSlice = createSlice({
  name: "CompanyInfo",
  initialState,
  reducers: {
    setOrganization: (
      state,
      action: PayloadAction<OrganizationDataInfrence>
    ) => {
      state.organizationData = action.payload;
    },
    setSelectedDuration: (state, action: PayloadAction<number>) => {
      state.selectedDuration = action.payload;
    },
  },
});

export const { setOrganization, setSelectedDuration } =
  CompanyInfoSlice.actions;
export default CompanyInfoSlice.reducer;

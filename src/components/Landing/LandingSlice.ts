import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface PlanFeature {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
}

interface PlansData {
  monthly: PlanFeature[];
  yearly: PlanFeature[];
}

interface LandingState {
  plans: PlansData | null;
  selectedPlanType: "monthly" | "yearly";
  SelectedPlane: number;
}

const initialState: LandingState = {
  plans: null,
  selectedPlanType: "monthly",
  SelectedPlane: 0,
};

const LandingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: {
    setSelectedPlane: (state, action: PayloadAction<number>) => {
      state.SelectedPlane = action.payload;
    },
    setPlans: (state, action: PayloadAction<PlansData>) => {
      state.plans = action.payload;
    },
    setSelectedPlanType: (
      state,
      action: PayloadAction<"monthly" | "yearly">
    ) => {
      state.selectedPlanType = action.payload;
    },
  },
});

export const { setPlans, setSelectedPlanType, setSelectedPlane } =
  LandingSlice.actions;
export default LandingSlice.reducer;

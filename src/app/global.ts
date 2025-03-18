import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type Theme = "light" | "dark" | "system";

interface SubscriptionPlan {
  name: string;
  price: number;
  description: string;
  duration: "monthly" | "yearly";
}

interface GlobalState {
  is_signup: boolean;
  theme: Theme;
  isAuthenticated: boolean;
  selectedPlan: SubscriptionPlan | null;
}

const initialState: GlobalState = {
  is_signup: false,
  theme: "system",
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  selectedPlan: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSignup: (state, action: PayloadAction<boolean>) => {
      state.is_signup = action.payload;
    },

    setTheme: (state, action: PayloadAction<Theme>) => {
      state.theme = action.payload;
    },

    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
      localStorage.setItem(
        "isAuthenticated",
        action.payload ? "true" : "false"
      );
    },

    setSelectedPlan: (
      state,
      action: PayloadAction<SubscriptionPlan | null>
    ) => {
      state.selectedPlan = action.payload;
    },
  },
});

export const { setIsSignup, setTheme, setIsAuthenticated, setSelectedPlan } =
  globalSlice.actions;
export default globalSlice.reducer;

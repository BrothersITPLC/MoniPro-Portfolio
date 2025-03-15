import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface GlobalState {
  is_signup: boolean;
  is_dark: boolean;
}

const initialState: GlobalState = {
  is_signup: false,
  is_dark: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSignup: (state, action: PayloadAction<boolean>) => {
      state.is_signup = action.payload;
    },
    setIsDark: (state, action: PayloadAction<boolean>) => {
      state.is_dark = action.payload;
    },
  },
});

export const { setIsSignup, setIsDark } = globalSlice.actions;
export default globalSlice.reducer;

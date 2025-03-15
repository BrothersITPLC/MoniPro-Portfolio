import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  user: any | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (
      state,
      action: PayloadAction<{ user: any; token: string }>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    logoutState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginState, logoutState } = authSlice.actions;
export default authSlice.reducer;

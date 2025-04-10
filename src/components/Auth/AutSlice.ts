import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  organization_info_completed: boolean;
  user_name: string;
  user_email: string;
  is_private: boolean;
  organization_name: string;
  organization_payment_plane: string;
  organization_payment_duration: string;
  organization_phone: string;
  organization_website: string;
  organization_description: string;
  organization_id: number;
  user_id: number;
  user_have_zabbix_credentials: boolean;
  user_have_zabbix_user: boolean;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginState: (state, action: PayloadAction<{ user: any }>) => {
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

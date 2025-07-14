import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  organization_info_completed: boolean;
  user_name: string;
  user_email: string;
  is_private: boolean;
  is_admin: boolean;
  profile_picture: string;
  first_name: string;
  last_name: string;
  phone: string;
  organization_name: string;
  organization_payment_plan: string;
  organization_payment_duration: string;
  organization_phone: string;
  organization_website: string;
  organization_description: string;
  organization_id: number;
  user_id: number;
  user_have_zabbix_credentials: boolean;
  user_have_zabbix_user: boolean;
  user_have_completed_payment: string;
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

// {
//     "user_id": 2,
//     "user_name": "Amanuel Dereje",
//     "user_email": "derejeamanuel164@gmail.com",
//     "first_name": "ayele",
//     "last_name": "bekele",
//     "phone": "0911121314",
//     "profile_picture": "http://localhost:8000/media/profile_pictures/ayele_bekele_derejeamanuel164gmail.com_20250422091947.png",
//     "is_private": true,
//     "is_admin": true,
//     "organization_info_completed": true,
//     "user_have_zabbix_credentials": true,
//     "user_have_zabbix_user": true,
//     "organization_id": 2,
//     "organization_name": "ayele bekele",
//     "organization_phone": "0911121314",
//     "organization_website": "https://website.com",
//     "organization_description": "it is me",
//     "organization_payment_plan": "Individual plan",
//     "organization_payment_duration": "yearly"
// }

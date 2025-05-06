import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQuery";
import { loginState } from "./AutSlice";
import { toast } from "sonner";

// Reusable function for handling profile updates after successful mutations
const handleProfileUpdate = async (dispatch: any) => {
  const profileResponse = await dispatch(
    authApi.endpoints.getProfile.initiate(undefined, {
      forceRefetch: true,
    })
  ).unwrap();

  dispatch(loginState({ user: profileResponse.user_data }));
};

// Reusable onQueryStarted handler
const createProfileUpdateHandler = () => {
  return async (_: any, { dispatch, queryFulfilled }: any) => {
    try {
      await queryFulfilled;
      await handleProfileUpdate(dispatch);
    } catch (error) {
      const errorMessage =
        (error as any)?.data?.message || "Operation failed. Please try again.";
      toast.error(errorMessage);
      console.error("Operation failed:", error);
    }
  };
};

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile", "Infrastructures"],
  endpoints: (builder) => ({
    initialRegister: builder.mutation({
      query: (user) => ({
        url: "/initial-register/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Profile", "Infrastructures"],
    }),
    getProfile: builder.query({
      query: () => ({
        url: "/profile/",
        method: "GET",
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/login/",
        method: "POST",
        body: user,
      }),
      onQueryStarted: createProfileUpdateHandler(),
    }),
    SetZabbixCredentialsFirst: builder.mutation({
      query: () => ({
        url: "/zabbix-credentials/",
        method: "POST",
        body: {},
      }),
      onQueryStarted: createProfileUpdateHandler(),
    }),
    SetZabbixUser: builder.mutation({
      query: () => ({
        url: "/zabbix-users/",
        method: "POST",
        body: {},
      }),
      onQueryStarted: createProfileUpdateHandler(),
    }),
    logout: builder.mutation({
      query: (_: void) => ({
        url: "/logout/",
        method: "POST",
      }),
      invalidatesTags: ["Profile"],
    }),
    OtpVerfication: builder.mutation({
      query: (credentials) => ({
        url: "/verify/",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Profile"],
    }),
    PasswordForgot: builder.mutation({
      query: (email) => ({
        url: "/password-forgot/",
        method: "POST",
        body: email,
      }),
    }),
    PasswordResete: builder.mutation({
      query: (user_data) => ({
        url: "/password-reset/",
        method: "POST",
        body: user_data,
      }),
    }),
    googleExchange: builder.mutation({
      query: (code) => ({
        url: "/google-exchange/",
        method: "POST",
        body: code,
      }),
      onQueryStarted: createProfileUpdateHandler(),
    }),
    updateProfilePicter: builder.mutation({
      query: (formData) => ({
        url: "/update-profile-picture/",
        method: "POST",
        body: formData,
      }),
      onQueryStarted: createProfileUpdateHandler(),
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/change-password/",
        method: "POST",
        body: passwords,
      }),
      onQueryStarted: createProfileUpdateHandler(),
    }),
    updateProfile: builder.mutation({
      query: (user_data) => ({
        url: "/update-profile/",
        method: "PATCH",
        body: user_data,
      }),
      onQueryStarted: createProfileUpdateHandler(),
    }),
  }),
});

export const {
  useInitialRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useOtpVerficationMutation,
  useGetProfileQuery,
  usePasswordForgotMutation,
  usePasswordReseteMutation,
  useSetZabbixCredentialsFirstMutation,
  useSetZabbixUserMutation,
  useGoogleExchangeMutation,
  useUpdateProfilePicterMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
} = authApi;

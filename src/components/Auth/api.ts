import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../BaseUrl";
import { loginState } from "./AutSlice";
import { toast } from "sonner";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  tagTypes: ["Profile", "Infrastructures"],
  endpoints: (builder) => ({
    organizationRegister: builder.mutation({
      query: (user) => ({
        url: "/organization-register/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Profile", "Infrastructures"],
    }),
    privateRegister: builder.mutation({
      query: (user) => ({
        url: "/private-register/",
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
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const profileResponse = await dispatch(
            authApi.endpoints.getProfile.initiate(undefined, {
              forceRefetch: true,
            })
          ).unwrap();

          dispatch(loginState({ user: profileResponse.user_data }));
        } catch (error) {
          const errorMessage =
            (error as any)?.data?.message ||
            "Login or profile fetch failed. Please try again.";
          toast.error(errorMessage);
          console.error("Login or profile fetch failed:", error);
        }
      },
    }),
    SetZabbixCredentialsFirst: builder.mutation({
      query: () => ({
        url: "/zabbix-credentials/",
        method: "POST",
        body: {},
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const profileResponse = await dispatch(
            authApi.endpoints.getProfile.initiate(undefined, {
              forceRefetch: true,
            })
          ).unwrap();

          dispatch(loginState({ user: profileResponse.user_data }));
        } catch (error) {
          const errorMessage =
            (error as any)?.data?.message ||
            "Login or profile fetch failed. Please try again.";
          toast.error(errorMessage);
          console.error("Login or profile fetch failed:", error);
        }
      },
    }),
    SetZabbixUser: builder.mutation({
      query: () => ({
        url: "/zabbix-users/",
        method: "POST",
        body: {},
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          const profileResponse = await dispatch(
            authApi.endpoints.getProfile.initiate(undefined, {
              forceRefetch: true,
            })
          ).unwrap();

          dispatch(loginState({ user: profileResponse.user_data }));
        } catch (error) {
          const errorMessage =
            (error as any)?.data?.message ||
            "Login or profile fetch failed. Please try again.";
          toast.error(errorMessage);
          console.error("Login or profile fetch failed:", error);
        }
      },
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
  }),
});

export const {
  useOrganizationRegisterMutation,
  usePrivateRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useOtpVerficationMutation,
  useGetProfileQuery,
  usePasswordForgotMutation,
  usePasswordReseteMutation,
  useSetZabbixCredentialsFirstMutation,
  useSetZabbixUserMutation,
} = authApi;

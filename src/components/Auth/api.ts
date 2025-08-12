import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQuery";
import { loginState } from "./AutSlice";
import { toast } from "sonner";

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
      keepUnusedDataFor: 0,
      providesTags: ["Profile"],
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/login/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Profile"],
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

    googleExchange: builder.mutation({
      query: (code) => ({
        url: "/google-exchange/",
        method: "POST",
        body: code,
      }),
      invalidatesTags: ["Profile"],
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

    telegram: builder.mutation({
      query: (telegramData) => ({
        url: "/telegram/",
        method: "POST",
        body: telegramData, // send the full Telegram login data object, including hash
      }),
      invalidatesTags: ["Profile"],
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.status !== "success") {
            throw new Error(data.message || "Telegram login failed");
          }

          // Telegram login was successful, now refetch user profile
          const profileResponse = await dispatch(
            authApi.endpoints.getProfile.initiate(undefined, {
              forceRefetch: true,
            })
          ).unwrap();

          // Update login state with fresh user data
          dispatch(loginState({ user: profileResponse.user_data }));
        } catch (error) {
          const errorMessage =
            (error as any)?.data?.message ||
            error.message ||
            "Login or profile fetch failed. Please try again.";
          toast.error(errorMessage);
          console.error("Login or profile fetch failed:", error);
        }
      },
    }),

    updateProfilePicter: builder.mutation({
      query: (formData) => ({
        url: "/update-profile-picture/",
        method: "POST",
        body: formData,
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
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/change-password/",
        method: "POST",
        body: passwords,
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
    updateProfile: builder.mutation({
      query: (user_data) => ({
        url: "/update-profile/",
        method: "PATCH",
        body: user_data,
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
  useGithubExchangeMutation,
  useUpdateProfilePicterMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useTelegramMutation,
} = authApi;

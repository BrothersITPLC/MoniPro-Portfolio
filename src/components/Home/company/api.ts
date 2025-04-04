import { createApi } from "@reduxjs/toolkit/query/react";
import { toast } from "sonner";
import { authApi } from "@/components/Auth/api";
import { loginState } from "@/components/Auth/AutSlice";
import { baseQueryWithReauth } from "@/lib/baseQuery";

export const VerficationApi = createApi({
  reducerPath: "VerficationApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Profile", "Infrastructures"],
  endpoints: (builder) => ({
    organizationInfo: builder.mutation({
      query: (data) => ({
        url: "/organization/",
        method: "POST",
        body: data,
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
        }
      },
    }),
    updateOrganizationPayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `organization/${id}/update-payment/`,
        method: "PATCH",
        body: data,
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
        }
      },
    }),
    privateInfo: builder.mutation({
      query: (data) => ({
        url: "/private/",
        method: "PUT",
        body: data,
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
  useOrganizationInfoMutation,
  useUpdateOrganizationPaymentMutation,
  usePrivateInfoMutation,
} = VerficationApi;

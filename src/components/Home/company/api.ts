import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../../BaseUrl";
import { toast } from "sonner";
import { authApi } from "@/components/Auth/api";
import { loginState } from "@/components/Auth/AutSlice";

export const VerficationApi = createApi({
  reducerPath: "VerficationApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  tagTypes: ["Profile", "Infrastructures"],
  endpoints: (builder) => ({
    organizationInfo: builder.mutation({
      query: (data) => ({
        url: "/organization/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Profile", "Infrastructures"],
    }),

    getProfile: builder.query({
      query: () => ({
        url: "/profile/",
        method: "GET",
      }),
      providesTags: ["Profile"],
    }),
    updateOrganizationPayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `organization/${id}/update-payment/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Profile", "Infrastructures"],
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
    privateInfo: builder.mutation({
      query: (data) => ({
        url: "/private/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Profile", "Infrastructures"],
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

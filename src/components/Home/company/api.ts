import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../../BaseUrl";

export const VerficationApi = createApi({
  reducerPath: "VerficationApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    organizationInfo: builder.mutation({
      query: (data) => ({
        url: "/organization/",
        method: "POST",
        body: data,
      }),
    }),
    updateOrganizationPayment: builder.mutation({
      query: ({ id, data }) => ({
        url: `organization/${id}/update-payment/`,
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useOrganizationInfoMutation,
  useUpdateOrganizationPaymentMutation,
} = VerficationApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../BaseUrl";

export const VerficationApi = createApi({
  reducerPath: "VerficationApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    OtpVerfication: builder.mutation({
      query: (credentials) => ({
        url: "/verify/",
        method: "POST",
        body: credentials,
      }),
    }),
    organizationInfo: builder.mutation({
      query: (data) => ({
        url: "/organization/",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useOtpVerficationMutation, useOrganizationInfoMutation } =
  VerficationApi;

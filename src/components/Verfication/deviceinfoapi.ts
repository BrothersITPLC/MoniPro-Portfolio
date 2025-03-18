import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../BaseUrl";

export const DeviceinfoApi = createApi({
  reducerPath: "DeviceinfoApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, compinfo: "include" }),
  endpoints: (builder) => ({
    OtpVerfication: builder.mutation({
      query: (compinfo) => ({
        url: "/info/",
        method: "POST",
        body: compinfo,
      }),
    }),
  }),
});

export const { useDeviceinfoMutation } = DeviceinfoApi;

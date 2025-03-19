import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../BaseUrl";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: "/register/",
        method: "POST",
        body: user,
      }),
    }),
    login: builder.mutation({
      query: (user) => ({
        url: "/login/",
        method: "POST",
        body: user,
      }),
    }),
    logout: builder.mutation({
      query: (_: void) => ({
        url: "/logout/",
        method: "POST",
      }),
    }),
    OtpVerfication: builder.mutation({
      query: (credentials) => ({
        url: "/verify/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useOtpVerficationMutation,
} = authApi;

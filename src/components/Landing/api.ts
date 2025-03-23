import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../BaseUrl";
import { PlanFeature, InfrastructerList } from "./types";

export const landingApi = createApi({
  reducerPath: "landingApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  tagTypes: ["Infrastructures"],

  endpoints: (builder) => ({
    getPlans: builder.query<PlanFeature[], void>({
      query: () => ({
        url: "/plans/",
        method: "GET",
      }),
      providesTags: ["Infrastructures"],
    }),
    getInfrastructureList: builder.query<InfrastructerList[], void>({
      query: () => ({
        url: "/infrastructures/",
        method: "GET",
      }),
      providesTags: ["Infrastructures"],
    }),
  }),
});

export const {
  useGetPlansQuery,
  useLazyGetPlansQuery,
  useGetInfrastructureListQuery,
} = landingApi;

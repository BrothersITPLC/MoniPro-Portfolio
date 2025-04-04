import { createApi } from "@reduxjs/toolkit/query/react";
import { PlanFeature, InfrastructerList } from "./types";
import { baseQueryWithReauth } from "@/lib/baseQuery";

export const landingApi = createApi({
  reducerPath: "landingApi",
  baseQuery: baseQueryWithReauth,
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

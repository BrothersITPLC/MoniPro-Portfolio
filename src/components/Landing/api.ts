import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../BaseUrl";

export interface Deduction {
  duration_id: number;
  duration: "quarterly" | "yearly";
  percentage: number;
}

export interface PlanFeature {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
  deduction: Deduction[];
}

export const landingApi = createApi({
  reducerPath: "landingApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    getPlans: builder.query<PlanFeature[], void>({
      query: () => ({
        url: "/plans/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPlansQuery, useLazyGetPlansQuery } = landingApi;

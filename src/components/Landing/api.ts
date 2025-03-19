import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../BaseUrl";

// Define types for the plan data
interface PlanFeature {
  id: number;
  name: string;
  price: number;
  description: string;
  features: string[];
  popular: boolean;
}

interface PlansData {
  monthly: PlanFeature[];
  yearly: PlanFeature[];
}

export const landingApi = createApi({
  reducerPath: "landingApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    getPlans: builder.query<PlansData, void>({
      query: () => ({
        url: "/plans/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetPlansQuery, useLazyGetPlansQuery } = landingApi;

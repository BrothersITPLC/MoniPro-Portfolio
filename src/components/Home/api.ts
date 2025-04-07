import { createApi } from "@reduxjs/toolkit/query/react";
import { InfrastructerList } from "./types";
import { baseQueryWithReauth } from "@/lib/baseQuery";

export const HomeApi = createApi({
  reducerPath: "HomeApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getInfrastructureList: builder.query<InfrastructerList[], void>({
      query: () => ({
        url: "/infrastructures/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetInfrastructureListQuery } = HomeApi;

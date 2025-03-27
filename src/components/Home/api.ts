import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../BaseUrl";
import { InfrastructerList } from "./types";

export const HomeApi = createApi({
  reducerPath: "HomeApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
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

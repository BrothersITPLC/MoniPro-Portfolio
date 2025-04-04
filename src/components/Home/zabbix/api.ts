import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "@/BaseUrl";

export const hostApi = createApi({
  reducerPath: "hostApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  refetchOnMountOrArgChange: 3,
  endpoints: (builder) => ({
    GetZabixHostes: builder.query({
      query: () => ({
        url: "/hosts/",
        method: "GET",
      }),
    }),
    getHostItems: builder.query({
      query: (hostids) => ({
        url: "/zabbix/host-items/",
        method: "POST",
        body: { hostids },
      }),
    }),
    zabbixGetRealTimeData: builder.query({
      query: (itemids) => ({
        url: "/zabbix/real-time-data/",
        method: "POST",
        body: { itemids },
      }),
    }),
  }),
});
export const {
  useGetZabixHostesQuery,
  useGetHostItemsQuery,
  useZabbixGetRealTimeDataQuery,
} = hostApi;

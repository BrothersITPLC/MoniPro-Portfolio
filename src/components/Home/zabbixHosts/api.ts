import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQuery";

export const hostApi = createApi({
  reducerPath: "hostApi",
  baseQuery: baseQueryWithReauth,
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
    createHost: builder.mutation({
      query: (HostData) => ({
        url: "/zabbix-hosts/",
        method: "POST",
        body: HostData,
      }),
    }),
  }),
});
export const {
  useGetZabixHostesQuery,
  useGetHostItemsQuery,
  useZabbixGetRealTimeDataQuery,
  useCreateHostMutation
} = hostApi;

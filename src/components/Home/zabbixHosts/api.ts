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
      query: (params) => ({
        url: `/host-items/?hostids=${params.hostids}&name=${
          params.name || "CPU"
        }`,
        method: "GET",
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
  useCreateHostMutation,
} = hostApi;

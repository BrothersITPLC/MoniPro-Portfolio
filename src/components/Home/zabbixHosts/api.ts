import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQuery";

export const hostApi = createApi({
  reducerPath: "hostApi",
  baseQuery: baseQueryWithReauth,
  refetchOnMountOrArgChange: 3,
  tagTypes: ["LocalHosts"],
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

    getLocalHosts: builder.query({
      query: () => ({
        url: "/local-hosts/",
        method: "GET",
      }),
      providesTags: ["LocalHosts"],
    }),

    createLocalHost: builder.mutation({
      query: (hostData) => ({
        url: "/local-hosts/",
        method: "POST",
        body: hostData,
      }),
      invalidatesTags: ["LocalHosts"],
    }),

    updateLocalHost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/local-hosts/${id}/`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["LocalHosts"],
    }),

    deleteLocalHost: builder.mutation({
      query: (id) => ({
        url: `/local-hosts/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["LocalHosts"],
    }),
  }),
});
export const {
  useGetZabixHostesQuery,
  useGetHostItemsQuery,
  useCreateHostMutation,
  useGetLocalHostsQuery,
  useCreateLocalHostMutation,
  useUpdateLocalHostMutation,
  useDeleteLocalHostMutation,
} = hostApi;

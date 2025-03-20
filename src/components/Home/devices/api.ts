import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "@/BaseUrl";

export const deviceApi = createApi({
  reducerPath: "deviceApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  tagTypes: ["VMs", "Networks"],
  endpoints: (builder) => ({
    getVms: builder.query({
      query: () => "/api/vms/",
      providesTags: ["VMs"],
    }),
    createVm: builder.mutation({
      query: (vmData) => ({
        url: "/api/vms/",
        method: "POST",
        body: vmData,
      }),
      invalidatesTags: ["VMs"],
    }),
    updateVm: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api/vms/${id}/`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["VMs"],
    }),
    deleteVm: builder.mutation({
      query: (id) => ({
        url: `/api/vms/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["VMs"],
    }),
    getNetworks: builder.query({
      query: () => "/api/networks/",
      providesTags: ["Networks"],
    }),
    createNetwork: builder.mutation({
      query: (networkData) => ({
        url: "/api/networks/",
        method: "POST",
        body: networkData,
      }),
      invalidatesTags: ["Networks"],
    }),
    updateNetwork: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/api/networks/${id}/`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Networks"],
    }),
    deleteNetwork: builder.mutation({
      query: (id) => ({
        url: `/api/networks/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Networks"],
    }),
  }),
});

export const {
  useGetVmsQuery,
  useCreateVmMutation,
  useUpdateVmMutation,
  useDeleteVmMutation,
  useGetNetworksQuery,
  useCreateNetworkMutation,
  useUpdateNetworkMutation,
  useDeleteNetworkMutation,
} = deviceApi;

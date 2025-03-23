import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "@/BaseUrl";

export const deviceApi = createApi({
  reducerPath: "deviceApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  tagTypes: ["VMs", "Networks", "Profile", "Infrastructures"],
  endpoints: (builder) => ({
    getVms: builder.query({
      query: () => "/vms/",
      providesTags: ["VMs"],
    }),
    createVm: builder.mutation({
      query: (vmData) => ({
        url: "/vms/",
        method: "POST",
        body: vmData,
      }),
      invalidatesTags: ["VMs", "Profile", "Infrastructures"],
    }),
    updateVm: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/vms/${id}/`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["VMs", "Profile", "Infrastructures"],
    }),
    deleteVm: builder.mutation({
      query: (id) => ({
        url: `/vms/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["VMs", "Profile", "Infrastructures"],
    }),
    getNetworks: builder.query({
      query: () => "/networks/",
      providesTags: ["Networks"],
    }),
    createNetwork: builder.mutation({
      query: (networkData) => ({
        url: "/networks/",
        method: "POST",
        body: networkData,
      }),
      invalidatesTags: ["Networks", "Profile", "Infrastructures"],
    }),
    updateNetwork: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/networks/${id}/`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: ["Networks", "Profile", "Infrastructures"],
    }),
    deleteNetwork: builder.mutation({
      query: (id) => ({
        url: `/networks/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Networks", "Profile", "Infrastructures"],
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

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQuery";

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: (id) => ({
        url: `/users/by-organization/?organization_id=${id}`,
        method: "GET",
      }),
      providesTags: ["Team"],
    }),
    creatTeam: builder.mutation({
      query: (user) => ({
        url: "/users/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const { useGetTeamQuery, useCreatTeamMutation } = teamApi;

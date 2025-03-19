import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BaseUrl } from "../../../../BaseUrl";

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: fetchBaseQuery({ baseUrl: BaseUrl, credentials: "include" }),
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: (id) => ({
        url: `/users/by-organization/?organization_id=${id}`,
        method: "GET",
      }),
    }),
    creatTeam: builder.mutation({
      query: (user) => ({
        url: "/users/",
        method: "POST",
        body: user,
      }),
    }),
  }),
});

export const { useGetTeamQuery, useCreatTeamMutation } = teamApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQuery";
import { TeamMember } from "./teamSlice";

// Define the create user request type based on TeamMember fields
export interface CreateTeamUserRequest {
  email: string;
  first_name: string;
  last_name: string;
  is_admin: boolean;
  phone: string;
}

export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    // Get team members
    getTeamMembers: builder.query<TeamMember[], void>({
      query: () => "/get-team-users/",
      providesTags: ["Team"],
    }),
    createTeamUser: builder.mutation<TeamMember, CreateTeamUserRequest>({
      query: (body) => ({
        url: "/add-team-user/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Team"],
    }),

    activeDeactiveTeamUser: builder.mutation<
      TeamMember,
      { id: number; is_active: boolean }
    >({
      query: (body) => ({
        url: "/set-active/",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

export const {
  useGetTeamMembersQuery,
  useCreateTeamUserMutation,
  useActiveDeactiveTeamUserMutation,
} = teamApi;

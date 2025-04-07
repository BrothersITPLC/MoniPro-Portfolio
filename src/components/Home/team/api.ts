import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "@/lib/baseQuery";
import { TeamMember } from "./teamSlice";
export const teamApi = createApi({
  reducerPath: "teamApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    // Get team members
    getTeamMembers: builder.query<TeamMember[], void>({
      query: () => "/team",
      providesTags: ["Team"],
    }),

    // Create team member
    createTeam: builder.mutation<TeamMember, void>({
      query: (body) => ({
        url: "/team",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Team"],
    }),

    // Update team member
    updateTeamMember: builder.mutation<
      TeamMember,
      Partial<TeamMember> & { id: number }
    >({
      query: ({ id, ...patch }) => ({
        url: `/team/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Team"],
    }),

    // Delete team member
    deleteTeamMember: builder.mutation<void, number>({
      query: (id) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Team"],
    }),
  }),
});

// Export hooks for usage in components
export const {
  useGetTeamMembersQuery,
  useCreateTeamMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = teamApi;

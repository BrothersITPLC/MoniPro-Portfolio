import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

// Define types for API requests and responses
interface CreateTeamRequest {
  email: string
  first_name: string
  last_name: string
  organization: string
  username?: string
}

interface TeamMember {
  id: number
  email: string
  first_name: string
  last_name: string
  organization: string
}

// Create the API with endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers) => {
      // Get token from localStorage or other auth state
      const token = localStorage.getItem("token")
      if (token) {
        headers.set("authorization", `Bearer ${token}`)
      }
      return headers
    },
  }),
  tagTypes: ["Team"],
  endpoints: (builder) => ({
    // Get team members
    getTeamMembers: builder.query<TeamMember[], void>({
      query: () => "/team",
      providesTags: ["Team"],
    }),

    // Create team member
    createTeam: builder.mutation<TeamMember, CreateTeamRequest>({
      query: (body) => ({
        url: "/team",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Team"],
    }),

    // Update team member
    updateTeamMember: builder.mutation<TeamMember, Partial<TeamMember> & { id: number }>({
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
})

// Export hooks for usage in components
export const {
  useGetTeamMembersQuery,
  useCreateTeamMutation,
  useUpdateTeamMemberMutation,
  useDeleteTeamMemberMutation,
} = api


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the type for a team member
export interface TeamMember {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_admin: boolean;
  is_active: boolean;
  phone: string;
}

// Define the state structure
interface TeamState {
  members: TeamMember[];
}

// Initial state
const initialState: TeamState = {
  members: [],
};

// Create the slice
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    setTeamMembers: (state, action: PayloadAction<TeamMember[]>) => {
      state.members = action.payload;
    },
  },
});

// Export actions and reducer
export const { setTeamMembers } = teamSlice.actions;
export default teamSlice.reducer;

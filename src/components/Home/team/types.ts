import { TeamMember } from "./teamSlice";

// User type for the UI components
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  status: boolean;
  isAdmin: boolean;
  phone: string;
}

// Form data for creating/updating users
export interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  username?: string;
  password?: string;
  isAdmin: boolean;
  phone: string;
}

// Convert TeamMember to User for UI
export const teamMemberToUser = (member: TeamMember): User => ({
  id: String(member.id),
  email: member.email,
  firstName: member.first_name,
  lastName: member.last_name,
  status: member.is_active,
  isAdmin: member.is_admin,
  phone: member.phone || "",
});
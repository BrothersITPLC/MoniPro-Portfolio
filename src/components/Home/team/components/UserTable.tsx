import { useState } from "react";
import {
  PlusCircle,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Edit,
  Trash2,
  Phone,
  ShieldCheck,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import {
  useGetTeamMembersQuery,
  useCreateTeamUserMutation,
  useActiveDeactiveTeamUserMutation,
} from "@/components/Home/team/api";
import { APIError } from "@/app/global";
import { UserForm } from "./UserForm";
import { TeamMember } from "../teamSlice";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import * as z from "zod";

// Form schema matches the required fields for user creation
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  is_admin: z.boolean().default(false),
});

function UserTable() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<TeamMember | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: teamMembersResponse = { status: "", data: [] },
    isLoading,
    refetch,
  } = useGetTeamMembersQuery();

  // Extract team members from the correct response structure
  const teamMembers = teamMembersResponse?.data || [];

  const [createTeam, { isLoading: isCreating }] = useCreateTeamUserMutation();
  const [activeDeactiveUser] = useActiveDeactiveTeamUserMutation();

  const toggleRow = (userId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(userId)) {
      newExpandedRows.delete(userId);
    } else {
      newExpandedRows.add(userId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleAddUser = async (data: z.infer<typeof formSchema>) => {
    try {
      await createTeam(data).unwrap();
      refetch();
      toast.success("User created successfully");
      setIsDialogOpen(false);
      setSelectedUser(null);
    } catch (error) {
      const ererror = error as APIError;
      const errorMessage =
        ererror?.data?.message ||
        `Failed to ${selectedUser ? "update" : "create"} user`;
      toast.error(errorMessage);
    }
  };

  const handleStatusChange = async (userId: number, currentStatus: boolean) => {
    try {
      await activeDeactiveUser({
        id: userId,
        is_active: !currentStatus,
      }).unwrap();

      refetch();
      toast.success(
        `User status changed to ${!currentStatus ? "active" : "inactive"}`
      );
    } catch (error) {
      toast.error("Failed to update user status");
      console.error("Failed to update user status:", error);
    }
  };

  return (
    <div className="space-y-6 p-6 rounded-xl shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
        </div>
        <Button
          onClick={() => {
            setSelectedUser(null);
            setIsDialogOpen(true);
          }}
          disabled={isCreating}
          className="bg-[var(--primary)] hover:bg-[var(--secondary)] text-white"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-[var(--light)]">
            <TableRow>
              <TableHead className="w-[50px] text-center"></TableHead>
              <TableHead className="font-medium text-gray-700">Email</TableHead>
              <TableHead className="font-medium text-gray-700">
                First Name
              </TableHead>
              <TableHead className="font-medium text-gray-700">
                Last Name
              </TableHead>
              <TableHead className="font-medium text-gray-700">Phone</TableHead>
              <TableHead className="font-medium text-gray-700">Role</TableHead>
              <TableHead className="font-medium text-gray-700">
                Status
              </TableHead>
              <TableHead className="font-medium text-gray-700 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <td colSpan={8} className="text-center py-8 text-gray-500">
                  Loading team members...
                </td>
              </TableRow>
            ) : teamMembers.length === 0 ? (
              <TableRow>
                <td colSpan={8} className="text-center py-8 text-gray-500">
                  No team members found. Add your first user to get started.
                </td>
              </TableRow>
            ) : (
              teamMembers.map((member, index) => (
                <UserTableRow
                  key={member.id}
                  user={member}
                  isExpanded={expandedRows.has(String(member.id))}
                  onToggleExpand={(id) => toggleRow(id)}
                  onEdit={(user) => {
                    setSelectedUser(user);
                    setIsDialogOpen(true);
                  }}
                  onStatusChange={handleStatusChange}
                  isEven={index % 2 === 0}
                />
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* User Form Dialog */}
      <UserForm
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        user={selectedUser}
        onSubmit={handleAddUser}
        isEditing={!!selectedUser}
      />
    </div>
  );
}

function UserTableRow({
  user,
  isExpanded,
  onToggleExpand,
  onEdit,
  onStatusChange,
  isEven,
}: {
  user: TeamMember;
  isExpanded: boolean;
  onToggleExpand: (userId: string) => void;
  onEdit: (user: TeamMember) => void;
  onStatusChange: (userId: number, currentStatus: boolean) => void;
  isEven: boolean;
}) {
  return (
    <>
      <TableRow className={isEven ? "bg-white" : "bg-gray-50"}>
        <td className="text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpand(String(user.id))}
            className="h-8 w-8 p-0 text-gray-500"
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </td>
        <td className="font-medium">{user.email}</td>
        <td>{user.first_name}</td>
        <td>{user.last_name}</td>
        <td>{user.phone}</td>
        <td>
          <Badge
            className={
              user.is_admin
                ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                : "bg-blue-100 text-blue-800 hover:bg-blue-100"
            }
          >
            {user.is_admin ? (
              <>
                <ShieldCheck className="mr-1 h-3 w-3" /> Admin
              </>
            ) : (
              "User"
            )}
          </Badge>
        </td>
        <td>
          <Badge
            className={
              user.is_active
                ? "bg-green-100 text-green-800 hover:bg-green-100 cursor-pointer"
                : "bg-red-100 text-red-800 hover:bg-red-100 cursor-pointer"
            }
            onClick={() => onStatusChange(user.id, user.is_active)}
          >
            {user.is_active ? (
              <>
                <Check className="mr-1 h-3 w-3" /> Active
              </>
            ) : (
              <>
                <X className="mr-1 h-3 w-3" /> Inactive
              </>
            )}
          </Badge>
        </td>
        <td className="text-right">
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(user)}
              className="h-8 border-gray-200 text-gray-700 hover:bg-[var(--light)] hover:text-[var(--secondary)] hover:border-[var(--acent)]"
            >
              <Edit className="h-3.5 w-3.5" />
              <span className="sr-only">Edit</span>
            </Button>
          </div>
        </td>
      </TableRow>
      {isExpanded && (
        <TableRow
          className={isEven ? "bg-[var(--light)]/30" : "bg-[var(--light)]/50"}
        >
          <td colSpan={8} className="p-4">
            <div className="rounded-lg bg-white p-4 shadow-sm border border-[var(--acent)]">
              <h4 className="font-medium text-[var(--secondary)] mb-3">
                User Details
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700">
                    Contact Information
                  </h5>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {user.phone || "No phone number"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-gray-500" />
                    <span className="text-sm">
                      {user.is_admin ? "Administrator" : "Regular User"}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700">
                    Account Status
                  </h5>
                  <div className="flex items-center gap-2">
                    <div
                      className={`h-2.5 w-2.5 rounded-full ${
                        user.is_active ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>
                    <span className="text-sm">
                      {user.is_active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-[var(--secondary)] border-[var(--acent)] hover:bg-[var(--light)] hover:border-[var(--acent)]"
                  onClick={() => onEdit(user)}
                >
                  Edit User
                </Button>
              </div>
            </div>
          </td>
        </TableRow>
      )}
    </>
  );
}

export default UserTable;

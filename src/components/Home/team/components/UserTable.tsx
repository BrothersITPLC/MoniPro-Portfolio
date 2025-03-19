import { useState } from "react";
import { PlusCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useCreatTeamMutation } from "../api";
import { UserTableRow } from "./UserTableRow";
import { AddEditUserDialog } from "./AddEditUserDialog";
import { User, UserFormData } from "../types";

function UserTable() {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const teamMembers = useSelector((state: RootState) => state.team.members);
  const [createTeam, { isLoading: isCreating }] = useCreatTeamMutation();

  const toggleRow = (userId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(userId)) {
      newExpandedRows.delete(userId);
    } else {
      newExpandedRows.add(userId);
    }
    setExpandedRows(newExpandedRows);
  };

  const handleAddUser = async (data: UserFormData) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData") || "{}");
      const organizationId = userData?.user_id;

      if (!organizationId) {
        console.error("Organization ID not found");
        return;
      }

      await createTeam({
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        organization: organizationId,
      }).unwrap();

      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to create user:", error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">User Management</h1>
        <Button onClick={() => setIsDialogOpen(true)} disabled={isCreating}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>Email</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {teamMembers.map((member) => (
              <UserTableRow
                key={member.id}
                user={{
                  id: String(member.id),
                  email: member.email,
                  firstName: member.first_name,
                  lastName: member.last_name,
                  status: true,
                  permissions: {
                    addVM: false,
                    addUser: false,
                    mediaTypes: {
                      email: false,
                      telegram: false,
                    },
                    controlVM: [],
                  },
                }}
                isExpanded={expandedRows.has(String(member.id))}
                onToggleExpand={toggleRow}
                onEdit={(user) => {
                  setSelectedUser(user);
                  setIsDialogOpen(true);
                }}
                onDelete={(userId) => {
                  // Implement delete functionality
                }}
                onStatusChange={(userId) => {
                  // Implement status change functionality
                }}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      <AddEditUserDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        user={selectedUser}
        onSubmit={handleAddUser}
      />
    </div>
  );
}
export default UserTable;

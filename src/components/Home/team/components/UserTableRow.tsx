import { ChevronDown, ChevronUp, Edit2, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { TableCell, TableRow } from "@/components/ui/table";
import { User } from "../types";
import { UserPermissions } from "./UserPermissions";
import { UserVMControl } from "./UserVMControl";
import { UserMediaTypes } from "./UserMediaTypes";

interface UserTableRowProps {
  user: User;
  isExpanded: boolean;
  onToggleExpand: (userId: string) => void;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  onStatusChange: (userId: string) => void;
}

export function UserTableRow({
  user,
  isExpanded,
  onToggleExpand,
  onEdit,
  onDelete,
  onStatusChange,
}: UserTableRowProps) {
  return (
    <>
      <TableRow>
        <TableCell>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleExpand(user.id)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.firstName}</TableCell>
        <TableCell>{user.lastName}</TableCell>
        <TableCell>
          <Checkbox
            checked={user.status}
            onCheckedChange={() => onStatusChange(user.id)}
          />
        </TableCell>
        <TableCell>
          <div className="flex space-x-2">
            <Button variant="ghost" size="sm" onClick={() => onEdit(user)}>
              <Edit2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => onDelete(user.id)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </TableCell>
      </TableRow>
      {isExpanded && (
        <TableRow>
          <TableCell colSpan={6} className="p-4">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-6">
                <UserVMControl userId={user.id} user={user} />
                <UserPermissions user={user} />
              </div>
              <UserMediaTypes user={user} />
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
}

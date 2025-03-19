import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "../../../team/types";

interface UserPermissionsProps {
  user: User;
  onPermissionChange?: (
    permission: keyof User["permissions"],
    value: boolean
  ) => void;
}

export function UserPermissions({
  user,
  onPermissionChange,
}: UserPermissionsProps) {
  return (
    <Card>
      <CardHeader>
        <h4 className="text-lg font-semibold">Permissions</h4>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="addVM"
            checked={user.permissions.addVM}
            onCheckedChange={(checked) =>
              onPermissionChange?.("addVM", checked as boolean)
            }
          />
          <Label htmlFor="addVM">Add VM</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="addUser"
            checked={user.permissions.addUser}
            onCheckedChange={(checked) =>
              onPermissionChange?.("addUser", checked as boolean)
            }
          />
          <Label htmlFor="addUser">Add User</Label>
        </div>
      </CardContent>
    </Card>
  );
}

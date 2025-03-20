import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { User } from "../types";

interface UserMediaTypesProps {
  user: User;
  onMediaTypeChange?: (
    mediaType: keyof User["permissions"]["mediaTypes"],
    value: boolean
  ) => void;
}

export function UserMediaTypes({
  user,
  onMediaTypeChange,
}: UserMediaTypesProps) {
  return (
    <Card>
      <CardHeader>
        <h4 className="text-lg font-semibold">Media Types</h4>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="email"
            checked={user.permissions.mediaTypes.email}
            onCheckedChange={(checked) =>
              onMediaTypeChange?.("email", checked as boolean)
            }
          />
          <Label htmlFor="email">Email</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="telegram"
            checked={user.permissions.mediaTypes.telegram}
            onCheckedChange={(checked) =>
              onMediaTypeChange?.("telegram", checked as boolean)
            }
          />
          <Label htmlFor="telegram">Telegram</Label>
        </div>
      </CardContent>
    </Card>
  );
}

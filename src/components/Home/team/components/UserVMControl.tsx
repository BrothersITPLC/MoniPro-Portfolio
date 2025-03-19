import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { User } from "../../../team/types";

interface UserVMControlProps {
  user: User;
  userId: string;
  onAddVM?: (userId: string, vmName: string) => void;
  onRemoveVM?: (userId: string, vmId: string) => void;
}

export function UserVMControl({
  user,
  userId,
  onAddVM,
  onRemoveVM,
}: UserVMControlProps) {
  const [newVM, setNewVM] = useState({ name: "", type: "Process" as const });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold">Control VMs</h4>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Add new VM..."
              value={newVM.name}
              onChange={(e) => setNewVM({ ...newVM, name: e.target.value })}
              className="w-[200px]"
            />
            <Button
              size="sm"
              onClick={() => {
                if (newVM.name) {
                  onAddVM?.(userId, newVM.name);
                  setNewVM({ name: "", type: "Process" });
                }
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add VM
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {user.permissions.controlVM.map((vm) => (
            <div
              key={vm.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <span className="text-xs font-medium">VM</span>
                </div>
                <div>
                  <span className="font-medium">{vm.name}</span>
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({vm.type} VM)
                  </span>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveVM?.(userId, vm.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {user.permissions.controlVM.length === 0 && (
            <div className="rounded-lg border border-dashed p-4 text-center text-sm text-muted-foreground">
              No VMs added yet
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

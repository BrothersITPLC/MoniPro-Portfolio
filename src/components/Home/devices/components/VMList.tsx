import { VM } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Server } from "lucide-react";

interface VMListProps {
  vms: VM[];
  onEdit: (vm: VM) => void;
  onDelete: (id: string) => void;
}

export function VMList({ vms, onEdit, onDelete }: VMListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {vms.length === 0 ? (
        <div className="col-span-full text-center p-8 border border-dashed rounded-lg">
          <Server className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-lg font-medium">No VMs Added</h3>
          <p className="mt-1 text-sm text-gray-500">
            Add a virtual machine to start monitoring
          </p>
        </div>
      ) : (
        vms.map((vm) => (
          <Card key={vm.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{vm.domainName || vm.ipAddress}</CardTitle>
                  <CardDescription>{vm.ipAddress}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="text-sm">
                  <span className="text-muted-foreground">Username:</span>{" "}
                  {vm.username}
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Network Type:</span>{" "}
                  {vm.networkType}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-2">
              <Button variant="outline" size="sm" onClick={() => onEdit(vm)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onDelete(vm.id)}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}

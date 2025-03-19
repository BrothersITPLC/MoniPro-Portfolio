import { VMFormData } from "../types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Server } from "lucide-react";

interface VMListProps {
  vms: VMFormData[];
  onEdit: (vm: VMFormData) => void;
  onDelete: (id: string) => void;
}

export function VMList({ vms, onEdit, onDelete }: VMListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500";
      case "stopped":
        return "bg-gray-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-blue-500";
    }
  };

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
                <Badge className={getStatusColor(vm.status)}>{vm.status}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-sm">
                    <span className="text-muted-foreground">CPU:</span>{" "}
                    {vm.resources.cpu}%
                  </div>
                  <div className="text-sm">
                    <span className="text-muted-foreground">Memory:</span>{" "}
                    {vm.resources.memory}%
                  </div>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Storage:</span>{" "}
                  {vm.resources.storage}%
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Network:</span>{" "}
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
                onClick={() => onDelete(vm.id!)}
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

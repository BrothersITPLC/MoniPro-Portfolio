import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Server, Network, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useGetMonitoringCategoryQuery } from "@/components/Home/zabbixHosts/api";

import { ItemSelection } from "./ItemSelection";

interface DeviceListProps {
  devices: any[];
  type: "vm" | "network";
  isLoading: boolean;
  onEdit: (device: any) => void;
  onDelete: (deviceId: string) => void;
}

type SingleMoniteringType = {
  id: number;
  title: string;
  description: string;
  long_description: string;
};

export function DeviceList({
  devices,
  type,
  isLoading,
  onEdit,
  onDelete,
}: DeviceListProps) {
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);

  const [SelectedMonitoringType, setSelectedMonitoringTypeState] =
    useState<SingleMoniteringType[]>();

  const getIcon = (deviceType: string) => {
    if (type === "network") {
      switch (deviceType) {
        case "router":
          return "🌐";
        case "switch":
          return "🔄";
        case "firewall":
          return "🔒";
        case "loadbalancer":
          return "⚖️";
        default:
          return "📱";
      }
    }
    return null;
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading devices...</div>;
  }

  if (devices.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        {type === "vm" ? (
          <Server className="mx-auto h-12 w-12 text-gray-400" />
        ) : (
          <Network className="mx-auto h-12 w-12 text-gray-400" />
        )}
        <h3 className="mt-2 text-lg font-medium">
          No {type === "vm" ? "Virtual Machines" : "Network Devices"}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Add a device to start monitoring
        </p>
      </div>
    );
  }

  const {
    data: monitoringCategoryResponse,
    isLoading: monitoringCategoryIsLoading,
    isError: monitoringCategoryIsError,
  } = useGetMonitoringCategoryQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const monitoringCategory =
    monitoringCategoryResponse?.status === "success"
      ? monitoringCategoryResponse.data
      : [];

  const handleMonitoringType = (id: number) => {
    setIsSecondDialogOpen(true);
    // Use the local monitoringCategory array if API response is not available
    const selectedCategory =
      monitoringCategoryResponse?.status === "success"
        ? monitoringCategoryResponse.data.filter(
            (category: SingleMoniteringType) => category.id === id
          )
        : monitoringCategory.filter(
            (category: SingleMoniteringType) => category.id === id
          );

    setSelectedMonitoringTypeState(selectedCategory);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {devices.map((device) => (
        <Card key={device.id}>
          <Dialog>
            <DialogTrigger>
              <CardHeader className="cursor-pointer">
                <CardTitle>
                  {type === "network" && getIcon(device.network_device_type)}
                  {device.host}
                </CardTitle>
                <CardDescription>{device.ip || device.dns}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {type === "network" && device.network_device_type && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        Device Type:
                      </span>{" "}
                      {device.network_device_type}
                    </div>
                  )}
                </div>
              </CardContent>
            </DialogTrigger>
            <DialogContent className=" min-w-1/2 max-w-3/4">
              <DialogHeader>
                <DialogTitle>
                  please choose the type of monitering you want for your device
                </DialogTitle>
                <DialogDescription>
                  You can choose between CPU, Memory, Disk, Network and Load
                  Average
                </DialogDescription>
              </DialogHeader>
              <div className="my-4 p-4 flex flex-row gap-4">
                <div className="">
                  {monitoringCategoryIsLoading ? (
                    <p>Loading monitoring categories...</p>
                  ) : monitoringCategoryIsError ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Error loading monitoring categories. Please try again
                        later.
                      </AlertDescription>
                    </Alert>
                  ) : monitoringCategory.length === 0 ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        No monitoring categories available.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    monitoringCategory.map((category: SingleMoniteringType) => (
                      <div
                        key={category.id}
                        className="mb-4 flex flex-col gap-2"
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                className="cursor-pointer"
                                onClick={() =>
                                  handleMonitoringType(category.id)
                                }
                              >
                                {category.title}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{category.description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))
                  )}
                </div>

                <div className="w-2 h-[100%] bg-black rounded-lg"></div>

                {isSecondDialogOpen && (
                  <div className="">
                    <ItemSelection moniteringTypes={SelectedMonitoringType} />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button className="cursor-pointer">Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(device)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(device.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

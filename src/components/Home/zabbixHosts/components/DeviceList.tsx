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

import {
  useGetMonitoringCategoryAndTemplatesQuery,
  usePostHostCreationMutation,
} from "@/components/Home/zabbixHosts/api";
import { ItemSelection } from "@/components/Home/zabbixHosts/components/ItemSelection";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface DeviceListProps {
  devices: any[];
  type: "vm" | "network";
  isLoading: boolean;
  onEdit: (device: any) => void;
  onDelete: (deviceId: string) => void;
}

type SingleMoniteringType = {
  id: number;
  name: string;
  category_description: string;
  category_long_description: string;
  template: Array<{
    name: string;
    template_description: string;
    template_id: number;
  }>;
};

export function DeviceList({
  devices,
  type,
  isLoading,
  onEdit,
  onDelete,
}: DeviceListProps) {
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [ispostHostCreationSuccess, setIsPostHostCreationSuccess] =
    useState(false);
  const [postHostCreationMessage, setPostHostCreationMessage] = useState("");
  const [SelectedMonitoringType, setSelectedMonitoringTypeState] = useState<
    SingleMoniteringType[]
  >([]);
  const [localHostId, setLocalHostId] = useState(0);
  const {
    data: monitoringCategoryResponse,
    isLoading: monitoringCategoryIsLoading,
    isError: monitoringCategoryIsError,
  } = useGetMonitoringCategoryAndTemplatesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [postHostCreation, { isLoading: isPostHostCreationLoading }] =
    usePostHostCreationMutation();
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
    return (
      <div className="text-center py-8 text-foreground">Loading devices...</div>
    );
  }

  if (devices.length === 0) {
    return (
      <div className="text-center p-8 border border-border rounded-lg bg-background">
        {type === "vm" ? (
          <Server className="mx-auto h-12 w-12 text-muted-foreground" />
        ) : (
          <Network className="mx-auto h-12 w-12 text-muted-foreground" />
        )}
        <h3 className="mt-2 text-lg font-medium text-foreground">
          No {type === "vm" ? "Virtual Machines" : "Network Devices"}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          Add a device to start monitoring
        </p>
      </div>
    );
  }

  const monitoringCategory =
    monitoringCategoryResponse?.status === "success"
      ? monitoringCategoryResponse.data
      : [];

  const handleMonitoringType = (id: number, local_host_id: number) => {
    setIsPostHostCreationSuccess(false);

    setIsSecondDialogOpen(true);
    setLocalHostId(local_host_id);
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

  const handlePostHostCreation = async (data: any) => {
    try {
      setPostHostCreationMessage(
        "post hos creation workflow have started, if it is scucessfull you will se the result on Devices tab shortly"
      );
      const response = await postHostCreation(data).unwrap();
      if (response.status === "success") {
        setIsPostHostCreationSuccess(true);
        toast.success(
          response.message || "Post Host creation strated successfully"
        );
      }
    } catch (error: any) {
      setPostHostCreationMessage(
        "post hos creation workflow have failed,you can retray by selecting a catagory again"
      );
      setIsPostHostCreationSuccess(true);
      toast.error(
        error.data?.message || error.error || "Failed to create device"
      );
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {devices.map((device) => (
        <Card
          key={device.id}
          className="bg-card text-card-foreground border-border"
        >
          <Dialog>
            <DialogTrigger>
              <CardHeader className="cursor-pointer">
                <CardTitle className="text-foreground">
                  {type === "network" && getIcon(device.network_device_type)}
                  {device.host}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {device.ip || device.dns}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {type === "network" && device.network_device_type && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        Device Type:
                      </span>{" "}
                      <span className="text-foreground">
                        {device.network_device_type}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </DialogTrigger>
            <DialogContent className="min-w-1/2 max-w-3/4 bg-background border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground">
                  Please choose the type of monitoring you want for your device
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  You can choose between CPU, Memory, Disk, Network and Load
                  Average
                </DialogDescription>
              </DialogHeader>
              <div className="my-4 p-4 flex flex-row gap-4">
                <div className="">
                  {monitoringCategoryIsLoading ? (
                    <p className="text-muted-foreground">
                      Loading monitoring categories...
                    </p>
                  ) : monitoringCategoryIsError ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-destructive-foreground">
                        Error loading monitoring categories. Please try again
                        later.
                      </AlertDescription>
                    </Alert>
                  ) : monitoringCategory.length === 0 ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-foreground">
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
                                className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                                onClick={() =>
                                  handleMonitoringType(category.id, device.id)
                                }
                              >
                                {category.name}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-popover text-popover-foreground border-border">
                              <p>{category.category_description}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    ))
                  )}
                </div>
                <div className="w-2 h-[100%] bg-border rounded-lg"></div>
                {isPostHostCreationLoading ? (
                  <Spinner className="block mx-auto h-12 w-12 text-primary" />
                ) : ispostHostCreationSuccess ? (
                  <p className="text-foreground">{postHostCreationMessage}</p>
                ) : (
                  isSecondDialogOpen &&
                  SelectedMonitoringType.length > 0 && (
                    <div className="">
                      <ItemSelection
                        handlePostHostCreation={handlePostHostCreation}
                        moniteringTypes={SelectedMonitoringType}
                        local_host_id={localHostId}
                      />
                    </div>
                  )
                )}
              </div>
            </DialogContent>
          </Dialog>

          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(device)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/80"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(device.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
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

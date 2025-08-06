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
import { Badge } from "@/components/ui/badge";

import {
  usePostHostCreationMutation,
  useGetTemplatesQuery,
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
  isHosted: boolean;
}

type SingleTemplateGroup = {
  id: number;
  template_group_name: string;
  template_group_discription: string;
  template_group_id: string;
  templates: Array<{
    id: number;
    template_name: string;
    template_description: string;
    template_id: string;
    template_group: number;
  }>;
};

export function DeviceList({
  devices,
  type,
  isLoading,
  onEdit,
  onDelete,
  isHosted,
}: DeviceListProps) {
  const [isSecondDialogOpen, setIsSecondDialogOpen] = useState(false);
  const [ispostHostCreationSuccess, setIsPostHostCreationSuccess] =
    useState(false);
  const [postHostCreationMessage, setPostHostCreationMessage] = useState("");
  const [selectedTemplateGroup, setSelectedTemplateGroup] =
    useState<SingleTemplateGroup | null>(null);
  const [localHostId, setLocalHostId] = useState(0);

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
      <div className="flex items-center justify-center py-12">
        <Spinner className="h-8 w-8 text-primary" />
        <span className="ml-3 text-foreground">Loading devices...</span>
      </div>
    );
  }

  if (devices.length === 0) {
    return (
      <div className="text-center p-8 border border-border rounded-lg bg-background/50 backdrop-blur-sm shadow-sm">
        {type === "vm" ? (
          <Server className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        ) : (
          <Network className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
        )}
        <h3 className="mt-4 text-lg font-medium text-foreground">
          No {type === "vm" ? "Virtual Machines" : "Network Devices"}
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          {isHosted
            ? "No hosted devices found."
            : "Add a device to start monitoring"}
        </p>
        {!isHosted && (
          <Button
            className="mt-4 bg-primary/90 hover:bg-primary text-primary-foreground"
            size="sm"
            onClick={() => {
              // Add device logic
            }}
          >
            Add Device
          </Button>
        )}
      </div>
    );
  }

  const handleMonitoringType = (
    templateGroup: SingleTemplateGroup,
    local_host_id: number
  ) => {
    setIsPostHostCreationSuccess(false);
    setSelectedTemplateGroup(templateGroup);
    setIsSecondDialogOpen(true);
    setLocalHostId(local_host_id);
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

  const {
    data: tempGroupData,
    isLoading: tempGroupDataIsLoading,
    isError: tempGroupDataIsError,
  } = useGetTemplatesQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const templateGroupData =
    tempGroupData?.status === "success" ? tempGroupData.data : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {devices.map((device) => (
        <Card
          key={device.id}
          className="bg-card text-card-foreground border-border overflow-hidden transition-all duration-200 hover:shadow-md group"
        >
          <Dialog>
            <DialogTrigger>
              <CardHeader className="cursor-pointer pb-2 group-hover:bg-muted/30 transition-colors duration-200">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-foreground text-lg font-medium">
                    {type === "network" && getIcon(device.network_device_type)}
                    {device.host}
                  </CardTitle>
                  {isHosted && (
                    <Badge
                      variant="outline"
                      className="bg-primary/10 text-primary text-xs"
                    >
                      Hosted
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-muted-foreground mt-1">
                  {device.ip || device.dns}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-2">
                  {type === "network" && device.network_device_type && (
                    <div className="text-sm">
                      <span className="text-muted-foreground">
                        Device Type:
                      </span>{" "}
                      <span className="text-foreground font-medium">
                        {device.network_device_type}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </DialogTrigger>
            <DialogContent className="min-w-1/2 max-w-3/4 bg-background border-border">
              <DialogHeader>
                <DialogTitle className="text-foreground flex items-center gap-2">
                  {type === "vm" ? (
                    <Server className="h-5 w-5 text-primary" />
                  ) : (
                    <Network className="h-5 w-5 text-primary" />
                  )}
                  <span>Choose monitoring type for {device.host}</span>
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  Select the monitoring categories you want to apply to this
                  device
                </DialogDescription>
              </DialogHeader>
              <div className="my-4 p-4 flex flex-row gap-4 bg-muted/30 rounded-lg">
                <div className="">
                  {tempGroupDataIsLoading ? (
                    <p className="text-muted-foreground">
                      Loading monitoring categories...
                    </p>
                  ) : tempGroupDataIsError ? (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-destructive-foreground">
                        Error loading monitoring categories. Please try again
                        later.
                      </AlertDescription>
                    </Alert>
                  ) : templateGroupData.length === 0 ? (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="text-foreground">
                        No monitoring categories available.
                      </AlertDescription>
                    </Alert>
                  ) : (
                    templateGroupData.map(
                      (template_group: SingleTemplateGroup) => (
                        <div
                          key={template_group.id}
                          className="mb-4 flex flex-col gap-2"
                        >
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  className="cursor-pointer bg-primary text-primary-foreground hover:bg-primary/90"
                                  onClick={() =>
                                    handleMonitoringType(
                                      template_group,
                                      device.id
                                    )
                                  }
                                >
                                  {template_group.template_group_name}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent className="bg-popover text-popover-foreground border-border">
                                <p>
                                  {template_group.template_group_discription}
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      )
                    )
                  )}
                </div>
                <div className="w-2 h-[100%] bg-border rounded-lg"></div>
                {isPostHostCreationLoading ? (
                  <Spinner className="block mx-auto h-12 w-12 text-primary" />
                ) : ispostHostCreationSuccess ? (
                  <p className="text-foreground">{postHostCreationMessage}</p>
                ) : (
                  isSecondDialogOpen &&
                  selectedTemplateGroup && (
                    <div className="">
                      <ItemSelection
                        handlePostHostCreation={handlePostHostCreation}
                        selectedTemplateGroup={selectedTemplateGroup}
                        local_host_id={localHostId}
                      />
                    </div>
                  )
                )}
              </div>
            </DialogContent>
          </Dialog>

          <CardFooter className="flex justify-end gap-2 pt-2 pb-3 bg-muted/10">
            {!isHosted && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(device)}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors duration-200"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(device.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors duration-200"
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

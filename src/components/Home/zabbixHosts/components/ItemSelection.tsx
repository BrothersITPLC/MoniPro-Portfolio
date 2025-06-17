import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SelectedItemsType {
  local_host_id: number;
  category_id: number;
  template: number[];
  password: string;
  username: string;
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

interface ItemSelectionProps {
  moniteringTypes: SingleMoniteringType[];
  local_host_id: number;
  handlePostHostCreation: any;
}

export function ItemSelection({
  moniteringTypes,
  local_host_id,
  handlePostHostCreation,
}: ItemSelectionProps) {
  const [selectedItems, setSelectedItems] = useState<SelectedItemsType>({
    local_host_id: local_host_id,
    category_id: 0,
    template: [],
    password: "",
    username: "",
  });

  useEffect(() => {
    // Reset selected items when monitoring type changes
    if (moniteringTypes && moniteringTypes.length > 0) {
      setSelectedItems({
        local_host_id: local_host_id,
        category_id: moniteringTypes[0].id,
        template: [],
        password: "",
        username: "",
      });
    }
  }, [moniteringTypes]);

  if (!moniteringTypes || moniteringTypes.length === 0) {
    return <div>No monitoring type selected</div>;
  }

  const toggleItemSelection = (templateId: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      template: prev.template.includes(templateId)
        ? prev.template.filter((id) => id !== templateId)
        : [...prev.template, templateId],
    }));
  };

  const handleHostCreation = (data: any) => {
    handlePostHostCreation(data);
  };

  const isSimpleChecks =
    moniteringTypes[0].name.toLowerCase() === "simple checks";

  const handleInputChange = (field: "username" | "password", value: string) => {
    setSelectedItems((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-medium mb-2">{moniteringTypes[0].name}</h2>
      <p className="mb-4">{moniteringTypes[0].category_long_description}</p>

      {!isSimpleChecks && (
        <div className="mt-4 space-y-4 flex  gap-4 border m-2 p-2 rounded-2xl">
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              id="username"
              value={selectedItems.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              placeholder="Enter username"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              value={selectedItems.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              placeholder="Enter password"
            />
          </div>
        </div>
      )}

      {moniteringTypes[0].template.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>No items available.</AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[300px] pr-4 rounded-md border grid grid-cols-4 gap-4">
          {moniteringTypes[0].template.map((item) => (
            <TooltipProvider key={item.template_id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={
                      selectedItems.template.includes(item.template_id)
                        ? "default"
                        : "outline"
                    }
                    className="m-2 p-4 text-sm whitespace-normal break-words w-full cursor-pointer"
                    onClick={() => toggleItemSelection(item.template_id)}
                  >
                    {item.name}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.template_description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ScrollArea>
      )}

      {selectedItems.template.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">
            {selectedItems.template.length} item(s) selected
          </p>
        </div>
      )}

      <div className="mt-4 float-right flex gap-4">
        <Button
          className=" cursor-pointer"
          onClick={() => handlePostHostCreation(selectedItems)}
        >
          Confirm
        </Button>
      </div>
    </div>
  );
}

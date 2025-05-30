import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

import {
  useLazyGetSimpleCheckItemListQuery,
  useLazyGetAgentBasedItemListQuery,
  useLazyGetNetworkProtocolMonitoringItemListQuery,
} from "@/components/Home/zabbixHosts/api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
interface ItemSelectionProps {
  moniteringTypes:
    | {
        id: number;
        title: string;
        description: string;
        long_description: string;
      }[]
    | undefined;
}

type ItemType = {
  id: number;
  name: string;
  description: string;
};

export function ItemSelection({ moniteringTypes }: ItemSelectionProps) {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [items, setItems] = useState<ItemType[]>([]);

  if (!moniteringTypes || moniteringTypes.length === 0) {
    return <div>No monitoring type selected</div>;
  }

  const monitoringTitle = moniteringTypes[0].title;

  const [
    triggerSimpleCheckItems,
    { data: simpleCheckData, error: simpleCheckError, isLoading: isSimpleCheckLoading },
  ] = useLazyGetSimpleCheckItemListQuery();

  const [
    triggerAgentBasedItems,
    { data: agentBasedData, error: agentBasedError, isLoading: isAgentBasedLoading },
  ] = useLazyGetAgentBasedItemListQuery();

  const [
    triggerNetworkProtocolItems,
    { data: networkProtocolData, error: networkProtocolError, isLoading: isNetworkProtocolLoading },
  ] = useLazyGetNetworkProtocolMonitoringItemListQuery();

  useEffect(() => {
    setItems([]); // Clear items when monitoring type changes
    setSelectedItems([]); // Clear selected items when monitoring type changes
    handleFetchItems();
  }, [monitoringTitle]);

  useEffect(() => {
    const updateItems = () => {
      if (monitoringTitle.includes("Simple Checks") && simpleCheckData?.data) {
        setItems(Array.isArray(simpleCheckData.data) ? simpleCheckData.data : []);
      } else if (monitoringTitle.includes("Agent-Based") && agentBasedData?.data) {
        setItems(Array.isArray(agentBasedData.data) ? agentBasedData.data : []);
      } else if (monitoringTitle.includes("Network Protocol") && networkProtocolData?.data) {
        setItems(Array.isArray(networkProtocolData.data) ? networkProtocolData.data : []);
      }
    };
    updateItems();
  }, [monitoringTitle, simpleCheckData, agentBasedData, networkProtocolData]);

  const handleFetchItems = async () => {
    try {
      if (monitoringTitle.includes("Simple Checks")) {
        await triggerSimpleCheckItems(undefined);
      } else if (monitoringTitle.includes("Agent-Based")) {
        await triggerAgentBasedItems(undefined);
      } else if (monitoringTitle.includes("Network Protocol")) {
        await triggerNetworkProtocolItems(undefined);
      }
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  const isLoading = isSimpleCheckLoading || isAgentBasedLoading || isNetworkProtocolLoading;
  const isError = simpleCheckError || agentBasedError || networkProtocolError;

  const toggleItemSelection = (itemId: number) => {
    console.log(itemId);
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="p-4 w-full">
      <h2 className="text-lg font-medium mb-2">{moniteringTypes[0].title}</h2>
      <p className="mb-4">{moniteringTypes[0].long_description}</p>

      {isLoading ? (
        <p>Loading items...</p>
      ) : isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Error loading items. Please try again later.
          </AlertDescription>
        </Alert>
      ) : items.length === 0 ? (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>No items available.</AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[300px] pr-4 rounded-md border grid grid-cols-4 gap-4">
          {items.map((item) => (
            <TooltipProvider key={item.id}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    key={item.id}
                    variant={
                      selectedItems.includes(item.id) ? "default" : "outline"
                    }
                    className="m-2 p-4 text-sm whitespace-normal break-words w-full "
                    onClick={() => toggleItemSelection(item.id)}
                  >
                    {item.name}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.description}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </ScrollArea>
      )}

      {selectedItems.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-muted-foreground mb-2">
            {selectedItems.length} item(s) selected
          </p>
        </div>
      )}
    </div>
  );
}

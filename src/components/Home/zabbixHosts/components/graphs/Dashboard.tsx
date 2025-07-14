import { useState } from "react";
import { GraphFactory } from "./GraphFactory";
import { extractMetadata } from "../../utils/graphUtils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Palette } from "lucide-react";
import { colorPalettes } from "../../utils/colorPalettes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ZabbixItem = {
  itemid: string;
  name: string;
  value_type: string;
  units: string;
  result: Array<{
    clock: string;
    value: string;
    ns: string;
  }>;
};

interface DashboardProps {
  items: ZabbixItem[];
  title?: string;
}

export function Dashboard({
  items,
  title = "Monitoring Dashboard",
}: DashboardProps) {
  const [selectedPalette, setSelectedPalette] = useState("default");

  if (!items || items.length === 0) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>No Data</AlertTitle>
        <AlertDescription>
          No monitoring data is available for this selection.
        </AlertDescription>
      </Alert>
    );
  }

  // Extract metadata to help with layout decisions
  const metadata = extractMetadata(items);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Palette className="h-4 w-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Select color palette</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Select value={selectedPalette} onValueChange={setSelectedPalette}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select palette" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(colorPalettes).map((key) => (
                <SelectItem key={key} value={key}>
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {colorPalettes[key].colors.slice(0, 3).map((color, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 rounded-full"
                          style={{
                            backgroundColor: color,
                            marginLeft: i > 0 ? "-3px" : "0",
                          }}
                        />
                      ))}
                    </div>
                    <span>{colorPalettes[key].name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.itemid} className="col-span-1">
            <GraphFactory item={item} palette={selectedPalette} />
          </div>
        ))}
      </div>

      {/* Metadata summary card */}
      <Card>
        <CardHeader>
          <CardTitle>Monitoring Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Metrics
              </p>
              <p className="text-2xl font-bold">{metadata.totalItems}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Data Points
              </p>
              <p className="text-2xl font-bold">{metadata.dataPoints}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Min Value
              </p>
              <p className="text-2xl font-bold">
                {metadata.minValue.toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Max Value
              </p>
              <p className="text-2xl font-bold">
                {metadata.maxValue.toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

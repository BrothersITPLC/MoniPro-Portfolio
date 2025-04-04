import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Line } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
Chart.register(CategoryScale);
import { useGetHostItemsQuery, useZabbixGetRealTimeDataQuery } from "../api";

export function ZabbixHosts() {
  const { hostId } = useParams();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const {
    data: items,
    isLoading,
    error,
  } = useGetHostItemsQuery(hostId, {
    skip: !hostId,
  });

  const {
    data: historicalData,
    isLoading: isDataLoading,
    error: historicalError,
  } = useZabbixGetRealTimeDataQuery(selectedItemId, {
    skip: !selectedItemId,
    pollingInterval: 9000,
    refetchOnMountOrArgChange: true,
  });

  const chartData = {
    labels:
      historicalData?.result?.map((data) =>
        new Date(data.clock * 1000).toLocaleTimeString()
      ) || [],
    datasets: [
      {
        label: "Historical Data",
        data:
          historicalData?.result?.map((data) => parseFloat(data.value)) || [],
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="p-4">
      <div className="lg:col-span-2">
        {isLoading ? (
          <Card>
            <CardContent className="p-4 flex justify-center items-center min-h-[200px]">
              <Spinner className="w-8 h-8" />
            </CardContent>
          </Card>
        ) : error ? (
          <Card>
            <CardContent className="p-4 text-red-500">
              Error loading items:{" "}
              {(error as any)?.message || "An error occurred"}
            </CardContent>
          </Card>
        ) : items?.result && Array.isArray(items.result) ? (
          <Card>
            <CardContent className="p-4">
              <Tabs defaultValue="items">
                <TabsList>
                  <TabsTrigger value="items">Items</TabsTrigger>
                </TabsList>
                <TabsContent value="items" className="mt-4">
                  <div className="grid gap-4">
                    {items.result.map((item) => (
                      <div
                        key={item.itemid}
                        className="border rounded-lg p-4 cursor-pointer hover:bg-gray-900"
                        onClick={() => setSelectedItemId(item.itemid)}
                      >
                        <h4 className="font-medium mb-2">{item.name}</h4>
                        {selectedItemId === item.itemid && (
                          <div className="mt-2">
                            {isDataLoading ? (
                              <div className="flex justify-center items-center p-4">
                                <Spinner className="w-6 h-6" />
                              </div>
                            ) : historicalError ? (
                              <div className="text-red-500 p-4">
                                Error loading historical data:{" "}
                                {(historicalError as any)?.message ||
                                  "An error occurred"}
                              </div>
                            ) : historicalData ? (
                              <Line data={chartData} />
                            ) : (
                              <div className="text-gray-500 p-4">
                                No data available
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4">No items available</CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

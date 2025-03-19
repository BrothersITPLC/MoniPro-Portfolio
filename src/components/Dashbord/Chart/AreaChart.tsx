"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
const chartData = [
  { date: "2024-04-01", cpu: 65, memory: 45 },
  { date: "2024-04-02", cpu: 72, memory: 52 },
  { date: "2024-04-03", cpu: 58, memory: 48 },
  { date: "2024-04-04", cpu: 242, memory: 260 },
  { date: "2024-04-05", cpu: 373, memory: 290 },
  { date: "2024-04-06", cpu: 301, memory: 340 },
  { date: "2024-04-07", cpu: 245, memory: 180 },
  { date: "2024-04-08", cpu: 409, memory: 320 },
  { date: "2024-04-09", cpu: 59, memory: 110 },
  { date: "2024-04-10", cpu: 261, memory: 190 },
  { date: "2024-04-11", cpu: 327, memory: 350 },
  { date: "2024-04-12", cpu: 292, memory: 210 },
  { date: "2024-04-13", cpu: 342, memory: 380 },
  { date: "2024-04-14", cpu: 137, memory: 220 },
  { date: "2024-04-15", cpu: 120, memory: 170 },
  { date: "2024-04-16", cpu: 138, memory: 190 },
  { date: "2024-04-17", cpu: 446, memory: 360 },
  { date: "2024-04-18", cpu: 364, memory: 410 },
  { date: "2024-04-19", cpu: 243, memory: 180 },
  { date: "2024-04-20", cpu: 89, memory: 150 },
  { date: "2024-04-21", cpu: 137, memory: 200 },
  { date: "2024-04-22", cpu: 224, memory: 170 },
  { date: "2024-04-23", cpu: 138, memory: 230 },
  { date: "2024-04-24", cpu: 387, memory: 290 },
  { date: "2024-04-25", cpu: 215, memory: 250 },
  { date: "2024-04-26", cpu: 75, memory: 130 },
  { date: "2024-04-27", cpu: 383, memory: 420 },
  { date: "2024-04-28", cpu: 122, memory: 180 },
  { date: "2024-04-29", cpu: 315, memory: 240 },
  { date: "2024-04-30", cpu: 454, memory: 380 },
  { date: "2024-05-01", cpu: 165, memory: 220 },
  { date: "2024-05-02", cpu: 293, memory: 310 },
  { date: "2024-05-03", cpu: 247, memory: 190 },
  { date: "2024-05-04", cpu: 385, memory: 420 },
  { date: "2024-05-05", cpu: 481, memory: 390 },
  { date: "2024-05-06", cpu: 498, memory: 520 },
  { date: "2024-05-07", cpu: 388, memory: 300 },
  { date: "2024-05-08", cpu: 149, memory: 210 },
  { date: "2024-05-09", cpu: 227, memory: 180 },
  { date: "2024-05-10", cpu: 293, memory: 330 },
  { date: "2024-05-11", cpu: 335, memory: 270 },
  { date: "2024-05-12", cpu: 197, memory: 240 },
  { date: "2024-05-13", cpu: 197, memory: 160 },
  { date: "2024-05-14", cpu: 448, memory: 490 },
  { date: "2024-05-15", cpu: 473, memory: 380 },
  { date: "2024-05-16", cpu: 338, memory: 400 },
  { date: "2024-05-17", cpu: 499, memory: 420 },
  { date: "2024-05-18", cpu: 315, memory: 350 },
  { date: "2024-05-19", cpu: 235, memory: 180 },
  { date: "2024-05-20", cpu: 177, memory: 230 },
  { date: "2024-05-21", cpu: 82, memory: 140 },
  { date: "2024-05-22", cpu: 81, memory: 120 },
  { date: "2024-05-23", cpu: 252, memory: 290 },
  { date: "2024-05-24", cpu: 294, memory: 220 },
  { date: "2024-05-25", cpu: 201, memory: 250 },
  { date: "2024-05-26", cpu: 213, memory: 170 },
  { date: "2024-05-27", cpu: 420, memory: 460 },
  { date: "2024-05-28", cpu: 233, memory: 190 },
  { date: "2024-05-29", cpu: 78, memory: 130 },
  { date: "2024-05-30", cpu: 340, memory: 280 },
  { date: "2024-05-31", cpu: 178, memory: 230 },
  { date: "2024-06-01", cpu: 178, memory: 200 },
  { date: "2024-06-02", cpu: 470, memory: 410 },
  { date: "2024-06-03", cpu: 103, memory: 160 },
  { date: "2024-06-04", cpu: 439, memory: 380 },
  { date: "2024-06-05", cpu: 88, memory: 140 },
  { date: "2024-06-06", cpu: 294, memory: 250 },
  { date: "2024-06-07", cpu: 323, memory: 370 },
  { date: "2024-06-08", cpu: 385, memory: 320 },
  { date: "2024-06-09", cpu: 438, memory: 480 },
  { date: "2024-06-10", cpu: 155, memory: 200 },
  { date: "2024-06-11", cpu: 92, memory: 150 },
  { date: "2024-06-12", cpu: 492, memory: 420 },
  { date: "2024-06-13", cpu: 81, memory: 130 },
  { date: "2024-06-14", cpu: 426, memory: 380 },
  { date: "2024-06-15", cpu: 307, memory: 350 },
  { date: "2024-06-16", cpu: 371, memory: 310 },
  { date: "2024-06-17", cpu: 475, memory: 520 },
  { date: "2024-06-18", cpu: 107, memory: 170 },
  { date: "2024-06-19", cpu: 341, memory: 290 },
  { date: "2024-06-20", cpu: 408, memory: 450 },
  { date: "2024-06-21", cpu: 169, memory: 210 },
  { date: "2024-06-22", cpu: 317, memory: 270 },
  { date: "2024-06-23", cpu: 480, memory: 530 },
  { date: "2024-06-24", cpu: 132, memory: 180 },
  { date: "2024-06-25", cpu: 141, memory: 190 },
  { date: "2024-06-26", cpu: 434, memory: 380 },
  { date: "2024-06-27", cpu: 448, memory: 490 },
  { date: "2024-06-28", cpu: 149, memory: 200 },
  { date: "2024-06-29", cpu: 103, memory: 160 },
  { date: "2024-06-30", cpu: 446, memory: 400 },
];

const chartConfig = {
  resources: {
    label: "Resource Usage",
  },
  cpu: {
    label: "CPU Usage (%)",
    color: "hsl(var(--chart-1))",
  },
  memory: {
    label: "Memory Usage (%)",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function AreaChart1() {
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>VM Resource Monitoring</CardTitle>
          <CardDescription>Showing resource utilization trends</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillCPU" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-cpu)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-cpu)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMemory" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-memory)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-memory)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="memory"
              type="natural"
              fill="url(#fillMemory)"
              stroke="var(--color-memory)"
              stackId="a"
            />
            <Area
              dataKey="cpu"
              type="natural"
              fill="url(#fillCPU)"
              stroke="var(--color-cpu)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

"use client";

import { Network, TrendingUp } from "lucide-react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", network: 186 },
  { month: "February", network: 305 },
  { month: "March", network: 237 },
  { month: "April", network: 73 },
  { month: "May", network: 209 },
  { month: "June", network: 214 },
];

const chartConfig = {
  network: {
    label: "Network Traffic (Mbps)",
    color: "hsl(var(--chart-1))",
    icon: Network,
  },
} satisfies ChartConfig;

export function AreaChartStep() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>VM Network Traffic</CardTitle>
        <CardDescription>
          Average network throughput over 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Area
              dataKey="network"
              type="step"
              fill="var(--color-network)"
              fillOpacity={0.4}
              stroke="var(--color-network)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              Network traffic increased by 5.2%{" "}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Average network utilization monitoring
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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
  { month: "January", reads: 186, writes: 80 },
  { month: "February", reads: 305, writes: 200 },
  { month: "March", reads: 237, writes: 120 },
  { month: "April", reads: 73, writes: 190 },
  { month: "May", reads: 209, writes: 130 },
  { month: "June", reads: 214, writes: 140 },
];

const chartConfig = {
  reads: {
    label: "Read IOPS",
    color: "hsl(var(--chart-1))",
  },
  writes: {
    label: "Write IOPS",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function BarChart1() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>VM Disk I/O Performance</CardTitle>
        <CardDescription>IOPS Monitoring (Jan - June 2024)</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="reads" fill="var(--color-reads)" radius={4} />
            <Bar dataKey="writes" fill="var(--color-writes)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Disk I/O performance increased by 5.2%{" "}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Average read/write operations per second (IOPS)
        </div>
      </CardFooter>
    </Card>
  );
}

"use client";

import { Power } from "lucide-react";
import { RadialBarChart, RadialBar, Legend } from "recharts";

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
  {
    name: "Current Uptime",
    uptime: 99.8,
    fill: "var(--color-uptime)",
  },
];

const chartConfig = {
  uptime: {
    label: "Uptime (%)",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function LineChart1() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>VM Availability Monitor</CardTitle>
        <CardDescription>Current Uptime Status</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <RadialBarChart
            width={300}
            height={300}
            cx={150}
            cy={150}
            innerRadius={80}
            outerRadius={140}
            data={chartData}
            startAngle={90}
            endAngle={-270}
          >
            <RadialBar
              label={{ fill: "#666", position: "insideStart" }}
              background
              dataKey="uptime"
              cornerRadius={5}
            />
            <Legend
              iconSize={10}
              layout="vertical"
              verticalAlign="middle"
              wrapperStyle={{
                top: "50%",
                right: 0,
                transform: "translate(0, -50%)",
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Current Uptime: 99.8% <Power className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          VM availability status
        </div>
      </CardFooter>
    </Card>
  );
}

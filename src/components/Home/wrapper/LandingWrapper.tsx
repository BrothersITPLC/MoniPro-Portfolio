import { BarChart1 } from "@/components/Dashbord/Chart/Bar";
import { AreaChart1 } from "@/components/Dashbord/Chart/AreaChart";
import { AreaChartStep } from "@/components/Dashbord/Chart/AreaChartStep";
import { LineChart1 } from "@/components/Dashbord/Chart/LineChart1";
export function LandingWrapper() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <BarChart1 />
        <AreaChartStep />
        <LineChart1 />
      </div>
      <AreaChart1 />
    </div>
  );
}

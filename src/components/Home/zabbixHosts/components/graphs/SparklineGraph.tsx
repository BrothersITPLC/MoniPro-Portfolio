import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

interface SparklineGraphProps {
  data: ChartData<'line'>;
  title?: string;
  height?: number;
  value?: string | number;
  unit?: string;
  options?: ChartOptions<'line'>;
}

export function SparklineGraph({ 
  data, 
  title = 'Sparkline', 
  height = 100, 
  value, 
  unit = '', 
  options = {} 
}: SparklineGraphProps) {
  const defaultOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderWidth: 2,
        tension: 0.4,
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-muted-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {value !== undefined && (
          <div className="text-2xl font-bold mb-2">
            {value}{unit && <span className="text-sm ml-1">{unit}</span>}
          </div>
        )}
        <div style={{ height: `${height}px` }}>
          <Line data={data} options={mergedOptions} />
        </div>
      </CardContent>
    </Card>
  );
}
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Register ChartJS components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

interface PieGraphProps {
  data: ChartData<'pie'>;
  title?: string;
  height?: number;
  options?: ChartOptions<'pie'>;
}

export function PieGraph({ data, title = 'Pie Chart', height = 300, options = {} }: PieGraphProps) {
  const defaultOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px` }}>
          <Pie data={data} options={mergedOptions} />
        </div>
      </CardContent>
    </Card>
  );
}
import { Doughnut } from 'react-chartjs-2';
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

interface GaugeGraphProps {
  value: number;
  max?: number;
  title?: string;
  height?: number;
  options?: ChartOptions<'doughnut'>;
}

export function GaugeGraph({ value, max = 100, title = 'Gauge', height = 300, options = {} }: GaugeGraphProps) {
  // Calculate the remaining value to complete the circle
  const remaining = max - value;
  
  const data: ChartData<'doughnut'> = {
    labels: ['Value', 'Remaining'],
    datasets: [
      {
        data: [value, remaining > 0 ? remaining : 0],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(220, 220, 220, 0.3)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(220, 220, 220, 1)',
        ],
        borderWidth: 1,
        circumference: 180,
        rotation: 270,
      },
    ],
  };

  const defaultOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}${context.label === 'Value' ? ' / ' + max : ''}`;
          }
        }
      }
    },
    cutout: '70%',
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px`, position: 'relative' }}>
          <Doughnut data={data} options={mergedOptions} />
          <div 
            style={{ 
              position: 'absolute', 
              top: '60%', 
              left: '50%', 
              transform: 'translate(-50%, -50%)',
              fontSize: '1.5rem',
              fontWeight: 'bold'
            }}
          >
            {value}%
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
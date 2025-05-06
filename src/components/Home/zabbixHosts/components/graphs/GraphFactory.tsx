import { LineGraph } from './LineGraph';
import { BarGraph } from './BarGraph';
import { PieGraph } from './PieGraph';
import { AreaGraph } from './AreaGraph';
import { ScatterGraph } from './ScatterGraph';
import { GaugeGraph } from './GaugeGraph';
import { HeatmapGraph } from './HeatmapGraph';
import { RadarGraph } from './RadarGraph';
import { SparklineGraph } from './SparklineGraph';
import { TableGraph } from './TableGraph';
import { GraphType, determineGraphType, formatChartData } from '../../utils/graphUtils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getColorFromPalette } from '../../utils/colorPalettes';

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

interface GraphFactoryProps {
  item: ZabbixItem;
  graphType?: GraphType;
  title?: string;
  height?: number;
  palette?: string;
}

export function GraphFactory({ item, graphType, title, height = 300, palette = 'default' }: GraphFactoryProps) {
  // If no graph type is provided, determine it based on the data
  const type = graphType || determineGraphType(item);
  const chartData = formatChartData(item);
  
  // Use the item name as the title if none is provided
  const graphTitle = title || item.name;
  
  // Apply color palette to chart data
  const colorizedChartData = {
    ...chartData,
    datasets: chartData.datasets.map((dataset, index) => {
      const colors = getColorFromPalette(palette, index);
      return {
        ...dataset,
        backgroundColor: colors.background,
        borderColor: colors.border,
        pointBackgroundColor: colors.color,
        pointBorderColor: colors.border,
      };
    }),
  };
  
  // Render the appropriate graph based on the determined type
  switch (type) {
    case 'line':
      return <LineGraph data={colorizedChartData} title={graphTitle} height={height} />;
      
    case 'bar':
      return <BarGraph data={colorizedChartData} title={graphTitle} height={height} />;
      
    case 'pie':
      // For pie charts, we need to transform the data differently
      const pieData = {
        labels: chartData.labels,
        datasets: [{
          data: chartData.datasets[0].data,
          backgroundColor: Array(chartData.labels.length)
            .fill(0)
            .map((_, i) => getColorFromPalette(palette, i).background),
          borderColor: Array(chartData.labels.length)
            .fill(0)
            .map((_, i) => getColorFromPalette(palette, i).border),
          borderWidth: 1
        }]
      };
      return <PieGraph data={pieData} title={graphTitle} height={height} />;
      
    case 'area':
      return <AreaGraph data={colorizedChartData} title={graphTitle} height={height} />;
      
    case 'scatter':
      // For scatter plots, transform the data to x,y format
      const { color, background, border } = getColorFromPalette(palette, 0);
      const scatterData = {
        datasets: [{
          label: item.name,
          data: chartData.datasets[0].data.map((value, index) => ({
            x: index,
            y: value
          })),
          backgroundColor: background,
          borderColor: border,
        }]
      };
      return <ScatterGraph data={scatterData} title={graphTitle} height={height} />;
      
    case 'gauge':
      // For gauge, we use the latest value
      const latestValue = item.result && item.result.length > 0 
        ? parseFloat(item.result[0].value) 
        : 0;
      
      // Determine max value based on units or default to 100
      let maxValue = 100;
      if (item.units === '%') maxValue = 100;
      else if (item.name.toLowerCase().includes('cpu')) maxValue = 100;
      
      return <GaugeGraph 
        value={latestValue} 
        max={maxValue} 
        title={graphTitle} 
        height={height} 
        palette={palette}
      />;
      
    case 'heatmap':
      // For heatmap, we need to organize data into a 2D grid
      const rows = 5;
      const cols = Math.ceil(item.result.length / rows);
      const heatmapData: number[][] = Array(rows).fill(0).map(() => Array(cols).fill(0));
      
      item.result.forEach((point, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        if (row < rows && col < cols) {
          heatmapData[row][col] = parseFloat(point.value);
        }
      });
      
      return <HeatmapGraph 
        data={heatmapData} 
        title={graphTitle} 
        height={height} 
        xLabels={Array(cols).fill(0).map((_, i) => `T-${cols-i}`)}
        yLabels={Array(rows).fill(0).map((_, i) => `Series ${i+1}`)}
        palette={palette}
      />;
      
    case 'radar':
      // For radar charts, we need labels for each axis
      const radarColors = getColorFromPalette(palette, 0);
      const radarData = {
        labels: chartData.labels.slice(0, 8), // Limit to 8 points for readability
        datasets: [{
          label: item.name,
          data: chartData.datasets[0].data.slice(0, 8),
          backgroundColor: radarColors.background,
          borderColor: radarColors.border,
          pointBackgroundColor: radarColors.color,
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: radarColors.border,
        }]
      };
      return <RadarGraph data={radarData} title={graphTitle} height={height} />;
      
    case 'sparkline':
      // For sparkline, we use a simplified line chart with the latest value displayed
      const latestSparklineValue = item.result && item.result.length > 0 
        ? parseFloat(item.result[0].value).toFixed(2) 
        : 'N/A';
      
      return <SparklineGraph 
        data={colorizedChartData} 
        title={graphTitle} 
        height={height} 
        value={latestSparklineValue}
        unit={item.units}
        palette={palette}
      />;
      
    case 'table':
    default:
      // For table view or fallback, display the raw data in a table
      const tableData = item.result.map(point => ({
        timestamp: new Date(parseInt(point.clock) * 1000).toLocaleString(),
        value: point.value,
        units: item.units
      }));
      
      const columns = [
        { key: 'timestamp', header: 'Timestamp' },
        { key: 'value', header: 'Value' },
        { key: 'units', header: 'Units' }
      ];
      
      return <TableGraph 
        data={tableData} 
        columns={columns} 
        title={graphTitle} 
        height={height}
        palette={palette}
      />;
  }
}
type DataPoint = {
  clock: string;
  value: string;
  ns: string;
};

type ZabbixItem = {
  itemid: string;
  name: string;
  value_type: string;
  units: string;
  result: DataPoint[];
};

export type GraphType = 
  | 'line' 
  | 'bar' 
  | 'pie' 
  | 'area' 
  | 'scatter' 
  | 'gauge' 
  | 'heatmap' 
  | 'radar' 
  | 'sparkline'
  | 'table';

/**
 * Determines the appropriate graph type based on the Zabbix item data
 */
export const determineGraphType = (item: ZabbixItem): GraphType => {
  const { name, units, result } = item;
  
  // Check if there's enough data for visualization
  if (!result || result.length === 0) {
    return 'table'; // Default to table view for no data
  }
  
  // Time series data is best visualized with line charts
  if (name.includes('history') || name.includes('trend') || name.toLowerCase().includes('time')) {
    return 'line';
  }
  
  // CPU utilization is good for gauge or area charts
  if (name.toLowerCase().includes('cpu') || name.toLowerCase().includes('processor')) {
    return result.length > 10 ? 'area' : 'gauge';
  }
  
  // Memory usage works well with area charts
  if (name.toLowerCase().includes('memory') || name.toLowerCase().includes('ram')) {
    return 'area';
  }
  
  // Network traffic is good for line charts
  if (name.toLowerCase().includes('network') || name.toLowerCase().includes('traffic') || 
      name.toLowerCase().includes('bytes') || name.toLowerCase().includes('packets')) {
    return 'line';
  }
  
  // Disk usage is good for pie charts
  if (name.toLowerCase().includes('disk') || name.toLowerCase().includes('storage')) {
    return 'pie';
  }
  
  // Connection counts work well with bar charts
  if (name.toLowerCase().includes('connection') || name.toLowerCase().includes('session')) {
    return 'bar';
  }
  
  // Ping/latency data works well with scatter plots
  if (name.toLowerCase().includes('ping') || name.toLowerCase().includes('latency')) {
    return 'scatter';
  }
  
  // Temperature data works well with heatmaps
  if (name.toLowerCase().includes('temp') || name.toLowerCase().includes('temperature')) {
    return 'heatmap';
  }
  
  // For multiple metrics comparison
  if (name.toLowerCase().includes('comparison') || result.length > 20) {
    return 'radar';
  }
  
  // For simple single values
  if (result.length === 1) {
    return 'sparkline';
  }
  
  // Default to line chart for time series data
  return 'line';
};

/**
 * Formats the Zabbix data for use with various chart libraries
 */
export const formatChartData = (item: ZabbixItem) => {
  const { result, name, units } = item;
  
  if (!result || result.length === 0) {
    return { labels: [], datasets: [] };
  }
  
  // Sort by timestamp (clock)
  const sortedData = [...result].sort((a, b) => 
    parseInt(a.clock) - parseInt(b.clock)
  );
  
  // Extract labels (timestamps) and values
  const labels = sortedData.map(point => {
    const date = new Date(parseInt(point.clock) * 1000);
    return date.toLocaleTimeString();
  });
  
  const values = sortedData.map(point => parseFloat(point.value));
  
  return {
    labels,
    datasets: [
      {
        label: `${name} (${units})`,
        data: values,
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.4
      }
    ]
  };
};

/**
 * Extracts metadata from Zabbix items to help with visualization decisions
 */
export const extractMetadata = (items: ZabbixItem[]) => {
  if (!items || items.length === 0) {
    return {
      totalItems: 0,
      hasTimeSeriesData: false,
      dataPoints: 0,
      valueTypes: [],
      units: [],
      minValue: 0,
      maxValue: 0,
      avgValue: 0
    };
  }
  
  let allValues: number[] = [];
  const valueTypes = new Set<string>();
  const units = new Set<string>();
  let dataPoints = 0;
  
  items.forEach(item => {
    valueTypes.add(item.value_type);
    if (item.units) units.add(item.units);
    
    if (item.result && item.result.length) {
      dataPoints += item.result.length;
      const itemValues = item.result.map(r => parseFloat(r.value)).filter(v => !isNaN(v));
      allValues = [...allValues, ...itemValues];
    }
  });
  
  const minValue = allValues.length ? Math.min(...allValues) : 0;
  const maxValue = allValues.length ? Math.max(...allValues) : 0;
  const avgValue = allValues.length ? allValues.reduce((a, b) => a + b, 0) / allValues.length : 0;
  
  return {
    totalItems: items.length,
    hasTimeSeriesData: items.some(item => item.result && item.result.length > 1),
    dataPoints,
    valueTypes: Array.from(valueTypes),
    units: Array.from(units),
    minValue,
    maxValue,
    avgValue
  };
};
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HeatmapGraphProps {
  data: number[][];
  xLabels?: string[];
  yLabels?: string[];
  title?: string;
  height?: number;
  colorRange?: [string, string];
}

export function HeatmapGraph({ 
  data, 
  xLabels = [], 
  yLabels = [], 
  title = 'Heatmap', 
  height = 300,
  colorRange = ['#e6f7ff', '#0050b3']
}: HeatmapGraphProps) {
  const [minValue, setMinValue] = useState<number>(0);
  const [maxValue, setMaxValue] = useState<number>(0);

  useEffect(() => {
    // Find min and max values for color scaling
    let min = Infinity;
    let max = -Infinity;
    
    data.forEach(row => {
      row.forEach(value => {
        if (value < min) min = value;
        if (value > max) max = value;
      });
    });
    
    setMinValue(min);
    setMaxValue(max);
  }, [data]);

  // Calculate color based on value
  const getColor = (value: number) => {
    if (maxValue === minValue) return colorRange[0];
    
    const ratio = (value - minValue) / (maxValue - minValue);
    
    // Convert hex to RGB for interpolation
    const startColor = hexToRgb(colorRange[0]);
    const endColor = hexToRgb(colorRange[1]);
    
    if (!startColor || !endColor) return colorRange[0];
    
    // Interpolate between colors
    const r = Math.round(startColor.r + ratio * (endColor.r - startColor.r));
    const g = Math.round(startColor.g + ratio * (endColor.g - startColor.g));
    const b = Math.round(startColor.b + ratio * (endColor.b - startColor.b));
    
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Helper function to convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div style={{ height: `${height}px`, overflow: 'auto' }}>
          <div className="flex">
            {/* Y-axis labels */}
            {yLabels.length > 0 && (
              <div className="pr-2 flex flex-col justify-around">
                {yLabels.map((label, index) => (
                  <div key={index} className="text-xs text-right">
                    {label}
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex-1">
              {/* X-axis labels */}
              {xLabels.length > 0 && (
                <div className="flex justify-around mb-1">
                  {xLabels.map((label, index) => (
                    <div key={index} className="text-xs">
                      {label}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Heatmap grid */}
              <div className="grid" style={{ 
                gridTemplateRows: `repeat(${data.length}, 1fr)`,
                height: yLabels.length ? `calc(${height}px - 20px)` : `${height}px`
              }}>
                {data.map((row, rowIndex) => (
                  <div 
                    key={rowIndex} 
                    className="grid" 
                    style={{ gridTemplateColumns: `repeat(${row.length}, 1fr)` }}
                  >
                    {row.map((value, colIndex) => (
                      <div
                        key={colIndex}
                        className="flex items-center justify-center text-xs font-medium"
                        style={{
                          backgroundColor: getColor(value),
                          color: value > (maxValue - minValue) / 2 + minValue ? 'white' : 'black',
                          padding: '4px',
                          border: '1px solid rgba(0,0,0,0.1)'
                        }}
                        title={`${yLabels[rowIndex] || rowIndex}, ${xLabels[colIndex] || colIndex}: ${value}`}
                      >
                        {value}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
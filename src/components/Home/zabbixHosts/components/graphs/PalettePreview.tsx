import { colorPalettes } from '../../utils/colorPalettes';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function PalettePreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Object.entries(colorPalettes).map(([key, palette]) => (
        <Card key={key} className="overflow-hidden">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">{palette.name}</CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2">
              {palette.colors.map((color, index) => (
                <div 
                  key={index}
                  className="w-8 h-8 rounded-full border"
                  style={{ 
                    backgroundColor: palette.background[index],
                    borderColor: palette.border[index]
                  }}
                />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
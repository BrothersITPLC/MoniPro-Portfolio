export type ColorPalette = {
  name: string;
  colors: string[];
  background: string[];
  border: string[];
};

export const colorPalettes: Record<string, ColorPalette> = {
  default: {
    name: "Default",
    colors: [
      "rgb(75, 192, 192)",
      "rgb(255, 99, 132)",
      "rgb(54, 162, 235)",
      "rgb(255, 206, 86)",
      "rgb(153, 102, 255)",
      "rgb(255, 159, 64)",
    ],
    background: [
      "rgba(75, 192, 192, 0.2)",
      "rgba(255, 99, 132, 0.2)",
      "rgba(54, 162, 235, 0.2)",
      "rgba(255, 206, 86, 0.2)",
      "rgba(153, 102, 255, 0.2)",
      "rgba(255, 159, 64, 0.2)",
    ],
    border: [
      "rgba(75, 192, 192, 1)",
      "rgba(255, 99, 132, 1)",
      "rgba(54, 162, 235, 1)",
      "rgba(255, 206, 86, 1)",
      "rgba(153, 102, 255, 1)",
      "rgba(255, 159, 64, 1)",
    ],
  },
  monochrome: {
    name: "Monochrome",
    colors: [
      "rgb(0, 0, 0)",
      "rgb(51, 51, 51)",
      "rgb(102, 102, 102)",
      "rgb(153, 153, 153)",
      "rgb(204, 204, 204)",
      "rgb(238, 238, 238)",
    ],
    background: [
      "rgba(0, 0, 0, 0.2)",
      "rgba(51, 51, 51, 0.2)",
      "rgba(102, 102, 102, 0.2)",
      "rgba(153, 153, 153, 0.2)",
      "rgba(204, 204, 204, 0.2)",
      "rgba(238, 238, 238, 0.2)",
    ],
    border: [
      "rgba(0, 0, 0, 1)",
      "rgba(51, 51, 51, 1)",
      "rgba(102, 102, 102, 1)",
      "rgba(153, 153, 153, 1)",
      "rgba(204, 204, 204, 1)",
      "rgba(238, 238, 238, 1)",
    ],
  },
  vibrant: {
    name: "Vibrant",
    colors: [
      "rgb(255, 0, 0)",
      "rgb(0, 255, 0)",
      "rgb(0, 0, 255)",
      "rgb(255, 255, 0)",
      "rgb(255, 0, 255)",
      "rgb(0, 255, 255)",
    ],
    background: [
      "rgba(255, 0, 0, 0.2)",
      "rgba(0, 255, 0, 0.2)",
      "rgba(0, 0, 255, 0.2)",
      "rgba(255, 255, 0, 0.2)",
      "rgba(255, 0, 255, 0.2)",
      "rgba(0, 255, 255, 0.2)",
    ],
    border: [
      "rgba(255, 0, 0, 1)",
      "rgba(0, 255, 0, 1)",
      "rgba(0, 0, 255, 1)",
      "rgba(255, 255, 0, 1)",
      "rgba(255, 0, 255, 1)",
      "rgba(0, 255, 255, 1)",
    ],
  },
  pastel: {
    name: "Pastel",
    colors: [
      "rgb(187, 222, 251)",
      "rgb(255, 236, 179)",
      "rgb(209, 196, 233)",
      "rgb(200, 230, 201)",
      "rgb(255, 205, 210)",
      "rgb(225, 190, 231)",
    ],
    background: [
      "rgba(187, 222, 251, 0.5)",
      "rgba(255, 236, 179, 0.5)",
      "rgba(209, 196, 233, 0.5)",
      "rgba(200, 230, 201, 0.5)",
      "rgba(255, 205, 210, 0.5)",
      "rgba(225, 190, 231, 0.5)",
    ],
    border: [
      "rgba(144, 202, 249, 1)",
      "rgba(255, 224, 130, 1)",
      "rgba(179, 157, 219, 1)",
      "rgba(165, 214, 167, 1)",
      "rgba(239, 154, 154, 1)",
      "rgba(206, 147, 216, 1)",
    ],
  },
  dark: {
    name: "Dark",
    colors: [
      "rgb(32, 32, 32)",
      "rgb(64, 64, 64)",
      "rgb(96, 96, 96)",
      "rgb(128, 128, 128)",
      "rgb(160, 160, 160)",
      "rgb(192, 192, 192)",
    ],
    background: [
      "rgba(32, 32, 32, 0.7)",
      "rgba(64, 64, 64, 0.7)",
      "rgba(96, 96, 96, 0.7)",
      "rgba(128, 128, 128, 0.7)",
      "rgba(160, 160, 160, 0.7)",
      "rgba(192, 192, 192, 0.7)",
    ],
    border: [
      "rgba(32, 32, 32, 1)",
      "rgba(64, 64, 64, 1)",
      "rgba(96, 96, 96, 1)",
      "rgba(128, 128, 128, 1)",
      "rgba(160, 160, 160, 1)",
      "rgba(192, 192, 192, 1)",
    ],
  },
  neon: {
    name: "Neon",
    colors: [
      "rgb(255, 41, 117)",
      "rgb(13, 217, 164)",
      "rgb(254, 228, 64)",
      "rgb(0, 224, 255)",
      "rgb(255, 119, 0)",
      "rgb(176, 65, 255)",
    ],
    background: [
      "rgba(255, 41, 117, 0.2)",
      "rgba(13, 217, 164, 0.2)",
      "rgba(254, 228, 64, 0.2)",
      "rgba(0, 224, 255, 0.2)",
      "rgba(255, 119, 0, 0.2)",
      "rgba(176, 65, 255, 0.2)",
    ],
    border: [
      "rgba(255, 41, 117, 1)",
      "rgba(13, 217, 164, 1)",
      "rgba(254, 228, 64, 1)",
      "rgba(0, 224, 255, 1)",
      "rgba(255, 119, 0, 1)",
      "rgba(176, 65, 255, 1)",
    ],
  },
};

export function getColorFromPalette(palette: string, index: number): {
  color: string;
  background: string;
  border: string;
} {
  const selectedPalette = colorPalettes[palette] || colorPalettes.default;
  const colorIndex = index % selectedPalette.colors.length;
  
  return {
    color: selectedPalette.colors[colorIndex],
    background: selectedPalette.background[colorIndex],
    border: selectedPalette.border[colorIndex],
  };
}
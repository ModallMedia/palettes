import { useEffect, useState } from "react";

export default function useColorData(hex: string) {
  const [colorData, setColorData] = useState<null | {
    name: string;
    hex: string;
    rgb: { r: string; g: string; b: string };
    closest_color: { hex: string; label: string };
  }>(null);
  useEffect(() => {
    const fetchedColor = async () => {
      const request = await fetch(`/api/color-name?hex=${hex}`);
      const response = await request.json();
      setColorData(response);
    };
    fetchedColor();
  }, [hex]);

  return colorData;
}

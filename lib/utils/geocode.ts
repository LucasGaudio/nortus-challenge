import { GeocodeResult } from "@/types";

export async function geocode(city: string): Promise<GeocodeResult | null> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(city + ", Brasil")}`;

  const res = await fetch(url, {
    headers: {
      "User-Agent": "nortus-challenge", // Nominatim requires a user-agent
    },
  });

  const data = await res.json();

  if (!data || data.length === 0) return null;

  return {
    lat: parseFloat(data[0].lat),
    lon: parseFloat(data[0].lon),
  };
}


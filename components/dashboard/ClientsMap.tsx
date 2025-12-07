"use client";

import { useEffect, useRef } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import { geocode } from "@/lib/utils/geocode";
import { Client } from "@/types";
import VectorSource from "ol/source/Vector";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import Style from "ol/style/Style";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";

interface ClientsMapProps {
  clients: Client[];
}

const getMarkerColor = (secureType: string): string => {
  const colors: Record<string, string> = {
    basic: "#3b82f6",
    standard: "#10b981",
    premium: "#f59e0b", 
    enterprise: "#8b5cf6",
  };
  return colors[secureType.toLowerCase()] || "#6b7280"; 
};

export function ClientsMap({ clients }: ClientsMapProps) {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !clients || clients.length === 0) return;

    const vectorSource = new VectorSource();

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        new VectorLayer({
          source: vectorSource,
        }),
      ],
      view: new View({
        center: fromLonLat([-47.8825, -15.7942]), // centro do Brasil
        zoom: 4,
      }),
    });

    mapInstanceRef.current = map;

    async function loadMarkers() {
      const features: Feature[] = [];
      
      for (const client of clients) {
        try {
          if (!client.location) {
            console.warn(`Client ${client.name} has no location`);
            continue;
          }

          const coords = await geocode(client.location);
          if (!coords) {
            console.warn(`Failed to geocode location: ${client.location}`);
            continue;
          }

          const feature = new Feature({
            geometry: new Point(fromLonLat([coords.lon, coords.lat])),
          });

          feature.set("clientName", client.name);
          feature.set("clientLocation", client.location);
          feature.set("secureType", client.secureType);

          const color = getMarkerColor(client.secureType);
          
          feature.setStyle(
            new Style({
              image: new CircleStyle({
                radius: 8,
                fill: new Fill({
                  color: color,
                }),
                stroke: new Stroke({
                  color: "#ffffff",
                  width: 2,
                }),
              }),
            })
          );

          features.push(feature);
        } catch (error) {
          console.error(`Error processing client ${client.name}:`, error);
        }
      }

      vectorSource.addFeatures(features);

      if (features.length > 0) {
        const extent = vectorSource.getExtent();
        if (extent && extent[0] !== Infinity) {
          map.getView().fit(extent, {
            padding: [50, 50, 50, 50],
            maxZoom: 10,
          });
        }
      }

    }

    loadMarkers();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setTarget(undefined);
        mapInstanceRef.current = null;
      }
    };
  }, [clients]);

  if (!clients || clients.length === 0) {
    return (
      <div className="bg-[#0f172a] rounded-2xl p-4 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-3">Mapa de clientes por região</h2>
        <div className="w-full h-[400px] rounded-xl flex items-center justify-center text-gray-400">
          Nenhum cliente para exibir no mapa
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] rounded-2xl p-4 border border-gray-800">
      <h2 className="text-lg font-semibold text-white mb-3">Mapa de clientes por região</h2>
      <div ref={mapRef} className="w-full h-[400px] rounded-xl overflow-hidden" />
    </div>
  );
}

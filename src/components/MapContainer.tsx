import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { AirTagLocation } from '@/types/airtag';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface MapContainerProps {
  locations: AirTagLocation[];
  onLocationSelect?: (location: AirTagLocation) => void;
}

const MapContainer: React.FC<MapContainerProps> = ({ locations, onLocationSelect }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [isTokenSet, setIsTokenSet] = useState(false);
  const markers = useRef<mapboxgl.Marker[]>([]);

  // Initialize map when token is set
  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: [-122.4194, 37.7749], // San Francisco default
      zoom: 10,
      projection: 'mercator'
    });

    // Add navigation controls
    map.current.addControl(
      new mapboxgl.NavigationControl({
        visualizePitch: true,
      }),
      'top-right'
    );

    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, mapboxToken]);

  // Update markers when locations change
  useEffect(() => {
    if (!map.current || !isTokenSet) return;

    // Clear existing markers
    markers.current.forEach(marker => marker.remove());
    markers.current = [];

    // Add new markers
    locations.forEach((location) => {
      const el = document.createElement('div');
      el.className = 'airtag-marker';
      el.style.cssText = `
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: linear-gradient(135deg, hsl(217 91% 60%), hsl(142 76% 36%));
        border: 2px solid white;
        cursor: pointer;
        box-shadow: 0 0 10px hsl(217 91% 60% / 0.6);
      `;

      const marker = new mapboxgl.Marker(el)
        .setLngLat([location.longitude, location.latitude])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 })
            .setHTML(`
              <div class="p-2">
                <h3 class="font-semibold text-sm">${location.name || location.airtag_id}</h3>
                <p class="text-xs text-muted-foreground">${location.apple_id}</p>
                <p class="text-xs">${new Date(location.timestamp).toLocaleString()}</p>
              </div>
            `)
        )
        .addTo(map.current);

      el.addEventListener('click', () => {
        onLocationSelect?.(location);
      });

      markers.current.push(marker);
    });

    // Fit map to markers if we have locations
    if (locations.length > 0) {
      const coordinates = locations.map(loc => [loc.longitude, loc.latitude] as [number, number]);
      const bounds = coordinates.reduce((bounds, coord) => {
        return bounds.extend(coord);
      }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

      map.current.fitBounds(bounds, {
        padding: 50
      });
    }
  }, [locations, isTokenSet, onLocationSelect]);

  if (!isTokenSet) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="p-6 max-w-md mx-auto">
          <h3 className="text-lg font-semibold mb-4">Configure Mapbox</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Para exibir o mapa, insira seu token público do Mapbox. 
            Você pode obtê-lo em{' '}
            <a 
              href="https://mapbox.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Token público do Mapbox"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
            />
            <Button 
              onClick={() => setIsTokenSet(true)}
              disabled={!mapboxToken.trim()}
              className="w-full"
            >
              Configurar Mapa
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="relative h-full">
      <div ref={mapContainer} className="absolute inset-0 rounded-lg overflow-hidden" />
    </div>
  );
};

export default MapContainer;
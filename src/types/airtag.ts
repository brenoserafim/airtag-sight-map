export interface AirTagLocation {
  id: string;
  airtag_id: string;
  apple_id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  name?: string;
  battery_level?: number;
}

export interface AirTagDevice {
  id: string;
  name: string;
  apple_id: string;
  locations: AirTagLocation[];
  last_seen: string;
  battery_level?: number;
}

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}
export type TrackerType = 'official' | 'generic';

export interface AirTagLocation {
  id: string;
  airtag_id: string;
  apple_id: string;
  latitude: number;
  longitude: number;
  timestamp: string;
  name?: string;
  battery_level?: number;
  accuracy?: number;
  type: TrackerType;
}

export interface AirTagDevice {
  id: string;
  name: string;
  apple_id: string;
  type: TrackerType;
  locations: AirTagLocation[];
  last_seen: string;
  battery_level?: number;
  accuracy?: number;
}

export interface MapViewport {
  latitude: number;
  longitude: number;
  zoom: number;
}
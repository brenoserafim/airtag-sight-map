import React from 'react';
import { Badge } from '@/components/ui/badge';
import { AirTagDevice } from '@/types/airtag';
import { Smartphone, MapPin, Clock, Users, Cpu } from 'lucide-react';

interface DashboardStatsProps {
  devices: AirTagDevice[];
}

const DashboardStats: React.FC<DashboardStatsProps> = ({ devices }) => {
  const allLocations = devices.flatMap(device => device.locations);
  const uniqueAppleIds = [...new Set(devices.map(device => device.apple_id))];
  const totalLocations = allLocations.length;
  const averageBattery = devices.reduce((acc, device) => acc + (device.battery_level || 0), 0) / devices.length;
  const officialCount = devices.filter(d => d.type === 'official').length;
  const genericCount = devices.filter(d => d.type === 'generic').length;

  return (
    <div className="border-b border-border bg-muted/30 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4 text-airtag-primary" />
            <span className="text-sm font-medium">{officialCount} Oficiais</span>
          </div>
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-airtag-accent" />
            <span className="text-sm font-medium">{genericCount} Genéricos</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-airtag-secondary" />
            <span className="text-sm font-medium">{totalLocations} Localizações</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-airtag-accent" />
            <span className="text-sm font-medium">{uniqueAppleIds.length} Apple IDs</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Badge variant="outline" className="border-airtag-secondary text-airtag-secondary">
            Bateria média: {Math.round(averageBattery)}%
          </Badge>
          <Badge variant="secondary">
            <Clock className="h-3 w-3 mr-1" />
            Sincronizado
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
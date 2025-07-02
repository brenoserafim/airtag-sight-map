import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { AirTagDevice, TrackerType } from '@/types/airtag';
import { Filter, Smartphone, Cpu } from 'lucide-react';

interface TrackerFiltersProps {
  devices: AirTagDevice[];
  selectedType: TrackerType | 'all';
  selectedAppleId: string | 'all';
  onTypeChange: (type: TrackerType | 'all') => void;
  onAppleIdChange: (appleId: string | 'all') => void;
}

const TrackerFilters: React.FC<TrackerFiltersProps> = ({
  devices,
  selectedType,
  selectedAppleId,
  onTypeChange,
  onAppleIdChange,
}) => {
  const uniqueAppleIds = [...new Set(devices.map(device => device.apple_id))];
  const officialCount = devices.filter(d => d.type === 'official').length;
  const genericCount = devices.filter(d => d.type === 'generic').length;

  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filtros
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Tipo de Rastreador</label>
          <Select value={selectedType} onValueChange={onTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os tipos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos ({devices.length})</SelectItem>
              <SelectItem value="official">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-3 w-3" />
                  Oficial ({officialCount})
                </div>
              </SelectItem>
              <SelectItem value="generic">
                <div className="flex items-center gap-2">
                  <Cpu className="h-3 w-3" />
                  Genérico ({genericCount})
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-xs text-muted-foreground mb-1 block">Apple ID</label>
          <Select value={selectedAppleId} onValueChange={onAppleIdChange}>
            <SelectTrigger>
              <SelectValue placeholder="Todos os Apple IDs" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Apple IDs</SelectItem>
              {uniqueAppleIds.map(appleId => (
                <SelectItem key={appleId} value={appleId}>
                  {appleId === 'generic-device' ? 'Dispositivos Genéricos' : appleId}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Badge variant="outline" className="border-airtag-primary text-airtag-primary">
            <Smartphone className="h-3 w-3 mr-1" />
            {officialCount} Oficial
          </Badge>
          <Badge variant="outline" className="border-airtag-accent text-airtag-accent">
            <Cpu className="h-3 w-3 mr-1" />
            {genericCount} Genérico
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackerFilters;
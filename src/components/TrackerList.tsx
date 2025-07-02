import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AirTagDevice } from '@/types/airtag';
import { Smartphone, Cpu, Battery, MapPin, Clock } from 'lucide-react';

interface TrackerListProps {
  devices: AirTagDevice[];
  onDeviceSelect: (device: AirTagDevice) => void;
}

const TrackerList: React.FC<TrackerListProps> = ({ devices, onDeviceSelect }) => {
  const getTypeIcon = (type: 'official' | 'generic') => {
    return type === 'official' ? 
      <Smartphone className="h-3 w-3" /> : 
      <Cpu className="h-3 w-3" />;
  };

  const getTypeColor = (type: 'official' | 'generic') => {
    return type === 'official' ? 
      'border-airtag-primary text-airtag-primary' : 
      'border-airtag-accent text-airtag-accent';
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return 'text-muted-foreground';
    if (level > 50) return 'text-green-500';
    if (level > 20) return 'text-yellow-500';
    return 'text-red-500';
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) return `${diffMins}min atrás`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h atrás`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d atrás`;
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          Lista de Rastreadores ({devices.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12"></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead>Bateria</TableHead>
              <TableHead>Precisão</TableHead>
              <TableHead>Última Atualização</TableHead>
              <TableHead className="w-20"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {devices.map((device) => (
              <TableRow key={device.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell>
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-airtag-primary to-airtag-secondary"></div>
                </TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium text-sm">{device.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {device.apple_id === 'generic-device' ? 'Dispositivo Genérico' : device.apple_id}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={getTypeColor(device.type)}>
                    {getTypeIcon(device.type)}
                    <span className="ml-1 capitalize">{device.type === 'official' ? 'Oficial' : 'Genérico'}</span>
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Battery className={`h-3 w-3 ${getBatteryColor(device.battery_level)}`} />
                    <span className={`text-sm ${getBatteryColor(device.battery_level)}`}>
                      {device.battery_level || 0}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    ±{device.accuracy || 0}m
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">
                      {formatTimestamp(device.last_seen)}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDeviceSelect(device)}
                    className="h-7 px-2"
                  >
                    Ver
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TrackerList;
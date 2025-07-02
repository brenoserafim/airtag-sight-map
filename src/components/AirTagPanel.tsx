import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AirTagDevice, AirTagLocation } from '@/types/airtag';
import { MapPin, Clock, Battery, Smartphone, Cpu, Target } from 'lucide-react';

interface AirTagPanelProps {
  devices: AirTagDevice[];
  selectedLocation?: AirTagLocation;
  onDeviceSelect?: (device: AirTagDevice) => void;
}

const AirTagPanel: React.FC<AirTagPanelProps> = ({ 
  devices, 
  selectedLocation, 
  onDeviceSelect 
}) => {
  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora mesmo';
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d atrás`;
  };

  const getBatteryColor = (level?: number) => {
    if (!level) return 'text-muted-foreground';
    if (level > 50) return 'text-airtag-secondary';
    if (level > 20) return 'text-airtag-accent';
    return 'text-destructive';
  };

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

  return (
    <div className="h-full flex flex-col bg-panel-bg border-r border-panel-border">
      <div className="p-4 border-b border-panel-border">
        <h2 className="text-xl font-semibold text-foreground mb-2">AirTags</h2>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{devices.length} dispositivos</span>
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-4">
          {devices.map((device) => (
            <Card 
              key={device.id}
              className="cursor-pointer transition-all hover:shadow-md hover:shadow-airtag-primary/20 bg-card/50 backdrop-blur-sm"
              onClick={() => onDeviceSelect?.(device)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-base">{device.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={`text-xs ${getTypeColor(device.type)}`}>
                        {getTypeIcon(device.type)}
                        <span className="ml-1 capitalize">{device.type === 'official' ? 'Oficial' : 'Genérico'}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {device.apple_id === 'generic-device' ? 'Dispositivo Genérico' : device.apple_id}
                    </p>
                  </div>
                  {device.battery_level && (
                    <div className={`flex items-center gap-1 ${getBatteryColor(device.battery_level)}`}>
                      <Battery className="h-4 w-4" />
                      <span className="text-xs">{device.battery_level}%</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                  <Clock className="h-3 w-3" />
                  <span>Última localização: {formatTimeAgo(device.last_seen)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {device.locations.length} localizações
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="text-xs border-airtag-primary text-airtag-primary"
                  >
                    Ativo
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}

          {devices.length === 0 && (
            <Card className="p-8 text-center bg-card/30">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">Nenhum AirTag encontrado</h3>
              <p className="text-sm text-muted-foreground">
                Os dispositivos aparecerão aqui quando dados forem recebidos da API.
              </p>
            </Card>
          )}
        </div>
      </ScrollArea>

      {selectedLocation && (
        <>
          <Separator />
          <div className="p-4 bg-panel-bg/80 backdrop-blur-sm">
            <h3 className="text-sm font-semibold mb-3">Localização Selecionada</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rastreador:</span>
                <span>{selectedLocation.name || selectedLocation.airtag_id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tipo:</span>
                <Badge variant="outline" className={`text-xs ${getTypeColor(selectedLocation.type)}`}>
                  {getTypeIcon(selectedLocation.type)}
                  <span className="ml-1 capitalize">{selectedLocation.type === 'official' ? 'Oficial' : 'Genérico'}</span>
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Apple ID:</span>
                <span className="truncate ml-2">
                  {selectedLocation.apple_id === 'generic-device' ? 'Dispositivo Genérico' : selectedLocation.apple_id}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coordenadas:</span>
                <span>{selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Precisão:</span>
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3" />
                  <span>±{selectedLocation.accuracy || 0}m</span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bateria:</span>
                <div className="flex items-center gap-1">
                  <Battery className={`h-3 w-3 ${getBatteryColor(selectedLocation.battery_level)}`} />
                  <span className={getBatteryColor(selectedLocation.battery_level)}>
                    {selectedLocation.battery_level || 0}%
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timestamp:</span>
                <span>{new Date(selectedLocation.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AirTagPanel;
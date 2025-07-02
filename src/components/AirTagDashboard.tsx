import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AirTagDevice, AirTagLocation } from '@/types/airtag';
import AirTagPanel from './AirTagPanel';
import MapContainer from './MapContainer';
import { Smartphone, MapPin, Clock, RefreshCw, Users, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Link } from 'react-router-dom';

const AirTagDashboard: React.FC = () => {
  const [devices, setDevices] = useState<AirTagDevice[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<AirTagLocation>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock data for demonstration
  const mockData: AirTagDevice[] = [
    {
      id: '1',
      name: 'Chaves do Carro',
      apple_id: 'user@example.com',
      last_seen: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15 min ago
      battery_level: 85,
      locations: [
        {
          id: '1',
          airtag_id: 'AT001',
          apple_id: 'user@example.com',
          latitude: 37.7749,
          longitude: -122.4194,
          timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
          name: 'Chaves do Carro',
          battery_level: 85
        }
      ]
    },
    {
      id: '2',
      name: 'Mochila',
      apple_id: 'user@example.com',
      last_seen: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2h ago
      battery_level: 45,
      locations: [
        {
          id: '2',
          airtag_id: 'AT002',
          apple_id: 'user@example.com',
          latitude: 37.7849,
          longitude: -122.4094,
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
          name: 'Mochila',
          battery_level: 45
        }
      ]
    },
    {
      id: '3',
      name: 'Carteira',
      apple_id: 'other@example.com',
      last_seen: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 min ago
      battery_level: 72,
      locations: [
        {
          id: '3',
          airtag_id: 'AT003',
          apple_id: 'other@example.com',
          latitude: 37.7649,
          longitude: -122.4294,
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          name: 'Carteira',
          battery_level: 72
        }
      ]
    }
  ];

  // Load mock data on component mount
  useEffect(() => {
    setDevices(mockData);
  }, []);

  const allLocations = devices.flatMap(device => device.locations);
  const uniqueAppleIds = [...new Set(devices.map(device => device.apple_id))];
  const totalLocations = allLocations.length;
  const averageBattery = devices.reduce((acc, device) => acc + (device.battery_level || 0), 0) / devices.length;

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Dados atualizados",
        description: "Localizações dos AirTags foram atualizadas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro na atualização",
        description: "Não foi possível atualizar os dados. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeviceSelect = (device: AirTagDevice) => {
    if (device.locations.length > 0) {
      setSelectedLocation(device.locations[0]);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-airtag-primary to-airtag-secondary flex items-center justify-center">
              <Smartphone className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">AirTag Tracker</h1>
              <p className="text-sm text-muted-foreground">Monitor de localizações em tempo real</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/api-setup">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                API Setup
              </Button>
            </Link>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-border bg-muted/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Smartphone className="h-4 w-4 text-airtag-primary" />
              <span className="text-sm font-medium">{devices.length} AirTags</span>
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

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-80 flex-shrink-0">
          <AirTagPanel
            devices={devices}
            selectedLocation={selectedLocation}
            onDeviceSelect={handleDeviceSelect}
          />
        </div>

        {/* Map */}
        <div className="flex-1 p-4">
          <Card className="h-full bg-map-bg border-panel-border">
            <CardContent className="p-0 h-full">
              <MapContainer
                locations={allLocations}
                onLocationSelect={setSelectedLocation}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AirTagDashboard;
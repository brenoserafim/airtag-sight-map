import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AirTagDevice, AirTagLocation } from '@/types/airtag';
import { generateMockData } from '@/services/mockData';
import { useToast } from '@/hooks/use-toast';
import DashboardHeader from './DashboardHeader';
import DashboardStats from './DashboardStats';
import AirTagPanel from './AirTagPanel';
import MapContainer from './MapContainer';

const AirTagDashboard: React.FC = () => {
  const [devices, setDevices] = useState<AirTagDevice[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<AirTagLocation>();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load mock data on component mount
  useEffect(() => {
    setDevices(generateMockData());
  }, []);

  const allLocations = devices.flatMap(device => device.locations);

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
      <DashboardHeader onRefresh={handleRefresh} isLoading={isLoading} />
      <DashboardStats devices={devices} />

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
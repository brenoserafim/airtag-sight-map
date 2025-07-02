import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AirTagDevice, TrackerType } from '@/types/airtag';
import TrackerFilters from './TrackerFilters';
import TrackerList from './TrackerList';
import { MapPin, List } from 'lucide-react';

interface TrackerOverviewProps {
  devices: AirTagDevice[];
  onDeviceSelect: (device: AirTagDevice) => void;
}

const TrackerOverview: React.FC<TrackerOverviewProps> = ({ devices, onDeviceSelect }) => {
  const [selectedType, setSelectedType] = useState<TrackerType | 'all'>('all');
  const [selectedAppleId, setSelectedAppleId] = useState<string | 'all'>('all');

  // Filter devices based on selected filters
  const filteredDevices = devices.filter(device => {
    const typeMatch = selectedType === 'all' || device.type === selectedType;
    const appleIdMatch = selectedAppleId === 'all' || device.apple_id === selectedAppleId;
    return typeMatch && appleIdMatch;
  });

  return (
    <div className="h-full flex flex-col">
      <Tabs defaultValue="list" className="h-full flex flex-col">
        <div className="border-b border-border bg-card/30 p-4">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="list" className="flex items-center gap-2">
              <List className="h-4 w-4" />
              Lista Detalhada
            </TabsTrigger>
            <TabsTrigger value="filters" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Visão por Filtros
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent value="list" className="h-full m-0 p-4">
            <TrackerList 
              devices={filteredDevices} 
              onDeviceSelect={onDeviceSelect}
            />
          </TabsContent>

          <TabsContent value="filters" className="h-full m-0 p-4 space-y-4">
            <TrackerFilters
              devices={devices}
              selectedType={selectedType}
              selectedAppleId={selectedAppleId}
              onTypeChange={setSelectedType}
              onAppleIdChange={setSelectedAppleId}
            />
            <TrackerList 
              devices={filteredDevices} 
              onDeviceSelect={onDeviceSelect}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TrackerOverview;
import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, RefreshCw, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  onRefresh: () => void;
  isLoading: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onRefresh, isLoading }) => {
  return (
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
            onClick={onRefresh}
            disabled={isLoading}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
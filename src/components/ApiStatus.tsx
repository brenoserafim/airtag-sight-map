import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Database, 
  Wifi, 
  WifiOff, 
  ExternalLink, 
  AlertCircle,
  CheckCircle2,
  Settings
} from 'lucide-react';

interface ApiStatusProps {
  isConnected?: boolean;
}

const ApiStatus: React.FC<ApiStatusProps> = ({ isConnected = false }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Database className="h-5 w-5 text-airtag-primary" />
          <CardTitle>Status da API e Backend</CardTitle>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Connection Status */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <CheckCircle2 className="h-4 w-4 text-airtag-secondary" />
                <span className="text-sm font-medium">Conectado</span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-destructive" />
                <span className="text-sm font-medium">Desconectado</span>
              </>
            )}
          </div>
          <Badge variant={isConnected ? "secondary" : "destructive"}>
            {isConnected ? "Online" : "Offline"}
          </Badge>
        </div>

        <Separator />

        {/* Backend Setup Alert */}
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Setup do Backend Necessário:</strong> Para receber dados reais dos AirTags, 
            você precisa configurar o backend com Supabase para criar as APIs e banco de dados.
          </AlertDescription>
        </Alert>

        {/* API Endpoints Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Endpoints da API
          </h4>
          
          <div className="bg-muted/50 p-3 rounded-lg text-sm space-y-2">
            <div>
              <code className="text-airtag-primary">POST /api/airtag-locations</code>
              <p className="text-xs text-muted-foreground mt-1">
                Para receber dados do módulo Python/pyicloud
              </p>
            </div>
            <div>
              <code className="text-airtag-primary">GET /api/airtag-locations</code>
              <p className="text-xs text-muted-foreground mt-1">
                Para consultar localizações armazenadas
              </p>
            </div>
            <div>
              <code className="text-airtag-primary">GET /api/airtag-devices</code>
              <p className="text-xs text-muted-foreground mt-1">
                Para listar dispositivos por Apple ID
              </p>
            </div>
          </div>
        </div>

        {/* Data Schema */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold">Estrutura dos Dados</h4>
          <div className="bg-muted/50 p-3 rounded-lg text-sm">
            <pre className="text-xs text-muted-foreground">
{`{
  "airtag_id": "string",
  "apple_id": "string", 
  "latitude": number,
  "longitude": number,
  "timestamp": "ISO string",
  "name": "string (opcional)",
  "battery_level": number (opcional)
}`}
            </pre>
          </div>
        </div>

        {/* Setup Button */}
        <div className="flex justify-center pt-4">
          <Button variant="airtag" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Configurar Backend com Supabase
          </Button>
        </div>

        {/* Current Status */}
        <div className="text-center text-xs text-muted-foreground">
          Atualmente exibindo dados demonstrativos. 
          <br />
          Configure o backend para dados reais dos seus AirTags.
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiStatus;
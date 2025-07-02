import ApiStatus from '@/components/ApiStatus';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApiSetup = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4 flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Dashboard
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-2">Configuração da API</h1>
            <p className="text-muted-foreground">
              Configure o backend para receber dados reais dos AirTags
            </p>
          </div>
        </div>
        
        <ApiStatus />
      </div>
    </div>
  );
};

export default ApiSetup;
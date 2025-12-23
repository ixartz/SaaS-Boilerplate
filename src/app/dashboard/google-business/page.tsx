'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Star, 
  FileText, 
  BarChart3, 
  Settings, 
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Zap,
  Bell,
  RotateCcw as Sync,
  ExternalLink
} from 'lucide-react';

const MetricCard = ({ label, value, trend, icon }: { 
  label: string; 
  value: string; 
  trend?: 'up' | 'down' | 'stable';
  icon?: React.ReactNode;
}) => (
  <div className="flex flex-col items-center gap-1">
    <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
      {label}
    </span>

    <span className="text-2xl font-bold text-primary-foreground dark:text-primary">
      {value}
    </span>

    {trend && (
      <span
        className={
          trend === 'up'
            ? 'text-green-500'
            : trend === 'down'
              ? 'text-red-500'
              : 'text-muted-foreground'
        }
      >
        {trend === 'up' ? '▲' : trend === 'down' ? '▼' : '–'}
      </span>
    )}
  </div>
);

const SectionCard = ({ title, children }: React.PropsWithChildren<{ title: string }>) => (
  <section className="rounded-lg border p-6 shadow-sm dark:border-gray-700">
    <h2 className="mb-4 text-lg font-semibold uppercase tracking-wide text-muted-foreground">
      {title}
    </h2>
    {children}
  </section>
);

interface ConnectionStatus {
  connected: boolean;
  accountName?: string;
  accountEmail?: string;
  role?: string;
  locationsCount?: number;
  lastSync?: Date;
}

export default function GoogleBusinessPage() {
  const [connecting, setConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: false
  });
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  const handleConnect = () => {
    setConnecting(true);
    router.push('/api/google-business/connect');
  };

  const handleDisconnect = async () => {
    try {
      await fetch('/api/google-business/disconnect', { method: 'POST' });
      setConnectionStatus({ connected: false });
    } catch (error) {
      console.error('Error disconnecting:', error);
    }
  };

  const handleRefreshConnection = async () => {
    try {
      const response = await fetch('/api/google-business/status');
      const data = await response.json();
      setConnectionStatus(data);
    } catch (error) {
      console.error('Error refreshing connection:', error);
    }
  };


  const TabButton = ({ 
    active, 
    onClick, 
    children 
  }: { 
    active: boolean; 
    onClick: () => void; 
    children: React.ReactNode 
  }) => (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all ${
        active 
          ? 'bg-background text-foreground shadow-sm' 
          : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {children}
    </button>
  );

  const tabs = [
    { id: 'overview', label: 'Visão Geral' },
    { id: 'locations', label: 'Locais' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'posts', label: 'Posts' },
    { id: 'insights', label: 'Métricas' },
    { id: 'automation', label: 'Automação' }
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-12 p-4 md:p-8">
      {/* TOPO — GOOGLE BUSINESS */}
      <section className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-3xl font-bold uppercase tracking-wide">
          Google Business Profile
        </h1>
        
        <div className="flex items-center gap-2">
          {connectionStatus.connected && (
            <>
              <div className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-900 dark:text-green-200">
                <CheckCircle className="w-3 h-3" />
                Conectado
              </div>
              <Button variant="outline" size="sm" onClick={handleRefreshConnection}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </section>

      {!connectionStatus.connected ? (
        <SectionCard title="Conectar Google Business">
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-2">
              <AlertCircle className="w-6 h-6 text-muted-foreground" />
              <h3 className="text-lg font-semibold">Conecte sua conta</h3>
            </div>
            
            <p className="text-sm text-muted-foreground">
              Conecte sua conta do Google Business Profile para gerenciar locais, reviews e posts diretamente do dashboard
            </p>
            
            <div className="space-y-3">
              <p className="text-sm font-medium text-muted-foreground">
                Com a conexão você poderá:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Listar e gerenciar todos os seus locais</li>
                <li>• Ver e responder a reviews</li>
                <li>• Criar e agendar posts</li>
                <li>• Analisar métricas e insights</li>
                <li>• Sincronizar dados automaticamente</li>
              </ul>
            </div>
            
            <Button 
              onClick={handleConnect}
              disabled={connecting}
              className="w-full"
            >
              {connecting ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Conectando...
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  Conectar Google Business
                </>
              )}
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Os tokens são armazenados com segurança. Você pode revogar o acesso a qualquer momento.
            </p>
          </div>
        </SectionCard>
      ) : (
        <div className="space-y-6">
          <div className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            {tabs.map(tab => (
              <TabButton
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </TabButton>
            ))}
          </div>
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <MetricCard 
                  label="Total de Locais" 
                  value={String(connectionStatus.locationsCount || 0)} 
                  icon={<MapPin className="h-4 w-4 text-muted-foreground" />}
                />
                
                <MetricCard 
                  label="Reviews" 
                  value="--" 
                  icon={<Star className="h-4 w-4 text-muted-foreground" />}
                />
                
                <MetricCard 
                  label="Posts" 
                  value="--" 
                  icon={<FileText className="h-4 w-4 text-muted-foreground" />}
                />
                
                <MetricCard 
                  label="Visualizações" 
                  value="--" 
                  icon={<BarChart3 className="h-4 w-4 text-muted-foreground" />}
                />
              </div>
              
              <SectionCard title="Informações da Conta">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Conta</p>
                    <p className="text-sm">{connectionStatus.accountName || 'Carregando...'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                    <p className="text-sm">{connectionStatus.accountEmail || 'Carregando...'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Função</p>
                    <p className="text-sm">{connectionStatus.role || 'Carregando...'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Última sincronização</p>
                    <p className="text-sm">
                      {connectionStatus.lastSync ? 
                        new Date(connectionStatus.lastSync).toLocaleString('pt-BR') : 
                        'Nunca'
                      }
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-6">
                  <Button onClick={handleRefreshConnection} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Atualizar Dados
                  </Button>
                  <Button onClick={handleDisconnect} variant="destructive">
                    <XCircle className="w-4 h-4 mr-2" />
                    Desconectar
                  </Button>
                </div>
              </SectionCard>
            </div>
          )}
          
          {activeTab === 'locations' && (
            <SectionCard title="Locais">
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Carregando locais...</h3>
                <p className="text-muted-foreground mb-4">
                  Buscando informações dos locais conectados
                </p>
                <Button onClick={handleRefreshConnection} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Carregar Locais
                </Button>
              </div>
            </SectionCard>
          )}
          
          {activeTab === 'reviews' && (
            <SectionCard title="Reviews">
              <div className="text-center py-12">
                <Star className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Carregando reviews...</h3>
                <p className="text-muted-foreground mb-4">
                  Buscando reviews dos seus locais
                </p>
                <Button onClick={handleRefreshConnection} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Carregar Reviews
                </Button>
              </div>
            </SectionCard>
          )}
          
          {activeTab === 'posts' && (
            <SectionCard title="Posts">
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Carregando posts...</h3>
                <p className="text-muted-foreground mb-4">
                  Buscando posts publicados
                </p>
                <div className="flex gap-2 justify-center">
                  <Button onClick={handleRefreshConnection} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Carregar Posts
                  </Button>
                  <Button>
                    <FileText className="w-4 h-4 mr-2" />
                    Novo Post
                  </Button>
                </div>
              </div>
            </SectionCard>
          )}
          
          {activeTab === 'insights' && (
            <SectionCard title="Métricas e Insights">
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Carregando métricas...</h3>
                <p className="text-muted-foreground mb-4">
                  Buscando dados de desempenho
                </p>
                <Button onClick={handleRefreshConnection} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Carregar Métricas
                </Button>
              </div>
            </SectionCard>
          )}
          
          {activeTab === 'automation' && (
            <div className="space-y-6">
              <SectionCard title="Automação com n8n">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="rounded-md bg-muted p-4 text-center">
                    <Bell className="w-8 h-8 mx-auto text-blue-500 mb-2" />
                    <h4 className="font-medium mb-2">Alertas de Reviews</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Receba notificações automáticas quando novos reviews forem publicados
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Configurar
                    </Button>
                  </div>
                  
                  <div className="rounded-md bg-muted p-4 text-center">
                    <FileText className="w-8 h-8 mx-auto text-green-500 mb-2" />
                    <h4 className="font-medium mb-2">Posts Automáticos</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Agende posts automáticos com base em eventos ou datas específicas
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Configurar
                    </Button>
                  </div>
                  
                  <div className="rounded-md bg-muted p-4 text-center">
                    <Sync className="w-8 h-8 mx-auto text-purple-500 mb-2" />
                    <h4 className="font-medium mb-2">Relatórios Periódicos</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      Gere e envie relatórios automáticos de métricas e insights
                    </p>
                    <Button size="sm" variant="outline" className="w-full">
                      Configurar
                    </Button>
                  </div>
                </div>
              </SectionCard>
              
              <SectionCard title="Configurações do n8n">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL do n8n</label>
                    <div className="flex gap-2">
                      <input 
                        type="url" 
                        placeholder="https://n8n.seuservidor.com" 
                        className="flex-1 px-3 py-2 border rounded-md text-sm"
                      />
                      <Button variant="outline" size="sm">
                        Testar
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">API Token</label>
                    <div className="flex gap-2">
                      <input 
                        type="password" 
                        placeholder="Seu token de API" 
                        className="flex-1 px-3 py-2 border rounded-md text-sm"
                      />
                      <Button variant="outline" size="sm">
                        Salvar
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 p-3 bg-muted rounded-lg mt-4">
                  <AlertCircle className="w-4 h-4" />
                  <p className="text-sm text-muted-foreground">
                    Configure sua instância n8n para acessar as automações. 
                    <a href="https://github.com/n8n-io/n8n" target="_blank" rel="noopener noreferrer" className="underline ml-1">
                      Saiba mais sobre n8n
                    </a>
                  </p>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button>
                    <Zap className="w-4 h-4 mr-2" />
                    Conectar n8n
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Abrir n8n
                  </Button>
                </div>
              </SectionCard>
              
              <SectionCard title="Workflows Disponíveis">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Bell className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="font-medium text-sm">Alerta de Novo Review</p>
                        <p className="text-xs text-muted-foreground">
                          Notificação por email quando receber review 1-3 estrelas
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Importar
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="font-medium text-sm">Post Semanal Automático</p>
                        <p className="text-xs text-muted-foreground">
                          Cria posts automáticos toda segunda-feira
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Importar
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Sync className="w-4 h-4 text-purple-500" />
                      <div>
                        <p className="font-medium text-sm">Relatório Mensal</p>
                        <p className="text-xs text-muted-foreground">
                          Envia relatório completo das métricas mensais
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Importar
                    </Button>
                  </div>
                </div>
              </SectionCard>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

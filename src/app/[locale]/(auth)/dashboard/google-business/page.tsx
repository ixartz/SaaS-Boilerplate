'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Sync,
  ExternalLink
} from 'lucide-react';

interface ConnectionStatus {
  connected: boolean;
  accountName?: string;
  accountEmail?: string;
  role?: string;
  locationsCount?: number;
  lastSync?: Date;
}

export default function GoogleMeuNegocioPage() {
  const t = useTranslations('GoogleMeuNegocio');
  const [connecting, setConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    connected: false
  });
  const [activeTab, setActiveTab] = useState('overview');
  const router = useRouter();

  const handleConnect = () => {
    setConnecting(true);
    
    // Abrir popup de login do Google
    const popup = window.open(
      '/api/google-business/connect',
      'googleLogin',
      'width=500,height=600,scrollbars=yes,resizable=yes'
    );

    // Verificar periodicamente se o popup foi fechado
    const checkPopup = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopup);
        setConnecting(false);
        // Verificar status da conexão após o popup fechar
        handleRefreshConnection();
      }
    }, 1000);

    // Limpar recursos se a página for fechada
    const cleanup = () => {
      clearInterval(checkPopup);
      if (popup && !popup.closed) {
        popup.close();
      }
    };

    window.addEventListener('beforeunload', cleanup);
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

  return (
    <div className="container mx-auto max-w-7xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Google Meu Negócio</h1>
          <p className="text-muted-foreground">
            Gerencie seus locais, reviews, posts e métricas do Google Meu Negócio
          </p>
        </div>
        <div className="flex items-center gap-2">
          {connectionStatus.connected && (
            <>
              <Badge variant="outline" className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Conectado
              </Badge>
              <Button variant="outline" size="sm" onClick={handleRefreshConnection}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>

      {!connectionStatus.connected ? (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Conectar Google Business
            </CardTitle>
            <CardDescription>
              Conecte sua conta do Google Meu Negócio para gerenciar locais, reviews e posts diretamente do dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
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
                  Conectar Google Meu Negócio
                </>
              )}
            </Button>
            
            <p className="text-xs text-muted-foreground">
              Os tokens são armazenados com segurança. Você pode revogar o acesso a qualquer momento.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="locations">Locais</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="insights">Métricas</TabsTrigger>
            <TabsTrigger value="automation">Automação</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total de Locais</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{connectionStatus.locationsCount || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    Locais conectados
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reviews</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">--</div>
                  <p className="text-xs text-muted-foreground">
                    Reviews recentes
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Posts</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">--</div>
                  <p className="text-xs text-muted-foreground">
                    Posts publicados
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Visualizações</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">--</div>
                  <p className="text-xs text-muted-foreground">
                    Últimos 30 dias
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Informações da Conta</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                
                <div className="flex gap-2">
                  <Button onClick={handleRefreshConnection} variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Atualizar Dados
                  </Button>
                  <Button onClick={handleDisconnect} variant="destructive">
                    <XCircle className="w-4 h-4 mr-2" />
                    Desconectar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="locations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Locais
                </CardTitle>
                <CardDescription>
                  Gerencie todos os seus locais do Google Meu Negócio
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5" />
                  Reviews
                </CardTitle>
                <CardDescription>
                  Visualize e responda aos reviews dos seus clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="posts">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Posts
                </CardTitle>
                <CardDescription>
                  Crie e gerencie posts para seus locais
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="insights">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Métricas e Insights
                </CardTitle>
                <CardDescription>
                  Analise o desempenho dos seus locais
                </CardDescription>
              </CardHeader>
              <CardContent>
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
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="automation">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Automação com n8n
                  </CardTitle>
                  <CardDescription>
                    Configure automações para posts, alertas e sincronização usando n8n
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-dashed">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-blue-500" />
                          <CardTitle className="text-sm">Alertas de Reviews</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Receba notificações automáticas quando novos reviews forem publicados
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          Configurar
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-dashed">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-green-500" />
                          <CardTitle className="text-sm">Posts Automáticos</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Agende posts automáticos com base em eventos ou datas específicas
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          Configurar
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card className="border-dashed">
                      <CardHeader className="pb-3">
                        <div className="flex items-center gap-2">
                          <Sync className="w-4 h-4 text-purple-500" />
                          <CardTitle className="text-sm">Relatórios Periódicos</CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <p className="text-xs text-muted-foreground">
                          Gere e envie relatórios automáticos de métricas e insights
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          Configurar
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configurações do n8n
                  </CardTitle>
                  <CardDescription>
                    Configure sua instância n8n para automação avançada
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
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
                  
                  <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                    <AlertCircle className="w-4 h-4" />
                    <p className="text-sm text-muted-foreground">
                      Configure sua instância n8n para acessar as automações. 
                      <a href="https://github.com/n8n-io/n8n" target="_blank" rel="noopener noreferrer" className="underline ml-1">
                        Saiba mais sobre n8n
                      </a>
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button>
                      <Zap className="w-4 h-4 mr-2" />
                      Conectar n8n
                    </Button>
                    <Button variant="outline">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Abrir n8n
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Workflows Disponíveis</CardTitle>
                  <CardDescription>
                    Templates de automação prontos para usar
                  </CardDescription>
                </CardHeader>
                <CardContent>
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
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

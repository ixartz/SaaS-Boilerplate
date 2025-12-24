"use client";

import { useEffect, useState } from "react";

// Componentes de visualização simplificados (sem Tremor)
function KPICard({ title, value, change, changeType }: {
  title: string;
  value: string | number;
  change?: number;
  changeType?: 'increase' | 'decrease';
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <div className="flex items-baseline">
        <p className="text-2xl font-bold text-gray-900">{value}</p>
        {change !== undefined && (
          <span className={`ml-2 text-sm font-medium ${
            changeType === 'increase' ? 'text-green-600' : 'text-red-600'
          }`}>
            {changeType === 'increase' ? '↑' : '↓'} {Math.abs(change)}%
          </span>
        )}
      </div>
    </div>
  );
}

function BarChart({ data, title }: {
  data: Array<{ label: string; value: number }>;
  title: string;
}) {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <div className="w-24 text-sm text-gray-600">{item.label}</div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-6">
                <div
                  className="bg-blue-600 h-6 rounded-full flex items-center justify-end pr-2"
                  style={{ width: `${(item.value / maxValue) * 100}%` }}
                >
                  <span className="text-xs text-white font-medium">{item.value}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LineChart({ data, title }: {
  data: Array<{ label: string; value: number }>;
  title: string;
}) {
  const maxValue = Math.max(...data.map(d => d.value));
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (d.value / maxValue) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="relative h-64">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="100"
              y2={y}
              stroke="#e5e7eb"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Line chart */}
          <polyline
            points={points}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
          />
          
          {/* Data points */}
          {data.map((d, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 100 - (d.value / maxValue) * 100;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="2"
                fill="#3b82f6"
              />
            );
          })}
        </svg>
        
        {/* Labels */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-600">
          {data.map((d, i) => (
            <span key={i} className="flex-1 text-center">{d.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function GoogleBusinessInsightsPage() {
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch("/api/google/locations");
      const data = await response.json();

      if (data.success && data.data) {
        setLocations(data.data.locations);
        if (data.data.locations.length > 0) {
          setSelectedLocation(data.data.locations[0].name);
        }
      }
    } catch (err) {
      console.error("Erro ao buscar locais:", err);
    } finally {
      setLoading(false);
    }
  };

  // Dados mock para demonstração
  const kpiData = [
    { title: "Total de Locais", value: locations.length, change: undefined, changeType: undefined },
    { title: "Média de Avaliação", value: "4.5", change: 12, changeType: 'increase' },
    { title: "Total de Reviews", value: "1,234", change: 8, changeType: 'increase' },
    { title: "Posts Publicados", value: "89", change: -3, changeType: 'decrease' },
  ];

  const reviewsByRating = [
    { label: "5 estrelas", value: 456 },
    { label: "4 estrelas", value: 312 },
    { label: "3 estrelas", value: 234 },
    { label: "2 estrelas", value: 156 },
    { label: "1 estrela", value: 76 },
  ];

  const monthlyReviews = [
    { label: "Jan", value: 120 },
    { label: "Fev", value: 145 },
    { label: "Mar", value: 132 },
    { label: "Abr", value: 168 },
    { label: "Mai", value: 189 },
    { label: "Jun", value: 210 },
  ];

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Insights Google Business</h2>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded"></div>
            ))}
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Insights Google Business</h2>

      {/* Seleção de local */}
      {locations.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione um local:
          </label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {locations.map((location) => (
              <option key={location.name} value={location.name}>
                {location.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpiData.map((kpi, index) => (
          <KPICard
            key={index}
            title={kpi.title}
            value={kpi.value}
            change={kpi.change}
            changeType={kpi.changeType}
          />
        ))}
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          data={reviewsByRating}
          title="Distribuição de Reviews por Avaliação"
        />
        <LineChart
          data={monthlyReviews}
          title="Evolução Mensal de Reviews"
        />
      </div>

      {/* Tabela Resumo */}
      <div className="mt-6 bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Resumo dos Locais</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Local
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avaliação
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reviews
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.map((location) => (
                <tr key={location.name}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {location.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Ativo
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    4.5
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    234
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

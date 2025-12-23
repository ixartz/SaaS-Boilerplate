"use client";
import { useEffect, useState } from "react";

interface Location {
  name: string;
  title: string;
  storeCode?: string;
  languageCode?: string;
  locationName?: string;
}

interface LocationsResponse {
  success: boolean;
  data?: {
    accountName: string;
    locations: Location[];
  };
  error?: string;
}

export default function GoogleLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/google/locations");
      const data: LocationsResponse = await response.json();

      if (data.success && data.data) {
        setLocations(data.data.locations);
        setError(null);
      } else {
        setError(data.error || "Erro ao carregar locais");
        setLocations([]);
      }
    } catch (err) {
      setError("Erro de conexão");
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Locais Google Business</h2>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Locais Google Business</h2>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchLocations}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Locais Google Business</h2>
        <button
          onClick={fetchLocations}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Atualizar
        </button>
      </div>

      {locations.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Nenhum local encontrado</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {locations.map((location: any) => (
            <div
              key={location.name}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <h3 className="font-semibold text-lg">{location.title}</h3>
              {location.storeCode && (
                <p className="text-sm text-gray-600">Código: {location.storeCode}</p>
              )}
              {location.languageCode && (
                <p className="text-sm text-gray-600">Idioma: {location.languageCode}</p>
              )}
              <div className="mt-4 flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                  Ver Reviews
                </button>
                <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200">
                  Novo Post
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

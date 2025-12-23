"use client";

import { useEffect, useState } from "react";

interface Review {
  name: string;
  rating: number;
  comment?: string;
  reviewer: {
    displayName: string;
  };
  createTime: string;
  update_time?: string;
}

interface ReviewsResponse {
  success: boolean;
  data?: Review[];
  error?: string;
}

export default function GoogleBusinessReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("");

  useEffect(() => {
    if (selectedLocation) {
      fetchReviews();
    }
  }, [selectedLocation]);

  const fetchReviews = async () => {
    if (!selectedLocation) return;

    try {
      setLoading(true);
      const response = await fetch(`/api/google/reviews?location=${selectedLocation}`);
      const data: ReviewsResponse = await response.json();

      if (data.success && data.data) {
        setReviews(data.data);
        setError(null);
      } else {
        setError(data.error || "Erro ao carregar reviews");
        setReviews([]);
      }
    } catch (err) {
      setError("Erro de conexão");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // Primeiro, buscar os locais disponíveis
  const [locations, setLocations] = useState<any[]>([]);
  
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
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Reviews Google Business</h2>

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

      {loading && selectedLocation ? (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-2/3"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800">{error}</p>
          <button
            onClick={fetchReviews}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Tentar novamente
          </button>
        </div>
      ) : !selectedLocation ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Selecione um local para ver os reviews</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">Nenhum review encontrado</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h4 className="font-semibold">{review.reviewer.displayName}</h4>
                  <div className="flex items-center gap-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600 ml-2">
                      {review.rating}/5
                    </span>
                  </div>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(review.createTime).toLocaleDateString("pt-BR")}
                </span>
              </div>
              {review.comment && (
                <p className="text-gray-700 mt-2">{review.comment}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

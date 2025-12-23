"use client";

import { useEffect, useState } from "react";

interface Post {
  name: string;
  summary: string;
  languageCode: string;
  createTime: string;
  state: string;
}

interface PostsResponse {
  success: boolean;
  data?: Post[];
  error?: string;
}

export default function GoogleBusinessPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [newPostContent, setNewPostContent] = useState("");
  const [creatingPost, setCreatingPost] = useState(false);

  useEffect(() => {
    if (selectedLocation) {
      fetchPosts();
    }
  }, [selectedLocation]);

  const fetchPosts = async () => {
    if (!selectedLocation) return;

    try {
      setLoading(true);
      // Nota: Google Business Posts API não tem endpoint direto para listar posts
      // Por enquanto, vamos mostrar apenas a interface de criação
      setPosts([]);
      setError(null);
    } catch (err) {
      setError("Erro de conexão");
      setPosts([]);
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

  const createPost = async () => {
    if (!newPostContent.trim() || !selectedLocation) return;

    try {
      setCreatingPost(true);
      const response = await fetch("/api/google/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          locationName: selectedLocation,
          summary: newPostContent,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewPostContent("");
        // Poderia buscar os posts novamente se houvesse endpoint
        alert("Post criado com sucesso!");
      } else {
        setError(data.error || "Erro ao criar post");
      }
    } catch (err) {
      setError("Erro de conexão");
    } finally {
      setCreatingPost(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Posts Google Business</h2>

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

      {/* Formulário para criar novo post */}
      {selectedLocation && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Criar Novo Post</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Conteúdo do Post:
              </label>
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Digite o conteúdo do seu post..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
            </div>
            <button
              onClick={createPost}
              disabled={!newPostContent.trim() || creatingPost}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {creatingPost ? "Criando..." : "Criar Post"}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      {/* Lista de posts (placeholder) */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Posts Publicados</h3>
        <p className="text-gray-600">
          A listagem de posts ainda não está implementada. Use o formulário acima para criar novos posts.
        </p>
      </div>
    </div>
  );
}

import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const locationName = searchParams.get("location");
    const timeRange = searchParams.get("timeRange") || "PAST_7_DAYS";

    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return Response.json({ error: "Não autorizado" }, { status: 401 });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.accessToken });

    // Insights API para métricas
    const insightsApi = google.mybusinessinsights({
      version: "v1",
      auth,
    });

    if (!locationName) {
      return Response.json({ error: "Location é obrigatório" }, { status: 400 });
    }

    // Buscar métricas de insights
    const insights = await insightsApi.accounts.locations.fetchInsights({
      name: locationName,
      requestBody: {
        locationNames: [locationName],
        basicRequest: {
          metricRequests: [
            { metric: "QUERIES_DIRECT" },
            { metric: "QUERIES_INDIRECT" },
            { metric: "QUERIES_CHAIN" },
            { metric: "VIEWS_MAPS" },
            { metric: "VIEWS_SEARCH" },
            { metric: "ACTIONS_WEBSITE" },
            { metric: "ACTIONS_CALL" },
            { metric: "ACTIONS_DRIVING_DIRECTIONS" },
          ],
          timeRange: timeRange,
        },
      },
    });

    // Buscar reviews para análise
    const reviewsApi = google.mybusinessreviews({
      version: "v1",
      auth,
    });

    const reviews = await reviewsApi.accounts.locations.reviews.list({
      parent: locationName,
      pageSize: 100,
    });

    // Processar dados
    const reviewsData = reviews.data.reviews || [];
    const totalReviews = reviewsData.length;
    const averageRating = reviewsData.reduce((sum, review) => sum + (review.starRating || 0), 0) / totalReviews || 0;

    // Distribuição de ratings
    const ratingDistribution = [1, 2, 3, 4, 5].map(rating => ({
      rating,
      count: reviewsData.filter(review => review.starRating === rating).length,
    }));

    // Insights metrics
    const insightsData = insights.data.metricValues || [];

    return Response.json({
      success: true,
      data: {
        insights: insightsData,
        reviews: {
          total: totalReviews,
          averageRating: averageRating.toFixed(1),
          distribution: ratingDistribution,
          recentReviews: reviewsData.slice(0, 10),
        },
        timeRange,
      },
    });

  } catch (error: any) {
    console.error("Erro ao buscar insights:", error);
    
    if (error.code === 403) {
      return Response.json(
        { error: "Permissão insuficiente para acessar insights" },
        { status: 403 }
      );
    }

    if (error.code === 401) {
      return Response.json(
        { error: "Acesso expirado. Reconecte sua conta." },
        { status: 401 }
      );
    }

    return Response.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

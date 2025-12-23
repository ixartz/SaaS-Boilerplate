import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const locationName = searchParams.get("location");

    const session = await getServerSession(authOptions);
    if (!session?.accessToken || !locationName) {
      return Response.json({ error: "Requisição inválida" }, { status: 400 });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.accessToken });

    const reviewsApi = google.mybusinessreviews({
      version: "v1",
      auth,
    });

    const reviews = await reviewsApi.accounts.locations.reviews.list({
      parent: locationName,
      pageSize: 50,
    });

    return Response.json({
      success: true,
      data: reviews.data.reviews || [],
    });

  } catch (error: any) {
    console.error("Erro ao buscar reviews:", error);
    
    if (error.code === 403) {
      return Response.json(
        { error: "Permissão insuficiente para acessar reviews" },
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

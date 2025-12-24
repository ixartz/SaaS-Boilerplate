import { google } from "googleapis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { locationName, summary, eventType = "STANDARD" } = body;

    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return Response.json({ error: "Não autorizado" }, { status: 401 });
    }

    if (!locationName || !summary) {
      return Response.json(
        { error: "locationName e summary são obrigatórios" },
        { status: 400 }
      );
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.accessToken });

    const postsApi = google.mybusinessposts({
      version: "v1",
      auth,
    });

    const post = await postsApi.accounts.locations.localPosts.create({
      parent: locationName,
      requestBody: {
        summary,
        languageCode: "pt-BR",
        eventType,
        topicType: "STANDARD",
      },
    });

    return Response.json({
      success: true,
      data: post.data,
    });

  } catch (error: any) {
    console.error("Erro ao criar post:", error);
    
    if (error.code === 403) {
      return Response.json(
        { error: "Permissão insuficiente para criar posts" },
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

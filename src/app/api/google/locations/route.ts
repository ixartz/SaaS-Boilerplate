import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { google } from "googleapis";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.accessToken) {
      return Response.json({ error: "Não autorizado" }, { status: 401 });
    }

    const auth = new google.auth.OAuth2();
    auth.setCredentials({ access_token: session.accessToken });

    const businessInfo = google.mybusinessbusinessinformation({
      version: "v1",
      auth,
    });

    const accounts = await businessInfo.accounts.list();
    const accountName = accounts.data.accounts?.[0]?.name;

    if (!accountName) {
      return Response.json({ error: "Nenhuma conta encontrada" }, { status: 404 });
    }

    const locations = await businessInfo.accounts.locations.list({
      parent: accountName,
    });

    return Response.json({
      success: true,
      data: {
        accountName,
        locations: locations.data.locations || [],
      },
    });

  } catch (error: any) {
    console.error("Erro ao buscar locations:", error);
    
    if (error.code === 403) {
      return Response.json(
        { error: "Permissão insuficiente. Você precisa ser administrador." },
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

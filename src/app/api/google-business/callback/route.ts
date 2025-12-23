import { google } from 'googleapis';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');
  const rawState = searchParams.get('state');
  const state = rawState ? JSON.parse(rawState) : {};
  const error = searchParams.get('error');

  if (!code) {
    return new Response('Missing code', { status: 400 });
  }

  if (error) {
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Erro na Conexão</title>
      </head>
      <body>
        <script>
          setTimeout(() => window.close(), 2000);
        </script>
        <p>Erro na autenticação: ${error}</p>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);

    // TODO: Persist tokens securely in database associated with state.userId / state.orgId.
    // e.g., await saveGoogleTokens({ ...tokens, userId: state.userId, orgId: state.orgId })

    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Conexão Bem-Sucedida</title>
      </head>
      <body>
        <script>
          setTimeout(() => window.close(), 2000);
        </script>
        <p>Conexão estabelecida com sucesso!</p>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  } catch (error) {
    return new Response(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Erro na Conexão</title>
      </head>
      <body>
        <script>
          setTimeout(() => window.close(), 2000);
        </script>
        <p>Erro ao obter tokens: ${error}</p>
      </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
}

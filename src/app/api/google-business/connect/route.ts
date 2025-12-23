import { google } from 'googleapis';
import { auth } from '@clerk/nextjs/server';

export async function GET() {
  const { userId, orgId } = auth();

  if (!userId) {
    return new Response('Unauthorized', { status: 401 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    prompt: 'consent',
    scope: ['https://www.googleapis.com/auth/business.manage'],
    state: JSON.stringify({ userId, orgId }),
  });

  return Response.redirect(url);
}

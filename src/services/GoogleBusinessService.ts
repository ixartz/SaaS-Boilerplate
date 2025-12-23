import { google } from 'googleapis';
import { db } from '@/libs/DB';
import { googleBusinessConnections } from '@/models/GoogleBusiness';
import { eq, and } from 'drizzle-orm';

export type PermissionStatus = 'valid_admin' | 'valid_manager' | 'insufficient_permission' | 'revoked' | 'token_expired';

export interface GoogleBusinessPermissionResult {
  status: PermissionStatus;
  message: string;
  isAdmin: boolean;
  isManager: boolean;
  locationsCount?: number;
}

export class GoogleBusinessService {
  private createOAuth2Client(accessToken: string, refreshToken?: string) {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );

    oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    return oauth2Client;
  }

  async checkPermissions(userId: string): Promise<GoogleBusinessPermissionResult> {
    try {
      // Get the user's Google Business connection
      const connection = await db
        .select()
        .from(googleBusinessConnections)
        .where(and(
          eq(googleBusinessConnections.clerkUserId, userId),
          eq(googleBusinessConnections.status, 'active')
        ))
        .limit(1);

      if (!connection[0]) {
        return {
          status: 'insufficient_permission',
          message: 'Nenhuma conexão com Google Business encontrada',
          isAdmin: false,
          isManager: false,
        };
      }

      const conn = connection[0];

      // Check if token is expired
      if (conn.tokenExpiry && new Date() > conn.tokenExpiry) {
        // Try to refresh token
        const refreshResult = await this.refreshToken(conn.id, conn.refreshToken);
        if (!refreshResult.success) {
          return {
            status: 'token_expired',
            message: 'Token expirado. Reconecte sua conta.',
            isAdmin: false,
            isManager: false,
          };
        }
      }

      // Create authenticated client
      const businessInfo = google.mybusinessbusinessinformation({
        version: 'v1',
        auth: this.createOAuth2Client(conn.accessToken!, conn.refreshToken!),
      });

      // Get account info to check permissions
      try {
        const accountsResponse = await businessInfo.accounts.list();
        const accounts = accountsResponse.data.accounts;

        if (!accounts || accounts.length === 0) {
          return {
            status: 'insufficient_permission',
            message: 'Nenhuma conta do Google Business encontrada',
            isAdmin: false,
            isManager: false,
          };
        }

        // Check user role in the first account
        const account = accounts[0];
        const accountName = account.name || '';
        const role = account.accountName || 'unknown';

        // Get locations to verify admin/manager permissions
        const locationsResponse = await businessInfo.accounts.locations.list({
          parent: accountName,
          pageSize: 10,
        });

        const locations = locationsResponse.data.locations || [];
        const locationsCount = locations.length;

        // Determine permission level based on role and access
        let isAdmin = false;
        let isManager = false;
        let status: PermissionStatus = 'insufficient_permission';
        let message = '';

        // Check if user has admin role (OWNER or primary owner)
        if (role.includes('OWNER') || role.includes('owner')) {
          isAdmin = true;
          status = 'valid_admin';
          message = 'Permissão de administrador confirmada';
        } else if (role.includes('MANAGER') || role.includes('manager')) {
          isManager = true;
          status = 'valid_manager';
          message = 'Permissão de gerente confirmada';
        } else {
          status = 'insufficient_permission';
          message = 'Permissão insuficiente. Você precisa ser administrador ou gerente.';
        }

        // Update permission status in database
        await db
          .update(googleBusinessConnections)
          .set({
            permissionStatus: status,
            googleRole: role,
            updatedAt: new Date(),
          })
          .where(eq(googleBusinessConnections.id, conn.id));

        return {
          status,
          message,
          isAdmin,
          isManager,
          locationsCount,
        };

      } catch (apiError: any) {
        console.error('Google Business API error:', apiError);

        if (apiError.code === 403) {
          return {
            status: 'insufficient_permission',
            message: 'Acesso negado. Verifique se você tem permissão de administrador.',
            isAdmin: false,
            isManager: false,
          };
        }

        if (apiError.code === 401) {
          return {
            status: 'revoked',
            message: 'Acesso revogado. Reconecte sua conta.',
            isAdmin: false,
            isManager: false,
          };
        }

        throw apiError;
      }

    } catch (error) {
      console.error('Error checking Google Business permissions:', error);
      return {
        status: 'insufficient_permission',
        message: 'Erro ao verificar permissões. Tente novamente.',
        isAdmin: false,
        isManager: false,
      };
    }
  }

  async refreshToken(connectionId: number, refreshToken?: string): Promise<{ success: boolean; newAccessToken?: string }> {
    if (!refreshToken) {
      return { success: false };
    }

    try {
      const oauth2Client = new google.auth.OAuth2(
        process.env.GOOGLE_CLIENT_ID,
        process.env.GOOGLE_CLIENT_SECRET,
        process.env.GOOGLE_REDIRECT_URI,
      );

      const { credentials } = await oauth2Client.refreshToken(refreshToken);

      if (credentials.access_token) {
        // Update tokens in database
        await db
          .update(googleBusinessConnections)
          .set({
            accessToken: credentials.access_token,
            tokenExpiry: credentials.expiry_date ? new Date(credentials.expiry_date) : undefined,
            updatedAt: new Date(),
          })
          .where(eq(googleBusinessConnections.id, connectionId));

        return { success: true, newAccessToken: credentials.access_token };
      }

      return { success: false };
    } catch (error) {
      console.error('Error refreshing token:', error);
      return { success: false };
    }
  }

  async revalidatePermissions(userId: string): Promise<GoogleBusinessPermissionResult> {
    return this.checkPermissions(userId);
  }

  getGoogleBusinessManagementUrl(): string {
    return 'https://business.google.com/locations';
  }

  getGoogleBusinessUsersUrl(): string {
    return 'https://business.google.com/users';
  }
}

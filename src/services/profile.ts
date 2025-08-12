import { APIClient } from "./http";

const lrAPIClient = new APIClient(import.meta.env.VITE_LOGINRADIUS_API_BASE_URL);

export interface ProfileRequest {
  FirstName: string | null;
  LastName: string | null;
  UserName: string | null;
}

export const lrProfileAPI = {
  getProfile: async (): Promise<any> => {
    const res = await lrAPIClient.get<any>("/identity/v2/auth/account", {
      params: { apikey: import.meta.env.VITE_LOGINRADIUS_API_KEY }
    });
    return (res as any)?.data ?? res;
  },

  updateProfile: async (payload: ProfileRequest): Promise<any> => {
    const res = await lrAPIClient.put<any>(
      "/identity/v2/auth/account",
      payload,
      {
        params: { apikey: import.meta.env.VITE_LOGINRADIUS_API_KEY }
      }
    );
    return (res as any)?.data ?? res;
  },
};

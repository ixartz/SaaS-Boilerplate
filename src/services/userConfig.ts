
import { APIClient } from "./http";
const organizationAPIClient =new APIClient(import.meta.env.VITE_LOGINRADIUS_WRAPPER_BASE_URL);
export interface UserOrg {
  Id: string;
  Name: string;
}

export interface TenantRole {
  Id: string;
  Name: string;
}

export interface UserInfo {
  Email: string;
  Uid: string;
}

export interface UserConfigResponse {
  success: boolean;
  organizations: UserOrg[];
  tenantRoles: TenantRole[];
  userInfo: UserInfo;
}

export const UserConfigAPI = {
   get: async (): Promise<UserConfigResponse> => {
    const res = await organizationAPIClient.get<UserConfigResponse>("/users/config");
    // Always return the payload
    return (res as any)?.data ?? res;
  },
};

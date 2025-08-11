import { API } from "../services/http";

export interface UserOrg { Id: string; Name: string }
export interface TenantRole { Id: string; Name: string }

export interface UserConfigResponse {
  organizations: UserOrg[];
  tenantRoles: TenantRole[];
}

export const UserConfigAPI = {
  get: () => API.get<UserConfigResponse>("/users/config"),
};

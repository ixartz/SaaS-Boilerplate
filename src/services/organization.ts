import { APIClient } from "./http";
const OrganizationAPIClient = new APIClient(import.meta.env.VITE_LOGINRADIUS_WRAPPER_BASE_URL);

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrganizationDto {
  name: string;
  domain: string;
}

export interface Role {
  Id: string;
  Name: string;
}

export interface Permission {
  Id: string;
  Name: string;
}

export interface OrganizationMember {
  Email: string;
  Uid: string;
  Role: Role;
  Permissions: Permission[];
}


export interface ManageMFAResponse {
  success: boolean;
  MFAMandatory: boolean;
}

export interface InvitationListResponse {
  sucess: boolean; // keep same spelling as API — if typo in backend, TS will match
  members: OrganizationMember[];
}

export const OrganizationAPI = {
  create: (data: CreateOrganizationDto) =>
    OrganizationAPIClient.post<Organization, CreateOrganizationDto>("/organization", data),

  memberList: (orgId: string) => {
    const qs = new URLSearchParams({ org_id: orgId });
    return OrganizationAPIClient.get<InvitationListResponse>(
      `/organization/members?${qs.toString()}`
    );
  },

  removeMember: (orgId: string, memberId: string) => {
    return OrganizationAPIClient.delete(`/organization/members/${memberId}`, {
      params: { org_id: orgId }
    });
  },

 
  manageMFA: (orgId: string, MFAMandatory: boolean) => {
    const qs = new URLSearchParams({ org_id: orgId });
    return OrganizationAPIClient.put<ManageMFAResponse>(
      `/organization/mfa?${qs.toString()}`,
      { MFAMandatory }
    );
  }
};

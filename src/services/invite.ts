// src/services/invite.ts
import { API } from "./http";

export interface InviteRequest {
  email: string;
  roleId: string;          // keep snake_case to match your backend
}

export interface InviteResponse {
  success?: boolean;
  // add fields if your API returns more
}


export interface InvitationWire {
  Id: string;
  Role: string;
  Status: string;
  Email: string;
  InvitedDate: string;
}


export interface InvitationListResponse {
  sucess?: boolean; // note: backend currently spells it 'sucess'
  invitations: InvitationWire[];
}


export const InviteAPI = {
  // orgId goes as a query param ?organization_id=...
  send: (orgId: string, data: InviteRequest) => {
    const qs = new URLSearchParams({ org_id: orgId });
    return API.post<InviteResponse, InviteRequest>(`/organization/invite?${qs.toString()}`, data);
  },
    // GET /invitation?org_id=...
  list: (orgId: string) => {
    const qs = new URLSearchParams({ org_id: orgId });
    return API.get<InvitationListResponse>(`/invitation?${qs.toString()}`);
  }
};



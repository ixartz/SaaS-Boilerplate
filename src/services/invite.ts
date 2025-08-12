// src/services/invite.ts
import { APIClient } from "./http";
const InviteAPIClient = new APIClient(import.meta.env.VITE_LOGINRADIUS_WRAPPER_BASE_URL);

export interface InviteRequest {
    email: string;
    roleId: string; // keep snake_case to match your backend
}

export interface InviteResponse {
    success?: boolean;
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
    send: (orgId: string, data: InviteRequest) => {
        const qs = new URLSearchParams({ org_id: orgId });
        return InviteAPIClient.post<InviteResponse, InviteRequest>(
            `/organization/invite?${qs.toString()}`,
            data
        );
    },

    list: (orgId: string) => {
        const qs = new URLSearchParams({ org_id: orgId });
        return InviteAPIClient.get<InvitationListResponse>(
            `/invitation?${qs.toString()}`
        );
    },

    delete: (invitationId: string, orgId: string) => {
        const qs = new URLSearchParams({ org_id: orgId });
        return InviteAPIClient.delete<InviteResponse>(
            `/invitation/${encodeURIComponent(invitationId)}?${qs.toString()}`
        );
    },
     resend: (invitationId: string, orgId: string) => {
        const qs = new URLSearchParams({ org_id: orgId });
        return InviteAPIClient.put<InviteResponse>(
            `/invitation/${encodeURIComponent(invitationId)}?${qs.toString()}`
        );
    }
};

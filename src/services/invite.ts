// src/services/invite.ts
import { API } from "./http";

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
        return API.post<InviteResponse, InviteRequest>(
            `/organization/invite?${qs.toString()}`,
            data
        );
    },

    list: (orgId: string) => {
        const qs = new URLSearchParams({ org_id: orgId });
        return API.get<InvitationListResponse>(
            `/invitation?${qs.toString()}`
        );
    },

    delete: (invitationId: string, orgId: string) => {
        const qs = new URLSearchParams({ org_id: orgId });
        return API.delete<InviteResponse>(
            `/invitation/${encodeURIComponent(invitationId)}?${qs.toString()}`
        );
    },
     resend: (invitationId: string, orgId: string) => {
        const qs = new URLSearchParams({ org_id: orgId });
        return API.put<InviteResponse>(
            `/invitation/${encodeURIComponent(invitationId)}?${qs.toString()}`
        );
    }
};

import { UserProfile } from '@loginradius/lr-core-js';
interface UseLRAuthReturn {
    MFAToken: string | null;
    setMFAToken: (token: string | null) => void;
    setAccessToken: (token: string | null) => void;
    setPinAuthToken: (token: string | null) => void;
    setConsentToken: (token: string) => void;
    setPrivacyPolicyAccessToken: (token: string | null) => void;
    setInvitationToken: (token: string | null) => void;
    invitationToken: string | null;
    privacyPolicyAccessToken: string | null;
    consentToken: string;
    pinAuthToken: string | null;
    accessToken: string | null;
    email: string | null;
    setEmail: (email: string | null) => void;
    phone: string | null;
    setPhone: (phone: string | null) => void;
    username: string | null;
    setUsername: (username: string | null) => void;
    getUser: () => Promise<UserProfile | null>;
    isAuthenticated: boolean;
    logout: () => void;
}
export declare const useLRAuth: () => UseLRAuthReturn;
export {};
//# sourceMappingURL=useLRAuth.d.ts.map
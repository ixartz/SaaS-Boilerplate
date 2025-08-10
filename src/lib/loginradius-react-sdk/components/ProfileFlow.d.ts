import { ApiError } from './types';
interface ProfileProps {
    logoutRedirectUrl?: string;
    onSuccess?: (data: unknown) => void;
    onError?: (error: ApiError) => void;
}
export declare const ProfileFlow: ({ logoutRedirectUrl, onSuccess, onError, }: ProfileProps) => JSX.Element;
export declare const ProfileLoading: () => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ProfileFlow.d.ts.map
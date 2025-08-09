import { APIError } from '../types';
interface ApiResponse {
    success: boolean;
    token?: string;
    error?: string;
}
interface PasswordlessLoginProps {
    onSuccess?: (response: ApiResponse) => void;
    onError?: (error: APIError) => void;
    onBack: any;
    style?: React.CSSProperties;
    className?: string;
}
export declare const VerifyPasswordlessLoginEmail: ({ onSuccess, onError, onBack, style, className, }: PasswordlessLoginProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=VerifyPasswordlessLoginEmail.d.ts.map
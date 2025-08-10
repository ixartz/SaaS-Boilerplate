import { APIError } from '../types';
interface ApiResponse {
    success: boolean;
    token?: string;
    error?: string;
}
interface PasswordlessLoginProps {
    onSuccess?: (response: ApiResponse) => void;
    onError?: (error: APIError) => void;
    onBack?: () => void;
    style?: React.CSSProperties;
    className?: string;
    handleCaptcha: (formValues: any, callback: (formValues: any) => void) => void;
    captchaComponent?: React.ReactNode;
    onCaptchaRequired?: (isCaptcha: boolean) => void;
}
declare const _default: (props: PasswordlessLoginProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
//# sourceMappingURL=VerifyPasswordlessLoginEmailOTP.d.ts.map
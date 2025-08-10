import { CSSProperties } from 'react';
import { APIError, CaptchaProps } from '../types';
interface ApiResponse {
    success: boolean;
    token?: string;
    error?: string;
}
interface PasswordlessLoginProps extends CaptchaProps {
    onSuccess?: (response: ApiResponse) => void;
    onError?: (error: APIError) => void;
    onBack?: () => void;
    style?: CSSProperties;
    className?: string;
}
declare const _default: (props: PasswordlessLoginProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
//# sourceMappingURL=PasswordlessLogin.d.ts.map
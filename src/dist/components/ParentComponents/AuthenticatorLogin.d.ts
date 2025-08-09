import { default as React } from 'react';
import { ApiResponse } from '@loginradius/lr-core-js';
interface AuthenticatorLoginProps {
    onSuccess?: (response: ApiResponse<any>) => void;
    onError?: (error: string) => void;
    onBack?: () => void;
    onSecondaryAction?: () => void;
    QRCode?: string;
    className?: string;
    style?: React.CSSProperties;
    captchaComponent?: React.ReactNode;
    onCaptchaRequired?: (required: boolean) => void;
    handleCaptcha: (formValues: any, callback: (formValues: any) => void) => Promise<void>;
}
declare const _default: (props: AuthenticatorLoginProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
//# sourceMappingURL=AuthenticatorLogin.d.ts.map
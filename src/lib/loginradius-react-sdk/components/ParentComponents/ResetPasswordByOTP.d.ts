interface ResetPasswordByOTPProps {
    onSuccess?: (response: any) => void;
    onError?: (error: string) => void;
    onBack?: () => void;
    className?: string;
    style?: React.CSSProperties;
    captchaComponent?: React.ReactNode;
    onCaptchaRequired?: (required: boolean) => void;
    handleCaptcha: (formValues: any, callback: (formValues: any) => void) => void;
}
declare const _default: (props: ResetPasswordByOTPProps) => import("react/jsx-runtime").JSX.Element;
export default _default;
//# sourceMappingURL=ResetPasswordByOTP.d.ts.map
interface PrivacyPolicyProps {
    onSuccess?: (data: unknown) => void;
    onError?: (error: string | {
        error: string;
    }) => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const PrivacyPolicy: ({ onSuccess, onError, className, style, }: PrivacyPolicyProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PrivacyPolicy.d.ts.map
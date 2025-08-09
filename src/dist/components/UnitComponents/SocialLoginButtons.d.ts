import { ApiResponse, LoginRadiusOptions, SchemaField } from '@loginradius/lr-core-js';
import { default as React } from 'react';
interface SocialLoginButtonsProps {
    buttonsConfig: SchemaField[];
    options: LoginRadiusOptions;
    onSuccess?: (response: ApiResponse<any>) => void;
    style?: React.CSSProperties;
    className?: string;
}
export declare const SocialLoginButtons: ({ buttonsConfig, style, className, options, }: SocialLoginButtonsProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=SocialLoginButtons.d.ts.map
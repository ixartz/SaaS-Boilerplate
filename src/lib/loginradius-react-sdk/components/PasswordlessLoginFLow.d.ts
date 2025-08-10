import { ApiError, BaseComponentProps } from './types';
interface LoginFlowProps extends BaseComponentProps {
    onSuccess?: (data: unknown) => void;
    onError?: (error: ApiError) => void;
    footerOnClick?: () => void;
}
export declare const PasswordlessLoginFlow: ({ onSuccess, onError, className, style, children, footerOnClick, }: LoginFlowProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=PasswordlessLoginFLow.d.ts.map
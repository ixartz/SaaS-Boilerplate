import { ApiError, BaseComponentProps } from './types';
interface LoginFlowProps extends BaseComponentProps {
    onSuccess?: (data: unknown) => void;
    onError?: (error: ApiError) => void;
    hasFooter?: boolean;
    footerOnClick?: () => void;
}
export declare const LoginFlow: ({ onSuccess, onError, className, style, children, footerOnClick, hasFooter, }: LoginFlowProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=LoginFlow.d.ts.map
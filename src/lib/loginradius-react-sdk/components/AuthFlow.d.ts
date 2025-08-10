import { ApiError, BaseComponentProps } from './types';
interface LoginFlowProps extends BaseComponentProps {
    onSuccess?: (data: unknown) => void;
    onError?: (error: ApiError) => void;
    hasFooter?: boolean;
    footerOnClick?: () => void;
}
export declare const AuthFlow: ({ onSuccess, onError, className, style, children, }: LoginFlowProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AuthFlow.d.ts.map
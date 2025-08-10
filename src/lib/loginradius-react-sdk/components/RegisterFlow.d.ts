import { ApiError, BaseComponentProps } from './types';
interface RegisterFlowProps extends BaseComponentProps {
    onSuccess?: (data: unknown) => void;
    onError?: (error: ApiError) => void;
    hasFooter?: boolean;
    footerOnClick?: () => void;
}
export declare const RegisterFlow: ({ onSuccess, onError, hasFooter, footerOnClick, className, style, children, }: RegisterFlowProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=RegisterFlow.d.ts.map
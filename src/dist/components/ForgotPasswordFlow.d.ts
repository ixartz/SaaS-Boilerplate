import { ApiError, BaseComponentProps } from './types';
interface ForgotPasswordFlowProps extends BaseComponentProps {
    onSuccess?: (data: unknown) => void;
    onError?: (error: ApiError) => void;
}
export declare const ForgotPasswordFlow: ({ onSuccess, onError, className, style, children, }: ForgotPasswordFlowProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ForgotPasswordFlow.d.ts.map
import { ApiError, BaseComponentProps } from './types';
interface LoginFlowProps extends BaseComponentProps {
    onSuccess?: (data: unknown) => void;
    onError?: (error: ApiError) => void;
}
export declare const InvitationFlow: ({ onSuccess, onError, className, style, children, }: LoginFlowProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=InvitationFlow.d.ts.map
import { ApiError } from './types';
interface ApiResponse {
    success: boolean;
    token?: string;
    error?: string;
}
declare const _default: (props: {
    onSuccess?: (response: ApiResponse) => void;
    onError?: (error: ApiError) => void;
    onPasskeyRegistration?: () => void;
    style?: React.CSSProperties;
    className?: string;
    hasFooter?: boolean;
    onFooterClick?: () => void;
}) => import("react/jsx-runtime").JSX.Element;
export default _default;
//# sourceMappingURL=RegisterForm.d.ts.map
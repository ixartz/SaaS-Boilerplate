import { APIError } from '../../components/types';
type UsePasskeyAutofillLoginOptions = {
    isAutoFillEnabled?: boolean;
    onAutofillSuccess: (data: any) => void;
    onAutofillError?: (err: APIError) => void;
};
export declare function usePasskeyAutofillLogin({ isAutoFillEnabled, onAutofillSuccess, onAutofillError, }: UsePasskeyAutofillLoginOptions): void;
export {};
//# sourceMappingURL=usePasskeyAutofillLogin.d.ts.map
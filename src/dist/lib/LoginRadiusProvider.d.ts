import { ReactNode } from 'react';
import { default as LoginRadiusCore, LoginRadiusOptions } from '@loginradius/lr-core-js';
export interface LoginRadiusContextType {
    lrInstance: LoginRadiusCore | null;
    loading: boolean;
    error: Error | null;
    retry: () => void;
    secondFactorConfig: any;
    setSecondFactorConfig: (config: unknown) => void;
    setTimer: (timer: string | null) => void;
    timer: string | null;
    options: LoginRadiusOptions;
    content: any;
}
export declare const LoginRadiusContext: import('react').Context<LoginRadiusContextType>;
interface LoginRadiusProviderProps {
    children: ReactNode;
    options: LoginRadiusOptions;
}
export declare const LoginRadiusProvider: ({ options, children, }: LoginRadiusProviderProps) => import("react/jsx-runtime").JSX.Element;
export declare const useLoginRadiusSDK: () => LoginRadiusContextType;
export {};
//# sourceMappingURL=LoginRadiusProvider.d.ts.map
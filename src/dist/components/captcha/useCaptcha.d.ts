import { CaptchaState, commonError } from '@loginradius/lr-core-js';
export interface UseCaptchaReturn {
    captchaState: CaptchaState;
    isReady: boolean;
    currentToken: string | null;
    containerRef: React.RefObject<HTMLDivElement>;
    executeCaptcha: () => Promise<string | null>;
    handleError: (error: typeof commonError) => void;
    resetCaptcha: () => void;
}
export declare const useCaptcha: (onTokenChange: (token: string | null) => void, onError?: (error: typeof commonError) => void) => UseCaptchaReturn;
//# sourceMappingURL=useCaptcha.d.ts.map
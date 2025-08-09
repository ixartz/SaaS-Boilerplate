export declare const extractConsentValues: (formValues: Record<string, string | boolean | null>) => Record<string, string | boolean | null>;
export declare const validateOtp: (getOtpValue: () => string | undefined, isOtpComplete: () => boolean | undefined, setError?: (message: string) => void) => boolean;
export declare const useAccountLockoutTimer: (lockoutTimeString: string) => {
    minutes: number;
    seconds: number;
    total: number;
    isExpired: boolean;
};
export declare const clearDuoAuthStorage: () => void;
//# sourceMappingURL=helpers.d.ts.map
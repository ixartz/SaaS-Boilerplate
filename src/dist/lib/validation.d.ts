export declare const validateEmail: (value: string) => boolean;
export declare const validatePhone: (value: string) => boolean;
export declare const validatePassword: (value: string) => boolean;
export declare const validateRequired: (value: string | boolean) => boolean;
export declare const validateField: (value: string | boolean, rules?: string, type?: string) => {
    isValid: boolean;
    errorMessage?: string;
};
//# sourceMappingURL=validation.d.ts.map
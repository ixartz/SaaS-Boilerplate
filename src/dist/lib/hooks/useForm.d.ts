import { ChangeEvent, FormEvent } from 'react';
import { Field, FormValues, SubmitCallback } from '../form';
export declare const useForm: (fields: Field[]) => {
    values: FormValues;
    errors: Record<string, string>;
    touched: Record<string, boolean>;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleComponentChange: (name: string) => void;
    handleSubmit: (callback: SubmitCallback) => (e: FormEvent) => void;
    validateForm: () => boolean;
    validateSingleField: (fieldName: string) => string;
    validateCompleteOtp: (otpValue: string, expectedLength?: number) => string;
    isOtpComplete: (otpFields: Field[]) => boolean;
};
//# sourceMappingURL=useForm.d.ts.map
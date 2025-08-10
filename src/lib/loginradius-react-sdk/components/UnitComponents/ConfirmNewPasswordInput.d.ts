import { default as React } from 'react';
import { BaseComponentProps, Field, ValidationResult } from '../types';
interface ConfirmNewPasswordInputProps extends BaseComponentProps {
    field: Field;
    value: string;
    passwordToMatch: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hasError?: boolean;
    onValidation?: (result: ValidationResult) => void;
}
export declare const ConfirmNewPasswordInput: ({ field, value, passwordToMatch, onChange, hasError, onValidation, ...rest }: ConfirmNewPasswordInputProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ConfirmNewPasswordInput.d.ts.map
import { default as React } from 'react';
import { PasswordInputProps, ValidationResult } from '../types';
interface CurrentPasswordInputProps extends Omit<PasswordInputProps, 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export declare const CurrentPINInput: ({ onValidation, ...props }: CurrentPasswordInputProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CurrentPINInput.d.ts.map
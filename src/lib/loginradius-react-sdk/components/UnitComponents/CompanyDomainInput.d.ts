import { default as React } from 'react';
import { TextInputProps, ValidationResult } from '../types';
interface CompanyDomainInputProps extends Omit<TextInputProps, 'type' | 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export declare const CompanyDomainInput: ({ onValidation, ...props }: CompanyDomainInputProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=CompanyDomainInput.d.ts.map
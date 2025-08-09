import { default as React } from 'react';
import { TextInputProps, ValidationResult } from '../types';
interface AnswerInputProps extends Omit<TextInputProps, 'type' | 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export declare const AnswerInput: ({ onValidation, ...props }: AnswerInputProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=AnswerInput.d.ts.map
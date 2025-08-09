import { default as React, ChangeEvent } from 'react';
import { Field } from '../../lib/form';
interface PasswordInputProps {
    field: Field;
    fieldId?: string;
    value: string;
    error?: string;
    touched?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const PasswordInput: React.FC<PasswordInputProps>;
export {};
//# sourceMappingURL=PasswordInput.d.ts.map
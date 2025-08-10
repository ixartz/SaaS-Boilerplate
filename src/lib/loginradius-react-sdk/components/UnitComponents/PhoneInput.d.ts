import { default as React, ChangeEvent } from 'react';
import { Field } from '../../lib/form';
interface PhoneInputProps {
    field: Field;
    fieldId?: string;
    value: string;
    error?: string;
    touched?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    className?: string;
    style?: React.CSSProperties;
    switchText?: string;
    onSwitchClick?: () => void;
}
export declare const PhoneInput: React.FC<PhoneInputProps>;
export {};
//# sourceMappingURL=PhoneInput.d.ts.map
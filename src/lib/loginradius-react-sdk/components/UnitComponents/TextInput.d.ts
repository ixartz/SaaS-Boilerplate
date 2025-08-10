import { default as React, ChangeEvent } from 'react';
import { Field } from '../../lib/form';
export interface TextInputProps {
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
export declare const TextInput: React.FC<TextInputProps>;
//# sourceMappingURL=TextInput.d.ts.map
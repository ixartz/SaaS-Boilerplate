import { default as React, ChangeEvent } from 'react';
import { Field } from '../../lib/form';
interface TextAreaProps {
    field: Field;
    fieldId?: string;
    disabled?: boolean;
    value: string;
    error?: string;
    touched?: boolean;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const TextArea: React.FC<TextAreaProps>;
export {};
//# sourceMappingURL=TextArea.d.ts.map
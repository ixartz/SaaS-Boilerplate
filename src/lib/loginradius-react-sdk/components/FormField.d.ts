import { default as React, ChangeEvent } from 'react';
import { Field } from '../lib/form';
interface FormFieldProps {
    field: Field;
    fieldId: string;
    value: string | boolean | null;
    error?: string;
    touched?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    handleComponentChange?: (name: string) => void;
}
export declare const FormField: React.FC<FormFieldProps>;
export {};
//# sourceMappingURL=FormField.d.ts.map
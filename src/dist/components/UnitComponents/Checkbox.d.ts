import { ChangeEvent } from 'react';
import { Field } from '../../lib/form';
interface CheckboxProps {
    field: Field;
    fieldId?: string;
    value: boolean;
    error?: string;
    touched?: boolean;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
export declare const Checkbox: ({ field, fieldId, value, error, touched, onChange, }: CheckboxProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=Checkbox.d.ts.map
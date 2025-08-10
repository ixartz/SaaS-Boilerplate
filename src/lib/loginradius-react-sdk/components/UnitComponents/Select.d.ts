import { default as React, ChangeEvent } from 'react';
import { Field } from '../../lib/form';
interface CustomSelectProps {
    field: Field;
    fieldId?: string;
    value: string;
    error?: string;
    touched?: boolean;
    hasLabel?: boolean;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    optionsClassName?: string;
    style?: React.CSSProperties;
}
export declare const Select: React.FC<CustomSelectProps>;
export {};
//# sourceMappingURL=Select.d.ts.map
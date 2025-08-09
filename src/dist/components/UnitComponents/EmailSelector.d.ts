import { default as React } from 'react';
import { Field } from '../../lib/form';
interface EmailSelectorProps {
    field: Field;
    value: string;
    error?: string;
    touched?: boolean;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    className?: string;
    style?: React.CSSProperties;
}
export declare const EmailSelector: React.FC<EmailSelectorProps>;
export {};
//# sourceMappingURL=EmailSelector.d.ts.map
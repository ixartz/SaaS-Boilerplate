export type ValidationRule = 'required' | 'valid_email' | `min_length[${number}]` | `max_length[${number}]` | 'numeric' | `matches[${string}]`;
export type FieldType = 'string' | 'text' | 'email' | 'password' | 'checkbox' | 'multi' | 'option' | 'hidden' | string;
export interface FieldOption {
    name: string;
    value: string;
}
export interface Field {
    name: string;
    display: string;
    type?: FieldType;
    rules?: string;
    options?: Array<{
        text: string;
        name: string;
        value: string;
    }>;
    autoComplete?: string;
    disabled?: boolean;
    readonly?: boolean;
    value?: string | boolean | null;
    Checked?: boolean;
    permission?: string;
    Parent?: any;
    ParentDataSource?: any;
    DataSource?: any;
}
export type FormValues = Record<string, string | boolean | null>;
export type ValidateFunction = (field: Field, value: any) => string;
export type SubmitCallback = (values: FormValues) => void;
//# sourceMappingURL=form.d.ts.map
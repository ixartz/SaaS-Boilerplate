import { default as React } from 'react';
interface MFAMethod {
    id: string;
    name: string;
    description?: string;
}
interface MFAMethodSelectorProps {
    isRequired: boolean;
    methods: MFAMethod[];
    style: React.CSSProperties;
    onBack?: () => void;
    className: string;
    onMethodSelect: (method: MFAMethod) => void;
}
export declare const MFAMethodSelector: ({ isRequired, methods, onMethodSelect, onBack, className, style, }: MFAMethodSelectorProps) => import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=MFAMethodSelector.d.ts.map
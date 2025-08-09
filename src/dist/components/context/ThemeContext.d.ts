import { default as React } from 'react';
export interface Theme {
    body?: {
        bg?: string;
        text?: string;
        subtext?: string;
        primary?: string;
        primaryring?: string;
    };
    card?: {
        bg?: string;
        boxshadow?: string;
    };
    input?: {
        border?: string;
        bg?: string;
    };
    button?: {
        bg?: string;
        text?: string;
    };
    link?: {
        text?: string;
    };
    logo?: string;
    fontFamily?: string;
}
export interface Content {
    [key: string]: ComponentContent;
}
interface ComponentContent {
    [key: string]: string;
}
interface ThemeContextType {
    theme: Theme;
    content?: Content;
}
export declare const ThemeProvider: ({ theme, children, }: {
    theme?: Theme;
    content?: Content;
    children: React.ReactNode;
}) => import("react/jsx-runtime").JSX.Element;
export declare const useTheme: () => ThemeContextType;
export {};
//# sourceMappingURL=ThemeContext.d.ts.map
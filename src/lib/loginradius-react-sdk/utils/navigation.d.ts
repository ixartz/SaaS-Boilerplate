declare const useSafeNavigation: () => {
    navigateReplace: (path: any) => void;
    getSearchParams: () => URLSearchParams;
    getLocation: () => Location | {
        href: string;
        search: string;
    };
};
export { useSafeNavigation };
//# sourceMappingURL=navigation.d.ts.map
import { default as React } from 'react';
interface LoadingFormSkeletonProps {
    loading: boolean;
    error?: {
        message: string;
    } | null;
    retry?: () => void;
    labels?: {
        loading?: string;
        error?: string;
        retry?: string;
    };
}
export declare const LoadingFormSkeleton: React.FC<LoadingFormSkeletonProps>;
export {};
//# sourceMappingURL=LoadingFormSkeleton.d.ts.map
import { default as React } from 'react';
import { CaptchaProps } from '../types';
declare const withCaptcha: <P extends object>(prop: {
    action: string;
}, WrappedComponent: React.ComponentType<P & CaptchaProps>) => (props: P) => import("react/jsx-runtime").JSX.Element;
export default withCaptcha;
//# sourceMappingURL=withCaptcha.d.ts.map
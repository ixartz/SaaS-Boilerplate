import { LoginRadiusOptions, Utilities } from '@loginradius/lr-core-js';
import { ApiError } from '../components/types';
type ActionType = 'login' | 'registration' | 'forgotPassword' | 'auth' | 'orginvite' | 'passwordlessLogin' | 'profileEditor';
interface InitOptions {
    container: string | HTMLElement;
    onSuccess?: (data: any) => void;
    onError?: (errors: ApiError) => void;
}
export declare class LoginRadiusSDK {
    private options;
    private roots;
    util: Utilities;
    $hooks: any;
    constructor(options: LoginRadiusOptions);
    init(action: ActionType, options: InitOptions): void;
    destroy(containerId: string): void;
}
export {};
//# sourceMappingURL=loginradiusv3.d.ts.map
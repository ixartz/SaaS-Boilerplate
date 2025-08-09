import { ConsentOptions } from '@loginradius/lr-core-js';
import { KeyboardEvent, ClipboardEvent } from 'react';
import * as HeroIcons from '@heroicons/react/24/outline';
export interface Theme {
    body?: {
        bg?: string;
        text?: string;
        primary?: string;
        primaryring?: string;
    };
    card?: {
        bg?: string;
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
}
export interface BaseComponentProps {
    className?: string;
    style?: React.CSSProperties;
    theme?: Theme;
    backgroundColor?: string;
    textColor?: string;
    borderColor?: string;
    children?: React.ReactNode;
}
export interface ApiError {
    error: string;
    errorCode?: number;
    data?: any;
}
export interface Field {
    name: string;
    display: string;
    rules?: string;
    description?: string;
}
export interface PasswordInputProps extends BaseComponentProps {
    field: Field;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hasError?: boolean;
    onValidation?: (result: ValidationResult) => void;
    passwordToMatch?: string;
}
export interface EmailInputProps {
    field: Field;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hasError?: boolean;
    className?: string;
    style?: React.CSSProperties;
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    theme?: Theme;
    onValidation?: (result: ValidationResult) => void;
}
export interface SignInButtonProps extends BaseComponentProps {
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    formType?: string;
    ButtonText?: string;
    ButtonId?: string;
    onClick?: (e?: any) => void;
    onSuccess?: (response: any) => void;
    onError?: (error: ApiError) => void;
    disabled?: boolean;
}
export interface CheckboxProps extends BaseComponentProps {
    field: Field;
    value: boolean;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hasError?: boolean;
}
export interface ForgotPasswordLinkProps extends BaseComponentProps {
    onClick?: () => void;
}
export interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}
export interface TextInputProps extends BaseComponentProps {
    type: string;
    field: Field;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hasError?: boolean;
    onValidation?: (result: ValidationResult) => void;
}
export interface TextAreaProps extends BaseComponentProps {
    field: Field;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    hasError?: boolean;
    onValidation?: (result: ValidationResult) => void;
}
export interface UsernameInputProps extends BaseComponentProps {
    field: Field;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    hasError?: boolean;
    onValidation?: (result: ValidationResult) => void;
}
export interface ButtonProps extends BaseComponentProps {
    ButtonText?: string;
    ButtonId?: string;
    loading?: boolean;
    type?: 'button' | 'submit' | 'reset';
    icon?: keyof typeof import('@heroicons/react/24/outline') | '';
    iconPosition?: 'left' | 'right';
    onClick?: (e: any) => void;
}
export interface ConfirmNewPINInputProps extends Omit<TextInputProps, 'type' | 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    pinToMatch: string;
    onValidation?: (result: ValidationResult) => void;
}
export interface ConfirmPasswordInputProps extends Omit<PasswordInputProps, 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    passwordToMatch: string;
    onValidation?: (result: ValidationResult) => void;
}
export interface ConsentListProps extends BaseComponentProps {
    consents: ConsentOptions;
    onConsentChange: (event: string, value: boolean) => void;
}
export interface EmailDisplayProps extends BaseComponentProps {
    email: string;
}
export interface EventSelectorProps extends BaseComponentProps {
    field: Field & {
        options?: {
            value: string;
            text?: string;
            name?: string;
        }[];
    };
    value: string | null;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    hasError?: boolean;
}
export interface FullNameInputProps extends Omit<TextInputProps, 'type' | 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export interface IconProps extends BaseComponentProps {
    name: keyof typeof HeroIcons;
    size?: number | string;
}
export interface InvitationCodeInputProps extends Omit<TextInputProps, 'type' | 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
interface Account {
    id: string;
    provider: string;
}
export interface LinkedAccountsListProps extends BaseComponentProps {
    accounts: Account[];
}
export interface NewEmailInputProps extends Omit<EmailInputProps, 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export interface NewPasswordInputProps extends Omit<PasswordInputProps, 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export interface NewPINInputProps extends Omit<TextInputProps, 'type' | 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export interface NewUsernameInputProps extends Omit<UsernameInputProps, 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export interface PasswordlessLoginProps {
    email: string;
    onEmailChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onSendLink: () => void;
    className?: string;
}
export interface PhoneInputProps extends BaseComponentProps {
    field: Field;
    value: string;
    error?: string;
    touched?: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export interface PINInputProps extends Omit<TextInputProps, 'type' | 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export interface ProfilePictureUploaderProps extends BaseComponentProps {
    onFileChange?: (file: File | undefined) => void;
    initialImage?: string;
}
interface Option {
    value: string;
    text?: string;
    name?: string;
}
export interface SelectProps extends BaseComponentProps {
    field: Field & {
        options?: Option[];
    };
    value: string | null;
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    hasError?: boolean;
}
interface Session {
    id: string;
    device: string;
    lastActive: string;
}
export interface SessionListProps extends BaseComponentProps {
    sessions: Session[];
}
export interface SetPasswordInputProps extends Omit<PasswordInputProps, 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export interface SocialLoginButtonProps extends BaseComponentProps {
    provider: 'google' | 'facebook' | 'twitter';
    onClick: () => void;
}
export interface TokenValidatorProps extends Omit<TextInputProps, 'type' | 'onChange'> {
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onValidation?: (result: ValidationResult) => void;
}
export interface AccessDeniedPromptProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
    message?: string;
}
export interface AddEmailProps extends BaseComponentProps {
    onSuccess?: (data: {
        email: string;
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface AutoLoginProps extends BaseComponentProps {
    onSuccess?: (data: {
        token: string;
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface BackupCodeButtonProps extends BaseComponentProps {
    onSuccess?: (data: {
        codes: string[];
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface BusinessLinkedAccountsProps extends BaseComponentProps {
    onSuccess?: (unlinkedAccount: string) => void;
    onError?: (error: ApiError) => void;
    accounts?: {
        id: string;
        provider: string;
    }[];
}
export interface BusinessLoginProps extends BaseComponentProps {
    onSuccess?: (data: {
        domain: string;
        email: string;
        password: string;
    }) => void;
    onError?: (error: ApiError) => void;
    initialDomain?: string;
    initialEmail?: string;
    initialPassword?: string;
}
export interface BusinessProfileEditorProps extends BaseComponentProps {
    onSuccess?: (data: {
        fullName: string;
        avatar?: File;
    }) => void;
    onError?: (error: ApiError) => void;
    initialFullName?: string;
}
export interface BusinessRegistrationProps extends BaseComponentProps {
    onSuccess?: (data: {
        domain: string;
        email: string;
        password: string;
    }) => void;
    onError?: (error: ApiError) => void;
    initialDomain?: string;
    initialEmail?: string;
}
export interface BusinessSSOLoginProps extends BaseComponentProps {
    onSuccess?: (provider: string) => void;
    onError?: (error: ApiError) => void;
    providers?: string[];
}
export interface ChangePasswordProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}
export interface ChangePINProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}
export interface ChangeUsernameProps extends BaseComponentProps {
    onSuccess?: (data: {
        username: string;
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface ConsentEditorProps extends BaseComponentProps {
    onSuccess?: (data: any) => void;
    onError?: (error: ApiError) => void;
    initialConsents?: ConsentOptions;
}
export interface ConsentManagementProps extends BaseComponentProps {
    onSuccess?: (consents: Record<string, boolean>) => void;
    onError?: (error: ApiError) => void;
    initialConsents?: Record<string, boolean>;
    events?: string[];
}
export interface CreateTwoFactorAuthenticationProps extends BaseComponentProps {
    onSuccess?: (data: {
        method: string;
        code: string;
    }) => void;
    onError?: (error: ApiError) => void;
    methods: {
        value: string;
        text: string;
        name: string;
    }[];
}
export interface CrossDeviceSSOProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}
export interface DeleteUserProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}
export interface DeleteUserConfirmProps extends BaseComponentProps {
    onSuccess?: (data: {
        code: string;
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface ForgotPasswordProps extends BaseComponentProps {
    onSuccess?: (data: any) => void;
    onError?: (error: ApiError) => void;
    onBack?: () => void;
}
export interface ForgotPINProps extends BaseComponentProps {
    onSuccess?: (data: {
        email: string;
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface HomeButtonProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}
export interface InstantLinkLoginProps extends BaseComponentProps {
    onSuccess?: (data: {
        link: string;
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface InviteBasedRegistrationProps extends BaseComponentProps {
    onSuccess?: (data: any) => void;
    onError?: (error: ApiError) => void;
}
export interface LinkAccountProps extends BaseComponentProps {
    onSuccess?: (data: {
        provider: string;
    }) => void;
    onError?: (error: ApiError) => void;
    providers: {
        value: string;
        text: string;
        name: string;
    }[];
}
export interface LoginProps extends BaseComponentProps {
    onSuccess?: (data: {
        identifier: string;
        provider?: string;
    }) => void;
    onError?: (error: ApiError) => void;
    allowedProviders?: ('google' | 'facebook' | 'twitter')[];
}
export interface LogoutButtonProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}
export interface MagicLinkLoginProps extends BaseComponentProps {
    onSuccess?: (data: any) => void;
    onError?: (error: ApiError) => void;
    onBack?: () => void;
    initialEmail?: string;
}
export interface MessageDisplayProps extends BaseComponentProps {
    message: string;
    type?: 'info' | 'success' | 'error' | 'warning';
}
export interface NoRegistrationPasswordLessLoginProps extends BaseComponentProps {
    onSuccess?: (data: {
        email: string;
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface OneTouchLoginProps extends BaseComponentProps {
    onSuccess?: (data: {
        email: string;
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface OTPLoginProps extends BaseComponentProps {
    onSuccess?: (data: any) => void;
    onBack?: (data?: any) => void;
    onSecondaryAction?: () => void;
    onError?: (error: ApiError) => void;
    initialPhone?: string;
    captchaComponent?: React.ReactNode;
    onCaptchaRequired?: (required: boolean) => void;
    handleCaptcha: (formValues: any, callback: (formValues: any) => void) => void;
}
export interface PasskeyLoginProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}
export interface APIError {
    error: string;
    errorCode?: number;
    data?: any;
    success?: boolean;
}
export interface PINReauthenticationProps extends BaseComponentProps {
    onSuccess?: (data: any) => void;
    onError?: (error: APIError) => void;
}
export interface ProfileEditorProps extends BaseComponentProps {
    onSuccess?: (data: {
        fullName: string;
        avatar?: File;
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface RegistrationProps extends BaseComponentProps {
    onSuccess?: (data: {
        email: string;
        username: string;
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface RemoveEmailProps extends BaseComponentProps {
    onSuccess?: (data: {
        email: string;
    }) => void;
    onError?: (error: ApiError) => void;
    emails: {
        value: string;
        text: string;
        name: string;
    }[];
}
export interface ResendBusinessVerificationEmailProps extends BaseComponentProps {
    onSuccess?: (email: string) => void;
    onError?: (error: ApiError) => void;
    email: string;
}
export interface ResendVerificationEmailProps extends BaseComponentProps {
    onSuccess?: (email: string) => void;
    onError?: (error: ApiError) => void;
    email: string;
}
export interface ResetBackupCodeButtonProps extends BaseComponentProps {
    onSuccess?: (data: {
        codes: string[];
    }) => void;
    onError?: (error: ApiError) => void;
}
export interface ResetPasskeyProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}
export interface ResetPasswordBySecurityQuestionProps extends BaseComponentProps {
    onSuccess?: (data: {
        answer: string;
    }) => void;
    onError?: (error: ApiError) => void;
    question: string;
}
export interface ResetPINProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}
export interface ResetPINBySecurityQuestionProps extends BaseComponentProps {
    onSuccess?: (data: {
        answer: string;
    }) => void;
    onError?: (error: ApiError) => void;
    question: string;
}
export interface SessionControlProps extends BaseComponentProps {
    onSuccess?: (action: 'logout') => void;
    onError?: (error: ApiError) => void;
    sessions?: {
        id: string;
        device: string;
        lastActive: string;
    }[];
}
export interface SmartLoginProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
}
export interface SSOLoginProps extends BaseComponentProps {
    onSuccess?: (data: {
        provider: string;
    }) => void;
    onError?: (error: ApiError) => void;
    providers: {
        value: string;
        text: string;
        name: string;
    }[];
}
export interface SSONotLoginThenLogoutProps extends BaseComponentProps {
    onSuccess?: () => void;
    onError?: (error: ApiError) => void;
    isLoggedIn: boolean;
}
export interface UnlinkAccountProps extends BaseComponentProps {
    onSuccess?: (data: {
        account: string;
    }) => void;
    onError?: (error: ApiError) => void;
    accounts: {
        value: string;
        text: string;
        name: string;
    }[];
}
export interface UpdateBusinessPhoneProps extends BaseComponentProps {
    onSuccess?: (data: {
        phone: string;
        code: string;
    }) => void;
    onError?: (error: ApiError) => void;
    initialPhone?: string;
}
export interface UpdatePhoneProps extends BaseComponentProps {
    onSuccess?: (data: any) => void;
    onError?: (error: ApiError) => void;
    onBack?: () => void;
}
export interface UpdateSecurityQuestionProps extends BaseComponentProps {
    onSuccess?: (data: {
        question: string;
        answer: string;
    }) => void;
    onError?: (error: ApiError) => void;
    questions: {
        value: string;
        text: string;
        name: string;
    }[];
}
export interface VerifyEmailProps extends BaseComponentProps {
    onSuccess?: (data: {
        code: string;
        email?: string;
    }) => void;
    onError?: (error: ApiError) => void;
}
export type HandleCaptcha = (formData: any, Submit: (data: any) => Promise<any>) => Promise<any>;
export interface CaptchaProps {
    captchaComponent: React.ReactNode;
    onCaptchaRequired?: (isCaptcha: boolean) => void;
    handleCaptcha: HandleCaptcha;
}
export interface OTPInputProps {
    onComplete?: (otp: string) => void;
    onChange?: (otp: string) => void;
    disabled?: boolean;
    display?: string;
    className?: string;
    inputClassName?: string;
    error?: string;
    autoFocus?: boolean;
    placeholder?: string;
    autoSubmit?: boolean;
}
export interface OTPInputRef {
    clear: () => void;
    focus: () => void;
    getValue: () => string;
    setValue: (value: string) => void;
    getErrors: () => Record<string, string>;
    validateOtp: () => boolean;
    isOtpComplete: () => boolean;
}
export interface OtpInputProps {
    field: Field;
    index: number;
    id: string;
    value: string;
    placeholder?: string;
    displayError: boolean;
    inputClassName?: string;
    disabled?: boolean;
    isComplete?: boolean;
    onChange: (element: HTMLInputElement, index: number) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>, index: number) => void;
    onPaste: (e: ClipboardEvent<HTMLInputElement>) => void;
    onFocus: (index: number) => void;
    setInputRef: (el: HTMLInputElement | null, index: number) => void;
}
export {};
//# sourceMappingURL=types.d.ts.map
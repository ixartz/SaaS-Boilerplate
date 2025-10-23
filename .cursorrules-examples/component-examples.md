# React Component Examples

## Custom Button Component
```tsx
/**
 * Custom Button Component with variant and size support
 * 
 * @file src/components/ui/custom-button.tsx
 * @description A customizable button component with variant and size support
 */

import { Button } from '@/components/ui/button';
import { cn } from '@/utils/Helpers';
import type { ButtonHTMLAttributes } from 'react';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export function CustomButton({ 
  variant = 'primary', 
  size = 'md', 
  className,
  children,
  ...props 
}: CustomButtonProps) {
  const buttonClasses = cn(
    'custom-button',
    variant === 'primary' && 'bg-primary text-primary-foreground',
    size === 'sm' && 'px-3 py-1.5 text-sm',
    className
  );

  return (
    <Button className={buttonClasses} {...props}>
      {children}
    </Button>
  );
}
```

## User Profile Component
```tsx
/**
 * UserProfile component for displaying and editing user information
 * 
 * @file src/components/UserProfile.tsx
 * @description A comprehensive user profile component
 */

interface UserProfileProps {
  user: User;
  onUpdate: (user: User) => void;
  editable?: boolean;
}

export function UserProfile({ 
  user, 
  onUpdate, 
  editable = false 
}: UserProfileProps) {
  return (
    <div className="user-profile">
      <h2>{user.firstName} {user.lastName}</h2>
      <p>{user.email}</p>
      {editable && (
        <button onClick={() => onUpdate(user)}>
          Edit Profile
        </button>
      )}
    </div>
  );
}
```

## Form Component with Validation
```tsx
/**
 * User Form Component with Validation
 * 
 * @file src/components/forms/UserForm.tsx
 * @description Form component with React Hook Form and Zod validation
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const userFormSchema = z.object({
  email: z.string().email('Invalid email address'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().min(18, 'Must be at least 18 years old').optional(),
});

type FormData = z.infer<typeof userFormSchema>;

interface UserFormProps {
  onSubmit: (data: FormData) => void;
  initialData?: Partial<FormData>;
  isLoading?: boolean;
}

export function UserForm({ onSubmit, initialData, isLoading = false }: UserFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues: initialData,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="email">Email Address *</label>
        <input
          id="email"
          type="email"
          {...register('email')}
          className="w-full px-3 py-2 border rounded-md"
        />
        {errors.email && (
          <p className="text-red-600">{errors.email.message}</p>
        )}
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}
```

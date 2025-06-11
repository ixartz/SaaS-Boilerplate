import type * as LabelPrimitive from '@radix-ui/react-label';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
import { Controller, FormProvider } from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { cn } from '@/utils/Helpers';

import { FormFieldContext, FormItemContext, useFormField } from './useFormField';

const Form = FormProvider;

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formFieldName = React.useMemo(() => ({ name: props.name }), []);

  return (
    <FormFieldContext value={formFieldName}>
      <Controller {...props} />
    </FormFieldContext>
  );
};

const FormItem = ({ ref, className, ...props }: React.HTMLAttributes<HTMLDivElement> & { ref?: React.RefObject<HTMLDivElement | null> }) => {
  const id = React.useId();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const formItemId = React.useMemo(() => ({ id }), []);

  return (
    <FormItemContext value={formItemId}>
      <div ref={ref} className={cn('space-y-2', className)} {...props} />
    </FormItemContext>
  );
};
FormItem.displayName = 'FormItem';

const FormLabel = ({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & { ref?: React.RefObject<React.ElementRef<typeof LabelPrimitive.Root> | null> }) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(error && 'text-destructive', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
};
FormLabel.displayName = 'FormLabel';

const FormControl = ({ ref, ...props }: React.ComponentPropsWithoutRef<typeof Slot> & { ref?: React.RefObject<React.ElementRef<typeof Slot> | null> }) => {
  const { error, formItemId, formDescriptionId, formMessageId }
    = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
};
FormControl.displayName = 'FormControl';

const FormDescription = ({ ref, className, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.RefObject<HTMLParagraphElement | null> }) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
};
FormDescription.displayName = 'FormDescription';

const FormMessage = ({ ref, className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement> & { ref?: React.RefObject<HTMLParagraphElement | null> }) => {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {body}
    </p>
  );
};
FormMessage.displayName = 'FormMessage';

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
};

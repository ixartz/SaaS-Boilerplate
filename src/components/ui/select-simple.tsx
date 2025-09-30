'use client';

import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';

import { cn } from '@/lib/utils';

type SelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  children: React.ReactNode;
};

type SelectTriggerProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type SelectContentProps = {
  children: React.ReactNode;
};

type SelectItemProps = {
  value: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

type SelectValueProps = {
  placeholder?: string;
};

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

const Select = ({ value, onValueChange, defaultValue, children }: SelectProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || '');

  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setIsOpen(false);
  };

  const contextValue = React.useMemo(
    () => ({ value: selectedValue, onValueChange: handleValueChange, isOpen, setIsOpen }),
    [selectedValue, isOpen, handleValueChange],
  );

  return (
    <SelectContext.Provider value={contextValue}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, ...props }, ref) => {
    const { isOpen, setIsOpen } = React.useContext(SelectContext);

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        {children}
        <ChevronDown className="size-4 opacity-50" />
      </button>
    );
  },
);
SelectTrigger.displayName = 'SelectTrigger';

const SelectContent = ({ children }: SelectContentProps) => {
  const { isOpen } = React.useContext(SelectContext);

  if (!isOpen) {
 return null;
}

  return (
    <div className="absolute z-50 w-full min-w-32 overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md">
      <div className="p-1">
        {children}
      </div>
    </div>
  );
};

const SelectItem = React.forwardRef<HTMLButtonElement, SelectItemProps>(
  ({ className, value, children, ...props }, ref) => {
    const { value: selectedValue, onValueChange } = React.useContext(SelectContext);

    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
          className,
        )}
        onClick={() => onValueChange?.(value)}
        {...props}
      >
        <span className="absolute left-2 flex size-3.5 items-center justify-center">
          {selectedValue === value && <Check className="size-4" />}
        </span>
        {children}
      </button>
    );
  },
);
SelectItem.displayName = 'SelectItem';

const SelectValue = ({ placeholder }: SelectValueProps) => {
  const { value } = React.useContext(SelectContext);

  return <span>{value || placeholder}</span>;
};

export {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
};

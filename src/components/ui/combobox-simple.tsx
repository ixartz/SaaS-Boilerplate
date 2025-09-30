'use client';

import { Check, ChevronDown } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ComboboxOption = {
  value: string;
  label: string;
  avatar?: string;
};

type ComboboxProps = {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export function Combobox({
  options,
  value,
  onValueChange,
  placeholder = 'Select option...',
  className,
  disabled = false,
}: ComboboxProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState('');

  const selectedOption = options.find(option => option.value === value);
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchValue.toLowerCase()),
  );

  // Debug logging removed for cleaner console

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue);
    setIsOpen(false);
    setSearchValue('');
  };

  return (
    <div className={cn('relative', className)}>
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={isOpen}
        className="w-full justify-between"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedOption
? (
          <div className="flex items-center space-x-2">
            {selectedOption.avatar && (
              <img
                src={selectedOption.avatar}
                alt={selectedOption.label}
                className="size-4 rounded-full"
              />
            )}
            <span>{selectedOption.label}</span>
          </div>
        )
: (
          placeholder
        )}
        <ChevronDown className="ml-2 size-4 shrink-0 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute z-[9999] mt-1 w-full overflow-hidden rounded-md border bg-white text-gray-900 shadow-lg">
          <div className="p-1">
            <input
              type="text"
              placeholder="Search..."
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              className="w-full border-b border-border px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-ring"
            />
            <div className="max-h-60 overflow-auto">
              {filteredOptions.length === 0
? (
                <div className="p-2 text-sm text-muted-foreground">No option found.</div>
              )
: (
                filteredOptions.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    className={cn(
                      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-gray-100 hover:text-gray-900',
                      value === option.value && 'bg-gray-100 text-gray-900',
                    )}
                    onClick={() => handleSelect(option.value)}
                  >
                    <span className="absolute left-2 flex size-3.5 items-center justify-center">
                      {value === option.value && <Check className="size-4" />}
                    </span>
                    <div className="flex items-center space-x-2">
                      {option.avatar && (
                        <img
                          src={option.avatar}
                          alt={option.label}
                          className="size-4 rounded-full"
                        />
                      )}
                      <span>{option.label}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

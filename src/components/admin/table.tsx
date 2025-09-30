'use client';

import {
  ArrowUpDown,
  MoreHorizontal,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type Column<T> = {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
};

type AdminTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  onSort?: (key: keyof T, direction: 'asc' | 'desc') => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  className?: string;
};

export function AdminTable<T extends Record<string, any>>({
  data,
  columns,
  onSort,
  onEdit,
  onDelete,
  className,
}: AdminTableProps<T>) {
  const handleSort = (key: keyof T) => {
    if (onSort) {
      // Simple toggle for demo - in real app, track sort state
      onSort(key, 'asc');
    }
  };

  return (
    <div className={`rounded-md border ${className}`}>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map(column => (
              <TableHead key={String(column.key)}>
                {column.sortable
? (
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(column.key)}
                    className="h-auto p-0 font-medium hover:bg-transparent"
                  >
                    {column.label}
                    <ArrowUpDown className="ml-2 size-4" />
                  </Button>
                )
: (
                  column.label
                )}
              </TableHead>
            ))}
            <TableHead className="w-12">
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0
? (
            <TableRow>
              <TableCell
                colSpan={columns.length + 1}
                className="h-24 text-center"
              >
                No data available.
              </TableCell>
            </TableRow>
          )
: (
            data.map(row => (
              <TableRow key={row.id || String(row.name)}>
                {columns.map(column => (
                  <TableCell key={String(column.key)}>
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] || '-')}
                  </TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="size-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => navigator.clipboard.writeText(String(row.id))}
                      >
                        Copy ID
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(row)}>
                          Edit
                        </DropdownMenuItem>
                      )}
                      {onDelete && (
                        <DropdownMenuItem
                          onClick={() => onDelete(row)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Combobox, type ComboboxOption } from '@/components/ui/combobox-simple';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select-simple';
import { SimpleUpload } from '@/components/ui/simple-upload';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/toast';

const createProjectSchema = z.object({
  name: z.string().min(3, 'Project name required'),
  description: z.string().optional(),
  budget: z.coerce.number().optional(),
  startDate: z.string().optional(),
  endDate: z.string().optional(),
  status: z.enum(['PLANNING', 'IN_PROGRESS', 'DONE']).default('PLANNING'),
  managerId: z.string().optional(),
  thumbnailUrl: z.string().optional(),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.startDate) <= new Date(data.endDate);
  }
  return true;
}, {
  message: 'Start date must be before or equal to end date',
  path: ['endDate'],
});

type CreateProjectFormData = z.infer<typeof createProjectSchema>;

// Hook to fetch organization users from Clerk
function useOrganizationUsers() {
  const [users, setUsers] = React.useState<ComboboxOption[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
        async function fetchUsers() {
          try {
            // Mock users for now - in production this would call Clerk API
            const mockUsers: ComboboxOption[] = [
              { value: 'user-1', label: 'John Doe (Manager)' },
              { value: 'user-2', label: 'Jane Smith (Engineer)' },
              { value: 'user-3', label: 'Mike Johnson (PM)' },
            ];
            setUsers(mockUsers);
            setLoading(false);
          } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
          } finally {
            setLoading(false);
          }
        }

    fetchUsers();
  }, []);

  return { users, loading };
}

type CreateProjectModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateProjectFormData) => Promise<void>;
  onProjectCreated?: () => void; // 🚀 Add refresh callback
};

export function CreateProjectModal({
  open,
  onOpenChange,
  onSubmit,
  onProjectCreated,
}: CreateProjectModalProps) {
  const { addToast } = useToast();
  const { users: organizationUsers, loading: usersLoading } = useOrganizationUsers();

  const form = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: '',
      description: '',
      budget: undefined,
      startDate: '',
      endDate: '',
      status: 'PLANNING',
      managerId: '',
      thumbnailUrl: '',
    },
    mode: 'onChange',
  });

  const handleSubmit = async (data: CreateProjectFormData) => {
    try {
      await onSubmit(data);
      form.reset();
      onOpenChange(false);
      onProjectCreated?.();
      addToast({
        type: 'success',
        title: 'Project Created',
        description: 'Project has been created successfully!',
      });
    } catch (error) {
      console.error('Form submit error:', error);
      addToast({
        type: 'error',
        title: 'Failed to Create Project',
        description: error instanceof Error ? error.message : 'Failed to create project',
      });
    }
  };

  // Check if form is valid for submit button - only name is required
  const watchedValues = form.watch();
  const isFormValid
    = watchedValues.name
      && watchedValues.name.length >= 3;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="mx-4 max-h-[90vh] w-full max-w-2xl overflow-y-auto sm:mx-0">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>
            Create a new construction project to track progress and manage resources.
          </DialogDescription>
        </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                {/* Project Name - Full width */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Name *</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter project name"
                          {...field}
                          className={form.formState.errors.name ? 'border-destructive' : ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description - Full width */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project description"
                          className="resize-none"
                          rows={3}
                          value={field.value ?? ''}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Budget and Start Date - Grid 2 columns */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="budget"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Budget (₫)</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                              ₫
                            </span>
                            <Input
                              type="number"
                              placeholder="0"
                              value={field.value ?? ''}
                              onChange={e => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                              className={`pl-8 ${form.formState.errors.budget ? 'border-destructive' : ''}`}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            className={form.formState.errors.startDate ? 'border-destructive' : ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* End Date and Status - Grid 2 columns */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Estimated End Date</FormLabel>
                        <FormControl>
                          <Input
                            type="date"
                            value={field.value ?? ''}
                            onChange={field.onChange}
                            className={form.formState.errors.endDate ? 'border-destructive' : ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger className={form.formState.errors.status ? 'border-destructive' : ''}>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PLANNING">Planning</SelectItem>
                            <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                            <SelectItem value="DONE">Done</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Manager - Full width */}
                <FormField
                  control={form.control}
                  name="managerId"
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormLabel>Assign Manager</FormLabel>
                        <FormControl>
                          <Combobox
                            options={organizationUsers}
                            value={field.value ?? ''}
                            onValueChange={field.onChange}
                            placeholder={usersLoading ? 'Loading users...' : 'Select manager'}
                            disabled={usersLoading}
                            className={form.formState.errors.managerId ? 'border-destructive' : ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                {/* Project Thumbnail - Full width */}
                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project Thumbnail</FormLabel>
                      <FormControl>
                        <SimpleUpload
                          value={field.value ?? ''}
                          onChange={field.onChange}
                          onRemove={() => field.onChange('')}
                          accept="image/*"
                          maxSize={5}
                          folder="projects"
                          publicId={`project_${Date.now()}`}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

            <DialogFooter className="flex flex-col gap-2 sm:flex-row">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset();
                  onOpenChange(false);
                }}
                disabled={form.formState.isSubmitting}
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isFormValid || form.formState.isSubmitting}
                className="w-full sm:w-auto"
              >
                {form.formState.isSubmitting
? (
                  <>
                    <div className="mr-2 size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Creating...
                  </>
                )
: (
                  'Create Project'
                )}
              </Button>
            </DialogFooter>
              </form>
            </Form>
        </DialogContent>
    </Dialog>
  );
}

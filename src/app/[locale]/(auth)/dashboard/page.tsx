'use client';

import { useQuery } from '@tanstack/react-query';
import {
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  Users,
} from 'lucide-react';
import React from 'react';

import { CreateProjectModal } from '@/components/admin/create-project-modal';
import { KPICard } from '@/components/admin/kpi-card';
import { useProject } from '@/components/admin/project-context';
import { PaginatedTable } from '@/components/admin/paginated-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SafeImage } from '@/components/ui/safe-image';

// Project type definition
type Project = {
  id: string;
  name: string;
  description?: string;
  status: string;
  budget?: string;
  startDate?: string;
  endDate?: string;
  address?: string;
  clientName?: string;
  clientContact?: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  // Manager info
  managerId?: string;
  managerName?: string;
  managerEmail?: string;
  managerAvatar?: string;
};

const projectColumns = [
  {
    key: 'thumbnailUrl' as const,
    label: 'Thumbnail',
    render: (value: string) => (
      <div className="h-12 w-16 overflow-hidden rounded-lg border">
        <SafeImage
          src={value}
          alt="Project thumbnail"
          width={64}
          height={48}
          className="size-full"
        />
      </div>
    ),
  },
  {
    key: 'name' as const,
    label: 'Project Name',
    sortable: true,
  },
  {
    key: 'status' as const,
    label: 'Status',
    render: (value: string) => (
      <span
        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
          value === 'COMPLETED'
            ? 'bg-green-100 text-green-800'
            : value === 'IN_PROGRESS'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {value === 'PLANNING' ? 'Planning' : value === 'IN_PROGRESS' ? 'In Progress' : value === 'COMPLETED' ? 'Completed' : value}
      </span>
    ),
  },
  {
    key: 'managerName' as const,
    label: 'Manager',
    render: (_value: string, project: Project) => (
      <div className="flex items-center space-x-2">
        <Avatar className="size-6">
          <AvatarImage src={project.managerAvatar} />
          <AvatarFallback className="text-xs">
            {project.managerName?.charAt(0) || 'M'}
          </AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium">
          {project.managerName || 'Unassigned'}
        </span>
      </div>
    ),
  },
  {
    key: 'budget' as const,
    label: 'Budget',
    render: (value: string) => (
      <span className="font-mono">
        {value
? new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(Number(value))
: 'N/A'}
      </span>
    ),
  },
  {
    key: 'startDate' as const,
    label: 'Start Date',
    render: (value: string) => value ? new Date(value).toLocaleDateString('vi-VN') : 'N/A',
  },
  {
    key: 'endDate' as const,
    label: 'End Date',
    render: (value: string) => value ? new Date(value).toLocaleDateString('vi-VN') : 'N/A',
  },
];

// Hook to fetch projects using React Query
function useProjects() {
  const {
    data: projectsData,
    isLoading: loading,
    error,
    refetch,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await fetch('/api/v1/projects', {
        headers: {
          'x-e2e-bypass': 'true',
          'x-org-id': 'org_e2e_default',
          'x-user-id': 'test-user',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      if (data.ok && data.projects) {
        return data.projects;
      }
      return [];
    },
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: false,
  });

  return {
    projects: projectsData || [],
    loading,
    error: error?.message || null,
    refetch,
  };
}

const DashboardIndexPage = () => {
  const { isCreateModalOpen, setIsCreateModalOpen } = useProject();
  const { projects, loading, error, refetch } = useProjects();

  const handleCreateProject = async (data: any) => {
    const payload = {
      name: data.name,
      description: data.description,
      budget: data.budget,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : undefined,
      endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
      status: data.status,
      managerId: data.managerId,
      thumbnailUrl: data.thumbnailUrl,
    };

    const response = await fetch('/api/v1/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-e2e-bypass': 'true',
        'x-org-id': 'org_e2e_default',
        'x-user-id': 'test-user',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('API Error:', error);
      throw new Error(error.detail || 'Failed to create project');
    }

    await response.json();

    // 🚀 Refresh the projects list using React Query
    refetch();
  };

  const handleEditProject = (_project: any) => {
    // Handle edit project
  };

  const handleDeleteProject = (_project: any) => {
    // Handle delete project
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back! Here's what's happening with your construction projects.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Projects"
          value={loading ? '...' : projects.length}
          description="Active construction projects"
          icon={Building2}
          trend={{ value: 12, label: 'from last month' }}
          className="rounded-2xl shadow-sm transition-shadow hover:shadow-md"
        />
        <KPICard
          title="Total Budget"
          value={loading
? '...'
: projects.reduce((total: number, project: Project) => {
            const budget = project.budget ? Number(project.budget) : 0;
            return total + budget;
          }, 0).toLocaleString('vi-VN', {
            style: 'currency',
            currency: 'VND',
            notation: 'compact',
            maximumFractionDigits: 1,
          })}
          description="Combined project budgets"
          icon={DollarSign}
          trend={{ value: 8, label: 'from last month' }}
          className="rounded-2xl shadow-sm transition-shadow hover:shadow-md"
        />
        <KPICard
          title="Active Projects"
          value={loading ? '...' : projects.filter((p: Project) => p.status === 'IN_PROGRESS').length}
          description="Projects in progress"
          icon={Calendar}
          trend={{ value: -3, label: 'from last week' }}
          className="rounded-2xl shadow-sm transition-shadow hover:shadow-md"
        />
        <KPICard
          title="Team Members"
          value={loading ? '...' : new Set(projects.map((p: Project) => p.managerId).filter(Boolean)).size}
          description="Active managers"
          icon={Users}
          trend={{ value: 2, label: 'new this month' }}
          className="rounded-2xl shadow-sm transition-shadow hover:shadow-md"
        />
      </div>

      {/* Recent Projects */}
      <Card className="rounded-2xl shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl">Recent Projects</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                Overview of your active construction projects
              </p>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading
? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <div className="mx-auto mb-2 size-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Loading projects...</p>
              </div>
            </div>
          )
: error
? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <p className="mb-2 text-sm text-destructive">Error loading projects</p>
                <p className="text-xs text-muted-foreground">{error}</p>
              </div>
            </div>
          )
: projects.length === 0
? (
            <div className="flex items-center justify-center py-8">
              <div className="text-center">
                <Building2 className="mx-auto mb-2 size-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">No projects found</p>
                <p className="text-xs text-muted-foreground">Create your first project to get started</p>
              </div>
            </div>
          )
: (
            <PaginatedTable
              data={projects}
              columns={projectColumns}
              onEdit={handleEditProject}
              onDelete={handleDeleteProject}
              className="border-0"
              searchable={true}
              searchPlaceholder="Search projects..."
              pageSize={10}
              showPagination={true}
            />
          )}
        </CardContent>
      </Card>

      {/* Quick Actions & Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-2xl shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="size-5 text-primary" />
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="h-10 w-full justify-start">
              <Calendar className="mr-3 size-4" />
              Add Daily Log
            </Button>
            <Button variant="outline" className="h-10 w-full justify-start">
              <DollarSign className="mr-3 size-4" />
              Record Expense
            </Button>
            <Button variant="outline" className="h-10 w-full justify-start">
              <Users className="mr-3 size-4" />
              Manage Team
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <Calendar className="size-5 text-primary" />
              <CardTitle className="text-lg">Recent Activity</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="mt-2 size-2 rounded-full bg-blue-500"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Daily log added
                </p>
                <p className="text-sm text-muted-foreground">
                  Residential Complex Alpha
                </p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="mt-2 size-2 rounded-full bg-green-500"></div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium leading-none">
                  Project updated
                </p>
                <p className="text-sm text-muted-foreground">
                  Office Building Beta
                </p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm transition-shadow hover:shadow-md">
          <CardHeader className="pb-4">
            <div className="flex items-center space-x-2">
              <DollarSign className="size-5 text-primary" />
              <CardTitle className="text-lg">Budget Overview</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Budget</span>
                <span className="font-semibold">25B VND</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Spent</span>
                <span className="font-semibold">15.9B VND</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Remaining</span>
                <span className="font-semibold text-green-600">9.1B VND</span>
              </div>
            </div>
            <div className="pt-2">
              <div className="h-2 w-full rounded-full bg-gray-200">
                <div className="h-2 rounded-full bg-green-500" style={{ width: '36%' }}></div>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">36% budget remaining</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        onSubmit={handleCreateProject}
        onProjectCreated={refetch} // 🚀 Pass refetch function
      />
    </div>
  );
};

export default DashboardIndexPage;

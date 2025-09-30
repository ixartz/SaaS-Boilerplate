'use client';

import {
  Building2,
  Calendar,
  DollarSign,
  Plus,
  TrendingUp,
  Users,
} from 'lucide-react';
import { useState } from 'react';

import { CreateProjectModal } from '@/components/admin/create-project-modal';
import { KPICard } from '@/components/admin/kpi-card';
import { AdminTable } from '@/components/admin/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for demonstration
const mockProjects = [
  {
    id: '1',
    name: 'Residential Complex Alpha',
    status: 'In Progress',
    progress: 65,
    budget: 5000000000,
    spent: 3200000000,
    startDate: '2024-01-15',
    endDate: '2024-12-31',
  },
  {
    id: '2',
    name: 'Office Building Beta',
    status: 'Planning',
    progress: 15,
    budget: 8000000000,
    spent: 1200000000,
    startDate: '2024-03-01',
    endDate: '2025-06-30',
  },
  {
    id: '3',
    name: 'Shopping Mall Gamma',
    status: 'Completed',
    progress: 100,
    budget: 12000000000,
    spent: 11500000000,
    startDate: '2023-06-01',
    endDate: '2024-02-28',
  },
];

const projectColumns = [
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
          value === 'Completed'
            ? 'bg-green-100 text-green-800'
            : value === 'In Progress'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {value}
      </span>
    ),
  },
  {
    key: 'progress' as const,
    label: 'Progress',
    render: (value: number) => (
      <div className="flex items-center space-x-2">
        <div className="h-2 w-16 rounded-full bg-gray-200">
          <div
            className="h-2 rounded-full bg-blue-600"
            style={{ width: `${value}%` }}
          />
        </div>
        <span className="text-sm font-medium">
{value}
%
        </span>
      </div>
    ),
  },
  {
    key: 'budget' as const,
    label: 'Budget',
    render: (value: number) => (
      <span className="font-mono">
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(value)}
      </span>
    ),
  },
  {
    key: 'spent' as const,
    label: 'Spent',
    render: (value: number) => (
      <span className="font-mono">
        {new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND',
        }).format(value)}
      </span>
    ),
  },
  {
    key: 'startDate' as const,
    label: 'Start Date',
    render: (value: string) => new Date(value).toLocaleDateString('vi-VN'),
  },
];

const DashboardIndexPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleCreateProject = async (_data: any) => {
    // Mock API call
    // In real app, this would call the API
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleEditProject = (_project: any) => {
    // Handle edit project
  };

  const handleDeleteProject = (_project: any) => {
    // Handle delete project
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your construction projects.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 size-4" />
            View Calendar
          </Button>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="mr-2 size-4" />
            Create Project
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KPICard
          title="Total Projects"
          value={mockProjects.length}
          description="Active construction projects"
          icon={Building2}
          trend={{ value: 12, label: 'from last month' }}
          className="transition-shadow hover:shadow-md"
        />
        <KPICard
          title="Total Budget"
          value="25B VND"
          description="Combined project budgets"
          icon={DollarSign}
          trend={{ value: 8, label: 'from last month' }}
          className="transition-shadow hover:shadow-md"
        />
        <KPICard
          title="Active Tasks"
          value="47"
          description="Tasks in progress"
          icon={Calendar}
          trend={{ value: -3, label: 'from last week' }}
          className="transition-shadow hover:shadow-md"
        />
        <KPICard
          title="Team Members"
          value="12"
          description="Active team members"
          icon={Users}
          trend={{ value: 2, label: 'new this month' }}
          className="transition-shadow hover:shadow-md"
        />
      </div>

      {/* Recent Projects */}
      <Card className="shadow-sm">
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
          <AdminTable
            data={mockProjects}
            columns={projectColumns}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
            className="border-0"
          />
        </CardContent>
      </Card>

      {/* Quick Actions & Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="transition-shadow hover:shadow-md">
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

        <Card className="transition-shadow hover:shadow-md">
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

        <Card className="transition-shadow hover:shadow-md">
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
      />
    </div>
  );
};

export default DashboardIndexPage;

import { and, count, desc, eq, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { projectsSchema } from '@/models/Schema';

// Lazy load database to avoid connection during build time
async function getDb() {
  const { db } = await import('@/libs/DB');
  return db;
}

// Validation schemas
const createProjectSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters').max(255),
  description: z.string().optional(),
  budget: z.union([z.string(), z.number()]).optional().transform((val) => {
    if (!val || val === '') {
      return null;
    }
    const num = typeof val === 'number' ? val : Number.parseFloat(val);
    return Number.isNaN(num) ? null : num;
  }),
  status: z.enum(['PLANNING', 'IN_PROGRESS', 'ON_HOLD', 'COMPLETED', 'CANCELLED']).default('PLANNING'),
  startDate: z.string().optional().transform((val) => {
    if (!val || val === '') {
      return null;
    }
    try {
      return new Date(val).toISOString();
    } catch {
      return null;
    }
  }),
  endDate: z.string().optional().transform((val) => {
    if (!val || val === '') {
      return null;
    }
    try {
      return new Date(val).toISOString();
    } catch {
      return null;
    }
  }),
  managerId: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  // Legacy fields for backward compatibility
  address: z.string().optional(),
  clientName: z.string().optional(),
  clientContact: z.string().optional(),
});

// Helper functions (removed cursor-based pagination helpers)

// GET /api/v1/projects
export async function GET(req: NextRequest) {
  try {
    const isE2E = req.headers.get('x-e2e-bypass') === 'true';
    const orgId = req.headers.get('x-org-id') || 'org_sample_123';

    if (!isE2E && !orgId) {
      return new Response(JSON.stringify({
        type: 'https://example.com/probs/validation-error',
        title: 'Validation Error',
        status: 400,
        detail: 'Organization ID is required',
        instance: req.url,
      }), {
        status: 400,
        headers: { 'content-type': 'application/problem+json' },
      });
    }

    const url = new URL(req.url);
    const limit = Math.min(Number.parseInt(url.searchParams.get('limit') || '10'), 100);
    const page = Math.max(Number.parseInt(url.searchParams.get('page') || '1'), 1);
    const q = url.searchParams.get('q') || '';

    // Calculate offset for pagination
    const offset = (page - 1) * limit;

    // Build query conditions
    const conditions = [
      eq(projectsSchema.orgId, orgId),
      isNull(projectsSchema.deletedAt),
    ];

    const db = await getDb();

    // Get total count for pagination with error logging
    let total = 0;
    try {
      console.log('Fetching projects with conditions:', { orgId, limit, page, offset });
      const totalCountResult = await db
        .select({ count: count() })
        .from(projectsSchema)
        .where(and(...conditions));
      total = totalCountResult[0]?.count || 0;
      console.log('Total projects count:', total);
    } catch (error) {
      console.error('Error fetching projects count:', error);
      return new Response(JSON.stringify({
        type: 'https://example.com/probs/database-error',
        title: 'Database Error',
        status: 500,
        detail: 'Failed to fetch projects count',
        instance: req.url,
        errors: [{
          field: 'database',
          message: error instanceof Error ? error.message : 'Unknown database error',
        }],
      }), {
        status: 500,
        headers: { 'content-type': 'application/problem+json' },
      });
    }

    // Calculate total pages
    const totalPages = Math.ceil(total / limit);

    // Fetch projects from database with offset-based pagination
    let projects = [];
    try {
      projects = await db
        .select()
        .from(projectsSchema)
        .where(and(...conditions))
        .orderBy(desc(projectsSchema.createdAt), desc(projectsSchema.id))
        .limit(limit)
        .offset(offset);
      console.log('Fetched projects:', projects.length);
    } catch (error) {
      console.error('Error fetching projects:', error);
      return new Response(JSON.stringify({
        type: 'https://example.com/probs/database-error',
        title: 'Database Error',
        status: 500,
        detail: 'Failed to fetch projects',
        instance: req.url,
        errors: [{
          field: 'database',
          message: error instanceof Error ? error.message : 'Unknown database error',
        }],
      }), {
        status: 500,
        headers: { 'content-type': 'application/problem+json' },
      });
    }

    // Apply search filter in memory (for now)
    const filteredItems = q
      ? projects.filter(p =>
          p.name.toLowerCase().includes(q.toLowerCase())
          || (p.description && p.description.toLowerCase().includes(q.toLowerCase())),
        )
      : projects;

    // Format response
    const formattedItems = filteredItems.map(project => ({
      id: project.id,
      name: project.name,
      description: project.description,
      status: project.status,
      budget: project.budget?.toString(),
      startDate: project.startDate?.toISOString(),
      endDate: project.endDate?.toISOString(),
      address: project.address,
      clientName: project.clientName,
      clientContact: project.clientContact,
      thumbnailUrl: project.thumbnailUrl,
      createdAt: project.createdAt.toISOString(),
      updatedAt: project.updatedAt.toISOString(),
      orgId: project.orgId,
      createdBy: 'user_sample_123', // Default for now
      updatedBy: 'user_sample_123', // Default for now
    }));

    return new Response(JSON.stringify({
      items: formattedItems,
      total,
      page,
      totalPages,
    }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return new Response(JSON.stringify({
      type: 'https://example.com/probs/internal-server-error',
      title: 'Internal Server Error',
      status: 500,
      detail: 'Failed to fetch projects',
      instance: req.url,
    }), {
      status: 500,
      headers: { 'content-type': 'application/problem+json' },
    });
  }
}

// POST /api/v1/projects
export async function POST(req: NextRequest) {
  try {
    const isE2E = req.headers.get('x-e2e-bypass') === 'true';
    const orgId = req.headers.get('x-org-id') || 'org_sample_123';
    const userId = req.headers.get('x-user-id') || 'user_sample_123';

    if (!isE2E && !orgId) {
      return new Response(JSON.stringify({
        type: 'https://example.com/probs/validation-error',
        title: 'Validation Error',
        status: 400,
        detail: 'Organization ID is required',
        instance: req.url,
      }), {
        status: 400,
        headers: { 'content-type': 'application/problem+json' },
      });
    }

    const body = await req.json();

    // Validate request body
    const validationResult = createProjectSchema.safeParse(body);
    if (!validationResult.success) {
      return new Response(JSON.stringify({
        type: 'https://example.com/probs/validation-error',
        title: 'Validation Error',
        status: 400,
        detail: 'Invalid request data',
        instance: req.url,
        errors: validationResult.error.errors,
      }), {
        status: 400,
        headers: { 'content-type': 'application/problem+json' },
      });
    }

    const validatedData = validationResult.data;

    const db = await getDb();

    // Create project in database with detailed error logging
    let newProject;
    try {
      console.log('Creating project with data:', {
        orgId,
        name: validatedData.name,
        description: validatedData.description || null,
        budget: validatedData.budget?.toString() || null,
        status: validatedData.status,
        startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
        address: validatedData.address || null,
        clientName: validatedData.clientName || null,
        clientContact: validatedData.clientContact || null,
        thumbnailUrl: validatedData.thumbnailUrl || null,
      });

      const [result] = await db
        .insert(projectsSchema)
        .values({
          id: crypto.randomUUID(),
          orgId,
          name: validatedData.name,
          description: validatedData.description ?? null,
          budget: validatedData.budget?.toString() ?? null,
          status: validatedData.status ?? 'PLANNING',
          startDate: validatedData.startDate ? new Date(validatedData.startDate) : null,
          endDate: validatedData.endDate ? new Date(validatedData.endDate) : null,
          address: validatedData.address ?? null,
          clientName: validatedData.clientName ?? null,
          clientContact: validatedData.clientContact ?? null,
          thumbnailUrl: validatedData.thumbnailUrl ?? null,
        })
        .returning();

      newProject = result;
      console.log('Project created successfully:', newProject);
    } catch (error) {
      console.error('=== DATABASE INSERT ERROR ===');
      console.error('Error:', error);
      console.error('Error message:', error instanceof Error ? error.message : 'Unknown error');
      console.error('Error stack:', error instanceof Error ? error.stack : undefined);
      console.error('OrgId:', orgId);
      console.error('Validated data:', validatedData);
      console.error('Request body:', body);
      console.error('===============================');
      
      return new Response(JSON.stringify({
        type: 'https://example.com/probs/database-error',
        title: 'Database Error',
        status: 500,
        detail: error instanceof Error ? error.message : 'Failed to create project in database',
        instance: req.url,
        errors: [{
          field: 'database',
          message: error instanceof Error ? error.message : 'Unknown database error',
        }],
      }), {
        status: 500,
        headers: { 'content-type': 'application/problem+json' },
      });
    }

    if (!newProject) {
      console.error('Project creation returned null/undefined');
      return new Response(JSON.stringify({
        type: 'https://example.com/probs/database-error',
        title: 'Database Error',
        status: 500,
        detail: 'Project creation returned no result',
        instance: req.url,
      }), {
        status: 500,
        headers: { 'content-type': 'application/problem+json' },
      });
    }

    // Format response
    const project = {
      id: newProject.id,
      name: newProject.name,
      description: newProject.description,
      status: newProject.status,
      budget: newProject.budget?.toString(),
      startDate: newProject.startDate?.toISOString(),
      endDate: newProject.endDate?.toISOString(),
      address: newProject.address,
      clientName: newProject.clientName,
      clientContact: newProject.clientContact,
      thumbnailUrl: newProject.thumbnailUrl,
      createdAt: newProject.createdAt.toISOString(),
      updatedAt: newProject.updatedAt.toISOString(),
      orgId: newProject.orgId,
      createdBy: userId,
      updatedBy: userId,
    };

    return new Response(JSON.stringify({
      ok: true,
      project,
    }), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return new Response(JSON.stringify({
      type: 'https://example.com/probs/internal-server-error',
      title: 'Internal Server Error',
      status: 500,
      detail: 'Failed to create project',
      instance: req.url,
    }), {
      status: 500,
      headers: { 'content-type': 'application/problem+json' },
    });
  }
}

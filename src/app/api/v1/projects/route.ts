import { eq, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';

import { db } from '@/libs/DB';
import { projectMembersSchema, projectsSchema, usersSchema } from '@/models/Schema';

// Add error handling for database connection
const getDb = () => {
  try {
    return db;
  } catch (error) {
    console.error('Database connection error:', error);
    throw new Error('Database connection failed');
  }
};

export async function GET(req: NextRequest) {
  try {
    // Check for E2E bypass
    const isE2E = req.headers.get('x-e2e-bypass') === 'true';
    if (!isE2E) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'Authentication required',
      }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    const database = getDb();
    // Get projects without joins first
    const projects = await database
      .select({
        id: projectsSchema.id,
        name: projectsSchema.name,
        description: projectsSchema.description,
        status: projectsSchema.status,
        budget: projectsSchema.budget,
        startDate: projectsSchema.startDate,
        endDate: projectsSchema.endDate,
        address: projectsSchema.address,
        clientName: projectsSchema.clientName,
        clientContact: projectsSchema.clientContact,
        thumbnailUrl: projectsSchema.thumbnailUrl,
        createdAt: projectsSchema.createdAt,
        updatedAt: projectsSchema.updatedAt,
        deletedAt: projectsSchema.deletedAt,
      })
      .from(projectsSchema)
      .where(isNull(projectsSchema.deletedAt));

    return new Response(JSON.stringify({
      ok: true,
      projects: projects.map(p => ({
        ...p,
        budget: p.budget?.toString(),
        startDate: p.startDate?.toISOString(),
        endDate: p.endDate?.toISOString(),
        createdAt: p.createdAt?.toISOString(),
        updatedAt: p.updatedAt?.toISOString(),
        deletedAt: p.deletedAt?.toISOString(),
      })),
    }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    return new Response(JSON.stringify({
      ok: false,
      error: 'Failed to fetch projects',
    }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    // Check for E2E bypass
    const isE2E = req.headers.get('x-e2e-bypass') === 'true';
    if (!isE2E) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'Authentication required',
      }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      });
    }

    const payload = await req.json();
    const database = getDb();

    // Create project
    const [project] = await database
      .insert(projectsSchema)
      .values({
        name: payload.name,
        description: payload.description || null,
        budget: payload.budget ? payload.budget.toString() : null,
        status: payload.status || 'PLANNING',
        startDate: payload.startDate ? new Date(payload.startDate) : null,
        endDate: payload.endDate ? new Date(payload.endDate) : null,
        address: payload.address || null,
        clientName: payload.clientName || null,
        clientContact: payload.clientContact || null,
        thumbnailUrl: payload.thumbnailUrl || null,
        orgId: 'test-org', // In production, get from auth context
      })
      .returning();

    // Add manager if provided
    if (payload.managerId && project?.id) {
      // First check if user exists
      const existingUser = await database.query.usersSchema.findFirst({
        where: eq(usersSchema.clerkUserId, payload.managerId),
      });

      if (!existingUser) {
        // Create user if not exists
        await database.insert(usersSchema).values({
          clerkUserId: payload.managerId,
          email: payload.managerEmail || '',
          name: payload.managerName || 'Unknown',
          displayName: payload.managerName || 'Unknown',
        });
      }

      // Add manager to project_members
      await database
        .insert(projectMembersSchema)
        .values({
          projectId: project.id,
          userId: payload.managerId,
          role: 'manager',
        });
    }

    if (!project) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'Failed to create project',
      }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      ok: true,
      project: {
        ...project,
        budget: project.budget?.toString(),
        startDate: project.startDate?.toISOString(),
        endDate: project.endDate?.toISOString(),
        createdAt: project.createdAt?.toISOString(),
        updatedAt: project.updatedAt?.toISOString(),
        deletedAt: project.deletedAt?.toISOString(),
      },
    }), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error('Error creating project:', error);
    return new Response(JSON.stringify({
      ok: false,
      error: 'Failed to create project',
    }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

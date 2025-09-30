// Simple projects API without authentication for frontend
import { and, eq, isNull } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { z } from 'zod';

import { db } from '@/libs/DB';
import { projectMembersSchema, projectsSchema, usersSchema } from '@/models/Schema';

const createSchema = z.object({
  name: z.string().min(3, 'Project name must be at least 3 characters'),
  budget: z.number().min(1, 'Budget must be greater than 0').optional(),
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  status: z.enum(['planning', 'in_progress', 'completed']).optional(),
  description: z.string().optional(),
  thumbnailUrl: z.string().url().optional(),
  managerId: z.string().min(1, 'Manager is required').optional(),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.startDate) <= new Date(data.endDate);
  }
  return true;
}, {
  message: 'Start date must be before or equal to end date',
  path: ['endDate'],
});

export async function GET(_req: NextRequest) {
  try {
    console.log('🔄 Simple GET projects...');

    // Query projects with manager info (no auth required)
    const rows = await db
      .select({
        id: projectsSchema.id,
        orgId: projectsSchema.orgId,
        name: projectsSchema.name,
        description: projectsSchema.description,
        status: projectsSchema.status,
        budget: projectsSchema.budget,
        startDate: projectsSchema.startDate,
        endDate: projectsSchema.endDate,
        thumbnailUrl: projectsSchema.thumbnailUrl,
        createdAt: projectsSchema.createdAt,
        updatedAt: projectsSchema.updatedAt,
        deletedAt: projectsSchema.deletedAt,
        // Manager info
        managerId: projectMembersSchema.userId,
        managerName: usersSchema.name,
        managerEmail: usersSchema.email,
        managerAvatar: usersSchema.avatarUrl,
      })
      .from(projectsSchema)
      .leftJoin(projectMembersSchema, and(
        eq(projectMembersSchema.projectId, projectsSchema.id),
        eq(projectMembersSchema.role, 'manager'),
      ))
      .leftJoin(usersSchema, eq(usersSchema.clerkUserId, projectMembersSchema.userId))
      .where(isNull(projectsSchema.deletedAt))
      .limit(20);

    console.log('✅ Found projects:', rows.length);

    return new Response(
      JSON.stringify({ ok: true, items: rows }),
      {
        headers: { 'content-type': 'application/json' },
      },
    );
  } catch (e: any) {
    console.error('💥 Error fetching projects:', e);
    return new Response(
      JSON.stringify({ ok: false, error: e?.message }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = createSchema.safeParse(body);

    if (!parsed.success) {
      return new Response(
        JSON.stringify({ ok: false, error: parsed.error.message }),
        { status: 400, headers: { 'content-type': 'application/json' } },
      );
    }

    const payload = parsed.data;
    console.log('🔄 Creating simple project:', payload);

    // Map frontend status to database enum
    const statusMap = {
      planning: 'PLANNING',
      in_progress: 'IN_PROGRESS',
      completed: 'COMPLETED',
    } as const;

    // 1. Create project (no auth required)
    const [project] = await db
      .insert(projectsSchema)
      .values({
        orgId: 'org_e2e_default',
        name: payload.name,
        description: payload.description ?? null,
        status: statusMap[payload.status as keyof typeof statusMap] ?? 'PLANNING',
        budget: payload.budget?.toString() ?? null,
        startDate: payload.startDate ? new Date(payload.startDate) : null,
        endDate: payload.endDate ? new Date(payload.endDate) : null,
        thumbnailUrl: payload.thumbnailUrl ?? null,
      })
      .returning();

    console.log('✅ Project created:', project.id);

    // 2. Sync manager to users table (upsert) - only if managerId provided
    if (payload.managerId) {
      // First check if user exists
      const existingUser = await db.query.usersSchema.findFirst({
        where: eq(usersSchema.clerkUserId, payload.managerId),
      });

      if (!existingUser) {
        // Create new user entry
        await db
          .insert(usersSchema)
          .values({
            clerkUserId: payload.managerId,
            email: `user-${payload.managerId}@example.com`,
            name: `Manager ${payload.managerId}`,
            avatarUrl: `https://ui-avatars.com/api/?name=${encodeURIComponent(`Manager ${payload.managerId}`)}&background=random`,
          });
      }

      // Add manager to project_members
      await db
        .insert(projectMembersSchema)
        .values({
          projectId: project.id,
          userId: payload.managerId,
          role: 'manager',
        });
    }

    // 3. Get project with manager info
    const [projectWithManager] = await db
      .select({
        id: projectsSchema.id,
        orgId: projectsSchema.orgId,
        name: projectsSchema.name,
        description: projectsSchema.description,
        status: projectsSchema.status,
        budget: projectsSchema.budget,
        startDate: projectsSchema.startDate,
        endDate: projectsSchema.endDate,
        thumbnailUrl: projectsSchema.thumbnailUrl,
        createdAt: projectsSchema.createdAt,
        updatedAt: projectsSchema.updatedAt,
        // Manager info
        managerId: projectMembersSchema.userId,
        managerName: usersSchema.name,
        managerEmail: usersSchema.email,
        managerAvatar: usersSchema.avatarUrl,
      })
      .from(projectsSchema)
      .leftJoin(projectMembersSchema, and(
        eq(projectMembersSchema.projectId, projectsSchema.id),
        eq(projectMembersSchema.role, 'manager'),
      ))
      .leftJoin(usersSchema, eq(usersSchema.clerkUserId, projectMembersSchema.userId))
      .where(eq(projectsSchema.id, project.id));

    console.log('✅ Project with manager:', projectWithManager);

    return new Response(
      JSON.stringify({ ok: true, item: projectWithManager }),
      {
        status: 201,
        headers: { 'content-type': 'application/json' },
      },
    );
  } catch (e: any) {
    console.error('💥 Error creating project:', e);
    return new Response(
      JSON.stringify({ ok: false, error: e?.message }),
      { status: 500, headers: { 'content-type': 'application/json' } },
    );
  }
}

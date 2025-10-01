import type { NextRequest } from 'next/server';

// Mock database for build time
// const _mockDb = {
//   select: () => ({
//     from: () => ({
//       where: () => ({
//         orderBy: () => Promise.resolve([]),
//       }),
//     }),
//   }),
//   insert: () => ({
//     values: () => ({
//       returning: () => Promise.resolve([{ id: 'mock-project' }]),
//     }),
//   }),
// };

export async function GET(req: NextRequest) {
  try {
    const isE2E = req.headers.get('x-e2e-bypass') === 'true';
    const orgId = req.headers.get('x-org-id');

    if (!isE2E && !orgId) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'Organization ID is required',
      }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    // Mock response for build time
    const projects: any[] = [];

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
    const isE2E = req.headers.get('x-e2e-bypass') === 'true';
    const orgId = req.headers.get('x-org-id');

    if (!isE2E && !orgId) {
      return new Response(JSON.stringify({
        ok: false,
        error: 'Organization ID is required',
      }), {
        status: 400,
        headers: { 'content-type': 'application/json' },
      });
    }

    const body = await req.json();

    // Mock response for build time
    const project = {
      id: 'mock-project-id',
      name: body.name || 'Mock Project',
      description: body.description,
      budget: body.budget,
      status: body.status || 'PLANNING',
      startDate: body.startDate,
      endDate: body.endDate,
      address: body.address,
      clientName: body.clientName,
      clientContact: body.clientContact,
      thumbnailUrl: body.thumbnailUrl,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
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
      ok: false,
      error: 'Failed to create project',
    }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });
  }
}

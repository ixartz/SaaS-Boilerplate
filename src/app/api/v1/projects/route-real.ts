import type { NextRequest } from 'next/server';

// Mock data for testing
const mockProjects = [
  { id: '1', name: 'Dự án nhà phố 3 tầng', status: 'IN_PROGRESS', budget: '5000000000', createdAt: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'Chung cư cao cấp The Sun', status: 'PLANNING', budget: '15000000000', createdAt: '2024-01-02T00:00:00Z' },
  { id: '3', name: 'Khu đô thị mới Green City', status: 'IN_PROGRESS', budget: '25000000000', createdAt: '2024-01-03T00:00:00Z' },
  { id: '4', name: 'Tòa nhà văn phòng Tech Hub', status: 'COMPLETED', budget: '8000000000', createdAt: '2024-01-04T00:00:00Z' },
  { id: '5', name: 'Khu dân cư An Phú', status: 'ON_HOLD', budget: '12000000000', createdAt: '2024-01-05T00:00:00Z' },
  { id: '6', name: 'Dự án resort biển Paradise', status: 'PLANNING', budget: '30000000000', createdAt: '2024-01-06T00:00:00Z' },
  { id: '7', name: 'Trung tâm thương mại Mega Mall', status: 'IN_PROGRESS', budget: '20000000000', createdAt: '2024-01-07T00:00:00Z' },
  { id: '8', name: 'Khu công nghiệp hiện đại', status: 'CANCELLED', budget: '18000000000', createdAt: '2024-01-08T00:00:00Z' },
  { id: '9', name: 'Dự án nhà ở xã hội', status: 'IN_PROGRESS', budget: '6000000000', createdAt: '2024-01-09T00:00:00Z' },
  { id: '10', name: 'Khu phức hợp đa chức năng', status: 'PLANNING', budget: '22000000000', createdAt: '2024-01-10T00:00:00Z' },
  { id: '11', name: 'Dự án khách sạn 5 sao', status: 'IN_PROGRESS', budget: '28000000000', createdAt: '2024-01-11T00:00:00Z' },
  { id: '12', name: 'Khu dân cư sinh thái', status: 'COMPLETED', budget: '9000000000', createdAt: '2024-01-12T00:00:00Z' },
  { id: '13', name: 'Tòa nhà thương mại', status: 'ON_HOLD', budget: '11000000000', createdAt: '2024-01-13T00:00:00Z' },
  { id: '14', name: 'Dự án nhà ở cao cấp', status: 'IN_PROGRESS', budget: '13000000000', createdAt: '2024-01-14T00:00:00Z' },
  { id: '15', name: 'Khu đô thị thông minh', status: 'PLANNING', budget: '35000000000', createdAt: '2024-01-15T00:00:00Z' },
  { id: '16', name: 'Dự án resort nghỉ dưỡng', status: 'IN_PROGRESS', budget: '32000000000', createdAt: '2024-01-16T00:00:00Z' },
  { id: '17', name: 'Trung tâm hội nghị', status: 'COMPLETED', budget: '7000000000', createdAt: '2024-01-17T00:00:00Z' },
  { id: '18', name: 'Khu dân cư ven sông', status: 'PLANNING', budget: '10000000000', createdAt: '2024-01-18T00:00:00Z' },
  { id: '19', name: 'Dự án nhà phố liền kề', status: 'IN_PROGRESS', budget: '7500000000', createdAt: '2024-01-19T00:00:00Z' },
  { id: '20', name: 'Khu đô thị xanh', status: 'ON_HOLD', budget: '19000000000', createdAt: '2024-01-20T00:00:00Z' },
  { id: '21', name: 'Dự án chung cư mini', status: 'IN_PROGRESS', budget: '4500000000', createdAt: '2024-01-21T00:00:00Z' },
  { id: '22', name: 'Tòa nhà văn phòng A', status: 'COMPLETED', budget: '5500000000', createdAt: '2024-01-22T00:00:00Z' },
  { id: '23', name: 'Khu dân cư ven biển', status: 'PLANNING', budget: '16000000000', createdAt: '2024-01-23T00:00:00Z' },
  { id: '24', name: 'Dự án nhà ở giá rẻ', status: 'IN_PROGRESS', budget: '3500000000', createdAt: '2024-01-24T00:00:00Z' },
  { id: '25', name: 'Khu đô thị mới B', status: 'CANCELLED', budget: '17000000000', createdAt: '2024-01-25T00:00:00Z' },
  { id: '26', name: 'Dự án resort cao cấp', status: 'IN_PROGRESS', budget: '40000000000', createdAt: '2024-01-26T00:00:00Z' },
  { id: '27', name: 'Trung tâm thương mại lớn', status: 'PLANNING', budget: '24000000000', createdAt: '2024-01-27T00:00:00Z' },
  { id: '28', name: 'Khu dân cư gần trung tâm', status: 'IN_PROGRESS', budget: '14000000000', createdAt: '2024-01-28T00:00:00Z' },
  { id: '29', name: 'Dự án nhà phố thương mại', status: 'COMPLETED', budget: '8500000000', createdAt: '2024-01-29T00:00:00Z' },
  { id: '30', name: 'Khu đô thị sinh thái', status: 'ON_HOLD', budget: '21000000000', createdAt: '2024-01-30T00:00:00Z' },
  { id: '31', name: 'Dự án chung cư cao cấp', status: 'IN_PROGRESS', budget: '26000000000', createdAt: '2024-01-31T00:00:00Z' },
  { id: '32', name: 'Tòa nhà văn phòng B', status: 'PLANNING', budget: '6200000000', createdAt: '2024-02-01T00:00:00Z' },
  { id: '33', name: 'Khu dân cư ven hồ', status: 'IN_PROGRESS', budget: '15000000000', createdAt: '2024-02-02T00:00:00Z' },
  { id: '34', name: 'Dự án nhà ở trung bình', status: 'COMPLETED', budget: '4800000000', createdAt: '2024-02-03T00:00:00Z' },
  { id: '35', name: 'Khu đô thị mới C', status: 'CANCELLED', budget: '23000000000', createdAt: '2024-02-04T00:00:00Z' },
];

function parseCursor(cursor: string | null): { offset: number; sortField: string; sortDirection: 'asc' | 'desc' } {
  if (!cursor) {
    return { offset: 0, sortField: 'created_at', sortDirection: 'desc' };
  }

  try {
    const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString());
    return {
      offset: decoded.offset || 0,
      sortField: decoded.sortField || 'created_at',
      sortDirection: decoded.sortDirection || 'desc',
    };
  } catch {
    return { offset: 0, sortField: 'created_at', sortDirection: 'desc' };
  }
}

function createCursor(offset: number, sortField: string, sortDirection: 'asc' | 'desc'): string {
  return Buffer.from(JSON.stringify({ offset, sortField, sortDirection })).toString('base64');
}

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

    const url = new URL(req.url);
    const limit = Math.min(Number.parseInt(url.searchParams.get('limit') || '10'), 100);
    const cursor = url.searchParams.get('cursor');
    const q = url.searchParams.get('q') || '';
    const sort = url.searchParams.get('sort') || 'created_at:desc';

    // Parse sort parameter
    const [sortField, sortDirection] = sort.split(':');
    const validSortFields = ['name', 'created_at', 'status', 'budget'];
    const validSortDirections = ['asc', 'desc'];

    const finalSortField = validSortFields.includes(sortField || '') ? sortField : 'created_at';
    const finalSortDirection = validSortDirections.includes(sortDirection || '') ? sortDirection : 'desc';

    // Parse cursor
    const { offset } = parseCursor(cursor);

    // Filter and sort mock data
    const filteredProjects = mockProjects.filter((project) => {
      if (!q) {
 return true;
}
      return project.name.toLowerCase().includes(q.toLowerCase());
    });

    // Sort
    filteredProjects.sort((a, b) => {
      let aValue: any = a[finalSortField as keyof typeof a];
      let bValue: any = b[finalSortField as keyof typeof b];

      if (finalSortField === 'budget') {
        aValue = Number.parseInt(aValue as string);
        bValue = Number.parseInt(bValue as string);
      }

      if (aValue < bValue) {
 return finalSortDirection === 'asc' ? -1 : 1;
}
      if (aValue > bValue) {
 return finalSortDirection === 'asc' ? 1 : -1;
}
      return 0;
    });

    // Pagination
    const startIndex = offset;
    const endIndex = startIndex + limit;
    const paginatedProjects = filteredProjects.slice(startIndex, endIndex);

    const hasMore = endIndex < filteredProjects.length;
    const nextCursor = hasMore ? createCursor(endIndex, finalSortField || 'created_at', (finalSortDirection || 'desc') as 'asc' | 'desc') : null;
    const prevCursor = offset > 0 ? createCursor(Math.max(0, offset - limit), finalSortField || 'created_at', (finalSortDirection || 'desc') as 'asc' | 'desc') : null;

    // Format response
    const items = paginatedProjects.map(project => ({
      id: project.id,
      name: project.name,
      description: `Mô tả chi tiết cho ${project.name}`,
      status: project.status,
      budget: project.budget,
      startDate: '2024-01-01T00:00:00Z',
      endDate: '2024-12-31T23:59:59Z',
      address: `Địa chỉ ${project.id}, TP.HCM`,
      clientName: `Khách hàng ${project.id}`,
      clientContact: `contact${project.id}@example.com`,
      thumbnailUrl: `https://via.placeholder.com/64x48/3b82f6/ffffff?text=P${project.id}`,
      createdAt: project.createdAt,
      updatedAt: project.createdAt,
      orgId: 'org_sample_123',
      createdBy: 'user_sample_123',
      updatedBy: 'user_sample_123',
    }));

    return new Response(JSON.stringify({
      items,
      nextCursor,
      prevCursor,
      hasMore,
      total: filteredProjects.length,
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
    const now = new Date().toISOString();

    // Mock response for build time
    const project = {
      id: `project_${Date.now()}`,
      name: body.name || 'New Project',
      description: body.description || '',
      budget: body.budget || '0',
      status: body.status || 'PLANNING',
      startDate: body.startDate || now,
      endDate: body.endDate || now,
      address: body.address || '',
      clientName: body.clientName || '',
      clientContact: body.clientContact || '',
      thumbnailUrl: body.thumbnailUrl || '',
      createdAt: now,
      updatedAt: now,
      orgId: orgId || 'org_sample_123',
      createdBy: 'user_sample_123',
      updatedBy: 'user_sample_123',
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

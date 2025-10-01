// Simple pagination test without jest-dom
import { describe, expect, it } from 'vitest';

// Mock data for testing
const mockProjects = [
  { id: '1', name: 'Project A', createdAt: '2024-01-01T00:00:00Z' },
  { id: '2', name: 'Project B', createdAt: '2024-01-02T00:00:00Z' },
  { id: '3', name: 'Project C', createdAt: '2024-01-03T00:00:00Z' },
  { id: '4', name: 'Project D', createdAt: '2024-01-04T00:00:00Z' },
  { id: '5', name: 'Project E', createdAt: '2024-01-05T00:00:00Z' },
  { id: '6', name: 'Project F', createdAt: '2024-01-06T00:00:00Z' },
  { id: '7', name: 'Project G', createdAt: '2024-01-07T00:00:00Z' },
  { id: '8', name: 'Project H', createdAt: '2024-01-08T00:00:00Z' },
  { id: '9', name: 'Project I', createdAt: '2024-01-09T00:00:00Z' },
  { id: '10', name: 'Project J', createdAt: '2024-01-10T00:00:00Z' },
];

function parseCursor(cursor: string | null): { offset: number; sortField: string; sortDirection: 'asc' | 'desc' } {
  if (!cursor) {
    return { offset: 0, sortField: 'createdAt', sortDirection: 'desc' };
  }

  try {
    const decoded = JSON.parse(Buffer.from(cursor, 'base64').toString());
    return {
      offset: decoded.offset || 0,
      sortField: decoded.sortField || 'createdAt',
      sortDirection: decoded.sortDirection || 'desc',
    };
  } catch {
    return { offset: 0, sortField: 'createdAt', sortDirection: 'desc' };
  }
}

function createCursor(offset: number, sortField: string, sortDirection: 'asc' | 'desc'): string {
  return Buffer.from(JSON.stringify({ offset, sortField, sortDirection })).toString('base64');
}

function paginateData(data: any[], limit: number, cursor: string | null, sortField: string, sortDirection: 'asc' | 'desc') {
  // Sort data
  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (aValue < bValue) {
 return sortDirection === 'asc' ? -1 : 1;
}
    if (aValue > bValue) {
 return sortDirection === 'asc' ? 1 : -1;
}
    return 0;
  });

  // Parse cursor
  const { offset } = parseCursor(cursor);

  // Pagination
  const startIndex = offset;
  const endIndex = startIndex + limit;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  const hasMore = endIndex < sortedData.length;
  const nextCursor = hasMore ? createCursor(endIndex, sortField, sortDirection) : null;
  const prevCursor = offset > 0 ? createCursor(Math.max(0, offset - limit), sortField, sortDirection) : null;

  return {
    items: paginatedData,
    nextCursor,
    prevCursor,
    hasMore,
    total: sortedData.length,
  };
}

describe('Pagination Logic', () => {
  it('should return correct number of items for first page', () => {
    const result = paginateData(mockProjects, 3, null, 'createdAt', 'desc');

    expect(result.items).toHaveLength(3);
    expect(result.hasMore).toBe(true);
    expect(result.nextCursor).toBeTruthy();
    expect(result.prevCursor).toBeNull();
    expect(result.total).toBe(10);
  });

  it('should return correct items for second page', () => {
    const firstPage = paginateData(mockProjects, 3, null, 'createdAt', 'desc');
    const secondPage = paginateData(mockProjects, 3, firstPage.nextCursor!, 'createdAt', 'desc');

    expect(secondPage.items).toHaveLength(3);
    expect(secondPage.hasMore).toBe(true);
    expect(secondPage.prevCursor).toBeTruthy();

    // Check no overlap between pages
    const firstPageIds = firstPage.items.map(item => item.id);
    const secondPageIds = secondPage.items.map(item => item.id);
    const overlap = firstPageIds.filter(id => secondPageIds.includes(id));

    expect(overlap).toHaveLength(0);
  });

  it('should return correct items for last page', () => {
    const result = paginateData(mockProjects, 3, createCursor(9, 'createdAt', 'desc'), 'createdAt', 'desc');

    expect(result.items).toHaveLength(1);
    expect(result.hasMore).toBe(false);
    expect(result.nextCursor).toBeNull();
    expect(result.prevCursor).toBeTruthy();
  });

  it('should handle search filtering', () => {
    const filteredData = mockProjects.filter(p => p.name.includes('Project A'));
    const result = paginateData(filteredData, 5, null, 'createdAt', 'desc');

    expect(result.items).toHaveLength(1);
    expect(result.total).toBe(1);
    expect(result.hasMore).toBe(false);
  });

  it('should handle sorting by name', () => {
    const result = paginateData(mockProjects, 5, null, 'name', 'asc');

    expect(result.items[0].name).toBe('Project A');
    expect(result.items[4].name).toBe('Project E');
  });

  it('should handle sorting by name desc', () => {
    const result = paginateData(mockProjects, 5, null, 'name', 'desc');

    expect(result.items[0].name).toBe('Project J');
    expect(result.items[4].name).toBe('Project F');
  });

  it('should maintain sort order across pages', () => {
    const firstPage = paginateData(mockProjects, 3, null, 'name', 'asc');
    const secondPage = paginateData(mockProjects, 3, firstPage.nextCursor!, 'name', 'asc');

    // First page should have A, B, C
    expect(firstPage.items[0].name).toBe('Project A');
    expect(firstPage.items[1].name).toBe('Project B');
    expect(firstPage.items[2].name).toBe('Project C');

    // Second page should have D, E, F
    expect(secondPage.items[0].name).toBe('Project D');
    expect(secondPage.items[1].name).toBe('Project E');
    expect(secondPage.items[2].name).toBe('Project F');
  });

  it('should handle empty data', () => {
    const result = paginateData([], 5, null, 'createdAt', 'desc');

    expect(result.items).toHaveLength(0);
    expect(result.hasMore).toBe(false);
    expect(result.nextCursor).toBeNull();
    expect(result.prevCursor).toBeNull();
    expect(result.total).toBe(0);
  });

  it('should handle limit larger than data', () => {
    const result = paginateData(mockProjects, 20, null, 'createdAt', 'desc');

    expect(result.items).toHaveLength(10);
    expect(result.hasMore).toBe(false);
    expect(result.nextCursor).toBeNull();
  });
});

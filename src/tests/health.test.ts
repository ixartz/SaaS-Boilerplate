import { describe, expect, it } from 'vitest';

describe('Health API', () => {
  it('should return health status', async () => {
    const response = await fetch('http://localhost:3000/api/health');
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.version).toBeDefined();
    expect(data.timestamp).toBeDefined();
    expect(data.env).toBeDefined();
  });
});

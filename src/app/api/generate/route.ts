import { spawn } from 'node:child_process';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json();

  return new Promise((resolve) => {
    const py = spawn('python', ['scripts/generate_article.py', JSON.stringify(body)]);
    let data = '';
    py.stdout.on('data', (chunk) => {
      data += chunk.toString();
    });
    py.on('close', () => {
      resolve(NextResponse.json({ article: data.trim() }));
    });
  });
}

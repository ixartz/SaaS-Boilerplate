import { NextResponse } from 'next/server';

type ProblemOpts = {
  type?: string;
  title: string;
  status: number;
  detail?: string;
  instance?: string;
  extensions?: Record<string, unknown>;
};

export function problemJson({ type, title, status, detail, instance, extensions }: ProblemOpts) {
  const body = {
    type: type ?? 'about:blank',
    title,
    status,
    detail,
    instance,
    ...extensions,
  } as const;

  return new NextResponse(JSON.stringify(body), {
    status,
    headers: {
      'content-type': 'application/problem+json',
      'cache-control': 'no-store',
    },
  });
}

export function badRequest(detail: string, extensions?: Record<string, unknown>) {
  return problemJson({ title: 'Bad Request', status: 400, detail, extensions });
}

export function unauthorized(detail = 'Unauthorized') {
  return problemJson({ title: 'Unauthorized', status: 401, detail });
}

export function forbidden(detail = 'Forbidden') {
  return problemJson({ title: 'Forbidden', status: 403, detail });
}

export function notFound(detail = 'Not Found') {
  return problemJson({ title: 'Not Found', status: 404, detail });
}

export function conflict(detail = 'Conflict') {
  return problemJson({ title: 'Conflict', status: 409, detail });
}

export function unprocessable(detail = 'Unprocessable Content', extensions?: Record<string, unknown>) {
  return problemJson({ title: 'Unprocessable Content', status: 422, detail, extensions });
}

export function serverError(detail = 'Internal Server Error') {
  return problemJson({ title: 'Internal Server Error', status: 500, detail });
}

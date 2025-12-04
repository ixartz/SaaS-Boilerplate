'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { TitleBar } from '@/features/dashboard/TitleBar';

type Request = {
  id: number;
  email: string;
  name: string | null;
  status: string;
  createdAt: string;
};

function getStatusColor(status: string) {
  if (status === 'approved') {
    return 'bg-green-100 text-green-800';
  }
  if (status === 'rejected') {
    return 'bg-red-100 text-red-800';
  }
  return 'bg-yellow-100 text-yellow-800';
}

export default function AdminRequestsPage() {
  const t = useTranslations('AdminRequests');
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [processingId, setProcessingId] = useState<number | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchRequests();
  }, []);

  async function fetchRequests() {
    try {
      const res = await fetch('/api/admin/requests');
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(id: number, action: 'approve' | 'reject') {
    setProcessingId(id);
    try {
      const res = await fetch('/api/admin/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(t('success_action'));
        fetchRequests();
      } else {
        console.error(data.error);
        toast.error(data.error || t('error_action'));
      }
    } catch (error) {
      console.error(error);
      toast.error(t('error_action'));
    } finally {
      setProcessingId(null);
    }
  }

  // Filter and Sort
  const filteredRequests = requests
    .filter((req) => {
      const matchesSearch = req.name?.toLowerCase().includes(searchTerm.toLowerCase())
        || req.email.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });

  // Pagination
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <>
      <TitleBar
        title={t('title')}
        description={t('description')}
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Input
          placeholder={t('search_placeholder')}
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button
          variant="outline"
          onClick={() => setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'))}
        >
          {t('sort_by_date')}
          {' '}
          {sortOrder === 'asc' ? '↑' : '↓'}
        </Button>
      </div>

      <div className="space-y-4">
        {loading
          ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-60" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-20" />
                  </div>
                </div>
              ))
            )
          : paginatedRequests.length === 0
            ? (
                <div className="rounded-md border p-8 text-center text-muted-foreground">
                  {t('no_requests')}
                </div>
              )
            : (
                paginatedRequests.map(req => (
                  <div
                    key={req.id}
                    className="flex flex-col gap-4 rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{req.name || t('no_name')}</span>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(
                            req.status,
                          )}`}
                        >
                          {req.status}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground">{req.email}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(req.createdAt).toLocaleDateString()}
                      </div>
                    </div>

                    {req.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleAction(req.id, 'approve')}
                          disabled={processingId === req.id}
                        >
                          {processingId === req.id ? '...' : t('approve')}
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleAction(req.id, 'reject')}
                          disabled={processingId === req.id}
                        >
                          {processingId === req.id ? '...' : t('reject')}
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
      </div>

      {!loading && totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          >
            {t('previous')}
          </Button>
          <span className="text-sm text-muted-foreground">
            {t('page')}
            {' '}
            {currentPage}
            {' '}
            {t('of')}
            {' '}
            {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          >
            {t('next')}
          </Button>
        </div>
      )}
    </>
  );
}

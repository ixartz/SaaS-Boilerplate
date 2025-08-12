// src/components/team/Pagination.tsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Props = {
  page: number;             // 1-based
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizes?: number[];
};

export default function Pagination({
  page,
  pageSize,
  total,
  onPageChange,
  onPageSizeChange,
  pageSizes = [10, 25, 50],
}: Props) {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3">
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Rows per page:</span>
        <select
          className="border rounded-lg px-2 py-1"
          value={pageSize}
          onChange={(e) => onPageSizeChange?.(parseInt(e.target.value, 10))}
        >
          {pageSizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <span className="ml-3">
          {total === 0 ? "0–0" : `${(page - 1) * pageSize + 1}–${Math.min(page * pageSize, total)}`} of {total}
        </span>
      </div>

      <div className="inline-flex items-center gap-1">
        <button
          className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-40"
          onClick={() => onPageChange(page - 1)}
          disabled={!canPrev}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="px-3 text-sm">
          {page} / {totalPages}
        </span>
        <button
          className="p-2 rounded-lg border hover:bg-gray-50 disabled:opacity-40"
          onClick={() => onPageChange(page + 1)}
          disabled={!canNext}
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

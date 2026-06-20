import React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const Pagination = ({ page, pages, total, limit, onPageChange }) => {
  if (pages <= 1) return null

  const startIdx = (page - 1) * limit + 1
  const endIdx = Math.min(page * limit, total)

  return (
    <div className="flex items-center justify-between border-t border-line px-4 py-4 sm:px-6 bg-surface">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          className="inline-flex h-9 items-center justify-center border border-line bg-surface px-4 text-sm text-ink hover:bg-neutral-900 disabled:opacity-50 transition-colors"
        >
          Previous
        </button>
        <button
          disabled={page >= pages}
          onClick={() => onPageChange(page + 1)}
          className="inline-flex h-9 items-center justify-center border border-line bg-surface px-4 text-sm text-ink hover:bg-neutral-900 disabled:opacity-50 transition-colors"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            Showing <span className="font-medium text-ink">{startIdx}</span> to{' '}
            <span className="font-medium text-ink">{endIdx}</span> of{' '}
            <span className="font-medium text-ink">{total}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px" aria-label="Pagination">
            <button
              disabled={page <= 1}
              onClick={() => onPageChange(page - 1)}
              className="inline-flex h-9 w-9 items-center justify-center border border-line bg-surface text-muted hover:text-ink disabled:opacity-50 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            {Array.from({ length: pages }).map((_, i) => {
              const p = i + 1
              const isActive = p === page
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`inline-flex h-9 w-9 items-center justify-center border text-sm transition-colors ${
                    isActive
                      ? 'border-ink bg-ink text-canvas font-semibold'
                      : 'border-line bg-surface text-muted hover:text-ink hover:bg-neutral-900'
                  }`}
                >
                  {p}
                </button>
              )
            })}
            <button
              disabled={page >= pages}
              onClick={() => onPageChange(page + 1)}
              className="inline-flex h-9 w-9 items-center justify-center border border-line bg-surface text-muted hover:text-ink disabled:opacity-50 transition-colors"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

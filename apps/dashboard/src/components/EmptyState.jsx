import React from 'react'

export const EmptyState = ({ icon: Icon, title, description, actionLabel, onAction }) => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center border border-line bg-surface p-8 text-center">
      {Icon && <Icon className="h-10 w-10 text-muted" aria-hidden="true" />}
      <h3 className="mt-4 text-base font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-muted">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-6 inline-flex h-9 items-center justify-center border border-ink bg-ink px-4 text-sm font-medium text-canvas hover:bg-canvas hover:text-ink transition-colors"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}

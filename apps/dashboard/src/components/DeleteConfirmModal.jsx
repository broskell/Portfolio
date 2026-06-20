import React from 'react'
import { AlertTriangle, X } from 'lucide-react'

export const DeleteConfirmModal = ({ isOpen, onClose, onConfirm, title = 'Delete Item', message = 'Are you sure you want to delete this item? This action is reversible via restoration, but links might break.', isLoading }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-md border border-line bg-surface p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-ink transition-colors"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-950/20 border border-red-900/50 text-red-500">
            <AlertTriangle className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-ink">{title}</h3>
            <p className="mt-2 text-sm text-muted">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="inline-flex h-9 items-center justify-center border border-line bg-surface px-4 text-sm font-medium text-ink hover:bg-neutral-900 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="inline-flex h-9 items-center justify-center border border-red-900 bg-red-950/20 text-red-400 px-4 text-sm font-medium hover:bg-red-900 hover:text-white disabled:opacity-50 transition-all"
          >
            {isLoading ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

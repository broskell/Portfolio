import React from 'react'

export const StatusBadge = ({ status }) => {
  const getStyles = () => {
    switch (status?.toLowerCase()) {
      case 'published':
      case 'read':
        return 'border-neutral-700 bg-neutral-900/50 text-neutral-300'
      case 'draft':
      case 'unread':
        return 'border-yellow-900/40 bg-yellow-950/20 text-yellow-500'
      case 'archived':
        return 'border-red-950/40 bg-red-950/10 text-red-400'
      default:
        return 'border-line bg-surface text-muted'
    }
  }

  return (
    <span
      className={`inline-flex items-center border px-2 py-0.5 text-xs font-mono tracking-wider uppercase rounded-full ${getStyles()}`}
    >
      {status || 'unknown'}
    </span>
  )
}

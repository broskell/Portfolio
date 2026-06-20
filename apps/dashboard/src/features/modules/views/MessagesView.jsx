import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Mail, Trash2, MailOpen, Eye, X, Loader2 } from 'lucide-react'
import { http } from '../../../api/http.js'
import { EntityTable } from '../../../components/EntityTable.jsx'
import { DeleteConfirmModal } from '../../../components/DeleteConfirmModal.jsx'
import { EmptyState } from '../../../components/EmptyState.jsx'
import { useNotificationStore } from '../../../app/notification.store.js'

export const MessagesView = () => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotificationStore()

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: '',
    sort: { createdAt: -1 }
  })

  const [activeMessage, setActiveMessage] = useState(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  // Query Messages
  const { data, isLoading } = useQuery({
    queryKey: ['messages', filters],
    queryFn: async () => {
      const { page, limit, search, status, sort } = filters
      const sortKey = Object.keys(sort)[0]
      const sortDir = sort[sortKey]
      
      const response = await http.get('/contact', {
        params: {
          page,
          limit,
          search: search || undefined,
          status: status || undefined,
          sort: sortKey ? `${sortKey}:${sortDir}` : undefined
        }
      })
      return response.data
    }
  })

  const items = data?.data || []
  const meta = data?.meta || { page: 1, limit: 10, total: 0, pages: 1 }

  // Mark as Read Mutation
  const readMutation = useMutation({
    mutationFn: (id) => http.put(`/contact/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
    }
  })

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id) => http.delete(`/contact/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      showNotification('Message deleted successfully.')
      setIsDeleteOpen(false)
      setDeleteId(null)
    },
    onError: (err) => {
      showNotification(err.response?.data?.error?.message || 'Failed to delete message', 'error')
    }
  })

  // Restore Mutation
  const restoreMutation = useMutation({
    mutationFn: (id) => http.post(`/contact/${id}/restore`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      showNotification('Message restored successfully.')
    }
  })

  const handleViewMessage = (message) => {
    setActiveMessage(message)
    if (message.status === 'draft') {
      // In Express contact message schema: draft = unread, published = read.
      readMutation.mutate(message._id)
    }
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id)
    setIsDeleteOpen(true)
  }

  const handleBulkDelete = async (ids) => {
    try {
      await Promise.all(ids.map((id) => http.delete(`/contact/${id}`)))
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      showNotification(`Successfully deleted ${ids.length} messages.`)
    } catch (err) {
      showNotification('Failed to bulk delete messages.', 'error')
    }
  }

  const handleBulkStatusUpdate = async (ids, status) => {
    try {
      // In messages, status update means marking as read/published or draft
      const backendStatus = status === 'published' ? 'published' : 'draft'
      await Promise.all(ids.map((id) => http.put(`/contact/${id}/read`)))
      queryClient.invalidateQueries({ queryKey: ['messages'] })
      showNotification(`Successfully marked ${ids.length} messages as read.`)
    } catch (err) {
      showNotification('Failed to mark messages as read.', 'error')
    }
  }

  const columns = [
    { key: 'name', label: 'Sender', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'subject', label: 'Subject', sortable: true },
    {
      key: 'createdAt',
      label: 'Received',
      sortable: true,
      render: (val) => (val ? new Date(val).toLocaleString() : '')
    }
  ]

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 border-b border-line pb-5">
        <div>
          <p className="text-sm text-muted">CMS Inbox</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal font-sans text-ink">Messages</h1>
        </div>
      </div>

      {items.length === 0 && !isLoading && !filters.search && !filters.status ? (
        <EmptyState
          icon={Mail}
          title="Inbox Empty"
          description="You haven't received any contact submission messages yet."
        />
      ) : (
        <EntityTable
          data={items}
          columns={columns}
          isLoading={isLoading}
          meta={meta}
          filters={filters}
          onFilterChange={setFilters}
          onEdit={handleViewMessage}
          onDelete={handleDeleteClick}
          onRestore={restoreMutation.mutate}
          onBulkDelete={handleBulkDelete}
          onBulkStatusUpdate={handleBulkStatusUpdate}
          actions={true}
        />
      )}

      {/* Message Reader Details Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
          <div className="relative w-full max-w-xl border border-line bg-surface p-6 shadow-2xl">
            <button
              onClick={() => setActiveMessage(null)}
              className="absolute top-4 right-4 text-muted hover:text-ink transition-colors"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="border-b border-line pb-4 mb-4">
              <h2 className="text-lg font-semibold text-ink">{activeMessage.subject}</h2>
              <p className="text-xs text-muted font-mono mt-1">
                From: <span className="text-neutral-300 font-sans font-medium">{activeMessage.name}</span> ({activeMessage.email})
              </p>
              <p className="text-xs text-muted font-mono mt-1">
                Received: {new Date(activeMessage.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="bg-canvas border border-line p-4 min-h-[160px] text-sm text-neutral-300 whitespace-pre-wrap font-sans leading-relaxed">
              {activeMessage.message}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setActiveMessage(null)}
                className="inline-flex h-9 items-center justify-center border border-line bg-surface px-4 text-sm font-medium text-ink hover:bg-neutral-900 transition-colors"
              >
                Close
              </button>
              <a
                href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`}
                className="inline-flex h-9 items-center justify-center border border-ink bg-ink px-4 text-sm font-medium text-canvas hover:bg-canvas hover:text-ink transition-colors"
              >
                Reply via Email
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false)
          setDeleteId(null)
        }}
        onConfirm={() => deleteMutation.mutate(deleteId)}
        isLoading={deleteMutation.isPending}
      />
    </div>
  )
}

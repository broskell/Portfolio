import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus, FolderKanban } from 'lucide-react'
import { http } from '../../../api/http.js'
import { entitySchemas } from '../../../config/entitySchemas.js'
import { EntityTable } from '../../../components/EntityTable.jsx'
import { EntityFormModal } from '../../../components/EntityFormModal.jsx'
import { DeleteConfirmModal } from '../../../components/DeleteConfirmModal.jsx'
import { EmptyState } from '../../../components/EmptyState.jsx'
import { useNotificationStore } from '../../../app/notification.store.js'

export const GenericCrudView = ({ moduleKey }) => {
  const queryClient = useQueryClient()
  const { showNotification } = useNotificationStore()
  const schema = entitySchemas[moduleKey]

  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    search: '',
    status: '',
    sort: { displayOrder: 1, createdAt: -1 }
  })

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [deleteId, setDeleteId] = useState(null)
  const [isBulkDeleting, setIsBulkDeleting] = useState(false)

  // Fetch Items Query
  const { data, isLoading, refetch } = useQuery({
    queryKey: [moduleKey, filters],
    queryFn: async () => {
      const { page, limit, search, status, sort } = filters
      const sortKey = Object.keys(sort)[0]
      const sortDir = sort[sortKey]
      
      const response = await http.get(schema.endpoint, {
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

  // Create Mutation
  const createMutation = useMutation({
    mutationFn: (payload) => http.post(schema.endpoint, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [moduleKey] })
      showNotification(`${schema.label} created successfully.`)
      setIsFormOpen(false)
    },
    onError: (err) => {
      showNotification(err.response?.data?.error?.message || 'Failed to create item', 'error')
    }
  })

  // Update Mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, payload }) => http.put(`${schema.endpoint}/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [moduleKey] })
      showNotification(`${schema.label} updated successfully.`)
      setIsFormOpen(false)
      setSelectedItem(null)
    },
    onError: (err) => {
      showNotification(err.response?.data?.error?.message || 'Failed to update item', 'error')
    }
  })

  // Delete Mutation (Soft Delete)
  const deleteMutation = useMutation({
    mutationFn: (id) => http.delete(`${schema.endpoint}/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [moduleKey] })
      showNotification(`${schema.label} soft-deleted. You can restore it later.`)
      setIsDeleteOpen(false)
      setDeleteId(null)
    },
    onError: (err) => {
      showNotification(err.response?.data?.error?.message || 'Failed to delete item', 'error')
    }
  })

  // Restore Mutation
  const restoreMutation = useMutation({
    mutationFn: (id) => http.post(`${schema.endpoint}/${id}/restore`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [moduleKey] })
      showNotification(`${schema.label} restored successfully.`)
    },
    onError: (err) => {
      showNotification(err.response?.data?.error?.message || 'Failed to restore item', 'error')
    }
  })

  const handleCreateOrUpdate = (formData) => {
    // Sanitize values
    const payload = { ...formData }
    // If date strings are empty, set to null
    schema.fields.forEach((f) => {
      if (f.type === 'date' && !payload[f.name]) {
        payload[f.name] = null
      }
    })

    if (selectedItem) {
      updateMutation.mutate({ id: selectedItem._id, payload })
    } else {
      createMutation.mutate(payload)
    }
  }

  const handleEditClick = (item) => {
    // Format date fields to YYYY-MM-DD for the date input
    const formattedItem = { ...item }
    schema.fields.forEach((f) => {
      if (f.type === 'date' && item[f.name]) {
        formattedItem[f.name] = new Date(item[f.name]).toISOString().split('T')[0]
      }
    })
    setSelectedItem(formattedItem)
    setIsFormOpen(true)
  }

  const handleNewClick = () => {
    setSelectedItem(null)
    setIsFormOpen(true)
  }

  const handleDeleteClick = (id) => {
    setDeleteId(id)
    setIsDeleteOpen(true)
  }

  const handleBulkDelete = async (ids) => {
    setIsBulkDeleting(true)
    try {
      await Promise.all(ids.map((id) => http.delete(`${schema.endpoint}/${id}`)))
      queryClient.invalidateQueries({ queryKey: [moduleKey] })
      showNotification(`Successfully deleted ${ids.length} items.`)
    } catch (err) {
      showNotification('Failed to bulk delete some items.', 'error')
    } finally {
      setIsBulkDeleting(false)
    }
  }

  const handleBulkStatusUpdate = async (ids, status) => {
    try {
      await Promise.all(ids.map((id) => http.put(`${schema.endpoint}/${id}`, { status })))
      queryClient.invalidateQueries({ queryKey: [moduleKey] })
      showNotification(`Successfully updated status for ${ids.length} items.`)
    } catch (err) {
      showNotification('Failed to update status for some items.', 'error')
    }
  }

  const isFormLoading = createMutation.isPending || updateMutation.isPending

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted">CMS</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal">{schema.label}s</h1>
        </div>
        <button
          onClick={handleNewClick}
          className="inline-flex h-9 items-center justify-center gap-2 border border-ink bg-ink px-3 text-sm font-medium text-canvas hover:bg-canvas hover:text-ink transition-colors"
        >
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add {schema.label}
        </button>
      </div>

      {items.length === 0 && !isLoading && !filters.search && !filters.status ? (
        <EmptyState
          icon={FolderKanban}
          title={`No ${schema.label}s`}
          description={`Add your first ${schema.label.toLowerCase()} to get started managing your portfolio content.`}
          actionLabel={`Add ${schema.label}`}
          onAction={handleNewClick}
        />
      ) : (
        <EntityTable
          data={items}
          columns={schema.columns}
          isLoading={isLoading}
          meta={meta}
          filters={filters}
          onFilterChange={setFilters}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          onRestore={restoreMutation.mutate}
          onBulkDelete={handleBulkDelete}
          onBulkStatusUpdate={handleBulkStatusUpdate}
        />
      )}

      {/* Dynamic Form Modal */}
      <EntityFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setSelectedItem(null)
        }}
        onSubmit={handleCreateOrUpdate}
        title={selectedItem ? `Edit ${schema.label}` : `Create ${schema.label}`}
        fields={schema.fields}
        initialValues={selectedItem || {}}
        isLoading={isFormLoading}
      />

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

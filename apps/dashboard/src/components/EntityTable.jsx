import React, { useState } from 'react'
import { Edit2, Trash2, RotateCcw, ArrowUpDown, ChevronDown, Check } from 'lucide-react'
import { StatusBadge } from './StatusBadge.jsx'
import { SearchBar } from './SearchBar.jsx'
import { Pagination } from './Pagination.jsx'

export const EntityTable = ({
  data = [],
  columns = [],
  isLoading,
  meta = {},
  filters = {},
  onFilterChange,
  onEdit,
  onDelete,
  onRestore,
  onBulkDelete,
  onBulkStatusUpdate,
  actions = true
}) => {
  const [selectedIds, setSelectedIds] = useState([])

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(data.map((item) => item._id))
    } else {
      setSelectedIds([])
    }
  }

  const handleSelectOne = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  const handleSort = (key) => {
    const currentSort = filters.sort || {}
    const currentDir = currentSort[key]
    let nextDir = 1

    if (currentDir === 1) nextDir = -1
    else if (currentDir === -1) nextDir = undefined

    onFilterChange({
      ...filters,
      page: 1,
      sort: nextDir ? { [key]: nextDir } : {}
    })
  }

  const handleStatusFilterChange = (status) => {
    onFilterChange({
      ...filters,
      page: 1,
      status: status || undefined
    })
  }

  const handleSearchChange = (search) => {
    onFilterChange({
      ...filters,
      page: 1,
      search: search || undefined
    })
  }

  const handlePageChange = (page) => {
    onFilterChange({
      ...filters,
      page
    })
  }

  const clearSelection = () => setSelectedIds([])

  return (
    <div className="space-y-4">
      {/* Search and Filters Bar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border border-line bg-surface p-4">
        <SearchBar
          value={filters.search || ''}
          onChange={handleSearchChange}
          placeholder="Search items..."
        />

        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <select
            value={filters.status || ''}
            onChange={(e) => handleStatusFilterChange(e.target.value)}
            className="h-9 border border-line bg-canvas px-3 text-sm text-ink focus:border-ink focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          {/* Bulk Actions */}
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 border-l border-line pl-3">
              <span className="text-xs text-muted font-mono mr-1">
                {selectedIds.length} selected
              </span>
              {onBulkStatusUpdate && (
                <>
                  <button
                    onClick={() => {
                      onBulkStatusUpdate(selectedIds, 'published')
                      clearSelection()
                    }}
                    className="inline-flex h-8 items-center border border-line bg-canvas px-2.5 text-xs text-ink hover:bg-neutral-900 transition-colors"
                  >
                    Publish
                  </button>
                  <button
                    onClick={() => {
                      onBulkStatusUpdate(selectedIds, 'draft')
                      clearSelection()
                    }}
                    className="inline-flex h-8 items-center border border-line bg-canvas px-2.5 text-xs text-ink hover:bg-neutral-900 transition-colors"
                  >
                    Draft
                  </button>
                </>
              )}
              {onBulkDelete && (
                <button
                  onClick={() => {
                    onBulkDelete(selectedIds)
                    clearSelection()
                  }}
                  className="inline-flex h-8 items-center border border-red-900 bg-red-950/20 px-2.5 text-xs text-red-400 hover:bg-red-900 hover:text-white transition-all"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="border border-line bg-surface overflow-x-auto">
        <table className="w-full text-left text-sm text-ink border-collapse">
          <thead>
            <tr className="border-b border-line bg-neutral-950/80 font-mono text-[10px] tracking-wider uppercase text-muted">
              {/* Checkbox Header */}
              <th className="px-6 py-4 w-12 text-center">
                <input
                  type="checkbox"
                  checked={data.length > 0 && selectedIds.length === data.length}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-line bg-canvas text-ink focus:ring-0 focus:ring-offset-0"
                />
              </th>

              {/* Dynamic Column Headers */}
              {columns.map((col) => (
                <th key={col.key} className="px-6 py-4">
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center gap-1 hover:text-ink transition-colors uppercase font-mono"
                    >
                      {col.label}
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  ) : (
                    <span>{col.label}</span>
                  )}
                </th>
              ))}

              {/* Status Header */}
              <th className="px-6 py-4 w-28">Status</th>

              {/* Actions Header */}
              {actions && <th className="px-6 py-4 w-32 text-right">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (actions ? 3 : 2)} className="px-6 py-12 text-center text-muted">
                  Loading items...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (actions ? 3 : 2)} className="px-6 py-12 text-center text-muted">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const isSelected = selectedIds.includes(item._id)
                return (
                  <tr
                    key={item._id}
                    className={`border-b border-line hover:bg-neutral-950/40 transition-colors ${
                      item.isDeleted ? 'opacity-60 bg-red-950/5' : ''
                    } ${isSelected ? 'bg-neutral-900/10' : ''}`}
                  >
                    {/* Checkbox Cell */}
                    <td className="px-6 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => handleSelectOne(item._id)}
                        className="h-4 w-4 rounded border-line bg-canvas text-ink focus:ring-0 focus:ring-offset-0"
                      />
                    </td>

                    {/* Dynamic Data Cells */}
                    {columns.map((col) => (
                      <td key={col.key} className="px-6 py-4 truncate max-w-xs font-sans text-neutral-300">
                        {col.render ? col.render(item[col.key], item) : item[col.key]}
                      </td>
                    ))}

                    {/* Status Badge Cell */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={item.isDeleted ? 'deleted' : item.status} />
                    </td>

                    {/* Actions Cell */}
                    {actions && (
                      <td className="px-6 py-4 text-right space-x-1.5 whitespace-nowrap">
                        {item.isDeleted ? (
                          onRestore && (
                            <button
                              onClick={() => onRestore(item._id)}
                              title="Restore"
                              className="inline-flex h-8 w-8 items-center justify-center border border-line bg-canvas text-muted hover:text-white transition-colors"
                            >
                              <RotateCcw className="h-4 w-4" />
                            </button>
                          )
                        ) : (
                          <>
                            {onEdit && (
                              <button
                                onClick={() => onEdit(item)}
                                title="Edit"
                                className="inline-flex h-8 w-8 items-center justify-center border border-line bg-canvas text-muted hover:text-white transition-colors"
                              >
                                <Edit2 className="h-4 w-4" />
                              </button>
                            )}
                            {onDelete && (
                              <button
                                onClick={() => onDelete(item._id)}
                                title="Delete"
                                className="inline-flex h-8 w-8 items-center justify-center border border-red-900 bg-red-950/20 text-red-400 hover:bg-red-900 hover:text-white transition-all"
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            )}
                          </>
                        )}
                      </td>
                    )}
                  </tr>
                )
              })
            )}
          </tbody>
        </table>

        {/* Pagination Footer */}
        {!isLoading && meta.pages > 1 && (
          <Pagination
            page={meta.page}
            pages={meta.pages}
            total={meta.total}
            limit={meta.limit}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  )
}

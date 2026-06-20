import React, { useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { X, Loader2 } from 'lucide-react'
import { ImageUploader } from './ImageUploader.jsx'

export const EntityFormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  initialValues = {},
  isLoading
}) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: initialValues
  })

  // Reset form values whenever initialValues change or modal is opened/closed
  useEffect(() => {
    if (isOpen) {
      // Ensure all field keys exist in defaultValues
      const defaults = {}
      fields.forEach((field) => {
        defaults[field.name] = initialValues[field.name] !== undefined
          ? initialValues[field.name]
          : (field.type === 'checkbox' ? false : (field.type === 'tags' || field.type === 'multiselect' ? [] : ''))
      })
      reset(defaults)
    }
  }, [isOpen, initialValues, fields, reset])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl border border-line bg-surface p-6 shadow-2xl my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-ink transition-colors"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <h2 className="text-xl font-semibold text-ink mb-6">{title}</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 max-h-[70vh] overflow-y-auto pr-2">
          {fields.map((field) => {
            const hasError = !!errors[field.name]
            const errorMessage = errors[field.name]?.message

            return (
              <div key={field.name} className="flex flex-col gap-1.5">
                {field.type !== 'checkbox' && (
                  <label htmlFor={field.name} className="text-xs font-mono tracking-wider uppercase text-muted">
                    {field.label} {field.required && <span className="text-red-400">*</span>}
                  </label>
                )}

                {/* 1. TEXT / NUMBER / DATE */}
                {(field.type === 'text' || field.type === 'number' || field.type === 'date') && (
                  <input
                    id={field.name}
                    type={field.type}
                    disabled={isLoading}
                    {...register(field.name, {
                      required: field.required ? `${field.label} is required` : false,
                      valueAsNumber: field.type === 'number'
                    })}
                    className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink placeholder-muted focus:border-ink focus:outline-none focus:ring-0 transition-colors"
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                  />
                )}

                {/* 2. TEXTAREA / MARKDOWN */}
                {(field.type === 'textarea' || field.type === 'markdown') && (
                  <textarea
                    id={field.name}
                    rows={field.rows || 4}
                    disabled={isLoading}
                    {...register(field.name, {
                      required: field.required ? `${field.label} is required` : false
                    })}
                    className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink placeholder-muted focus:border-ink focus:outline-none focus:ring-0 font-mono transition-colors"
                    placeholder={field.placeholder || `Enter ${field.label.toLowerCase()}`}
                  />
                )}

                {/* 3. CHECKBOX */}
                {field.type === 'checkbox' && (
                  <div className="flex items-center gap-3">
                    <input
                      id={field.name}
                      type="checkbox"
                      disabled={isLoading}
                      {...register(field.name)}
                      className="h-4 w-4 rounded border-line bg-canvas text-ink focus:ring-0 focus:ring-offset-0 focus:outline-none"
                    />
                    <label htmlFor={field.name} className="text-sm font-medium text-ink cursor-pointer select-none">
                      {field.label}
                    </label>
                  </div>
                )}

                {/* 4. SELECT */}
                {field.type === 'select' && (
                  <select
                    id={field.name}
                    disabled={isLoading}
                    {...register(field.name, {
                      required: field.required ? `${field.label} is required` : false
                    })}
                    className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink focus:border-ink focus:outline-none focus:ring-0 transition-colors"
                  >
                    <option value="">Select option...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {/* 5. MULTISELECT */}
                {field.type === 'multiselect' && (
                  <Controller
                    name={field.name}
                    control={control}
                    rules={{ required: field.required ? `${field.label} is required` : false }}
                    render={({ field: { value = [], onChange } }) => (
                      <div className="grid grid-cols-2 gap-2 border border-line bg-canvas p-3 max-h-32 overflow-y-auto">
                        {field.options?.map((opt) => {
                          const isChecked = value.includes(opt.value)
                          return (
                            <label key={opt.value} className="flex items-center gap-2 text-sm text-muted hover:text-ink cursor-pointer">
                              <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={() => {
                                  if (isChecked) {
                                    onChange(value.filter((val) => val !== opt.value))
                                  } else {
                                    onChange([...value, opt.value])
                                  }
                                }}
                                className="h-3.5 w-3.5 border-line bg-surface text-ink focus:ring-0"
                              />
                              {opt.label}
                            </label>
                          )
                        })}
                      </div>
                    )}
                  />
                )}

                {/* 6. TAGS INPUT */}
                {field.type === 'tags' && (
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: { value = [], onChange } }) => {
                      const [inputVal, setInputVal] = React.useState('')

                      const handleKeyDown = (e) => {
                        if (e.key === 'Enter' || e.key === ',') {
                          e.preventDefault()
                          const tag = inputVal.trim().toLowerCase()
                          if (tag && !value.includes(tag)) {
                            onChange([...value, tag])
                          }
                          setInputVal('')
                        }
                      }

                      const handleRemove = (tagToRemove) => {
                        onChange(value.filter((tag) => tag !== tagToRemove))
                      }

                      return (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                            placeholder="Type a tag and press Enter or comma"
                            className="block w-full border border-line bg-canvas px-3 py-2 text-sm text-ink placeholder-muted focus:border-ink focus:outline-none focus:ring-0 transition-colors"
                          />
                          {value.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 border border-line bg-canvas p-2">
                              {value.map((tag) => (
                                <span
                                  key={tag}
                                  className="inline-flex items-center gap-1 bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-0.5 text-xs font-mono rounded"
                                >
                                  {tag}
                                  <button
                                    type="button"
                                    onClick={() => handleRemove(tag)}
                                    className="text-muted hover:text-ink"
                                  >
                                    <X className="h-3 w-3" />
                                  </button>
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      )
                    }}
                  />
                )}

                {/* 7. IMAGE UPLOAD */}
                {field.type === 'image' && (
                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <ImageUploader
                        value={value}
                        onChange={onChange}
                        type={field.uploadType || 'project'}
                        disabled={isLoading}
                      />
                    )}
                  />
                )}

                {hasError && <p className="text-xs text-red-400">{errorMessage}</p>}
              </div>
            )
          })}

          <div className="mt-8 flex justify-end gap-3 border-t border-line pt-5">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="inline-flex h-9 items-center justify-center border border-line bg-surface px-4 text-sm font-medium text-ink hover:bg-neutral-900 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-9 items-center justify-center border border-ink bg-ink px-4 text-sm font-medium text-canvas hover:bg-canvas hover:text-ink disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

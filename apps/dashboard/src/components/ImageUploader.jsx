import React, { useState, useRef } from 'react'
import { Upload, X, Loader2 } from 'lucide-react'
import { http } from '../api/http.js'

export const ImageUploader = ({ value, onChange, type = 'project', disabled }) => {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const response = await http.post(`/api/uploads/${type}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      const uploadedData = response.data?.data
      if (uploadedData?.url) {
        onChange({
          url: uploadedData.secureUrl || uploadedData.url,
          publicId: uploadedData.publicId
        })
      }
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.error?.message || 'Failed to upload image')
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = async () => {
    if (!value?.publicId) {
      onChange(null)
      return
    }

    setIsUploading(true)
    try {
      // Cloudinary delete
      await http.delete(`/api/uploads/${encodeURIComponent(value.publicId)}`)
      onChange(null)
    } catch (err) {
      console.error(err)
      // Even if deleting from Cloudinary fails (e.g. not found), we should clear the state
      onChange(null)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-2">
      {value?.url ? (
        <div className="relative inline-block border border-line bg-surface p-2">
          <img
            src={value.url}
            alt="Upload preview"
            className="h-32 w-48 object-cover border border-line"
          />
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              disabled={isUploading}
              className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center border border-red-900 bg-red-950 text-red-400 hover:bg-red-900 hover:text-white transition-all rounded-full"
            >
              {isUploading ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <X className="h-3.5 w-3.5" />
              )}
            </button>
          )}
        </div>
      ) : (
        <div
          onClick={() => !disabled && !isUploading && fileInputRef.current?.click()}
          className={`flex h-32 w-full max-w-md cursor-pointer flex-col items-center justify-center border border-dashed border-line bg-surface hover:bg-neutral-900 transition-colors ${
            disabled ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {isUploading ? (
            <Loader2 className="h-6 w-6 animate-spin text-muted" />
          ) : (
            <Upload className="h-6 w-6 text-muted" />
          )}
          <span className="mt-2 text-xs text-muted">
            {isUploading ? 'Uploading...' : 'Click to upload image'}
          </span>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            disabled={disabled || isUploading}
            className="hidden"
          />
        </div>
      )}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
}

import { ALLOWED_FOLDERS } from '../constants/uploadFolders.js'

/**
 * Gets extension of a file in lowercase without dot prefix (e.g. "jpg")
 */
export const getExtension = (originalname) => {
  if (!originalname) return ''
  const parts = originalname.split('.')
  return parts.length > 1 ? parts.pop().toLowerCase() : ''
}

/**
 * Checks if the mime is allowed in whitelist
 */
export const isAllowedMime = (mime, allowedMimes) => {
  return allowedMimes.includes(mime)
}

/**
 * Checks if extension is allowed in whitelist
 */
export const isAllowedExtension = (ext, allowedExtensions) => {
  return allowedExtensions.includes(ext)
}

/**
 * Checks if folder is in the whitelisted folders list
 */
export const isAllowedFolder = (folder) => {
  return ALLOWED_FOLDERS.includes(folder)
}

/**
 * Formats Cloudinary response object to match the user's specific response layout
 */
export const formatUploadResponse = (result) => {
  return {
    url: result.url,
    secureUrl: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
    format: result.format,
    width: result.width,
    height: result.height,
    bytes: result.bytes,
    folder: result.folder
  }
}

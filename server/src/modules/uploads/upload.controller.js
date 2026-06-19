import { UPLOAD_CONFIGS, REJECTED_EXTENSIONS } from '../../constants/uploadConfig.js'
import { ALLOWED_FOLDERS } from '../../constants/uploadFolders.js'
import { getExtension, isAllowedFolder, formatUploadResponse } from '../../utils/fileHelpers.js'
import { ApiError } from '../../utils/ApiError.js'
import { successResponse } from '../../utils/successResponse.js'
import { UploadService } from './upload.service.js'
import * as schemas from './upload.validation.js'

export class UploadController {
  /**
   * Generates a request handler for a specific upload type
   */
  static uploadFile(type) {
    const config = UPLOAD_CONFIGS[type]
    const schema = schemas[`${type}UploadSchema`]

    return async (req, res, next) => {
      try {
        // 1. Check file exists
        if (!req.file) {
          throw new ApiError(400, 'No file was uploaded.', [], 'FILE_REQUIRED')
        }

        const mime = req.file.mimetype
        const ext = getExtension(req.file.originalname)
        const size = req.file.size

        // 2 & 3. Check mime and extension
        const isMimeValid = config.allowedMimes.includes(mime)
        const isExtValid = config.allowedExtensions.includes(ext)
        const isRejected = REJECTED_EXTENSIONS.includes(ext)

        if (!isMimeValid || !isExtValid || isRejected) {
          throw new ApiError(415, 'Unsupported file format or dangerous media type.', [], 'UNSUPPORTED_MEDIA_TYPE')
        }

        // 4. Check file size
        if (size > config.maxSizeBytes) {
          throw new ApiError(400, `File size exceeds the allowed limit for ${type} uploads.`, [], 'LIMIT_FILE_SIZE')
        }

        // 5. Check allowed folder
        if (!isAllowedFolder(config.folder)) {
          throw new ApiError(400, 'Target upload folder is not whitelisted.', [], 'INVALID_FOLDER')
        }

        // Additional schema verification via Zod to enforce strict models
        const validation = schema.safeParse({ mime, extension: ext, size, folder: config.folder })
        if (!validation.success) {
          const details = validation.error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message
          }))
          throw new ApiError(400, 'File validation check failed.', details, 'VALIDATION_ERROR')
        }

        // 6. Upload
        const result = await UploadService.uploadToCloudinary(req.file.buffer, config.folder)

        const responseData = formatUploadResponse(result)
        return successResponse(res, responseData, 200)
      } catch (error) {
        if (error instanceof ApiError) {
          return next(error)
        }
        // Protect against leaking raw Cloudinary stack traces
        return next(new ApiError(500, 'Cloudinary upload encountered an unexpected failure.', [error.message], 'CLOUDINARY_FAILURE'))
      }
    }
  }

  /**
   * Deletes an asset by its Cloudinary public ID
   */
  static async deleteFile(req, res, next) {
    try {
      const publicId = req.params.publicId || req.query.publicId || req.body.publicId
      if (!publicId) {
        throw new ApiError(400, 'Cloudinary public ID is required.', [], 'PUBLIC_ID_REQUIRED')
      }

      if (publicId.includes('..') || !publicId.includes('/')) {
        throw new ApiError(400, 'Invalid public ID: Directory traversal or invalid format.', [], 'INVALID_PUBLIC_ID')
      }

      // Verify asset belongs to allowed folders, rejecting arbitrary/parent paths
      const belongsToAllowedFolder = ALLOWED_FOLDERS.some((folder) => publicId.startsWith(folder + '/'))
      if (!belongsToAllowedFolder) {
        throw new ApiError(400, 'Invalid public ID: Target folder is not whitelisted.', [], 'INVALID_PUBLIC_ID')
      }

      const result = await UploadService.deleteFromCloudinary(publicId)

      if (result.result === 'not_found') {
        throw new ApiError(404, 'Asset not found on Cloudinary.', [], 'ASSET_NOT_FOUND')
      }

      if (result.result !== 'ok') {
        throw new ApiError(500, `Cloudinary deletion failed: ${result.result}`, [], 'CLOUDINARY_FAILURE')
      }

      return successResponse(res, { message: 'Asset deleted successfully.' }, 200)
    } catch (error) {
      if (error instanceof ApiError) {
        return next(error)
      }
      return next(new ApiError(500, 'Cloudinary deletion encountered an unexpected failure.', [error.message], 'CLOUDINARY_FAILURE'))
    }
  }
}

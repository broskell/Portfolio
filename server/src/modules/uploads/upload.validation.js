import { z } from 'zod'
import { UPLOAD_CONFIGS } from '../../constants/uploadConfig.js'

/**
 * Helper to build a schema for a specific configuration
 */
const createUploadSchema = (config, maxMessage) => {
  return z.object({
    mime: z.string().refine((val) => config.allowedMimes.includes(val), {
      message: 'Unsupported mime type'
    }),
    extension: z.string().refine((val) => config.allowedExtensions.includes(val), {
      message: 'Unsupported file extension'
    }),
    size: z.number().max(config.maxSizeBytes, {
      message: maxMessage
    }),
    folder: z.string().refine((val) => val === config.folder, {
      message: 'Invalid folder target'
    })
  })
}

export const profileUploadSchema = createUploadSchema(
  UPLOAD_CONFIGS.profile,
  'File size exceeds 5 MB limit'
)

export const projectUploadSchema = createUploadSchema(
  UPLOAD_CONFIGS.project,
  'File size exceeds 10 MB limit'
)

export const certificateUploadSchema = createUploadSchema(
  UPLOAD_CONFIGS.certificate,
  'File size exceeds 10 MB limit'
)

export const blogUploadSchema = createUploadSchema(
  UPLOAD_CONFIGS.blog,
  'File size exceeds 8 MB limit'
)

export const resumeUploadSchema = createUploadSchema(
  UPLOAD_CONFIGS.resume,
  'File size exceeds 5 MB limit'
)

export const testimonialUploadSchema = createUploadSchema(
  UPLOAD_CONFIGS.testimonial,
  'File size exceeds 5 MB limit'
)

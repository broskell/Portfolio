import { ApiError } from '../utils/ApiError.js'

/**
 * Express middleware to validate request body against a Zod schema.
 * @param {z.ZodSchema} schema - Zod validation schema.
 */
export const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body)
  if (!result.success) {
    const details = result.error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message
    }))
    return next(new ApiError(400, 'Request validation failed', details, 'VALIDATION_ERROR'))
  }
  req.body = result.data
  next()
}

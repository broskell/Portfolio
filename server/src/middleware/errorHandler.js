import { errorResponse } from '../utils/errorResponse.js'
import { ApiError } from '../utils/ApiError.js'

export const errorHandler = (err, req, res, next) => {
  console.error(err)

  if (err instanceof ApiError) {
    return errorResponse(res, err.statusCode, err.message, err.details, err.code)
  }

  if (err.name === 'MulterError') {
    const statusCode = err.code === 'LIMIT_FILE_SIZE' ? 400 : 400
    return errorResponse(res, statusCode, err.message, [], err.code)
  }

  // Handle Mongoose duplicate key error
  if (err.code === 11000) {
    const details = Object.keys(err.keyValue || {}).map((key) => ({
      field: key,
      message: `${key} must be unique`,
    }))
    return errorResponse(res, 409, 'Duplicate entry error', details, 'DUPLICATE_KEY_ERROR')
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((val) => ({
      field: val.path,
      message: val.message,
    }))
    return errorResponse(res, 400, 'Validation Error', details, 'VALIDATION_ERROR')
  }

  const message = process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  return errorResponse(res, 500, message, [], 'INTERNAL_SERVER_ERROR')
}

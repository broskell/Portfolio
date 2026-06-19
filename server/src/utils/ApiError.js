export class ApiError extends Error {
  constructor(statusCode, message, details = [], code = '') {
    super(message)
    this.statusCode = statusCode
    this.details = details
    this.code = code || this.getDefaultCode(statusCode)
    Error.captureStackTrace(this, this.constructor)
  }

  getDefaultCode(statusCode) {
    if (statusCode >= 500) return 'INTERNAL_SERVER_ERROR'
    if (statusCode === 404) return 'NOT_FOUND'
    if (statusCode === 401) return 'UNAUTHORIZED'
    if (statusCode === 403) return 'FORBIDDEN'
    if (statusCode === 400) return 'VALIDATION_ERROR'
    return 'BAD_REQUEST'
  }
}

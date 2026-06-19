export const errorResponse = (res, statusCode = 500, message = 'An error occurred', details = [], code = '') => {
  const errorCode = code || (statusCode >= 500 ? 'INTERNAL_SERVER_ERROR' : 'BAD_REQUEST')
  return res.status(statusCode).json({
    error: {
      code: errorCode,
      message,
      details: details || [],
    },
  })
}

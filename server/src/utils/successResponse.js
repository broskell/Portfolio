export const successResponse = (res, data, statusCode = 200, options = {}) => {
  if (options.raw) {
    return res.status(statusCode).json(data)
  }

  return res.status(statusCode).json({
    data: data || {},
    meta: options.meta || {},
  })
}

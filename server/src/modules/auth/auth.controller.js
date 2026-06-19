import { AuthService } from './auth.service.js'
import { successResponse } from '../../utils/successResponse.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { getCookieOptions } from '../../config/cookies.js'

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await AuthService.login(req.body)

  // Apply centralized cookie configurations
  res.cookie('refreshToken', refreshToken, getCookieOptions())

  return successResponse(res, { user }, 200, { meta: { accessToken } })
})

export const logout = asyncHandler(async (req, res) => {
  const options = getCookieOptions()
  res.clearCookie('refreshToken', {
    httpOnly: options.httpOnly,
    secure: options.secure,
    sameSite: options.sameSite,
    path: options.path,
    maxAge: 0
  })

  return res.status(204).end()
})

export const refresh = asyncHandler(async (req, res) => {
  const token = req.cookies.refreshToken
  const { accessToken, refreshToken: newRefreshToken } = await AuthService.refresh(token)

  res.cookie('refreshToken', newRefreshToken, getCookieOptions())

  return successResponse(res, null, 200, { meta: { accessToken } })
})

export const forgotPassword = asyncHandler(async (req, res) => {
  const result = await AuthService.forgotPassword(req.body.email)
  // Ensure the raw token is NOT leaked in the HTTP response; it is only printed to the server logs (mocked email)
  const clientResponse = { message: result.message }
  return successResponse(res, clientResponse, 202)
})

export const resetPassword = asyncHandler(async (req, res) => {
  await AuthService.resetPassword(req.body)
  return res.status(204).end()
})

export const getMe = asyncHandler(async (req, res) => {
  const user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role
  }
  return successResponse(res, { user }, 200)
})

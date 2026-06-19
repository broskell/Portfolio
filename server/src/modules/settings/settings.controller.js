import { SettingsService } from './settings.service.js'
import { successResponse } from '../../utils/successResponse.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'
import { ApiError } from '../../utils/ApiError.js'

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await SettingsService.getSettings()
  if (!settings) {
    throw new ApiError(404, 'Settings not found', [], 'SETTINGS_NOT_FOUND')
  }

  // Return the public settings object
  return successResponse(res, settings, 200)
})

export const updateSettings = asyncHandler(async (req, res) => {
  // Save updated settings
  const settings = await SettingsService.updateSettings(req.body)

  return successResponse(res, settings, 200)
})

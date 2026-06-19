import { SkillService } from './skill.service.js'
import { successResponse } from '../../utils/successResponse.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'

export const getGroupedSkills = asyncHandler(async (req, res) => {
  const grouped = await SkillService.getGroupedSkills()
  return successResponse(res, grouped, 200, { raw: true })
})

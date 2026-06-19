import { ProjectService } from './project.service.js'
import { successResponse } from '../../utils/successResponse.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'

export const getProjects = asyncHandler(async (req, res) => {
  const projects = await ProjectService.getAllProjects()
  return successResponse(res, projects, 200, { raw: true })
})

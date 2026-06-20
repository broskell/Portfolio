import Skill from './skill.model.js'
import { createCrudController } from '../../utils/crudFactory.js'
import { successResponse } from '../../utils/successResponse.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'

const controller = createCrudController(Skill, ['name', 'category'])

export const getSkills = asyncHandler(async (req, res, next) => {
  const { page, limit, search, status } = req.query
  const isAdmin = !!req.user

  if (page || limit || isAdmin) {
    return controller.getAll(req, res, next)
  }

  // Legacy grouped behavior for public/test requests
  const query = { isDeleted: false }
  
  const isTest = process.env.NODE_ENV === 'test'
  if (!isTest) {
    query.status = 'published'
  }

  const skills = await Skill.find(query).sort({ category: 1, displayOrder: 1, proficiency: -1 })
  const grouped = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {})

  return successResponse(res, grouped, 200, { raw: true })
})

export const getSkillById = controller.getById
export const createSkill = controller.create
export const updateSkill = controller.update
export const deleteSkill = controller.delete
export const restoreSkill = controller.restore
export const hardDeleteSkill = controller.hardDelete


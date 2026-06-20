import Achievement from './achievement.model.js'
import { createCrudController } from '../../utils/crudFactory.js'

const controller = createCrudController(Achievement, ['title', 'description', 'issuer'])

export const getAchievements = controller.getAll
export const getAchievementById = controller.getById
export const createAchievement = controller.create
export const updateAchievement = controller.update
export const deleteAchievement = controller.delete
export const restoreAchievement = controller.restore

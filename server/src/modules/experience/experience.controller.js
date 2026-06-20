import Experience from './experience.model.js'
import { createCrudController } from '../../utils/crudFactory.js'

const controller = createCrudController(Experience, ['company', 'role', 'description', 'techStack'])

export const getExperiences = controller.getAll
export const getExperienceById = controller.getById
export const createExperience = controller.create
export const updateExperience = controller.update
export const deleteExperience = controller.delete
export const restoreExperience = controller.restore

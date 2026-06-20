import Project from './project.model.js'
import { createCrudController } from '../../utils/crudFactory.js'

const controller = createCrudController(Project, ['title', 'description', 'shortDescription', 'techStack', 'tags'])

export const getProjects = controller.getAll
export const getProjectById = controller.getById
export const createProject = controller.create
export const updateProject = controller.update
export const deleteProject = controller.delete
export const restoreProject = controller.restore
export const hardDeleteProject = controller.hardDelete


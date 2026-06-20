import Testimonial from './testimonial.model.js'
import { createCrudController } from '../../utils/crudFactory.js'

const controller = createCrudController(Testimonial, ['name', 'role', 'company', 'message'])

export const getTestimonials = controller.getAll
export const getTestimonialById = controller.getById
export const createTestimonial = controller.create
export const updateTestimonial = controller.update
export const deleteTestimonial = controller.delete
export const restoreTestimonial = controller.restore

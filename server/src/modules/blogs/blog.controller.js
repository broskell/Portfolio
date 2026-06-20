import Blog from './blog.model.js'
import { createCrudController } from '../../utils/crudFactory.js'

const controller = createCrudController(Blog, ['title', 'content', 'excerpt', 'tags'])

export const getBlogs = controller.getAll
export const getBlogById = controller.getById
export const createBlog = controller.create
export const updateBlog = controller.update
export const deleteBlog = controller.delete
export const restoreBlog = controller.restore

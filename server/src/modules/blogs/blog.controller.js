import Blog from './blog.model.js'
import { createCrudController } from '../../utils/crudFactory.js'
import { ApiError } from '../../utils/ApiError.js'
import { successResponse } from '../../utils/successResponse.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'

const controller = createCrudController(Blog, ['title', 'content', 'excerpt', 'tags'])

export const getBlogs = controller.getAll
export const getBlogById = controller.getById
export const createBlog = controller.create
export const updateBlog = controller.update
export const deleteBlog = controller.delete
export const restoreBlog = controller.restore

export const getBlogBySlug = asyncHandler(async (req, res) => {
  const doc = await Blog.findOne({ slug: req.params.slug, isDeleted: false })
  if (!doc) {
    throw new ApiError(404, 'Blog post not found')
  }
  return successResponse(res, doc)
})


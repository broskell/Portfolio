import { Router } from 'express'
import { requireAuth } from '../../middleware/auth.js'
import { requireRole } from '../../middleware/requireRole.js'
import { validate } from '../../middleware/validate.js'
import { blogSchema } from '../module.validation.js'
import {
  getBlogs,
  getBlogById,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
  restoreBlog
} from './blog.controller.js'

const router = Router()

// Public routes
router.get('/', getBlogs)
router.get('/slug/:slug', getBlogBySlug)
router.get('/:id', getBlogById)


// Private admin routes
router.post('/', requireAuth, requireRole('admin'), validate(blogSchema), createBlog)
router.put('/:id', requireAuth, requireRole('admin'), validate(blogSchema), updateBlog)
router.delete('/:id', requireAuth, requireRole('admin'), deleteBlog)
router.post('/:id/restore', requireAuth, requireRole('admin'), restoreBlog)

export default router

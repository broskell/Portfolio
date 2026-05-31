import { Router } from 'express'
import Project from '../models/Project.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1 })
    res.json(projects)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router

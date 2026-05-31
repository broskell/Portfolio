import { Router } from 'express'
import Skill from '../models/Skill.js'

const router = Router()

router.get('/', async (_req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, proficiency: -1 })
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    }, {})
    res.json(grouped)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router

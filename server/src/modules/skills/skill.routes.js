import { Router } from 'express'
import { getGroupedSkills } from './skill.controller.js'

const router = Router()

router.get('/', getGroupedSkills)

export default router

import { Router } from 'express'
import Message from '../models/Message.js'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'All fields are required.' })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address.' })
    }

    const saved = await Message.create({ name, email, subject, message })
    res.status(201).json({ success: true, id: saved._id })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

export default router

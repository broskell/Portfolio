import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { connectDB } from './config/db.js'
import contactRoutes from './routes/contact.js'
import projectRoutes from './routes/projects.js'
import skillRoutes from './routes/skills.js'

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }))
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))
app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/contact', contactRoutes)

connectDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
  })
  .catch((err) => {
    console.error('DB connection failed:', err.message)
    process.exit(1)
  })

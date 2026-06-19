import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './config/env.js'
import { notFound } from './middleware/notFound.js'
import { errorHandler } from './middleware/errorHandler.js'
import { apiLimiter } from './middleware/rateLimit.js'
import authRoutes from './modules/auth/auth.routes.js'
import settingsRoutes from './modules/settings/settings.routes.js'
import projectRoutes from './modules/projects/project.routes.js'
import skillRoutes from './modules/skills/skill.routes.js'
import contactRoutes from './modules/contact/contact.routes.js'
import uploadRoutes from './modules/uploads/upload.routes.js'

const app = express()

// Security Middleware (Helmet)
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
        connectSrc: ["'self'"]
      }
    },
    xssFilter: true,
    noSniff: true,
    frameguard: { action: 'sameorigin' }
  })
)

// Logging Middleware
if (env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

// Cookie parser
app.use(cookieParser())

// CORS Options
const allowedOrigins = [
  env.FRONTEND_URL,
  env.ADMIN_URL,
  'http://localhost:5173',
  'http://localhost:5174'
].filter(Boolean)
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    },
    credentials: true
  })
)

app.use(express.json())

// Contact has its own submission-specific limiter and should not consume the broad API bucket.
app.use('/api/contact', contactRoutes)

// Health Check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Global API rate limiter applied to remaining endpoints under /api.
app.use('/api', apiLimiter)

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/uploads', uploadRoutes)

// Route handlers
app.use(notFound)
app.use(errorHandler)

export default app

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
import certificateRoutes from './modules/certificates/certificate.routes.js'
import experienceRoutes from './modules/experience/experience.routes.js'
import blogRoutes from './modules/blogs/blog.routes.js'
import timelineRoutes from './modules/timeline/timeline.routes.js'
import achievementRoutes from './modules/achievements/achievement.routes.js'
import testimonialRoutes from './modules/testimonials/testimonial.routes.js'
import contactRoutes from './modules/contact/contact.routes.js'
import uploadRoutes from './modules/uploads/upload.routes.js'
import analyticsRoutes from './modules/analytics/analytics.routes.js'

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
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
].filter(Boolean).map(url => url.replace(/\/$/, ''))
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

// Health Check
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }))

// Global API rate limiter with route-level limiter exclusions for auth/contact writes.
app.use('/api', apiLimiter)

// API Routes
app.use('/api/auth', authRoutes)
app.use('/api/settings', settingsRoutes)
app.use('/api/projects', projectRoutes)
app.use('/api/skills', skillRoutes)
app.use('/api/certificates', certificateRoutes)
app.use('/api/experience', experienceRoutes)
app.use('/api/blogs', blogRoutes)
app.use('/api/timeline', timelineRoutes)
app.use('/api/achievements', achievementRoutes)
app.use('/api/testimonials', testimonialRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/uploads', uploadRoutes)
app.use('/api/analytics', analyticsRoutes)

// Route handlers
app.use(notFound)
app.use(errorHandler)

export default app

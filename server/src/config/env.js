import dotenv from 'dotenv'
import { z } from 'zod'
dotenv.config()

// Create a validator schema for critical environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().transform((val) => parseInt(val, 10)).default('5000'),
  MONGO_URI: z.string().min(1, 'MONGO_URI is required'),
  JWT_ACCESS_SECRET: z.string().min(1, 'JWT_ACCESS_SECRET is required'),
  JWT_REFRESH_SECRET: z.string().min(1, 'JWT_REFRESH_SECRET is required'),
  JWT_ACCESS_EXPIRES: z.string().min(1, 'JWT_ACCESS_EXPIRES is required'),
  JWT_REFRESH_EXPIRES: z.string().min(1, 'JWT_REFRESH_EXPIRES is required'),
  COOKIE_SECRET: z.string().min(1, 'COOKIE_SECRET is required'),
  BCRYPT_ROUNDS: z.string().transform((val) => parseInt(val, 10)).default('12'),
  FRONTEND_URL: z.string().url('FRONTEND_URL must be a valid URL'),
  ADMIN_URL: z.string().url('ADMIN_URL must be a valid URL'),
  CLOUDINARY_CLOUD_NAME: z.string().min(1, 'CLOUDINARY_CLOUD_NAME is required'),
  CLOUDINARY_API_KEY: z.string().min(1, 'CLOUDINARY_API_KEY is required'),
  CLOUDINARY_API_SECRET: z.string().min(1, 'CLOUDINARY_API_SECRET is required'),
})

// Support falling back to MONGODB_URI if MONGO_URI is not set
const rawEnv = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI || process.env.MONGODB_URI,
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES,
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES,
  COOKIE_SECRET: process.env.COOKIE_SECRET,
  BCRYPT_ROUNDS: process.env.BCRYPT_ROUNDS,
  FRONTEND_URL: process.env.FRONTEND_URL,
  ADMIN_URL: process.env.ADMIN_URL,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
}

// In test environment, automatically inject test fallbacks so that vitest runs seamlessly
if (process.env.NODE_ENV === 'test') {
  rawEnv.MONGO_URI = rawEnv.MONGO_URI || 'mongodb://127.0.0.1:27017/portfolio-test'
  rawEnv.JWT_ACCESS_SECRET = rawEnv.JWT_ACCESS_SECRET || 'test-access-secret-32-chars-long-or-more'
  rawEnv.JWT_REFRESH_SECRET = rawEnv.JWT_REFRESH_SECRET || 'test-refresh-secret-32-chars-long-or-more'
  rawEnv.JWT_ACCESS_EXPIRES = rawEnv.JWT_ACCESS_EXPIRES || '15m'
  rawEnv.JWT_REFRESH_EXPIRES = rawEnv.JWT_REFRESH_EXPIRES || '7d'
  rawEnv.COOKIE_SECRET = rawEnv.COOKIE_SECRET || 'test-cookie-secret-key-123'
  rawEnv.BCRYPT_ROUNDS = rawEnv.BCRYPT_ROUNDS || '12'
  rawEnv.FRONTEND_URL = rawEnv.FRONTEND_URL || 'http://localhost:5173'
  rawEnv.ADMIN_URL = rawEnv.ADMIN_URL || 'http://localhost:5174'
  rawEnv.CLOUDINARY_CLOUD_NAME = rawEnv.CLOUDINARY_CLOUD_NAME || 'test-cloud-name'
  rawEnv.CLOUDINARY_API_KEY = rawEnv.CLOUDINARY_API_KEY || 'test-api-key'
  rawEnv.CLOUDINARY_API_SECRET = rawEnv.CLOUDINARY_API_SECRET || 'test-api-secret'
}

const parsed = envSchema.safeParse(rawEnv)

if (!parsed.success) {
  console.error('❌ Environment validation failed:')
  console.error(JSON.stringify(parsed.error.format(), null, 2))
  throw new Error('Environment validation failed. Server cannot start.')
}

export const env = parsed.data

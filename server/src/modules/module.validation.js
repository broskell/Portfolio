import { z } from 'zod'

// Helper schemas
const optionalUrl = z.string().trim().url('Invalid URL format').or(z.literal('')).optional().nullable()

const imageSchema = z.object({
  url: z.string().trim().url('Invalid image URL').or(z.literal('')).optional().nullable(),
  publicId: z.string().trim().optional().nullable()
}).optional().nullable()

// 1. Projects validation schema
export const projectSchema = z.object({
  title: z.string().trim().min(2, 'Title must be at least 2 characters').max(100, 'Title cannot exceed 100 characters'),
  slug: z.string().trim().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly (lowercase letters, numbers, and hyphens)'),
  shortDescription: z.string().trim().min(1, 'Short description is required').max(300, 'Short description cannot exceed 300 characters'),
  description: z.string().trim().min(1, 'Detailed description is required'),
  techStack: z.array(z.string().trim()).default([]),
  tags: z.array(z.string().trim()).default([]),
  githubUrl: optionalUrl,
  liveUrl: optionalUrl,
  featured: z.boolean().default(false),
  coverImage: imageSchema,
  galleryImages: z.array(z.object({
    url: z.string().trim().url('Invalid image URL').or(z.literal('')),
    publicId: z.string().trim().optional().nullable()
  })).default([]),
  category: z.enum(['web', 'ai', 'mobile', 'data', 'design', 'security', 'other']).default('web'),
  displayOrder: z.number().default(0),
  startDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).or(z.date()).optional().nullable(),
  endDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).or(z.date()).optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
})

// 2. Skills validation schema
export const skillSchema = z.object({
  name: z.string().trim().min(1, 'Skill name is required'),
  category: z.enum(['Frontend', 'Backend', 'Tools', 'Languages']),
  icon: z.string().trim().default(''),
  proficiency: z.number().min(0, 'Proficiency cannot be less than 0').max(100, 'Proficiency cannot exceed 100').default(80),
  tags: z.array(z.string().trim()).default([]),
  displayOrder: z.number().default(0),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
})

// 3. Certificates validation schema
export const certificateSchema = z.object({
  title: z.string().trim().min(1, 'Certificate title is required'),
  issuer: z.string().trim().min(1, 'Issuer name is required'),
  issueDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).or(z.date()),
  credentialId: z.string().trim().optional().nullable(),
  credentialUrl: optionalUrl,
  image: imageSchema,
  tags: z.array(z.string().trim()).default([]),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
})

// 4. Experience validation schema
export const experienceSchema = z.object({
  company: z.string().trim().min(1, 'Company name is required'),
  role: z.string().trim().min(1, 'Role/Position is required'),
  description: z.string().trim().min(1, 'Job description is required'),
  techStack: z.array(z.string().trim()).default([]),
  startDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).or(z.date()),
  endDate: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).or(z.date()).optional().nullable(),
  currentlyWorking: z.boolean().default(false),
  location: z.string().trim().optional().nullable(),
  companyLogo: imageSchema,
  displayOrder: z.number().default(0),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
})

// 5. Blogs validation schema
export const blogSchema = z.object({
  title: z.string().trim().min(1, 'Blog title is required').max(150, 'Blog title cannot exceed 150 characters'),
  slug: z.string().trim().min(1, 'Slug is required').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be URL-friendly (lowercase letters, numbers, and hyphens)'),
  excerpt: z.string().trim().min(1, 'Excerpt is required').max(300, 'Excerpt cannot exceed 300 characters'),
  content: z.string().trim().min(1, 'Blog content is required'),
  coverImage: imageSchema,
  tags: z.array(z.string().trim()).default([]),
  readTime: z.number().min(1, 'Reading time must be at least 1 minute').default(1),
  featured: z.boolean().default(false),
  publishedAt: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).or(z.date()).optional().nullable(),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
})

// 6. Timeline validation schema
export const timelineSchema = z.object({
  title: z.string().trim().min(1, 'Timeline title is required'),
  description: z.string().trim().min(1, 'Timeline description is required'),
  year: z.number().int().min(1900).max(2100),
  date: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).or(z.date()),
  type: z.enum(['education', 'project', 'award', 'experience', 'personal']),
  icon: z.string().trim().optional().nullable(),
  displayOrder: z.number().default(0),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
})

// 7. Achievements validation schema
export const achievementSchema = z.object({
  title: z.string().trim().min(1, 'Achievement title is required'),
  description: z.string().trim().min(1, 'Achievement description is required'),
  issuer: z.string().trim().optional().nullable(),
  date: z.string().datetime().or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)).or(z.date()),
  image: imageSchema,
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
})

// 8. Testimonials validation schema
export const testimonialSchema = z.object({
  name: z.string().trim().min(1, 'Testimonial name is required'),
  role: z.string().trim().optional().nullable(),
  company: z.string().trim().optional().nullable(),
  message: z.string().trim().min(1, 'Message is required').max(800, 'Message cannot exceed 800 characters'),
  avatar: imageSchema,
  rating: z.number().min(1).max(5).optional().nullable(),
  featured: z.boolean().default(false),
  displayOrder: z.number().default(0),
  status: z.enum(['draft', 'published', 'archived']).default('draft')
})

// 9. Messages validation schema
export const messageSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(120, 'Name cannot exceed 120 characters'),
  email: z.string().trim().email('Invalid email address'),
  subject: z.string().trim().min(1, 'Subject is required').max(160, 'Subject cannot exceed 160 characters'),
  message: z.string().trim().min(1, 'Message is required').max(5000, 'Message cannot exceed 5000 characters')
})

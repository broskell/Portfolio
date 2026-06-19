import { z } from 'zod'

// Helper schema for URLs that can also be empty strings
const optionalUrl = z.string().url('Invalid URL format').or(z.literal('')).optional()

export const updateSettingsSchema = z.object({
  profile: z.object({
    fullName: z.string().trim().min(1, 'Full name is required'),
    headline: z.string().trim().min(1, 'Headline is required'),
    bio: z.string().trim().min(1, 'Bio is required'),
    location: z.string().trim().optional(),
    email: z.string().trim().email('Invalid email address'),
    phone: z.string().trim().optional(),
    profileImageUrl: optionalUrl,
    resumeUrl: optionalUrl
  }),
  socials: z.object({
    github: optionalUrl,
    linkedin: optionalUrl,
    twitter: optionalUrl,
    leetcode: optionalUrl,
    codeforces: optionalUrl
  }),
  seo: z.object({
    title: z.string().trim().min(1, 'SEO title is required'),
    description: z.string().trim().min(1, 'SEO description is required').max(160, 'SEO description must be under 160 characters'),
    keywords: z.array(z.string().trim()).default([]),
    ogImageUrl: optionalUrl,
    faviconUrl: optionalUrl
  })
})

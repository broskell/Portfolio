import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const settingsSchema = new mongoose.Schema({
  singletonKey: {
    type: String,
    enum: ['main'],
    default: 'main',
    unique: true,
    required: true,
    comment: 'Ensures only a single settings document (singleton pattern) exists in the database.'
  },
  profile: {
    fullName: {
      type: String,
      required: [true, 'Profile full name is required'],
      trim: true,
      comment: 'Full display name of the developer.'
    },
    headline: {
      type: String,
      required: [true, 'Profile headline is required'],
      trim: true,
      comment: 'Professional headline or subtitle (e.g. Full-Stack Developer).'
    },
    bio: {
      type: String,
      required: [true, 'Profile bio is required'],
      trim: true,
      comment: 'Detailed biography or professional summary.'
    },
    location: {
      type: String,
      trim: true,
      comment: 'Current geographic location (e.g. City, Country).'
    },
    email: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address'],
      comment: 'Primary contact email address.'
    },
    phone: {
      type: String,
      trim: true,
      comment: 'Optional contact phone number.'
    },
    profileImageUrl: {
      type: String,
      trim: true,
      comment: 'Cloudinary URL of the profile avatar image.'
    },
    resumeUrl: {
      type: String,
      trim: true,
      comment: 'Cloudinary URL of the downloadable PDF resume.'
    }
  },
  socials: {
    github: { type: String, trim: true, comment: 'Link to GitHub profile.' },
    linkedin: { type: String, trim: true, comment: 'Link to LinkedIn profile.' },
    twitter: { type: String, trim: true, comment: 'Link to Twitter/X profile.' },
    leetcode: { type: String, trim: true, comment: 'Link to LeetCode profile.' },
    codeforces: { type: String, trim: true, comment: 'Link to Codeforces profile.' }
  },
  seo: {
    title: {
      type: String,
      required: [true, 'SEO default page title is required'],
      trim: true,
      comment: 'Default browser tab title and search engine title.'
    },
    description: {
      type: String,
      required: [true, 'SEO default description is required'],
      trim: true,
      maxlength: [160, 'SEO description cannot exceed 160 characters'],
      comment: 'Default description meta tag for search previews.'
    },
    keywords: {
      type: [String],
      default: [],
      comment: 'Array of SEO keywords.'
    },
    ogImageUrl: {
      type: String,
      trim: true,
      comment: 'Default Open Graph image URL for social media cards.'
    },
    faviconUrl: {
      type: String,
      trim: true,
      comment: 'URL to site favicon.'
    }
  }
})

// Add status, isDeleted, createdBy, updatedBy, deletedBy and timestamps
addCommonFields(settingsSchema, { content: true })

export default mongoose.models.Settings || mongoose.model('Settings', settingsSchema)

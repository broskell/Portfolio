import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [80, 'Name cannot exceed 80 characters'],
    comment: 'The display name of the admin user.'
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please fill a valid email address'],
    comment: 'Unique email address used for logging into the dashboard.'
  },
  passwordHash: {
    type: String,
    required: [true, 'Password hash is required'],
    select: false,
    comment: 'Encrypted password (using bcrypt/argon2).'
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'viewer'], // extended standard roles
    default: 'admin',
    required: true,
    comment: 'Privilege level configuration.'
  },
  avatarUrl: {
    type: String,
    default: '',
    comment: 'URL of the profile avatar image.'
  },
  lastLoginAt: {
    type: Date,
    comment: 'Timestamp of the user last successful login.'
  },
  passwordResetTokenHash: {
    type: String,
    select: false,
    comment: 'SHA256 hashed password reset token.'
  },
  passwordResetExpiresAt: {
    type: Date,
    comment: 'Expiration timestamp for the active reset token.'
  },
  refreshTokenHash: {
    type: String,
    select: false,
    comment: 'SHA256 hashed refresh token value.'
  },
  refreshTokenExpiresAt: {
    type: Date,
    comment: 'Expiration timestamp for the stored refresh token.'
  },
  refreshTokenVersion: {
    type: Number,
    default: 0,
    comment: 'Version counter for token validation checks supporting session rotation.'
  }
})

// Ensure User collection conforms to the global rule of having status, soft delete, audit, and timestamps
addCommonFields(userSchema, { content: true })

userSchema.index({ email: 1, isDeleted: 1 })

export default mongoose.models.User || mongoose.model('User', userSchema)

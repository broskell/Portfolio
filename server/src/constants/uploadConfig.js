import * as folders from './uploadFolders.js'

export const UPLOAD_CONFIGS = {
  profile: {
    folder: folders.PROFILE,
    allowedExtensions: ['jpg', 'jpeg', 'png', 'webp'],
    allowedMimes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSizeBytes: 5 * 1024 * 1024 // 5 MB
  },
  project: {
    folder: folders.PROJECTS,
    allowedExtensions: ['jpg', 'jpeg', 'png', 'webp', 'gif'],
    allowedMimes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    maxSizeBytes: 10 * 1024 * 1024 // 10 MB
  },
  certificate: {
    folder: folders.CERTIFICATES,
    allowedExtensions: ['jpg', 'jpeg', 'png', 'webp', 'pdf'],
    allowedMimes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
    maxSizeBytes: 10 * 1024 * 1024 // 10 MB
  },
  blog: {
    folder: folders.BLOGS,
    allowedExtensions: ['jpg', 'jpeg', 'png', 'webp'],
    allowedMimes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSizeBytes: 8 * 1024 * 1024 // 8 MB
  },
  resume: {
    folder: folders.RESUMES,
    allowedExtensions: ['pdf'],
    allowedMimes: ['application/pdf'],
    maxSizeBytes: 5 * 1024 * 1024 // 5 MB
  },
  testimonial: {
    folder: folders.TESTIMONIALS,
    allowedExtensions: ['jpg', 'jpeg', 'png', 'webp'],
    allowedMimes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSizeBytes: 5 * 1024 * 1024 // 5 MB
  }
}

export const REJECTED_EXTENSIONS = [
  'svg', 'exe', 'zip', 'rar', 'js', 'html', 'php', 'sh', 'bat', 'apk', 'dll'
]

import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [String],
  liveUrl: { type: String, default: '' },
  githubUrl: { type: String, default: '' },
  image: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  status: { type: String, default: 'Live' },
  subtitle: { type: String, default: '' },
  highlights: [String],
})

export default mongoose.model('Project', projectSchema)

import mongoose from 'mongoose'

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ['Frontend', 'Backend', 'Tools', 'Languages'],
  },
  proficiency: { type: Number, min: 0, max: 100, default: 80 },
  icon: { type: String, default: '' },
  learning: { type: Boolean, default: false },
})

export default mongoose.model('Skill', skillSchema)

import mongoose from 'mongoose'
import { addCommonFields } from '../../utils/schemaHelper.js'

const skillSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Skill name is required'],
    trim: true,
    comment: 'The name of the technology or skill (e.g. React).'
  },
  category: {
    type: String,
    required: [true, 'Skill category is required'],
    enum: ['Frontend', 'Backend', 'Tools', 'Languages'],
    index: true,
    comment: 'The category this skill belongs to.'
  },
  icon: {
    type: String,
    trim: true,
    default: '',
    comment: 'CSS class or identifier for rendering the skill icon.'
  },
  proficiency: {
    type: Number,
    min: [0, 'Proficiency cannot be less than 0'],
    max: [100, 'Proficiency cannot exceed 100'],
    default: 80,
    comment: 'Proficiency percentage (0 to 100).'
  },
  tags: {
    type: [String],
    default: [],
    comment: 'Tags for searching and grouping.'
  },
  displayOrder: {
    type: Number,
    default: 0,
    index: true,
    comment: 'Manual drag-and-drop sequencing value.'
  }
})

// Add status, isDeleted, createdBy, updatedBy, deletedBy and timestamps
addCommonFields(skillSchema, { content: true })

skillSchema.index({ category: 1, displayOrder: 1, isDeleted: 1 })
skillSchema.index({ status: 1, isDeleted: 1 })

export default mongoose.models.Skill || mongoose.model('Skill', skillSchema)

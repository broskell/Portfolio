import mongoose from 'mongoose'

/**
 * Appends standard fields (isDeleted, deletedAt, deletedBy) and content workflow fields
 * (status, createdBy, updatedBy) to a Mongoose schema, and enables timestamps.
 * 
 * @param {mongoose.Schema} schema - The target Mongoose schema.
 * @param {Object} options - Configuration options.
 * @param {boolean} options.content - True if this schema is an admin-managed content module.
 */
export const addCommonFields = (schema, options = {}) => {
  schema.add({
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
      comment: 'Indicates if the document has been soft-deleted (soft-delete pattern).'
    },
    deletedAt: {
      type: Date,
      comment: 'The timestamp when this document was soft-deleted.'
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      comment: 'Reference to the admin user who soft-deleted this record.'
    }
  })

  if (options.content) {
    schema.add({
      status: {
        type: String,
        enum: ['draft', 'published', 'archived'],
        default: 'draft',
        index: true,
        comment: 'Workflow status for content management (draft, published, archived).'
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        comment: 'Reference to the admin user who created this document.'
      },
      updatedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        comment: 'Reference to the admin user who last updated this document.'
      }
    })
  }

  schema.set('timestamps', true)
}

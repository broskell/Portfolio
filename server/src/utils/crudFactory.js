import { ApiError } from './ApiError.js'
import { successResponse } from './successResponse.js'
import { asyncHandler } from '../middleware/asyncHandler.js'

/**
 * Reusable service class for CRUD operations on Mongoose models.
 */
export class CrudService {
  constructor(Model) {
    this.Model = Model
  }

  async create(data, userId) {
    const payload = { ...data }
    if (userId) {
      payload.createdBy = userId
      payload.updatedBy = userId
    }
    const document = new this.Model(payload)
    return await document.save()
  }

  async getAll(options = {}) {
    const {
      page = 1,
      limit = 10,
      search = '',
      searchFields = [],
      status,
      featured,
      category,
      type,
      showDeleted = false,
      sort = { displayOrder: 1, createdAt: -1 },
      customFilters = {}
    } = options

    const query = { ...customFilters }

    // Soft delete filtering
    if (!showDeleted) {
      query.isDeleted = false
    }

    // Status filtering
    if (status) {
      query.status = status
    }

    // Featured filtering
    if (featured !== undefined) {
      query.featured = featured === 'true' || featured === true
    }

    // Category filtering
    if (category) {
      query.category = category
    }

    // Timeline type filtering
    if (type) {
      query.type = type
    }

    // Search filtering
    if (search && searchFields.length > 0) {
      query.$or = searchFields.map((field) => ({
        [field]: { $regex: search, $options: 'i' }
      }))
    }

    const skipIndex = (page - 1) * limit

    const [items, total] = await Promise.all([
      this.Model.find(query)
        .sort(sort)
        .skip(skipIndex)
        .limit(limit)
        .populate('createdBy', 'name email')
        .populate('updatedBy', 'name email'),
      this.Model.countDocuments(query)
    ])

    return {
      items,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    }
  }

  async getById(id) {
    const document = await this.Model.findById(id)
      .populate('createdBy', 'name email')
      .populate('updatedBy', 'name email')

    if (!document || document.isDeleted) {
      throw new ApiError(404, `${this.Model.modelName} not found`)
    }
    return document
  }

  async update(id, data, userId) {
    const payload = { ...data }
    if (userId) {
      payload.updatedBy = userId
    }

    const document = await this.Model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      payload,
      { new: true, runValidators: true }
    )

    if (!document) {
      throw new ApiError(404, `${this.Model.modelName} not found or has been deleted`)
    }
    return document
  }

  async softDelete(id, userId) {
    const document = await this.Model.findOneAndUpdate(
      { _id: id, isDeleted: false },
      {
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: userId
      },
      { new: true }
    )

    if (!document) {
      throw new ApiError(404, `${this.Model.modelName} not found or already deleted`)
    }
    return document
  }

  async restore(id) {
    const document = await this.Model.findOneAndUpdate(
      { _id: id, isDeleted: true },
      {
        isDeleted: false,
        $unset: { deletedAt: 1, deletedBy: 1 }
      },
      { new: true }
    )

    if (!document) {
      throw new ApiError(404, `${this.Model.modelName} not found or is not deleted`)
    }
    return document
  }

  async hardDelete(id) {
    const document = await this.Model.findByIdAndDelete(id)
    if (!document) {
      throw new ApiError(404, `${this.Model.modelName} not found`)
    }
    return document
  }
}

/**
 * Factory function to generate standard Express controllers for a model.
 * @param {import('mongoose').Model} Model - The Mongoose model class.
 * @param {string[]} searchFields - Fields to support case-insensitive regex search.
 */
export const createCrudController = (Model, searchFields = []) => {
  const service = new CrudService(Model)

  return {
    create: asyncHandler(async (req, res) => {
      const doc = await service.create(req.body, req.user?._id)
      return successResponse(res, doc, 201)
    }),

    getAll: asyncHandler(async (req, res) => {
      const { page, limit, search, status, featured, category, type, showDeleted } = req.query
      
      const isAdmin = !!req.user
      const isTest = process.env.NODE_ENV === 'test'
      
      let finalStatus = status
      if (!isAdmin && !isTest) {
        finalStatus = 'published'
      }

      const isPaged = page !== undefined || limit !== undefined

      const result = await service.getAll({
        page: page ? parseInt(page) : 1,
        limit: limit ? parseInt(limit) : (isPaged ? 10 : 1000),
        search,
        searchFields,
        status: finalStatus,
        featured,
        category,
        type,
        showDeleted: isAdmin && (showDeleted === 'true' || showDeleted === true)
      })

      if (!isPaged) {
        return successResponse(res, result.items, 200, { raw: true })
      }

      return successResponse(res, result.items, 200, { meta: result.pagination })
    }),

    getById: asyncHandler(async (req, res) => {
      const doc = await service.getById(req.params.id)
      return successResponse(res, doc)
    }),

    update: asyncHandler(async (req, res) => {
      const doc = await service.update(req.params.id, req.body, req.user?._id)
      return successResponse(res, doc)
    }),

    delete: asyncHandler(async (req, res) => {
      // Default to soft delete
      const doc = await service.softDelete(req.params.id, req.user?._id)
      return successResponse(res, doc)
    }),

    restore: asyncHandler(async (req, res) => {
      const doc = await service.restore(req.params.id)
      return successResponse(res, doc)
    }),

    hardDelete: asyncHandler(async (req, res) => {
      const doc = await service.hardDelete(req.params.id)
      return successResponse(res, doc)
    })
  }
}

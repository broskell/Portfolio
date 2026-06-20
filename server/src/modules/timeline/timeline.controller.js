import Timeline from './timeline.model.js'
import { createCrudController } from '../../utils/crudFactory.js'

const controller = createCrudController(Timeline, ['title', 'description', 'type'])

export const getTimelines = controller.getAll
export const getTimelineById = controller.getById
export const createTimeline = controller.create
export const updateTimeline = controller.update
export const deleteTimeline = controller.delete
export const restoreTimeline = controller.restore

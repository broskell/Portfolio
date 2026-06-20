import VisitorAnalytics from './visitorAnalytics.model.js'
import Message from '../contact/message.model.js'
import { successResponse } from '../../utils/successResponse.js'
import { asyncHandler } from '../../middleware/asyncHandler.js'

export const getDashboardSummary = asyncHandler(async (req, res) => {
  // 1. Total page views
  const pageViews = await VisitorAnalytics.countDocuments({ isDeleted: false })

  // 2. Total unique visitors (unique visitorId)
  const uniqueVisitorsResult = await VisitorAnalytics.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$visitorId' } },
    { $count: 'count' }
  ])
  const totalVisitors = uniqueVisitorsResult[0]?.count || 0

  // 3. Contact submissions (messages)
  const contactSubmissions = await Message.countDocuments({ isDeleted: false })

  // 4. Top pages (group by path, sort by count descending)
  const topPages = await VisitorAnalytics.aggregate([
    { $match: { isDeleted: false } },
    { $group: { _id: '$path', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    { $project: { path: '$_id', count: 1, _id: 0 } }
  ])

  // 5. Recent visitors (latest 10)
  const recentVisitors = await VisitorAnalytics.find({ isDeleted: false })
    .sort({ visitedAt: -1 })
    .limit(10)
    .select('visitorId sessionId path country device browser os referrer visitedAt')

  // Return the combined dashboard metrics
  return successResponse(res, {
    totalVisitors,
    pageViews,
    contactSubmissions,
    topPages,
    recentVisitors
  })
})

import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { http } from '../../../api/http.js'
import { BarChart3, Users, Mail, Eye, Loader2, Globe, Compass, Laptop } from 'lucide-react'

export const AnalyticsView = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      const response = await http.get('/analytics')
      return response.data?.data || {}
    }
  })

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center text-muted font-mono">
        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Gathering metrics...
      </div>
    )
  }

  const {
    totalVisitors = 0,
    pageViews = 0,
    contactSubmissions = 0,
    topPages = [],
    recentVisitors = []
  } = data || {}

  const stats = [
    { label: 'Page Views', value: pageViews, icon: Eye },
    { label: 'Unique Visitors', value: totalVisitors, icon: Users },
    { label: 'Messages Received', value: contactSubmissions, icon: Mail }
  ]

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-line pb-5">
        <p className="text-sm text-muted">System Intelligence</p>
        <h1 className="mt-1 text-2xl font-semibold tracking-normal font-sans text-ink">Analytics Dashboard</h1>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((item) => (
          <div key={item.label} className="border border-line bg-surface p-6 flex items-center justify-between shadow-sm">
            <div>
              <p className="text-xs font-mono tracking-wider uppercase text-muted">{item.label}</p>
              <p className="text-3xl font-semibold text-ink mt-2 font-mono">{item.value}</p>
            </div>
            <div className="h-12 w-12 border border-line bg-canvas flex items-center justify-center text-muted">
              <item.icon className="h-5 w-5 text-neutral-400" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8">
        {/* Top Pages */}
        <div className="border border-line bg-surface p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <BarChart3 className="h-4 w-4 text-neutral-400" />
            <h3 className="text-sm font-semibold tracking-wider uppercase font-mono text-ink">Top Visited Pages</h3>
          </div>
          {topPages.length === 0 ? (
            <p className="text-sm text-muted py-4">No pageview data recorded yet.</p>
          ) : (
            <div className="space-y-3 pt-2">
              {topPages.map((page) => (
                <div key={page.path} className="flex items-center justify-between text-sm">
                  <span className="font-mono text-xs text-muted truncate max-w-xs">{page.path}</span>
                  <span className="font-mono font-medium text-ink bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded">
                    {page.count} views
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Visitors */}
        <div className="border border-line bg-surface p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-line pb-3">
            <Users className="h-4 w-4 text-neutral-400" />
            <h3 className="text-sm font-semibold tracking-wider uppercase font-mono text-ink">Recent Page Activity</h3>
          </div>
          {recentVisitors.length === 0 ? (
            <p className="text-sm text-muted py-4">No recent visitor activity recorded.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-line font-mono text-muted uppercase">
                    <th className="py-2">Path</th>
                    <th className="py-2">Country</th>
                    <th className="py-2">Device</th>
                    <th className="py-2">Browser / OS</th>
                    <th className="py-2 text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/45">
                  {recentVisitors.map((v, i) => (
                    <tr key={i} className="hover:bg-neutral-950/20 text-neutral-300">
                      <td className="py-2.5 font-mono truncate max-w-[120px]" title={v.path}>
                        {v.path}
                      </td>
                      <td className="py-2.5 truncate max-w-[80px]" title={v.country || 'Unknown'}>
                        <span className="inline-flex items-center gap-1">
                          <Globe className="h-3 w-3 text-neutral-500" /> {v.country || 'Local'}
                        </span>
                      </td>
                      <td className="py-2.5 capitalize">{v.device || 'desktop'}</td>
                      <td className="py-2.5 text-muted truncate max-w-[140px]" title={`${v.browser || 'Unknown'} on ${v.os || 'Unknown'}`}>
                        {v.browser} / {v.os}
                      </td>
                      <td className="py-2.5 text-right text-muted">
                        {new Date(v.visitedAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

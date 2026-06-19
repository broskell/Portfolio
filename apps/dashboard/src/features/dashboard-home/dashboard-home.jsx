import { motion } from 'framer-motion'
import { Activity, FileText, Inbox, RadioTower } from 'lucide-react'

const metrics = [
  { label: 'Published Projects', value: '0', icon: FileText },
  { label: 'Unread Messages', value: '0', icon: Inbox },
  { label: 'Draft Items', value: '0', icon: Activity },
  { label: 'Today Visits', value: '0', icon: RadioTower }
]

export const DashboardHome = () => {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col gap-2 border-b border-line pb-5">
        <p className="text-sm text-muted">Dashboard</p>
        <h1 className="text-2xl font-semibold tracking-normal">Control Center</h1>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => (
          <motion.article
            key={metric.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04, duration: 0.22 }}
            className="border border-line bg-surface p-4"
          >
            <div className="mb-5 flex items-center justify-between">
              <metric.icon className="h-4 w-4 text-muted" aria-hidden="true" />
              <span className="text-[11px] uppercase text-muted">Live</span>
            </div>
            <p className="text-3xl font-semibold">{metric.value}</p>
            <p className="mt-1 text-sm text-muted">{metric.label}</p>
          </motion.article>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
        <section className="border border-line bg-surface">
          <div className="border-b border-line px-4 py-3">
            <h2 className="text-sm font-semibold">Recent Activity</h2>
          </div>
          <div className="divide-y divide-line">
            {['Projects API connected', 'Settings module secured', 'Uploads ready'].map((item) => (
              <div key={item} className="flex items-center justify-between px-4 py-3 text-sm">
                <span>{item}</span>
                <span className="text-xs text-muted">Milestone</span>
              </div>
            ))}
          </div>
        </section>

        <section className="border border-line bg-surface">
          <div className="border-b border-line px-4 py-3">
            <h2 className="text-sm font-semibold">System</h2>
          </div>
          <div className="space-y-3 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted">API</span>
              <span>Online</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Auth</span>
              <span>Protected</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Uploads</span>
              <span>Cloudinary</span>
            </div>
          </div>
        </section>
      </div>
    </section>
  )
}

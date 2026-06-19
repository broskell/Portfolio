import { motion } from 'framer-motion'
import { Plus } from 'lucide-react'

export const ModulePage = ({ module }) => {
  return (
    <section className="mx-auto max-w-7xl">
      <div className="mb-6 flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted">CMS</p>
          <h1 className="mt-1 text-2xl font-semibold tracking-normal">{module.label}</h1>
        </div>
        <button className="inline-flex h-9 items-center justify-center gap-2 border border-ink bg-ink px-3 text-sm font-medium text-canvas hover:bg-canvas hover:text-ink">
          <Plus className="h-4 w-4" aria-hidden="true" />
          New
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="border border-line bg-surface"
      >
        <div className="grid min-h-[420px] place-items-center px-4 py-10 text-center">
          <div>
            <module.icon className="mx-auto mb-4 h-6 w-6 text-muted" aria-hidden="true" />
            <h2 className="text-base font-semibold">{module.label}</h2>
            <p className="mt-2 max-w-sm text-sm text-muted">Table and editor surfaces will be wired in the CRUD milestone.</p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

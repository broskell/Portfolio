import React from 'react'
import { useNotificationStore } from '../app/notification.store.js'
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export const ToastContainer = () => {
  const { notifications, removeNotification } = useNotificationStore()

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((n) => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`flex items-start gap-3 border p-4 shadow-xl bg-surface ${
              n.type === 'success'
                ? 'border-neutral-800 text-neutral-200'
                : n.type === 'error'
                ? 'border-red-950 text-red-400'
                : 'border-line text-muted'
            }`}
          >
            {n.type === 'success' ? (
              <CheckCircle className="h-5 w-5 text-neutral-400 shrink-0 mt-0.5" />
            ) : n.type === 'error' ? (
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            ) : (
              <Info className="h-5 w-5 text-muted shrink-0 mt-0.5" />
            )}
            <div className="flex-1 text-sm font-sans leading-relaxed">{n.message}</div>
            <button
              onClick={() => removeNotification(n.id)}
              className="text-muted hover:text-ink shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

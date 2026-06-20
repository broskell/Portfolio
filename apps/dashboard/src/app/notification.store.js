import { create } from 'zustand'

export const useNotificationStore = create((set) => ({
  notifications: [],
  showNotification: (message, type = 'success') => {
    const id = Math.random().toString(36).substring(2, 9)
    set((state) => ({
      notifications: [...state.notifications, { id, message, type }]
    }))
    setTimeout(() => {
      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
      }))
    }, 4000)
  },
  removeNotification: (id) => {
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id)
    }))
  }
}))

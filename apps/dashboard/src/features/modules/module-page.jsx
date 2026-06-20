import React from 'react'
import { GenericCrudView } from './views/GenericCrudView.jsx'
import { SettingsView } from './views/SettingsView.jsx'
import { MessagesView } from './views/MessagesView.jsx'
import { AnalyticsView } from './views/AnalyticsView.jsx'

export const ModulePage = ({ module }) => {
  const renderView = () => {
    switch (module.path) {
      case 'settings':
        return <SettingsView />
      case 'messages':
        return <MessagesView />
      case 'analytics':
        return <AnalyticsView />
      default:
        return <GenericCrudView moduleKey={module.path} />
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {renderView()}
    </section>
  )
}


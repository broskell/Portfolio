import { useMutation, useQueryClient } from '@tanstack/react-query'
import { LogOut, Menu, Search } from 'lucide-react'
import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { moduleRoutes, primaryRoutes } from '../config/modules.js'
import { logout } from '../features/auth/auth.api.js'
import { useAuthStore } from '../features/auth/auth.store.js'
import { ToastContainer } from '../components/ToastContainer.jsx'

const navLinkClass = ({ isActive }) =>
  [
    'flex h-9 items-center gap-3 border px-3 text-sm transition',
    isActive ? 'border-ink bg-ink text-canvas' : 'border-transparent text-muted hover:border-line hover:bg-card hover:text-ink'
  ].join(' ')

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const user = useAuthStore((state) => state.user)
  const clearAuth = useAuthStore((state) => state.clearAuth)
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSettled: () => {
      clearAuth()
      queryClient.clear()
      navigate('/login', { replace: true })
    }
  })

  return (
    <div className="min-h-screen bg-canvas text-ink">
      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 w-72 border-r border-line bg-surface transition-transform lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        ].join(' ')}
      >
        <div className="flex h-16 items-center border-b border-line px-5">
          <div>
            <p className="text-sm font-semibold">Portfolio CMS</p>
            <p className="text-xs text-muted">{user?.email || 'Admin'}</p>
          </div>
        </div>

        <nav className="space-y-6 px-3 py-4">
          <div className="space-y-1">
            {primaryRoutes.map((item) => (
              <NavLink key={item.path} to={`/${item.path}`} className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.label}
              </NavLink>
            ))}
          </div>

          <div>
            <p className="mb-2 px-3 text-[11px] font-semibold uppercase text-muted">Content</p>
            <div className="space-y-1">
              {moduleRoutes.map((item) => (
                <NavLink key={item.path} to={`/${item.path}`} className={navLinkClass} onClick={() => setSidebarOpen(false)}>
                  <item.icon className="h-4 w-4" aria-hidden="true" />
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </nav>
      </aside>

      {sidebarOpen && (
        <button
          className="fixed inset-0 z-30 bg-canvas/80 lg:hidden"
          type="button"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-canvas px-4 lg:px-6">
          <button
            className="flex h-9 w-9 items-center justify-center border border-line bg-surface text-muted hover:text-ink lg:hidden"
            type="button"
            aria-label="Open navigation"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="hidden h-9 min-w-0 max-w-md flex-1 items-center gap-2 border border-line bg-surface px-3 text-sm text-muted md:flex">
            <Search className="h-4 w-4" aria-hidden="true" />
            <span className="truncate">Search content</span>
          </div>

          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">{user?.name || 'Admin'}</p>
              <p className="text-xs text-muted">{user?.role || 'admin'}</p>
            </div>
            <button
              className="flex h-9 items-center gap-2 border border-line bg-surface px-3 text-sm text-muted hover:text-ink"
              type="button"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <main className="min-h-[calc(100vh-4rem)] px-4 py-6 lg:px-6">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  )
}

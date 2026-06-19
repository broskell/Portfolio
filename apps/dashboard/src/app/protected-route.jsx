import { Loader2 } from 'lucide-react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuthBootstrap } from '../features/auth/use-auth-bootstrap.js'
import { useAuthStore } from '../features/auth/auth.store.js'

export const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const { isLoading } = useAuthBootstrap()
  const accessToken = useAuthStore((state) => state.accessToken)

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-canvas text-ink">
        <Loader2 className="h-5 w-5 animate-spin text-muted" aria-label="Loading" />
      </main>
    )
  }

  if (!accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  return children
}

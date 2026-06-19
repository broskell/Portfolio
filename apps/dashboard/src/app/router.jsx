import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '../layouts/dashboard-layout.jsx'
import { ProtectedRoute } from './protected-route.jsx'
import { LoginPage } from '../features/auth/login-page.jsx'
import { DashboardHome } from '../features/dashboard-home/dashboard-home.jsx'
import { ModulePage } from '../features/modules/module-page.jsx'
import { moduleRoutes } from '../config/modules.js'

const moduleChildren = moduleRoutes.map((module) => ({
  path: module.path,
  element: <ModulePage module={module} />
}))

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardHome /> },
      ...moduleChildren
    ]
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />
  }
])

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useWSStore } from '@/store/wsStore'
import { initGA, trackPageView } from '@/utils/googleAnalytics'
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import ProtectedRoute from '@/components/auth/ProtectedRoute'
import ErrorBoundary from '@/components/ErrorBoundary'

const App = () => {
  const { isAuth, token, updateRole } = useAuthStore()
  const { connect, disconnect, onRoleUpdate } = useWSStore()

  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID
    if (gaId) {
      initGA(gaId)
    }
  }, [])

  useEffect(() => {
    if (isAuth && token) {
      connect(token)
      onRoleUpdate((update) => updateRole(update.role))
    } else {
      disconnect()
    }
    return () => disconnect()
  }, [isAuth, token])

  useEffect(() => trackPageView(window.location.pathname), [])

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={isAuth ? <Navigate to="/" /> : <LoginPage />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App

import { Navigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import type { Permission } from '@/types'
import { hasPermission } from '@/utils/permissions'

interface Props {
  children: React.ReactNode
  requiredPermission?: Permission
}

const ProtectedRoute = ({ children, requiredPermission }: Props) => {
  const { isAuth, user } = useAuthStore()

  if (!isAuth) {
    return <Navigate to="/login" replace />
  }

  if (requiredPermission && user && !hasPermission(user.role, requiredPermission)) {
    return (
      <div style={{
        padding: '40px',
        textAlign: 'center',
        color: 'var(--text-muted)',
      }}>
        <h2>Доступ запрещен</h2>
        <p>У вас нет прав для просмотра этой страницы</p>
      </div>
    )
  }

  return <>{children}</>
}

export default ProtectedRoute

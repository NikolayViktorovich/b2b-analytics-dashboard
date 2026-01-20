import { useAuthStore } from '@/store/authStore'
import type { Permission } from '@/types'
import { hasPermission } from '@/utils/permissions'

interface Props {
  children: React.ReactNode
  permission: Permission
  fallback?: React.ReactNode
}

const PermissionGuard = ({ children, permission, fallback = null }: Props) => {
  const { user } = useAuthStore()
  
  if (!user || !hasPermission(user.role, permission)) {
    return <>{fallback}</>
  }
  
  return <>{children}</>
}

export default PermissionGuard

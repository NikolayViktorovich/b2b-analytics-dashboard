import { useAuthStore } from '@/store/authStore'
import type { Permission } from '@/types'
import { hasPermission, hasAnyPermission, hasAllPermissions } from '@/utils/permissions'

export const usePermission = () => {
  const { user } = useAuthStore()
  
  return {
    can: (permission: Permission) => {
      return user ? hasPermission(user.role, permission) : false
    },
    canAny: (permissions: Permission[]) => {
      return user ? hasAnyPermission(user.role, permissions) : false
    },
    canAll: (permissions: Permission[]) => {
      return user ? hasAllPermissions(user.role, permissions) : false
    },
    role: user?.role,
  }
}

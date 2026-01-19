import type { UserRole, Permission } from '@/types'

const perms: Record<UserRole, Permission[]> = {
  admin: [
    'dashboard:view',
    'dashboard:edit',
    'dashboard:delete',
    'widget:create',
    'widget:edit',
    'widget:delete',
    'export:pdf',
    'export:excel',
    'users:manage',
  ],
  manager: [
    'dashboard:view',
    'dashboard:edit',
    'widget:create',
    'widget:edit',
    'export:pdf',
    'export:excel',
  ],
  viewer: [
    'dashboard:view',
    'export:pdf',
  ],
}

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return perms[role]?.includes(permission) ?? false
}

export const hasAnyPermission = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.some(p => hasPermission(role, p))
}

export const hasAllPermissions = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.every(p => hasPermission(role, p))
}

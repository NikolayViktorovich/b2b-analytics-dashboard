import type { UserRole, Permission } from '@/types'

export const rolePermissions: Record<UserRole, Permission[]> = {
  admin: [
    'dashboard:view',
    'dashboard:edit',
    'analytics:view',
    'analytics:export',
    'nps:view',
    'nps:manage',
    'website:view',
    'settings:view',
    'settings:edit',
    'users:view',
    'users:manage',
    'roles:manage',
  ],
  manager: [
    'dashboard:view',
    'dashboard:edit',
    'analytics:view',
    'analytics:export',
    'nps:view',
    'website:view',
    'settings:view',
    'users:view',
  ],
  viewer: [
    'dashboard:view',
    'analytics:view',
    'nps:view',
    'website:view',
  ],
}

export const hasPermission = (role: UserRole, permission: Permission): boolean => {
  return rolePermissions[role]?.includes(permission) ?? false
}

export const hasAnyPermission = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.some(p => hasPermission(role, p))
}

export const hasAllPermissions = (role: UserRole, permissions: Permission[]): boolean => {
  return permissions.every(p => hasPermission(role, p))
}

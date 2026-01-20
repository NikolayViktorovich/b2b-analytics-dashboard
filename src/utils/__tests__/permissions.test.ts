import { describe, it, expect } from 'vitest'
import { hasPermission, hasAnyPermission, hasAllPermissions, rolePermissions } from '../permissions'

describe('permissions', () => {
  it('admin has all permissions', () => {
    expect(hasPermission('admin', 'roles:manage')).toBe(true)
    expect(hasPermission('admin', 'users:manage')).toBe(true)
    expect(hasPermission('admin', 'settings:edit')).toBe(true)
  })

  it('manager has limited permissions', () => {
    expect(hasPermission('manager', 'dashboard:view')).toBe(true)
    expect(hasPermission('manager', 'analytics:export')).toBe(true)
    expect(hasPermission('manager', 'roles:manage')).toBe(false)
    expect(hasPermission('manager', 'users:manage')).toBe(false)
  })

  it('viewer has minimal permissions', () => {
    expect(hasPermission('viewer', 'dashboard:view')).toBe(true)
    expect(hasPermission('viewer', 'analytics:view')).toBe(true)
    expect(hasPermission('viewer', 'dashboard:edit')).toBe(false)
    expect(hasPermission('viewer', 'settings:edit')).toBe(false)
  })

  it('hasAnyPermission works correctly', () => {
    expect(hasAnyPermission('manager', ['roles:manage', 'dashboard:view'])).toBe(true)
    expect(hasAnyPermission('viewer', ['roles:manage', 'users:manage'])).toBe(false)
  })

  it('hasAllPermissions works correctly', () => {
    expect(hasAllPermissions('admin', ['dashboard:view', 'roles:manage'])).toBe(true)
    expect(hasAllPermissions('manager', ['dashboard:view', 'roles:manage'])).toBe(false)
  })

  it('all roles have correct permission counts', () => {
    expect(rolePermissions.admin.length).toBe(12)
    expect(rolePermissions.manager.length).toBe(8)
    expect(rolePermissions.viewer.length).toBe(4)
  })
})

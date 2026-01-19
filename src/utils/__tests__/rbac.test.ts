import { describe, it, expect } from 'vitest'
import { hasPermission, hasAnyPermission, hasAllPermissions } from '../rbac'

describe('RBAC utils', () => {
  describe('hasPermission', () => {
    it('admin should have all permissions', () => {
      expect(hasPermission('admin', 'dashboard:view')).toBe(true)
      expect(hasPermission('admin', 'users:manage')).toBe(true)
    })

    it('viewer should have limited permissions', () => {
      expect(hasPermission('viewer', 'dashboard:view')).toBe(true)
      expect(hasPermission('viewer', 'dashboard:edit')).toBe(false)
      expect(hasPermission('viewer', 'users:manage')).toBe(false)
    })
  })

  describe('hasAnyPermission', () => {
    it('should return true if user has any permission', () => {
      expect(hasAnyPermission('manager', ['dashboard:view', 'users:manage'])).toBe(true)
    })
  })

  describe('hasAllPermissions', () => {
    it('should return true only if user has all permissions', () => {
      expect(hasAllPermissions('admin', ['dashboard:view', 'dashboard:edit'])).toBe(true)
      expect(hasAllPermissions('viewer', ['dashboard:view', 'dashboard:edit'])).toBe(false)
    })
  })
})

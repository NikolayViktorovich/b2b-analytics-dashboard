import { useState, useEffect, useRef } from 'react'
import { useAuthStore } from '@/store/authStore'
import { useWSStore } from '@/store/wsStore'
import { usersApi } from '@/services/api'
import type { User, UserRole, RoleUpdate } from '@/types'
import { rolePermissions } from '@/utils/permissions'

const RolesManager = () => {
  const { user: currentUser } = useAuthStore()
  const { onRoleUpdate } = useWSStore()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [contextMenu, setContextMenu] = useState<{ userId: string; x: number; y: number } | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetchUsers()
    
    onRoleUpdate((update: RoleUpdate) => {
      setUsers(prev => prev.map(u => 
        u.id === update.userId 
          ? { ...u, role: update.role, permissions: update.permissions }
          : u
      ))
    })
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setContextMenu(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const fetchUsers = async () => {
    try {
      const data = await usersApi.getAll()
      setUsers(data as User[])
    } catch(error) {
      // silent
    } finally {
      setLoading(false)
    }
  }

  const handleRoleClick = (e: React.MouseEvent, userId: string) => {
    e.preventDefault()
    const rect = e.currentTarget.getBoundingClientRect()
    setContextMenu({ userId, x: rect.left, y: rect.bottom + 5 })
  }

  const handleRoleChange = async (userId: string, newRole: UserRole) => {
    try {
      await usersApi.updateRole(userId, newRole)
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u))
      setContextMenu(null)
    } catch(error) {
      // silent
    }
  }

  const DefaultAvatar = () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
      <circle cx="20" cy="20" r="20" fill="var(--bg-secondary)"/>
      <path d="M20 20c3.3 0 6-2.7 6-6s-2.7-6-6-6-6 2.7-6 6 2.7 6 6 6zm0 3c-4 0-12 2-12 6v3h24v-3c0-4-8-6-12-6z" fill="var(--text-muted)"/>
    </svg>
  )

  if (loading) {
    return <div style={{ padding: '20px', color: 'var(--text-secondary)' }}>Загрузка пользователей...</div>
  }

  const roleOptions = [
    { value: 'admin', label: 'Админ', color: '#8b5cf6' },
    { value: 'manager', label: 'Менеджер', color: '#3b82f6' },
    { value: 'viewer', label: 'Наблюдатель', color: '#9ca3af' },
  ]

  return (
    <div style={{
      background: 'var(--bg-card)',
      borderRadius: '12px',
      padding: '24px',
    }}>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 600,
        marginBottom: '20px',
        color: 'var(--text-primary)',
      }}>
        Управление ролями
      </h3>

      <div style={{display: 'flex', flexDirection: 'column', gap: '12px'}}>
        {users.map(user => (
          <div key={user.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '16px',
            background: 'var(--bg-primary)',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                  }}
                />
              ) : (
                <DefaultAvatar />
              )}
              <div>
                <div style={{
                  fontSize: '15px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                }}>
                  {user.name}
                </div>
                <div style={{
                  fontSize: '13px',
                  color: 'var(--text-muted)',
                }}>
                  {user.email}
                </div>
              </div>
            </div>

            <button
              onClick={(e) => handleRoleClick(e, user.id)}
              disabled={user.id === currentUser?.id}
              style={{
                padding: '8px 16px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: user.id === currentUser?.id ? 'not-allowed' : 'pointer',
                opacity: user.id === currentUser?.id ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                if (user.id !== currentUser?.id) {
                  e.currentTarget.style.background = 'var(--bg-secondary)'
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--bg-card)'
              }}
            >
              <span style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: roleOptions.find(r => r.value === user.role)?.color,
              }} />
              {roleOptions.find(r => r.value === user.role)?.label}
              {user.id !== currentUser?.id && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        ))}
      </div>

      {contextMenu && (
        <div
          ref={menuRef}
          style={{
            position: 'fixed',
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '8px',
            zIndex: 1000,
            minWidth: '180px',
          }}
        >
          {roleOptions.map(option => (
            <button
              key={option.value}
              onClick={() => handleRoleChange(contextMenu.userId, option.value as UserRole)}
              style={{
                width: '100%',
                padding: '10px 12px',
                background: 'transparent',
                border: 'none',
                borderRadius: '8px',
                color: 'var(--text-primary)',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.2s',
                textAlign: 'left',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--bg-secondary)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <span style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: option.color,
              }} />
              {option.label}
            </button>
          ))}
        </div>
      )}

      <div style={{
        marginTop: '24px',
        padding: '16px',
        background: 'var(--bg-primary)',
        borderRadius: '8px',
        border: '1px solid var(--border-color)',
      }}>
        <h4 style={{
          fontSize: '14px',
          fontWeight: 600,
          marginBottom: '12px',
          color: 'var(--text-primary)',
        }}>
          Права доступа по ролям
        </h4>
        
        {Object.entries(rolePermissions).map(([role, perms]) => (
          <div key={role} style={{marginBottom: '12px'}}>
            <div style={{
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              marginBottom: '4px',
              textTransform: 'capitalize',
            }}>
              {role === 'admin' ? 'Админ' : role === 'manager' ? 'Менеджер' : 'Наблюдатель'}
            </div>
            <div style={{
              fontSize: '12px',
              color: 'var(--text-muted)',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '6px',
            }}>
              {perms.map(p => (
                <span key={p} style={{
                  padding: '2px 8px',
                  background: 'var(--bg-card)',
                  borderRadius: '4px',
                }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RolesManager

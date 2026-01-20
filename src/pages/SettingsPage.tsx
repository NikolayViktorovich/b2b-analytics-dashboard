import { useAuthStore } from '@/store/authStore'
import { hasPermission } from '@/utils/permissions'
import ProfileSettings from '@/components/settings/ProfileSettings'
import NotificationSettings from '@/components/settings/NotificationSettings'
import IntegrationsList from '@/components/settings/IntegrationsList'
import RolesManager from '@/components/settings/RolesManager'

const SettingsPage = () => {
  const { user } = useAuthStore()
  const canManageRoles = user && hasPermission(user.role, 'roles:manage')

  const containerStyle: React.CSSProperties = {
    padding: 'clamp(12px, 2.5vw, 24px)',
    maxWidth: '100%',
    width: '100%',
    boxSizing: 'border-box',
  }

  const headerStyle: React.CSSProperties = {
    marginBottom: 'clamp(16px, 2.5vw, 24px)',
  }

  const h1Style: React.CSSProperties = {
    fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: 700,
    marginBottom: 'clamp(4px, 1vw, 8px)',
  }

  const subtitleStyle: React.CSSProperties = {
    color: 'var(--text-muted)',
    fontSize: 'clamp(12px, 1.5vw, 14px)',
  }

  const gridStyle: React.CSSProperties = {
    display: window.innerWidth >= 1024 ? 'grid' : 'flex',
    gridTemplateColumns: window.innerWidth >= 1024 ? 'repeat(2, 1fr)' : '1fr',
    flexDirection: 'column',
    gap: 'clamp(12px, 2vw, 16px)',
    marginBottom: 'clamp(12px, 2vw, 16px)',
  }

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h1 style={h1Style}>Настройки</h1>
        <p style={subtitleStyle}>Управление профилем и интеграциями</p>
      </div>

      <div style={gridStyle}>
        <ProfileSettings />
        <NotificationSettings />
      </div>

      {canManageRoles && (
        <div style={{marginBottom: 'clamp(12px, 2vw, 16px)'}}>
          <RolesManager />
        </div>
      )}

      <IntegrationsList />
    </div>
  )
}

export default SettingsPage

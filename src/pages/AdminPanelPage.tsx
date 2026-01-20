import { useState, useEffect } from 'react'
import { usersApi, systemApi } from '@/services/api'
import Toast from '@/components/ui/Toast'
import { exportToDocument } from '@/utils/exportDocument'

const AdminPanelPage = () => {
  const [users, setUsers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showSystemModal, setShowSystemModal] = useState(false)
  const [showLogsModal, setShowLogsModal] = useState(false)
  const [showBackupsModal, setShowBackupsModal] = useState(false)
  const [showCreateBackupModal, setShowCreateBackupModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [newUserForm, setNewUserForm] = useState({ name: '', email: '', role: 'viewer' })
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null)
  const [logs, setLogs] = useState<any[]>([])
  const [logsLoading, setLogsLoading] = useState(false)
  const [showRoleDropdown, setShowRoleDropdown] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [userToDelete, setUserToDelete] = useState<any>(null)
  const [backups, setBackups] = useState<any[]>([])
  const [backupsLoading, setBackupsLoading] = useState(false)
  const [backupForm, setBackupForm] = useState({ name: '', description: '' })
  const [creatingBackup, setCreatingBackup] = useState(false)

  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersData = await usersApi.getAll()
        setUsers(usersData as any[])
      } catch(error) {
        // silent
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setToast({ message, type })
  }

  if (loading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Загрузка панели администратора...
      </div>
    )
  }

  const container: React.CSSProperties = {
    padding: 'clamp(12px, 2.5vw, 24px)',
    maxWidth: '100%',
    width: '100%',
    boxSizing: 'border-box',
  }

  const header: React.CSSProperties = {
    marginBottom: 'clamp(16px, 2.5vw, 24px)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'clamp(4px, 1vw, 8px)',
  }

  const title: React.CSSProperties = {
    fontSize: 'clamp(20px, 3vw, 28px)',
    fontWeight: 700,
    marginBottom: '0',
    color: 'var(--text-primary)',
  }

  const subtitle: React.CSSProperties = {
    fontSize: 'clamp(12px, 1.5vw, 14px)',
    color: 'var(--text-muted)',
  }

  const grid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(12px, 2vw, 16px)',
    marginBottom: 'clamp(16px, 2.5vw, 24px)',
  }

  const card: React.CSSProperties = {
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: 'clamp(12px, 2vw, 16px)',
    padding: '24px',
  }

  const cardTitle: React.CSSProperties = {
    fontSize: '14px',
    color: 'var(--text-muted)',
    marginBottom: '12px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  }

  const cardValue: React.CSSProperties = {
    fontSize: '32px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const section: React.CSSProperties = {
    marginBottom: 'clamp(16px, 2.5vw, 24px)',
  }

  const sectionTitle: React.CSSProperties = {
    fontSize: 'clamp(16px, 2vw, 18px)',
    fontWeight: 600,
    marginBottom: '16px',
    color: 'var(--text-primary)',
  }

  const table: React.CSSProperties = {
    width: '100%',
    background: 'var(--bg-card)',
    border: '1px solid var(--border-color)',
    borderRadius: '16px',
    overflow: 'hidden',
  }

  const th: React.CSSProperties = {
    padding: '16px',
    textAlign: 'left',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-muted)',
    borderBottom: '1px solid var(--border-color)',
    background: 'var(--bg-secondary)',
  }

  const td: React.CSSProperties = {
    padding: '16px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    borderBottom: '1px solid var(--border-color)',
  }

  const badge = (role: string): React.CSSProperties => {
    const colors = {
      admin: { bg: 'rgba(139,92,246,0.15)', color: '#8b5cf6' },
      manager: { bg: 'rgba(59,130,246,0.15)', color: '#3b82f6' },
      viewer: { bg: 'rgba(156,163,175,0.15)', color: '#9ca3af' },
    }
    const c = colors[role as keyof typeof colors] || colors.viewer
    return {
      display: 'inline-block',
      padding: '4px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: 600,
      background: c.bg,
      color: c.color,
    }
  }

  const DefaultAvatar = () => (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="16" fill="var(--bg-secondary)"/>
      <path d="M16 16c2.7 0 4.8-2.1 4.8-4.8S18.7 6.4 16 6.4s-4.8 2.1-4.8 4.8S13.3 16 16 16zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" fill="var(--text-muted)"/>
    </svg>
  )

  const handleAddUser = () => {
    setSelectedUser(null)
    setNewUserForm({ name: '', email: '', role: 'viewer' })
    setShowUserModal(true)
  }

  const handleEditUser = (user: any) => {
    setSelectedUser(user)
    setNewUserForm({ name: user.name, email: user.email, role: user.role })
    setShowUserModal(true)
  }

  const handleSaveUser = async () => {
    try {
      if (selectedUser) {
        await usersApi.update(selectedUser.id, newUserForm)
        setUsers(users.map(u => u.id === selectedUser.id ? { ...u, ...newUserForm } : u))
        showToast('Пользователь обновлен', 'success')
      } else {
        const newUser = await usersApi.create(newUserForm) as any
        setUsers([...users, newUser])
        if (newUser.accessCode) {
          navigator.clipboard.writeText(newUser.accessCode)
          showToast(`Пользователь создан! Код скопирован: ${newUser.accessCode}`, 'success')
        } else {
          showToast('Пользователь создан', 'success')
        }
      }
      setShowUserModal(false)
    } catch(error) {
      showToast('Ошибка при сохранении', 'error')
    }
  }

  const handleDeleteUser = async (userId: number) => {
    try {
      await usersApi.delete(userId)
      setUsers(users.filter(u => u.id !== userId))
      setShowDeleteModal(false)
      setUserToDelete(null)
      showToast('Пользователь удален', 'success')
    } catch(error) {
      showToast('Ошибка при удалении', 'error')
    }
  }

  const openDeleteModal = (user: any) => {
    setUserToDelete(user)
    setShowDeleteModal(true)
  }

  const handleClearCache = async () => {
    try {
      await systemApi.clearCache()
      showToast('Кэш успешно очищен', 'success')
    } catch(error) {
      showToast('Ошибка очистки кэша', 'error')
    }
  }

  const handleGenerateApiKey = () => {
    const newKey = 'sk_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    navigator.clipboard.writeText(newKey)
    showToast('API ключ скопирован в буфер обмена', 'success')
  }

  const handleCreateBackup = async () => {
    setCreatingBackup(true)
    try {
      await systemApi.createBackup(backupForm)
      showToast('Бэкап создан успешно', 'success')
      setShowCreateBackupModal(false)
      setBackupForm({ name: '', description: '' })
      if (showBackupsModal) {
        const backupsData = await systemApi.getBackups()
        setBackups(backupsData as any[])
      }
    } catch (error) {
      showToast('Ошибка при создании бэкапа', 'error')
    } finally {
      setCreatingBackup(false)
    }
  }

  const handleOpenBackups = async () => {
    setShowBackupsModal(true)
    setBackupsLoading(true)
    try {
      const backupsData = await systemApi.getBackups()
      setBackups(backupsData as any[])
    } catch (error) {
      setBackups([])
    } finally {
      setBackupsLoading(false)
    }
  }

  const handleDeleteBackup = async (backupId: string) => {
    try {
      await systemApi.deleteBackup(backupId)
      setBackups(backups.filter(b => b._id !== backupId))
      showToast('Бэкап удален', 'success')
    } catch (error) {
      showToast('Ошибка при удалении бэкапа', 'error')
    }
  }

  const handleDownloadBackup = async (backupId: string) => {
    try {
      const backup = await systemApi.getBackup(backupId) as any
      const exportData = {
        title: backup.name,
        ...backup.data
      }
      exportToDocument(exportData, `backup-${backup.name.replace(/\s+/g, '-')}.txt`)
      showToast('Бэкап экспортирован', 'success')
    } catch (error) {
      showToast('Ошибка при экспорте бэкапа', 'error')
    }
  }


  const handleOpenLogs = async () => {
    setShowLogsModal(true)
    setLogsLoading(true)
    try {
      const logsData = await systemApi.getLogs(20)
      setLogs(logsData as any[])
    } catch(error) {
      setLogs([])
    } finally {
      setLogsLoading(false)
    }
  }

  const modalOverlay: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '20px',
  }

  const modal: React.CSSProperties = {
    background: 'var(--bg-card)',
    borderRadius: '0',
    padding: '32px',
    maxWidth: '600px',
    width: '100%',
    maxHeight: '80vh',
    overflow: 'auto',
    border: '1px solid var(--border-color)',
  }

  const modalHeader: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '24px',
  }

  const modalTitle: React.CSSProperties = {
    fontSize: '24px',
    fontWeight: 700,
    color: 'var(--text-primary)',
  }

  const closeBtn: React.CSSProperties = {
    background: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: 'var(--text-muted)',
    padding: '4px 8px',
  }

  const input: React.CSSProperties = {
    width: '100%',
    padding: '12px',
    background: 'var(--bg-secondary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    fontSize: '14px',
    color: 'var(--text-primary)',
    marginBottom: '16px',
  }

  const btnPrimary: React.CSSProperties = {
    padding: '12px 24px',
    background: 'var(--accent-primary)',
    color: 'var(--bg-primary)',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    marginRight: '8px',
  }

  const btnSecondary: React.CSSProperties = {
    padding: '12px 24px',
    background: 'var(--bg-secondary)',
    color: 'var(--text-primary)',
    border: '1px solid var(--border-color)',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
  }

  const actionBtn: React.CSSProperties = {
    padding: '6px 12px',
    background: 'transparent',
    color: 'var(--accent-primary)',
    border: '1px solid var(--accent-primary)',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 600,
    cursor: 'pointer',
    marginRight: '8px',
  }

  const deleteBtn: React.CSSProperties = {
    ...actionBtn,
    color: '#f87171',
    borderColor: '#f87171',
  }

  return (
    <div style={container}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div style={header}>
        <h1 style={title}>Панель администратора</h1>
        <p style={subtitle}>Управление системой и пользователями</p>
      </div>

      <div style={grid}>
        <div style={card}>
          <div style={cardTitle}>Всего пользователей</div>
          <div style={cardValue}>{users.length}</div>
        </div>
        <div style={card}>
          <div style={cardTitle}>Администраторов</div>
          <div style={cardValue}>{users.filter(u => u.role === 'admin').length}</div>
        </div>
        <div style={card}>
          <div style={cardTitle}>Менеджеров</div>
          <div style={cardValue}>{users.filter(u => u.role === 'manager').length}</div>
        </div>
        <div style={card}>
          <div style={cardTitle}>Наблюдателей</div>
          <div style={cardValue}>{users.filter(u => u.role === 'viewer').length}</div>
        </div>
      </div>

      <div style={section}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <h2 style={sectionTitle}>Управление пользователями</h2>
          <button style={btnPrimary} onClick={handleAddUser}>+ Добавить</button>
        </div>
        
        {isMobile ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {users.slice(0, 10).map((u) => (
              <div key={u.id} style={{
                ...card,
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  {u.avatar ? (
                    <img src={u.avatar} alt={u.name} style={{ width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0 }} />
                  ) : (
                    <div style={{ flexShrink: 0 }}>
                      <DefaultAvatar />
                    </div>
                  )}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {u.name}
                    </div>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {u.email}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <span style={badge(u.role)}>
                      {u.role === 'admin' ? 'Админ' : u.role === 'manager' ? 'Менеджер' : 'Наблюдатель'}
                    </span>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('ru') : 'Никогда'}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button 
                      style={{
                        ...actionBtn,
                        padding: '8px 12px',
                        fontSize: '11px',
                      }} 
                      onClick={() => handleEditUser(u)}
                    >
                      Изменить
                    </button>
                    <button 
                      style={{
                        ...deleteBtn,
                        padding: '8px 12px',
                        fontSize: '11px',
                      }} 
                      onClick={() => openDeleteModal(u)}
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={table}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={th}>Пользователь</th>
                  <th style={th}>Email</th>
                  <th style={th}>Роль</th>
                  <th style={th}>Последний вход</th>
                  <th style={th}>Действия</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 10).map((u) => (
                  <tr key={u.id}>
                    <td style={td}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {u.avatar ? (
                          <img src={u.avatar} alt={u.name} style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
                        ) : (
                          <DefaultAvatar />
                        )}
                        <span>{u.name}</span>
                      </div>
                    </td>
                    <td style={td}>{u.email}</td>
                    <td style={td}>
                      <span style={badge(u.role)}>
                        {u.role === 'admin' ? 'Админ' : u.role === 'manager' ? 'Менеджер' : 'Наблюдатель'}
                      </span>
                    </td>
                    <td style={td}>
                      {u.lastLogin ? new Date(u.lastLogin).toLocaleDateString('ru') : 'Никогда'}
                    </td>
                    <td style={td}>
                      <button style={actionBtn} onClick={() => handleEditUser(u)}>Изменить</button>
                      <button style={deleteBtn} onClick={() => openDeleteModal(u)}>Удалить</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div style={{ ...section, display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        <div 
          style={{...card, cursor: 'pointer'}} 
          onClick={() => setShowSystemModal(true)}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Системные настройки
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Управление системой
          </div>
        </div>
        <div 
          style={{...card, cursor: 'pointer'}} 
          onClick={handleOpenLogs}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Логи системы
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Просмотр активности
          </div>
        </div>
        <div 
          style={{...card, cursor: 'pointer'}} 
          onClick={handleOpenBackups}
          onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent-primary)'}
          onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          <div style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
            Резервные копии
          </div>
          <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
            Управление бэкапами
          </div>
        </div>
      </div>

      {showUserModal && (
        <div style={modalOverlay} onClick={() => setShowUserModal(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h2 style={modalTitle}>{selectedUser ? 'Редактировать' : 'Добавить'} пользователя</h2>
              <button style={closeBtn} onClick={() => setShowUserModal(false)}>×</button>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Имя
              </label>
              <input 
                type="text" 
                style={input}
                value={newUserForm.name}
                onChange={(e) => setNewUserForm({...newUserForm, name: e.target.value})}
                placeholder="Имя пользователя"
              />
              
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Email
              </label>
              <input 
                type="email" 
                style={input}
                value={newUserForm.email}
                onChange={(e) => setNewUserForm({...newUserForm, email: e.target.value})}
                placeholder="Email адрес"
              />
              
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Роль
              </label>
              <div style={{ position: 'relative', marginBottom: '16px' }}>
                <div 
                  onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                  style={{
                    ...input,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 0
                  }}
                >
                  <span>{newUserForm.role === 'admin' ? 'Администратор' : newUserForm.role === 'manager' ? 'Менеджер' : 'Наблюдатель'}</span>
                  <span style={{ fontSize: '12px' }}>▼</span>
                </div>
                {showRoleDropdown && (
                  <div style={{
                    position: 'fixed',
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    zIndex: 10001,
                    minWidth: '200px'
                  }}>
                    {[
                      { value: 'viewer', label: 'Наблюдатель' },
                      { value: 'manager', label: 'Менеджер' },
                      { value: 'admin', label: 'Администратор' }
                    ].map(role => (
                      <div
                        key={role.value}
                        onClick={() => {
                          setNewUserForm({...newUserForm, role: role.value})
                          setShowRoleDropdown(false)
                        }}
                        style={{
                          padding: '12px',
                          cursor: 'pointer',
                          background: newUserForm.role === role.value ? 'var(--bg-card)' : 'transparent',
                          color: 'var(--text-primary)',
                          fontSize: '14px',
                          borderRadius: role.value === 'viewer' ? '8px 8px 0 0' : role.value === 'admin' ? '0 0 8px 8px' : '0'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-card)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = newUserForm.role === role.value ? 'var(--bg-card)' : 'transparent'}
                      >
                        {role.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div style={{ marginTop: '24px' }}>
                <button style={btnPrimary} onClick={handleSaveUser}>Сохранить</button>
                <button style={btnSecondary} onClick={() => setShowUserModal(false)}>Отмена</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showSystemModal && (
        <div style={modalOverlay} onClick={() => setShowSystemModal(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h2 style={modalTitle}>Системные настройки</h2>
              <button style={closeBtn} onClick={() => setShowSystemModal(false)}>×</button>
            </div>
            <div>
              <div style={{...card, marginBottom: '16px'}}>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>
                  Кэш
                </div>
                <button style={btnSecondary} onClick={handleClearCache}>Очистить кэш</button>
              </div>
              
              <div style={{...card, marginBottom: '16px'}}>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  API ключи
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Управление доступом к API
                </div>
                <button style={btnSecondary} onClick={handleGenerateApiKey}>Сгенерировать новый</button>
              </div>
              
              <div style={{...card}}>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  Резервное копирование
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                  Последний бэкап: {new Date().toLocaleDateString('ru')}
                </div>
                <button style={btnPrimary} onClick={handleCreateBackup}>Создать бэкап</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showLogsModal && (
        <div style={modalOverlay} onClick={() => setShowLogsModal(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h2 style={modalTitle}>Логи системы</h2>
              <button style={closeBtn} onClick={() => setShowLogsModal(false)}>×</button>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
              {logsLoading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  Загрузка логов...
                </div>
              ) : logs.length > 0 ? (
                logs.map((log, idx) => (
                  <div key={idx} style={{...card, marginBottom: '8px', padding: '12px'}}>
                    <span style={{ color: 'var(--text-muted)' }}>[{new Date(log.timestamp).toLocaleTimeString('ru')}]</span>{' '}
                    <span style={{ 
                      color: log.level === 'error' ? '#f87171' : 
                             log.level === 'warning' ? '#fbbf24' : 
                             log.level === 'success' ? '#4ade80' : 'var(--text-primary)',
                      fontWeight: 600 
                    }}>
                      {log.level.toUpperCase()}
                    </span>{' '}
                    <span style={{ color: 'var(--text-primary)' }}>{log.message}</span>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  Нет доступных логов
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && userToDelete && (
        <div style={modalOverlay} onClick={() => setShowDeleteModal(false)}>
          <div style={{...modal, maxWidth: '400px'}} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h2 style={modalTitle}>Удалить пользователя?</h2>
              <button style={closeBtn} onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Вы уверены, что хотите удалить пользователя <strong style={{ color: 'var(--text-primary)' }}>{userToDelete.name}</strong>? Это действие нельзя отменить.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  style={{...btnPrimary, background: '#f87171', flex: 1}} 
                  onClick={() => handleDeleteUser(userToDelete.id)}
                >
                  Удалить
                </button>
                <button 
                  style={{...btnSecondary, flex: 1}} 
                  onClick={() => setShowDeleteModal(false)}
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showBackupsModal && (
        <div style={modalOverlay} onClick={() => setShowBackupsModal(false)}>
          <div style={{...modal, maxWidth: '900px'}} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h2 style={modalTitle}>Резервные копии</h2>
              <button style={closeBtn} onClick={() => setShowBackupsModal(false)}>×</button>
            </div>
            <div>
              <button 
                style={{...btnPrimary, marginBottom: '24px'}} 
                onClick={() => setShowCreateBackupModal(true)}
              >
                + Создать бэкап
              </button>

              {backupsLoading ? (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  Загрузка бэкапов...
                </div>
              ) : backups.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {backups.map((backup) => (
                    <div key={backup._id} style={{...card, padding: '16px'}}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px' }}>
                            {backup.name}
                          </div>
                          {backup.description && (
                            <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                              {backup.description}
                            </div>
                          )}
                          <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                            Создан: {new Date(backup.createdAt).toLocaleString('ru')} • 
                            Размер: {(backup.size / 1024).toFixed(1)} KB • 
                            Автор: {backup.createdBy?.name || 'Система'}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', marginLeft: '16px' }}>
                          <button 
                            style={{...actionBtn, whiteSpace: 'nowrap'}} 
                            onClick={() => handleDownloadBackup(backup._id)}
                          >
                            Скачать
                          </button>
                          <button 
                            style={{...deleteBtn, whiteSpace: 'nowrap'}} 
                            onClick={() => handleDeleteBackup(backup._id)}
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                  Нет сохраненных бэкапов
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {showCreateBackupModal && (
        <div style={modalOverlay} onClick={() => setShowCreateBackupModal(false)}>
          <div style={{...modal, maxWidth: '500px'}} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h2 style={modalTitle}>Создать резервную копию</h2>
              <button style={closeBtn} onClick={() => setShowCreateBackupModal(false)}>×</button>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Название
              </label>
              <input 
                type="text" 
                style={input}
                value={backupForm.name}
                onChange={(e) => setBackupForm({...backupForm, name: e.target.value})}
                placeholder="Backup 2026-01-20"
              />
              
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
                Описание
              </label>
              <textarea 
                style={{...input, minHeight: '80px', resize: 'vertical'}}
                value={backupForm.description}
                onChange={(e) => setBackupForm({...backupForm, description: e.target.value})}
                placeholder="Описание бэкапа"
              />
              
              <div style={{ marginTop: '24px' }}>
                <button 
                  style={btnPrimary} 
                  onClick={handleCreateBackup}
                  disabled={creatingBackup}
                >
                  {creatingBackup ? 'Создание...' : 'Создать'}
                </button>
                <button 
                  style={btnSecondary} 
                  onClick={() => setShowCreateBackupModal(false)}
                  disabled={creatingBackup}
                >
                  Отмена
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminPanelPage

import { useState, useEffect } from 'react'
import { dashboardApi, npsApi, analyticsApi, websiteApi } from '@/services/api'
import Toast from '@/components/ui/Toast'
import { exportToDocument } from '@/utils/exportDocument'

const ManagerPanelPage = () => {
  const [dashData, setDashData] = useState<any>(null)
  const [nps, setNps] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [exporting, setExporting] = useState(false)
  const [showReportModal, setShowReportModal] = useState(false)
  const [showSegmentsModal, setShowSegmentsModal] = useState(false)
  const [showWidgetModal, setShowWidgetModal] = useState(false)
  const [reportData, setReportData] = useState<any>(null)
  const [segmentsData, setSegmentsData] = useState<any>(null)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error' | 'info'} | null>(null)
  const [widgetSettings, setWidgetSettings] = useState({
    revenue: true,
    orders: true,
    nps: true,
    conversion: true,
    traffic: false,
    topProducts: false,
  })

  useEffect(() => {
    const saved = localStorage.getItem('manager-widget-settings')
    if (saved) {
      setWidgetSettings(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dash, npsData] = await Promise.all([
          dashboardApi.getStats('today'),
          npsApi.getCurrent()
        ])
        setDashData(dash)
        setNps(npsData)
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

  const handleExportData = async () => {
    setExporting(true)
    try {
      const [analytics, npsData, dashboard] = await Promise.all([
        analyticsApi.getAll(),
        npsApi.getCurrent(),
        dashboardApi.getStats('month')
      ])

      const exportData = {
        title: 'Ежемесячный отчет',
        date: new Date().toISOString(),
        analytics: Array.isArray(analytics) ? analytics[0] : analytics,
        nps: npsData,
        dashboard,
      }

      exportToDocument(exportData, `reddix-report-${new Date().toISOString().split('T')[0]}.txt`)
      showToast('Отчет экспортирован', 'success')
    } catch (error) {
      showToast('Ошибка экспорта', 'error')
    } finally {
      setExporting(false)
    }
  }

  const handleSaveWidgets = async () => {
    try {
      localStorage.setItem('manager-widget-settings', JSON.stringify(widgetSettings))
      const enabledCount = Object.values(widgetSettings).filter(Boolean).length
      setShowWidgetModal(false)
      showToast(`Настройки сохранены! Активно виджетов: ${enabledCount}`, 'success')
    } catch(error) {
      showToast('Ошибка сохранения настроек', 'error')
    }
  }

  const handleOpenReport = async () => {
    setShowReportModal(true)
    setReportData(null)
    try {
      const [analytics, website, dashboard] = await Promise.all([
        analyticsApi.getAll(),
        websiteApi.getTraffic(),
        dashboardApi.getStats('week')
      ])
      setReportData({analytics, website, dashboard})
    } catch(error) {
      setReportData({error: 'Не удалось загрузить данные отчета'})
    }
  }

  const handleOpenSegments = async () => {
    setShowSegmentsModal(true)
    setSegmentsData(null)
    try {
      const analytics = await analyticsApi.getAll()
      setSegmentsData(analytics)
    } catch(error) {
      setSegmentsData({error: 'Не удалось загрузить данные сегментов'})
    }
  }

  const handleExportReport = () => {
    if (!reportData || reportData.error) {
      showToast('Нет данных для экспорта', 'error')
      return
    }

    try {
      const exportData = {
        title: 'Еженедельный отчет',
        dashboard: reportData.dashboard,
        analytics: Array.isArray(reportData.analytics) ? reportData.analytics[0] : reportData.analytics,
        website: reportData.website,
      }

      exportToDocument(exportData, `weekly-report-${new Date().toISOString().split('T')[0]}.txt`)
      showToast('Отчет экспортирован', 'success')
    } catch (error) {
      showToast('Ошибка при экспорте', 'error')
    }
  }

  const handleExportSegments = () => {
    if (!segmentsData || segmentsData.error) {
      showToast('Нет данных для экспорта', 'error')
      return
    }

    try {
      const totalOrders = segmentsData.totalOrders || 100
      const exportData = {
        title: 'Сегменты клиентов',
        segments: {
          vip: { count: Math.floor(totalOrders * 0.15), criteria: 'Покупки > $5000' },
          active: { count: Math.floor(totalOrders * 0.45), criteria: 'Покупки за последний месяц' },
          sleeping: { count: Math.floor(totalOrders * 0.40), criteria: 'Нет покупок > 3 месяцев' },
        },
        total: totalOrders
      }

      exportToDocument(exportData, `customer-segments-${new Date().toISOString().split('T')[0]}.txt`)
      showToast('Сегменты экспортированы', 'success')
    } catch (error) {
      showToast('Ошибка при экспорте', 'error')
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>
        Загрузка панели менеджера...
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
    transition: 'border-color 0.2s',
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
    marginBottom: '8px',
  }

  const cardChange = (val: number): React.CSSProperties => ({
    fontSize: '14px',
    fontWeight: 600,
    color: val > 0 ? '#4ade80' : '#f87171',
  })

  const section: React.CSSProperties = {
    marginBottom: 'clamp(16px, 2.5vw, 24px)',
  }

  const sectionTitle: React.CSSProperties = {
    fontSize: 'clamp(16px, 2vw, 18px)',
    fontWeight: 600,
    marginBottom: '16px',
    color: 'var(--text-primary)',
  }

  const taskCard: React.CSSProperties = {
    ...card,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
  }

  const taskLeft: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }

  const taskBtn = (disabled?: boolean): React.CSSProperties => ({
    padding: '10px 20px',
    background: disabled ? 'var(--bg-secondary)' : 'var(--accent-primary)',
    color: disabled ? 'var(--text-muted)' : 'var(--bg-primary)',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    transition: 'all 0.2s',
  })

  const tasks = [
    { 
      title: 'Проверить отчеты', 
      desc: 'Новые данные за неделю', 
      action: 'Открыть',
      onClick: handleOpenReport
    },
    { 
      title: 'Обзор клиентов', 
      desc: 'Анализ сегментов', 
      action: 'Перейти',
      onClick: handleOpenSegments
    },
    { 
      title: 'Экспорт данных', 
      desc: 'Подготовить презентацию', 
      action: exporting ? 'Загрузка...' : 'Скачать',
      onClick: () => {
        if (!exporting) handleExportData()
      },
      disabled: exporting
    },
    { 
      title: 'Настройки дашборда', 
      desc: 'Персонализация виджетов', 
      action: 'Настроить',
      onClick: () => setShowWidgetModal(true)
    },
  ]

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
    maxWidth: '800px',
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

  return (
    <div style={container}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div style={header}>
        <h1 style={title}>Панель менеджера</h1>
        <p style={subtitle}>Управление аналитикой и отчетами</p>
      </div>

      <div style={grid}>
        {widgetSettings.revenue && (
          <div style={card}>
            <div style={cardTitle}>Выручка</div>
            <div style={cardValue}>
              ${((dashData?.stats?.revenue?.value || 0) / 1000).toFixed(0)}K
            </div>
            <div style={cardChange(dashData?.stats?.revenue?.change || 0)}>
              {dashData?.stats?.revenue?.change > 0 ? '↑' : '↓'} {Math.abs(dashData?.stats?.revenue?.change || 0)}%
            </div>
          </div>
        )}
        {widgetSettings.orders && (
          <div style={card}>
            <div style={cardTitle}>Заказы</div>
            <div style={cardValue}>{dashData?.stats?.orders?.value || 0}</div>
            <div style={cardChange(dashData?.stats?.orders?.change || 0)}>
              {dashData?.stats?.orders?.change > 0 ? '↑' : '↓'} {Math.abs(dashData?.stats?.orders?.change || 0)}%
            </div>
          </div>
        )}
        {widgetSettings.nps && (
          <div style={card}>
            <div style={cardTitle}>NPS Score</div>
            <div style={cardValue}>{nps?.score || 0}</div>
            <div style={cardChange(5)}>↑ +5 за месяц</div>
          </div>
        )}
        {widgetSettings.conversion && (
          <div style={card}>
            <div style={cardTitle}>Конверсия</div>
            <div style={cardValue}>{dashData?.stats?.conversion?.value || 0}%</div>
            <div style={cardChange(dashData?.stats?.conversion?.change || 0)}>
              {dashData?.stats?.conversion?.change > 0 ? '↑' : '↓'} {Math.abs(dashData?.stats?.conversion?.change || 0)}%
            </div>
          </div>
        )}
        {widgetSettings.traffic && (
          <div style={card}>
            <div style={cardTitle}>Трафик</div>
            <div style={cardValue}>{dashData?.stats?.visitors?.value || 0}</div>
            <div style={cardChange(dashData?.stats?.visitors?.change || 0)}>
              {dashData?.stats?.visitors?.change > 0 ? '↑' : '↓'} {Math.abs(dashData?.stats?.visitors?.change || 0)}%
            </div>
          </div>
        )}
        {widgetSettings.topProducts && (
          <div style={card}>
            <div style={cardTitle}>Топ товары</div>
            <div style={cardValue}>{dashData?.topProducts?.length || 0}</div>
            <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Популярных товаров</div>
          </div>
        )}
      </div>

      <div style={section}>
        <h2 style={sectionTitle}>Быстрые действия</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {tasks.map((task, idx) => (
            <div key={idx} style={taskCard}>
              <div style={taskLeft}>
                <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {task.title}
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                  {task.desc}
                </div>
              </div>
              <button 
                style={taskBtn(task.disabled)} 
                onClick={task.onClick}
                disabled={task.disabled}
              >
                {task.action}
              </button>
            </div>
          ))}
        </div>
      </div>

      {showReportModal && (
        <div style={modalOverlay} onClick={() => setShowReportModal(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h2 style={modalTitle}>Еженедельный отчет</h2>
              <button style={closeBtn} onClick={() => setShowReportModal(false)}>×</button>
            </div>
            {reportData ? (
              reportData.error ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#f87171' }}>
                  {reportData.error}
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>
                      Аналитика продаж
                    </h3>
                    <div style={grid}>
                      <div style={card}>
                        <div style={cardTitle}>Общая выручка</div>
                        <div style={cardValue}>
                          ${((reportData.dashboard?.stats?.revenue?.value || reportData.analytics?.totalRevenue || 0) / 1000).toFixed(1)}K
                        </div>
                        {reportData.dashboard?.stats?.revenue?.change && (
                          <div style={cardChange(reportData.dashboard.stats.revenue.change)}>
                            {reportData.dashboard.stats.revenue.change > 0 ? '↑' : '↓'} {Math.abs(reportData.dashboard.stats.revenue.change)}%
                          </div>
                        )}
                      </div>
                      <div style={card}>
                        <div style={cardTitle}>Заказов</div>
                        <div style={cardValue}>
                          {reportData.dashboard?.stats?.orders?.value || reportData.analytics?.totalOrders || 0}
                        </div>
                        {reportData.dashboard?.stats?.orders?.change && (
                          <div style={cardChange(reportData.dashboard.stats.orders.change)}>
                            {reportData.dashboard.stats.orders.change > 0 ? '↑' : '↓'} {Math.abs(reportData.dashboard.stats.orders.change)}%
                          </div>
                        )}
                      </div>
                      <div style={card}>
                        <div style={cardTitle}>Средний чек</div>
                        <div style={cardValue}>
                          ${reportData.dashboard?.stats?.avgOrder?.value || 0}
                        </div>
                      </div>
                      <div style={card}>
                        <div style={cardTitle}>Конверсия</div>
                        <div style={cardValue}>
                          {reportData.dashboard?.stats?.conversion?.value || 0}%
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '12px', color: 'var(--text-primary)' }}>
                      Веб-трафик
                    </h3>
                    <div style={grid}>
                      <div style={card}>
                        <div style={cardTitle}>Посетители</div>
                        <div style={cardValue}>{reportData.website?.visitors || 0}</div>
                      </div>
                      <div style={card}>
                        <div style={cardTitle}>Просмотры</div>
                        <div style={cardValue}>{reportData.website?.pageViews || 0}</div>
                      </div>
                      <div style={card}>
                        <div style={cardTitle}>Отказы</div>
                        <div style={cardValue}>{reportData.website?.bounceRate || 0}%</div>
                      </div>
                      <div style={card}>
                        <div style={cardTitle}>Время на сайте</div>
                        <div style={cardValue}>{reportData.website?.avgDuration || '0:00'}</div>
                      </div>
                    </div>
                  </div>
                  <button 
                    style={{
                      ...taskBtn(),
                      width: '100%',
                      marginTop: '8px'
                    }}
                    onClick={handleExportReport}
                  >
                    Экспортировать отчет
                  </button>
                </div>
              )
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                Загрузка данных...
              </div>
            )}
          </div>
        </div>
      )}

      {showSegmentsModal && (
        <div style={modalOverlay} onClick={() => setShowSegmentsModal(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h2 style={modalTitle}>Сегменты клиентов</h2>
              <button style={closeBtn} onClick={() => setShowSegmentsModal(false)}>×</button>
            </div>
            {segmentsData ? (
              segmentsData.error ? (
                <div style={{ textAlign: 'center', padding: '40px', color: '#f87171' }}>
                  {segmentsData.error}
                </div>
              ) : (
                <div>
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{...card, marginBottom: '12px'}}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>VIP клиенты</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                            Покупки &gt; $5000
                          </div>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: '#8b5cf6' }}>
                          {Math.floor((segmentsData.totalOrders || 100) * 0.15)}
                        </div>
                      </div>
                    </div>
                    <div style={{...card, marginBottom: '12px'}}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Активные</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                            Покупки за последний месяц
                          </div>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: '#3b82f6' }}>
                          {Math.floor((segmentsData.totalOrders || 100) * 0.45)}
                        </div>
                      </div>
                    </div>
                    <div style={{...card}}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>Спящие</div>
                          <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                            Нет покупок &gt; 3 месяцев
                          </div>
                        </div>
                        <div style={{ fontSize: '24px', fontWeight: 700, color: '#9ca3af' }}>
                          {Math.floor((segmentsData.totalOrders || 100) * 0.40)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <button 
                    style={{
                      ...taskBtn(),
                      width: '100%',
                      marginTop: '8px'
                    }}
                    onClick={handleExportSegments}
                  >
                    Экспортировать сегменты
                  </button>
                </div>
              )
            ) : (
              <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                Загрузка данных...
              </div>
            )}
          </div>
        </div>
      )}

      {showWidgetModal && (
        <div style={modalOverlay} onClick={() => setShowWidgetModal(false)}>
          <div style={modal} onClick={(e) => e.stopPropagation()}>
            <div style={modalHeader}>
              <h2 style={modalTitle}>Настройка виджетов</h2>
              <button style={closeBtn} onClick={() => setShowWidgetModal(false)}>×</button>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '24px' }}>
                Выберите виджеты для отображения на главном дашборде
              </p>
              {[
                { key: 'revenue', label: 'Выручка' },
                { key: 'orders', label: 'Заказы' },
                { key: 'nps', label: 'NPS Score' },
                { key: 'conversion', label: 'Конверсия' },
                { key: 'traffic', label: 'Трафик' },
                { key: 'topProducts', label: 'Топ товары' },
              ].map((widget) => (
                <div key={widget.key} style={{...card, marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                  <div style={{ fontSize: '15px', fontWeight: 500, color: 'var(--text-primary)' }}>
                    {widget.label}
                  </div>
                  <label 
                    style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    onClick={() => setWidgetSettings({...widgetSettings, [widget.key]: !widgetSettings[widget.key as keyof typeof widgetSettings]})}
                  >
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      border: '2px solid var(--border-color)',
                      background: widgetSettings[widget.key as keyof typeof widgetSettings] ? 'var(--accent-primary)' : 'transparent',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}>
                      {widgetSettings[widget.key as keyof typeof widgetSettings] && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="var(--bg-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                  </label>
                </div>
              ))}
              <button 
                style={{
                  ...taskBtn(),
                  width: '100%',
                  marginTop: '16px'
                }}
                onClick={handleSaveWidgets}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManagerPanelPage

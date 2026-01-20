import { useState, useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import type { GAMetrics } from '@/types'
import { fetchGAMetrics } from '@/utils/googleAnalytics'

const GoogleAnalytics = () => {
  const { token } = useAuthStore()
  const [metrics, setMetrics] = useState<GAMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadMetrics()
  }, [])

  const loadMetrics = async () => {
    try {
      const propertyId = import.meta.env.VITE_GA_PROPERTY_ID
      if (!propertyId || !token) {
        setError('Данные недоступны')
        return
      }

      const data = await fetchGAMetrics(propertyId, token)
      setMetrics(data)
    } catch (err) {
      setError('Ошибка загрузки данных')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div style={{padding: '20px', color: 'var(--text-muted)'}}>Загрузка...</div>
  }

  if (error) {
    return (
      <div style={{
        padding: '20px',
        background: 'rgba(255,87,87,0.1)',
        border: '1px solid rgba(255,87,87,0.3)',
        borderRadius: '8px',
        color: 'var(--error)',
      }}>
        {error}
      </div>
    )
  }

  if (!metrics) return null

  return (
    <div style={{
      display: window.innerWidth >= 768 ? 'grid' : 'flex',
      gridTemplateColumns: window.innerWidth >= 768 ? 'repeat(auto-fill, minmax(280px, 1fr))' : '1fr',
      flexDirection: 'column',
      gap: 'clamp(12px, 2vw, 16px)',
    }}>
      <MetricCard title="Активные пользователи" value={metrics.activeUsers} />
      <MetricCard title="Сессии" value={metrics.sessions} />
      <MetricCard title="Просмотры страниц" value={metrics.pageViews} />
      <MetricCard title="Показатель отказов" value={`${metrics.bounceRate.toFixed(1)}%`} />
      
      <div style={{
        gridColumn: '1 / -1',
        background: 'var(--bg-card)',
        borderRadius: '12px',
        padding: '20px',
      }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '16px',
          color: 'var(--text-primary)',
        }}>
          Популярные страницы
        </h4>
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          {metrics.topPages.slice(0, 5).map((page, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px',
              background: 'var(--bg-primary)',
              borderRadius: '6px',
            }}>
              <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>
                {page.path}
              </span>
              <span style={{fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)'}}>
                {page.views}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        gridColumn: '1 / -1',
        background: 'var(--bg-card)',
        borderRadius: '12px',
        padding: '20px',
      }}>
        <h4 style={{
          fontSize: '16px',
          fontWeight: 600,
          marginBottom: '16px',
          color: 'var(--text-primary)',
        }}>
          Источники трафика
        </h4>
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
          {metrics.trafficSources.slice(0, 5).map((source, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '8px',
              background: 'var(--bg-primary)',
              borderRadius: '6px',
            }}>
              <span style={{fontSize: '14px', color: 'var(--text-secondary)'}}>
                {source.source}
              </span>
              <span style={{fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)'}}>
                {source.users}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const MetricCard = ({ title, value }: { title: string, value: string | number }) => (
  <div style={{
    background: 'var(--bg-card)',
    borderRadius: '12px',
    padding: '20px',
  }}>
    <div style={{
      fontSize: '13px',
      color: 'var(--text-muted)',
      marginBottom: '8px',
    }}>
      {title}
    </div>
    <div style={{
      fontSize: '28px',
      fontWeight: 700,
      color: 'var(--text-primary)',
    }}>
      {value}
    </div>
  </div>
)

export default GoogleAnalytics

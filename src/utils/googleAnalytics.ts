import type { GAMetrics } from '@/types'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
    dataLayer?: any[]
  }
}

export const initGA = (measurementId: string) => {
  if (typeof window === 'undefined') return

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  window.gtag = function() {
    window.dataLayer?.push(arguments)
  }
  window.gtag('js', new Date())
  window.gtag('config', measurementId)
}

export const trackPageView = (path: string) => 
  window.gtag?.('event', 'page_view', { page_path: path })

export const trackEvent = (action: string, category: string, label?: string, value?: number) =>
  window.gtag?.('event', action, { event_category: category, event_label: label, value })

export const fetchGAMetrics = async (propertyId: string, accessToken: string): Promise<GAMetrics> => {
  const response = await fetch(
    `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dateRanges: [{ startDate: '7daysAgo', endDate: 'today' }],
        metrics: [
          { name: 'activeUsers' },
          { name: 'sessions' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
        ],
        dimensions: [
          { name: 'pagePath' },
          { name: 'sessionSource' },
        ],
      }),
    }
  )

  const data = await response.json()
  
  return {
    activeUsers: parseInt(data.rows?.[0]?.metricValues?.[0]?.value || '0'),
    sessions: parseInt(data.rows?.[0]?.metricValues?.[1]?.value || '0'),
    pageViews: parseInt(data.rows?.[0]?.metricValues?.[2]?.value || '0'),
    bounceRate: parseFloat(data.rows?.[0]?.metricValues?.[3]?.value || '0'),
    avgSessionDuration: parseFloat(data.rows?.[0]?.metricValues?.[4]?.value || '0'),
    topPages: data.rows?.slice(0, 10).map((row: any) => ({
      path: row.dimensionValues?.[0]?.value || '',
      views: parseInt(row.metricValues?.[2]?.value || '0'),
    })) || [],
    trafficSources: data.rows?.slice(0, 10).map((row: any) => ({
      source: row.dimensionValues?.[1]?.value || '',
      users: parseInt(row.metricValues?.[0]?.value || '0'),
    })) || [],
  }
}

import { useState } from 'react'
import Sidebar from '@/components/layout/Sidebar'
import Header from '@/components/layout/Header'
import MainDashboard from '@/components/dashboard/MainDashboard'
import NPSPage from './NPSPage'
import AnalyticsPage from './AnalyticsPage'
import WebsitePage from './WebsitePage'
import SettingsPage from './SettingsPage'

const DashboardPage = () => {
  const [currView, setCurrView] = useState('desktop')

  const renderContent = () => {
    switch(currView) {
      case 'desktop': return <MainDashboard />
      case 'analytics': return <AnalyticsPage />
      case 'website': return <WebsitePage />
      case 'nps': return <NPSPage />
      case 'settings': return <SettingsPage />
      default: return <MainDashboard />
    }
  }

  const container = {
    display: 'flex',
    minHeight: '100vh',
    background: 'var(--bg-primary)',
  }

  const main = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    overflow: 'hidden',
  }

  const content = {
    flex: 1,
    overflowY: 'auto' as const,
    background: 'var(--bg-primary)',
  }

  return (
    <div style={container}>
      <Sidebar currView={currView} onViewChange={setCurrView} />
      <div style={main}>
        <Header />
        <div style={content}>
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default DashboardPage
